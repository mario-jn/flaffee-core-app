CREATE TABLE "audit_trail" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(16),
	"action" varchar(128),
	"resource_name" varchar(128),
	"entity_id" integer,
	"old_value" jsonb,
	"new_value" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "resource" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128),
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" varchar(32),
	"user_id" varchar(32),
	"device_info" jsonb,
	"ip_address" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_role" (
	"user_id" varchar(32),
	"role_id" integer,
	CONSTRAINT "user_role_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
ALTER TABLE "employee" DROP CONSTRAINT "employee_role_id_role_id_fk";
--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "id" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "customer" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "cashier" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "permission" ADD COLUMN "action" varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE "permission" ADD COLUMN "resource_id" integer;--> statement-breakpoint
ALTER TABLE "audit_trail" ADD CONSTRAINT "audit_trail_user_id_employee_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_employee_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_employee_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permission" ADD CONSTRAINT "permission_resource_id_resource_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee" DROP COLUMN "role_id";--> statement-breakpoint
ALTER TABLE "permission" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "permission" ADD CONSTRAINT "permission_action_resource_id_unique" UNIQUE("action","resource_id");