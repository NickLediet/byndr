import { Command } from 'commander'

const program = new Command()

program
  .name('byndr')
  .description('Import tools for Byndr')
  .version('0.0.1')

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