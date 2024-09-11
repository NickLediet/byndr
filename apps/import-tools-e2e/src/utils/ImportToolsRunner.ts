import { DatabaseClientConfig, createDatabaseClient } from '@byndr/db-client'
import { exec } from  'promisify-child-process'
import { parse } from 'dotenv'
import { join } from 'path';
import { $ } from 'zx'
import { readFileSync } from 'fs';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
export class ImportToolsRunner {
  private cliPath: string

  constructor() {
    this.cliPath = join(process.cwd(), '../../dist/apps/import-tools/main.js')
  }

  async executeDatabaseQuery(callback: (db: PostgresJsDatabase) => Promise<void>) {
    const testConfig = readFileSync('../../.env.test', 'utf-8')
    const config = {
      ...process.env,
      ...parse(testConfig)
    }
    const { db, closeConnection } = createDatabaseClient(config as DatabaseClientConfig)

    await callback(db)
    closeConnection()
  }

   async executeCommand(command: string) {
    return exec(`node ${this.cliPath} ${command} --env ../../.env.test`)
  }
}
 