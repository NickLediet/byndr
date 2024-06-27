import { $, fs } from 'zx'
import { createDatabaseClient } from '../../../libs/db/client/src/lib/client'
import { sql } from 'drizzle-orm'

// Bind env vars to process.env
const currentWorkingDirectory = (await $`basename $(pwd)`).stdout.trim()
if ( currentWorkingDirectory !== 'byndr' ) {
    console.log(currentWorkingDirectory)
    console.error('Please run this script from the root of the project')
    process.exit(1)
}

if (!(await $`docker ps -q --filter name=byndr_db`).stdout) {
    console.error('Please start the database container before running this script')
    process.exit(1)
}

const migrationFiles = await $`ls -1 tools/migrations/*.sql`
console.log(migrationFiles.stdout)
if (!migrationFiles.stdout) {
    console.error('No migration files found')
    process.exit(1)
}

console.log('Connecting to the database...')

const { db, closeConnection } = createDatabaseClient()
 
console.log(await db.execute(sql`SELECT * FROM pg_catalog.pg_tables;`))

closeConnection()
