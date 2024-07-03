import { PostgresError } from 'postgres';
import { DatabaseClientConfig, createDatabaseClient } from './client';
import { config } from 'process';

const dbMock = {
  end: jest.fn(() => ({})),
}

jest.mock('postgres', () => {
  return {
    __esModule: true,
    default: jest.fn(() => dbMock)
  }
})

jest.mock('drizzle-orm/postgres-js', () => {
  return {
    __esModule: true,
    drizzle: jest.fn(() => dbMock)
  }
})

describe('client.ts', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createDatabaseClient()', () => {
    const configKeys = ['POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB', 'POSTGRES_HOST', 'POSTGRES_PORT']
    it('throws an error if any config is missing', () => {
      configKeys.forEach((key) => {
        const config = configKeys.reduce((acc, prop: string) => {
          acc[prop] = key
          return acc
        }, {} as Record<string, string>)

        delete config[key]
        expect(() => createDatabaseClient(config as DatabaseClientConfig)).toThrow('Missing required environment variables')
      })
    })

    it('creates a database client', () => {
      const config = configKeys.reduce((acc, key: string) => {
        acc[key] = key
        return acc
      }, {} as Record<string, string>)

      const client = createDatabaseClient(config as DatabaseClientConfig)
      console.log(client)
      expect(client.db).toEqual(dbMock)
      // @ts-expect-error - Testing if the function is a mock function
      expect(client.closeConnection._isMockFunction).toEqual(true)
    })
  })
})
