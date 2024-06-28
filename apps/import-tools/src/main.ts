import { Command } from 'commander'
import { createDatabaseClient } from '@byndr/db-client'
import { lists } from '@byndr/db-schema'

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
  .option('--name <name>', 'Name of the list to import into')
  .action((args, options) => {
    console.log('Importing data...')
    console.log('Args:', args)
    console.log('Options:', options)
  })

program.parse()