ALTER TABLE "entries" ADD COLUMN "quantity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "simple_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "set" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "card_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "set_code" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "printing" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "condition" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "language" varchar(2) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "rarity" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "product_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "sku" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "created_at" timestamp DEFAULT now();