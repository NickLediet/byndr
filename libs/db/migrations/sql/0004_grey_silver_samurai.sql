ALTER TABLE "entries" RENAME COLUMN "product_id" TO "productId";--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "quantity" integer NOT NULL;