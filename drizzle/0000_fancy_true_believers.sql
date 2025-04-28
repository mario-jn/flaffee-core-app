CREATE TYPE "public"."order_status" AS ENUM('ongoing', 'done');--> statement-breakpoint
CREATE TYPE "public"."order_type" AS ENUM('dine_in', 'takeaway');--> statement-breakpoint
CREATE TYPE "public"."product_size" AS ENUM('regular', 'large', 'extra_large');--> statement-breakpoint
CREATE TYPE "public"."product_variant" AS ENUM('regular', 'hot', 'ice');--> statement-breakpoint
CREATE TYPE "public"."product_category" AS ENUM('coffee', 'tea', 'milk', 'snack', 'main_course');--> statement-breakpoint
CREATE TYPE "public"."product_type" AS ENUM('beverage', 'food');--> statement-breakpoint
CREATE TABLE "employee" (
	"id" varchar(16) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role_id" integer,
	CONSTRAINT "employee_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "order_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer,
	"note" varchar,
	"order_id" integer,
	"product_item_id" integer
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "order_status" NOT NULL,
	"value" integer NOT NULL,
	"type" "order_type" NOT NULL,
	"customer" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"cashier" varchar
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"variant" "product_variant" NOT NULL,
	"size" "product_size" NOT NULL,
	"product_id" integer
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"type" "product_type" NOT NULL,
	"category" "product_category" NOT NULL,
	"is_hidden" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "role_permission" (
	"role_id" integer,
	"permission_id" integer,
	CONSTRAINT "role_permission_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_item_id_product_item_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "public"."product_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_cashier_employee_id_fk" FOREIGN KEY ("cashier") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE no action ON UPDATE no action;