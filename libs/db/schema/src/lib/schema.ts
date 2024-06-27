import * as dotenv from 'dotenv'
import * as postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

dotenv.config()
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env

export function createDatabaseClient() {
  const pgClient = postgres({
    user: POSTGRES_USER,
    host: 'localhost',
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432,
  })

  return drizzle(pgClient)
}