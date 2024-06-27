import { $, fs } from 'zx'
import * as dotenv from 'dotenv'
import postgres from 'postgres'

// Bind env vars to process.env
dotenv.config()

async function executeMigrationFile(file: string, sql:) {
    try {
        const sqlScriptContents = await fs.readFileSync(file)
        const res = await sql`${sqlScriptContents}`
    } catch (error) {
        console.error('Error executing migration file', error)
    }
}

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
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env
console.log(`${POSTGRES_DB}, ${POSTGRES_PASSWORD}, ${POSTGRES_USER}`)

const client = postgres({
    user: POSTGRES_USER,
    host: 'localhost',
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432,
})

migrationFiles.stdout.split('\n').forEach(async (file: string) => {
    if (file) {
        await executeMigrationFile(file, client)
    }
})

await client.end()