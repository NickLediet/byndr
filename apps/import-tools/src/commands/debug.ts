import type { Command } from "commander";
import { SharedOptions, registerSharedOptions } from "../lib/core";
import { createClient } from 'redis'

export type DebugOptions = SharedOptions

export async function registerCommand(program: Command) {
    registerSharedOptions(program.command('debug')
        .description('Debugging command for testing, will be removed in production'))
        .action(action)
}

export async function action(options: DebugOptions){
    console.log(options)
    // console.log('DEBUG: Connecting to database...')
    //  const client = await createClient({
    //   password: process.env.REDIS_PASSWORD
    //  })
    //   .on('error', (err) => console.log('Error:', err))
    //   .connect()
    
    // const value = await client.GET('byndr_test_key')
    // console.log('DEBUG: Value:', value)
    // client.disconnect()
}
