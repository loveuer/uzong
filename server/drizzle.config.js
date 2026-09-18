import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ quiet: true })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required for Drizzle commands')
}

export default defineConfig({
  schema: './src/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
