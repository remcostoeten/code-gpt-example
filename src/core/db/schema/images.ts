import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const images = sqliteTable("images", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  user_id: text("user_id").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updatedAt"),
});
