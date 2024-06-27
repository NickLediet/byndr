# @byndr/db-client

A repository for managing postgress client for drizzle orm.  This library is used as the primary was to interact with the postgres database.

## Usage
```typescript
import { createDatabaseConnection } from '@byndr/db-client'

// Fetch Drizzle instance and postgres client close handler
const { db, closeConnection } = createDatabaseClient()
// Run some drizzle queries on "db" ...

// Cleanup the connection
closeConnection()
```

## Building

Run `nx build client` to build the library.

## Running unit tests

Run `nx test client` to execute the unit tests via [Jest](https://jestjs.io).
