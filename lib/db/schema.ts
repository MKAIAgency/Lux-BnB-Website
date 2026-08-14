import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const luxProperties = pgTable("lux_properties", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  image: text("image").notNull().default(""),
  beds: text("beds").notNull().default(""),
  baths: text("baths").notNull().default(""),
  sqft: text("sqft").notNull().default(""),
  tag: text("tag").notNull().default(""),
  enquireLink: text("enquire_link").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const luxSettings = pgTable("lux_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export type LuxProperty = typeof luxProperties.$inferSelect
