CREATE TABLE IF NOT EXISTS "lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"include_in_collection" boolean DEFAULT false,
	"slug" varchar(255),
	CONSTRAINT "lists_slug_unique" UNIQUE("slug")
);
