CREATE TYPE "public"."permission_action" AS ENUM('create', 'read', 'delete');--> statement-breakpoint
ALTER TABLE "permissions" ALTER COLUMN "action" SET DATA TYPE "public"."permission_action" USING "action"::"public"."permission_action";--> statement-breakpoint
ALTER TABLE "permissions" ALTER COLUMN "resource_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "role_permissions" ALTER COLUMN "role_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "role_permissions" ALTER COLUMN "permission_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ALTER COLUMN "role_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_name_unique" UNIQUE("name");