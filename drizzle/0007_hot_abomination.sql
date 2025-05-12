ALTER TABLE "roles" ALTER COLUMN "name" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "permissions" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_name_unique" UNIQUE("name");