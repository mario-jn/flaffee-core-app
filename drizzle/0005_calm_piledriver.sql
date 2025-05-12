ALTER TABLE "audit_trail" RENAME TO "audit_trails";--> statement-breakpoint
ALTER TABLE "employee" RENAME TO "employees";--> statement-breakpoint
ALTER TABLE "order_item" RENAME TO "order_items";--> statement-breakpoint
ALTER TABLE "order" RENAME TO "orders";--> statement-breakpoint
ALTER TABLE "permission" RENAME TO "permissions";--> statement-breakpoint
ALTER TABLE "product_item" RENAME TO "product_items";--> statement-breakpoint
ALTER TABLE "product" RENAME TO "products";--> statement-breakpoint
ALTER TABLE "resource" RENAME TO "resources";--> statement-breakpoint
ALTER TABLE "role_permission" RENAME TO "role_permissions";--> statement-breakpoint
ALTER TABLE "role" RENAME TO "roles";--> statement-breakpoint
ALTER TABLE "session" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "user_role" RENAME TO "user_roles";--> statement-breakpoint
ALTER TABLE "employees" DROP CONSTRAINT "employee_email_unique";--> statement-breakpoint
ALTER TABLE "permissions" DROP CONSTRAINT "permission_action_resource_id_unique";--> statement-breakpoint
ALTER TABLE "audit_trails" DROP CONSTRAINT "audit_trail_user_id_employee_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "order_item_order_id_order_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "order_item_product_item_id_product_item_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "order_cashier_employee_id_fk";
--> statement-breakpoint
ALTER TABLE "permissions" DROP CONSTRAINT "permission_resource_id_resource_id_fk";
--> statement-breakpoint
ALTER TABLE "product_items" DROP CONSTRAINT "product_item_product_id_product_id_fk";
--> statement-breakpoint
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permission_role_id_role_id_fk";
--> statement-breakpoint
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permission_permission_id_permission_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "session_user_id_employee_id_fk";
--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "user_role_user_id_employee_id_fk";
--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "user_role_role_id_role_id_fk";
--> statement-breakpoint
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permission_role_id_permission_id_pk";--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "user_role_user_id_role_id_pk";--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id");--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id");--> statement-breakpoint
ALTER TABLE "audit_trails" ADD CONSTRAINT "audit_trails_user_id_employees_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_item_id_product_items_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "public"."product_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_cashier_employees_id_fk" FOREIGN KEY ("cashier") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_items" ADD CONSTRAINT "product_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_employees_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_employees_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_action_resource_id_unique" UNIQUE("action","resource_id");