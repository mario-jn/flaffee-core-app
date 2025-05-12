ALTER TABLE "product" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."product_category";--> statement-breakpoint
CREATE TYPE "public"."product_category" AS ENUM('coffee', 'non_coffee', 'snack', 'main_course');--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "category" SET DATA TYPE "public"."product_category" USING "category"::"public"."product_category";