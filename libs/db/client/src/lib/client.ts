import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

export type DatabaseClientConfig = {
  POSTGRES_USER: string,
  POSTGRES_PASSWORD: string,
  POSTGRES_DB: string,
  POSTGRES_HOST: string,
  POSTGRES_PORT: string
}

export function createDatabaseClient(config: DatabaseClientConfig) {
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT } = config

   if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB || !POSTGRES_HOST || !POSTGRES_PORT) {
    throw new Error('Missing required environment variables')
  }

  const pgClient = postgres({
    user: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT)
  })

  return {
    db: drizzle(pgClient),
    closeConnection: pgClient.end
  }
}