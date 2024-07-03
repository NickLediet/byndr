import type { Command } from "commander";
import { createDatabaseClient } from '@byndr/db-client'
import { lists, entries, NewEntry} from '@byndr/db-schema'
import { readFile } from 'fs/promises'
import { sql } from 'drizzle-orm'
import { camelCase, isArray } from 'lodash'

export type ListImportOptions = {
    slug?: string
    dryRun: boolean
}

export type ImportData = {
    keys: string[],
    newEntries: NewEntry[]
}

export async function registerCommand(program: Command) {
    program.command('list:import')
    .description('Import data into Byndr')
    .arguments('<sources...>')
    .option('-d, --dry-run', 'Perform a dry-run')
    .requiredOption('--slug <slug>', 'Slug of the list to import into')
    .action(action)
}

export async function action(sources: string[], options: ListImportOptions) {
    console.log(sources)
    console.log(process.cwd())
    const rowToEntry = (keys: string[], row: string) => {
        const values = row.split(/(?<!\s),(?!\s)/)
        return keys.reduce((acc, key, i) => {
          const currentValue = values[i]
          acc[key] = /^\d+$/.test(currentValue) ? parseInt(currentValue) : currentValue
          return acc
        }, {} as NewEntry)
      }
  
    const { newEntries } = (await Promise.all(
        sources.map(async (source) => (await readFile(source)).toString('utf-8'))
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

    const { db, closeConnection } = await createDatabaseClient()
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
            console.log("starting transation")
            await db.transaction(async (tx) => {
                console.log('importing entry:', JSON.stringify(entry))
                if (options.dryRun) return

                const result = await tx.insert(entries).values({
                    listId: list.id,
                    ...entry
                } as NewEntry).returning()
                console.log(result)
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
}