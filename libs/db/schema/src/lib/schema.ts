import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";

export const lists = pgTable('lists', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  includeInCollection: boolean('include_in_collection').default(false),
  slug: varchar('slug', { length: 255 }).unique(),
})

export type List = typeof lists.$inferSelect
export type NewList = typeof lists.$inferInsert
