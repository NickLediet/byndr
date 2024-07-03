import type { Command } from "commander";
import { createDatabaseClient } from '@byndr/db-client'
import { lists } from '@byndr/db-schema'
import { sql } from 'drizzle-orm'

export type ListShowOptions = {
    slug?: string
}
export async function registerCommand(program: Command) {
    program.command('list:show')
        .description('Show all lists in Byndr')
        .option('-s, --slug <slug>', 'Slug of the list to show')
        .action(action)
}

export async function action(options: ListShowOptions) {
    console.log('Showing list...')
    const { db, closeConnection } = createDatabaseClient()

    const query = sql`SELECT * FROM ${lists}`
    if (options.slug) {
        query.append(sql` WHERE slug = ${options.slug}`)
    }

    const results = await db.execute(query) 
    console.log(results)

    closeConnection()
}

