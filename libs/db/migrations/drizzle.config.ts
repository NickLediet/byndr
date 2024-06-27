import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

const { 
    POSTGRES_USER, 
    POSTGRES_PASSWORD, 
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_PORT
} = process.env

if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB || !POSTGRES_HOST || !POSTGRES_PORT) {
    throw new Error('Missing required environment variables')
}

export default defineConfig({
    schema: 'libs/db/schema/src/lib/schema.ts',
    out: 'libs/db/migrations/sql',
    dialect: 'postgresql',
    dbCredentials: {
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT)
    }
})
