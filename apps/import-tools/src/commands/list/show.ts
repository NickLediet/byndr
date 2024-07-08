#!/usr/bin/env node
import type { Command } from "commander";
import { DatabaseClientConfig, createDatabaseClient } from '@byndr/db-client'
import { lists } from '@byndr/db-schema'
import { sql } from 'drizzle-orm'
import { SharedOptions, registerSharedOptions } from "../../lib/core";
import { parse, config } from 'dotenv'
import { readFileSync } from "fs";

config()

export type ListShowOptions = SharedOptions & {
    slug?: string
}

export async function registerCommand(program: Command) {
    registerSharedOptions(program.command('list:show')
        .description('Show all lists in Byndr'))
        .option('-s, --slug <slug>', 'Slug of the list to show')
        .action(action)
}

export async function action(options: ListShowOptions) {
    console.log('Showing list...')
    console.log('Options:', options)
    const { $ } =  await import('zx')
    const { stdout } = await $`pwd`
    console.log(stdout)
    console.log(readFileSync(options.env, 'utf-8'))
    const config = options.env ? {
        ...process.env,
        ...parse(readFileSync(options.env))
    } : process.env 
    console.log('Config:', config.POSTGRES_PORT)
    const { db, closeConnection } = createDatabaseClient(config as DatabaseClientConfig)

    const query = sql`SELECT * FROM ${lists}`
    if (options.slug) {
        query.append(sql` WHERE slug = ${options.slug}`)
    }

    const results = await db.execute(query)

    if(results.length === 0) {
        console.log('No lists found')
    } else {
        console.log(results)
    }

    closeConnection()
}

