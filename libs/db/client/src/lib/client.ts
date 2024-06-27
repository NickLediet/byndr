import * as dotenv from 'dotenv'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

dotenv.config()
const { 
  POSTGRES_USER,
  POSTGRES_PASSWORD, 
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT
} = process.env

export function createDatabaseClient() {
  const pgClient = postgres({
    user: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT
  })

  return {
    db: drizzle(pgClient),
    closeConnection: pgClient.end
  }
}