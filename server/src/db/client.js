import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.js'

export function createDatabase({
  connectionString = process.env.DATABASE_URL,
  ssl = process.env.DATABASE_SSL === 'true',
} = {}) {
  if (!connectionString) throw new Error('DATABASE_URL is required')

  const pool = new Pool({
    connectionString,
    ssl: ssl ? { rejectUnauthorized: false } : undefined,
  })

  return {
    db: drizzle(pool, { schema }),
    close: () => pool.end(),
  }
}
