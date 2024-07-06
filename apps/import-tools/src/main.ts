import { Command } from 'commander'
import { bootstrap } from './lib/core'
import { createClient } from 'redis'
import 'dotenv/config'

const program = new Command()
program
  .name('byndr')
  .description('Import tools for Byndr')
  .version('0.0.1')

bootstrap(program)
// Register command modules
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
