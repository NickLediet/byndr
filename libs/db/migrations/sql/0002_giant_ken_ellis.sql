CREATE TABLE IF NOT EXISTS "entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"list_id" serial NOT NULL,
	"name" varchar(255),
	"simple_name" varchar(255),
	"set" varchar(255),
	"card_number" varchar(255),
	"set_code" varchar(255),
	"printing" varchar(255),
	"condition" varchar(255),
	"language" varchar(2),
	"rarity" varchar(255),
	"product_id" varchar(255),
	"sku" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entries" ADD CONSTRAINT "entries_list_id_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
