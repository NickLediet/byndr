import type { Command } from "commander";
import { createDatabaseClient } from '@byndr/db-client'
import { lists } from '@byndr/db-schema'

export type ListCreateOptions = {
    name: string
    slug: string
    includeInCollection: boolean
}

export async function registerCommand(program: Command) {
   program.command('list:create')
    .description('Create a new list in Byndr')
    .requiredOption('-n, --name <name>', 'Name of the list')
    .requiredOption('-s, --slug <slug>', 'Slug for the list to be used as an unique identifier')
    .option('-i, --include-in-collection', 'Include the list in the user\'s collection')
    .action(action)
}

export async function action(options: ListCreateOptions) {
  console.log('Creating list...')
  const { db, closeConnection } = createDatabaseClient()

  await db.insert(lists).values({
    name: options.name,
    slug: options.slug,
    includeInCollection: options.includeInCollection || false
  })

  closeConnection()
}

