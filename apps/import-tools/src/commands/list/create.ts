import type { Command } from "commander";
import { DatabaseClientConfig, createDatabaseClient } from '@byndr/db-client'
import { lists } from '@byndr/db-schema'
import { SharedOptions, registerSharedOptions } from "../../lib/core";

export type ListCreateOptions = SharedOptions & {
    name: string
    slug: string
    includeInCollection: boolean
}

export async function registerCommand(program: Command) {
   registerSharedOptions(program.command('list:create'))
    .description('Create a new list in Byndr')
    .requiredOption('-n, --name <name>', 'Name of the list')
    .requiredOption('-s, --slug <slug>', 'Slug for the list to be used as an unique identifier')
    .option('-i, --include-in-collection', 'Include the list in the user\'s collection')
    .action(action)
}

export async function action(options: ListCreateOptions) {
  console.log('Creating list...')
  const { db, closeConnection } = createDatabaseClient(process.env as DatabaseClientConfig)

  await db.insert(lists).values({
    name: options.name,
    slug: options.slug,
    includeInCollection: options.includeInCollection || false
  })

  closeConnection()
}

