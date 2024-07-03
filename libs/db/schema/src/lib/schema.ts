import { pgTable, serial, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const lists = pgTable('lists', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  includeInCollection: boolean('include_in_collection').default(false),
  slug: varchar('slug', { length: 255 }).unique(),
  createdAt: timestamp('created_at').defaultNow()
})

export type List = typeof lists.$inferSelect
export type NewList = typeof lists.$inferInsert

export const entries = pgTable('entries', {
  id: serial('id').primaryKey(),
  listId: integer('list_id').references(() => lists.id).notNull(),
  quantity: integer('quantity').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  simpleName: varchar('simple_name', { length: 255 }).notNull(),
  set: varchar('set', { length: 255 }).notNull(),
  cardNumber: varchar('card_number', { length: 20 }).notNull(),
  setCode: varchar('set_code', { length: 255 }).notNull(),
  printing: varchar('printing', { length: 255 }).notNull(),
  condition: varchar('condition', { length: 255 }).notNull(),
  language: varchar('language', { length: 100 }).notNull(),
  rarity: varchar('rarity', { length: 255 }).notNull(),
  productId: integer('product_id').notNull(),
  sku: integer('sku').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
export type Entry = typeof entries.$inferSelect
export type NewEntry = typeof entries.$inferInsert

