import { defineConfig } from 'drizzle-kit'
import { DotenvParseOutput, parse } from 'dotenv'
import { readFileSync } from 'fs'

function getEnvFileName(): string {
    const nodeEnv = process.env.CI ? 'test' : process.env.NODE_ENV
    switch(nodeEnv) {
        case 'test':
            return '.env.test'
        case 'production':
            return '.env.production'
        default:
            return '.env'
    }
}

function readEnvFile(envFileName: string): DotenvParseOutput {
    console.warn(`Reading environment variables from ./${envFileName} in the future this will be moved to a configurable root directory`)
    const contentsBuffer = readFileSync(envFileName)
    return parse(contentsBuffer)
}

const envFileName = getEnvFileName();
const envConfig = readEnvFile(envFileName);

console.log('envConfig', envConfig)
console.log('envFileName', envFileName)

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_PORT
} = {
    ...process.env,
    ...envConfig
} as { [key: string]: string };

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
