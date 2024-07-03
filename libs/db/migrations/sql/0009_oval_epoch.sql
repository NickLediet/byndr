ALTER TABLE "entries" DROP CONSTRAINT "entries_list_id_lists_id_fk";
--> statement-breakpoint
ALTER TABLE "entries" DROP COLUMN IF EXISTS "list_id";