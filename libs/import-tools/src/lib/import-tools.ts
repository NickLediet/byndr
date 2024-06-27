import { Command } from 'commander'

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
  .action((options) => {
    console.log('Creating list...')
    console.log('Options:', options)
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