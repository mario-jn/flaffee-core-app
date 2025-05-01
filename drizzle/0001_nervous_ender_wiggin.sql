ALTER TABLE "employee" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "deleted_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN "deleted_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "deleted_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "permission" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "permission" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "permission" ADD COLUMN "deleted_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "product_item" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "product_item" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "product_item" ADD COLUMN "deleted_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "deleted_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "deleted_at" timestamp DEFAULT now();