import { sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const images = sqliteTable("images", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  userId: text("userId").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updatedAt"),
})
