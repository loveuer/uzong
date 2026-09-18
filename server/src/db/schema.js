import { integer, pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

export const gameProgress = pgTable('game_progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  learnerId: varchar('learner_id', { length: 64 }).notNull(),
  gameKey: varchar('game_key', { length: 64 }).notNull(),
  completedRounds: integer('completed_rounds').default(0).notNull(),
  bestMistakes: integer('best_mistakes'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('game_progress_learner_game_unique').on(table.learnerId, table.gameKey),
])
