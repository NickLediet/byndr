import { Command } from 'commander'
import * as commands from './commands'
import { createClient } from 'redis'
import 'dotenv/config'

const program = new Command()
program
  .name('byndr')
  .description('Import tools for Byndr')
  .version('0.0.1')

// Register command modules
Object.values(commands).forEach((command) => command.registerCommand(program))
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

program.parse()