import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { randomUUID } from 'node:crypto'

export const uploads = pgTable('uploads', {
  id: text()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text('name').notNull(),
  remoteKey: text('remote_key').notNull().unique(),
  remoteUrl: text('remote_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
})
