CREATE TYPE "public"."quote_status" AS ENUM('new', 'quoted', 'won', 'lost');--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text,
	"service" text NOT NULL,
	"budget" text NOT NULL,
	"timeline" text NOT NULL,
	"message" text NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"status" "quote_status" DEFAULT 'new' NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"ip_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "quote_requests_created_at_idx" ON "quote_requests" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "quote_requests_status_idx" ON "quote_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "quote_requests_ip_hash_idx" ON "quote_requests" USING btree ("ip_hash","created_at");