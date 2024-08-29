import { Command } from 'commander'
import { bootstrap } from './lib/core'
import 'dotenv/config'

const program = new Command()
program
  .name('byndr')
  .description('Import tools for Byndr')
  .version('0.0.1')

async function start() {
  await bootstrap(program)
}

start()
// Register command modules

