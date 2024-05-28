// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import {
  index,
  sqliteTableCreator,
  integer,
  text,
} from "drizzle-orm/sqlite-core"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `t3gallery_${name}`)

export const images = createTable(
  "image",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),

    userId: text("userId").notNull(),

    createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
    updatedAt: text("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
)

// Create index manually after table creation
sql`CREATE INDEX name_idx ON t3gallery_image (name)`
