import { Command } from 'commander'
import { createDatabaseClient } from '@byndr/db-client'
import { NewEntry, lists, entries } from '@byndr/db-schema'
import { readFile } from 'fs/promises'
import { camelCase, isArray } from 'lodash'
import { sql } from 'drizzle-orm'
import { createClient } from 'redis'
import { DatabaseClientConfig } from '@byndr/db-client'
import 'dotenv/config'
const program = new Command()

program
  .name('byndr')
  .description('Import tools for Byndr')
  .version('0.0.1')

program.command('debug')
  .description('Debugging command for testing, will be removed in production')
  .action(async () => {
    console.log('DEBUG: Connecting to database...')
     const client = await createClient({
      password: process.env.REDIS_PASSWORD
     })
      .on('error', (err) => console.log('Error:', err))
      .connect()
    
    const value = await client.GET('byndr_test_key')
    console.log('DEBUG: Value:', value)
    client.disconnect()
  })

program.command('list:create')
  .description('Create a new list in Byndr')
  .requiredOption('-n, --name <name>', 'Name of the list')
  .requiredOption('-s, --slug <slug>', 'Slug for the list to be used as an unique identifier')
  .option('-i, --include-in-collection', 'Include the list in the user\'s collection')
  .action(async (options) => {
    console.log('Creating list...')
    const { db, closeConnection } = createDatabaseClient(process.env as DatabaseClientConfig)

    await db.insert(lists).values({
      name: options.name,
      slug: options.slug,
      includeInCollection: options.includeInCollection || false
    })

    closeConnection()
  })

program.command('list:import')
  .description('Import data into Byndr')
  .arguments('<sources...>')
  .option('-d, --dry-run', 'Perform a dry-run')
  .requiredOption('--slug <slug>', 'Slug of the list to import into')
  .action(async (args, options) => {
    type ImportData = {
      keys: string[],
      newEntries: NewEntry[]
    }

    const rowToEntry = (keys: string[], row: string) => {
      const values = row.split(/(?<!\s),(?!\s)/)
      return keys.reduce((acc, key, i) => {
        const currentValue = values[i]
        acc[key] = /^\d+$/.test(currentValue) ? parseInt(currentValue) : currentValue
        return acc
      }, {} as NewEntry)
    }

    const { newEntries } = (await Promise.all(
        args.map(async (source) => (await readFile(source)).toString('utf-8'))
      ))
      .reduce((acc: ImportData, fileData: string, i: number) => {
        const [header, ...rows] = fileData.trim().split('\n').map(row => row.trim())
        if (i === 0) {
          acc.keys = header.split(',').map(key => camelCase(key.trim()))
        }
        acc.newEntries = [
          ...acc.newEntries,
          ...rows.map(row => rowToEntry(acc.keys, row))
        ]

        return acc
      }, { keys: [], newEntries: [] } as ImportData)

    const { db, closeConnection } = await createDatabaseClient(process.env as DatabaseClientConfig)
    // Fetch the requested list
    const listResult = await db.select().from(lists).where(
      sql`${lists.slug} = ${options.slug}`
    )
    const list = isArray(listResult) ? listResult[0] : listResult

    newEntries.forEach(async entry => {
      if(options.dryRun) {
        return
      }
      // Insert the entry into the database
      try {
        await db.transaction(async (tx) => {
          console.log('importing entry:', JSON.stringify(entry))
          if (options.dryRun) return

          await tx.insert(entries).values({
            listId: list.id,
            ...entry
          } as NewEntry).returning()
        })

      } catch (e) {
        console.error('Error importing entry:', e)
        process.exit(1)
      }
   })

   if(options.dryRun) {
     console.log('Dry run complete')
   }

   closeConnection()
   process.exit(0)
  })

program.parse()