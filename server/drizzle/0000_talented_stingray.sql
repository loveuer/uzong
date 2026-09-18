CREATE TABLE "game_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learner_id" varchar(64) NOT NULL,
	"game_key" varchar(64) NOT NULL,
	"completed_rounds" integer DEFAULT 0 NOT NULL,
	"best_mistakes" integer,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "game_progress_learner_game_unique" ON "game_progress" USING btree ("learner_id","game_key");