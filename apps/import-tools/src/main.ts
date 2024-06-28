import { Command } from 'commander'
import { createDatabaseClient } from '@byndr/db-client'
import { lists } from '@byndr/db-schema'
import { readFile } from 'fs/promises'
import { camelCase } from 'lodash'

const program = new Command()

program
  .name('byndr')
  .description('Import tools for Byndr')
  .version('0.0.1')

program.command('list:create')
  .description('Create a new list in Byndr')
  .requiredOption('-n, --name <name>', 'Name of the list')
  .requiredOption('-s, --slug <slug>', 'Slug for the list to be used as an unique identifier')
  .option('-i, --include-in-collection', 'Include the list in the user\'s collection')
  .action(async (options) => {
    console.log('Creating list...')
    const { db, closeConnection } = createDatabaseClient()

    await db.insert(lists).values({
      name: options.name,
      slug: options.slug,
      includeInCollection: options.includeInCollection || false
    })

    closeConnection()
  })

program.command('import')
  .description('Import data into Byndr')
  .arguments('<sources...>')
  .option('-d, --dry-run', 'Perform a dry-run')
  .option('--slug <slug>', 'Slug of the list to import into')
  .action(async (args, options) => {
    console.log('Importing data...')
    console.log('Args:', args)
    console.log('Options:', options)

    type ImportEntry = {
      'quantity': number,   
      'name': string,
      'simpleName': string,
      'set': string,
      'cardNumber': number, 
      'setCode': string,
      'printing': string,
      'condition': string,
      'language': string,   
      'rarity': string,
      'productId': number,  
      'sku': number
    }

    let keys: string[] = []
    const entries: ImportEntry[] = []
    args.forEach(async (source, i) => {
      console.log(`Importing data from ${source}...`)
      const fileData = await readFile(source, 'utf-8')
      const [header, ...rows] = fileData.split('\n').map(row => row.trim())

      if(i === 0) {
        keys = header.split(',').map(key => camelCase(key.trim()))
      }

      const newEntries = rows.map(row => {
        const values = row.split(',').map(value => value.trim())
        return keys.reduce((acc, key, i) => {
          acc[key] = values[i]
          return acc
        }, {} as ImportEntry)
      })

      entries.push(...newEntries)
   })
  })

program.parse()