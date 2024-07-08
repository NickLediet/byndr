import rootConfig from './drizzle.config';
import { Config } from 'drizzle-kit'
import { readFileSync } from 'fs'
import { parse } from 'dotenv'

const contentsBuffer = readFileSync('.env.test')
const config = parse(contentsBuffer)

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_PORT
} = {
    ...process.env,
    ...config
} as { [key: string]: string }

export default {
    ...rootConfig,
    dbCredentials: {
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT)
    }
} as Config;