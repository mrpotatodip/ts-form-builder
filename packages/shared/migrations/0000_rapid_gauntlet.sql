CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tbl_form" (
	"id" serial NOT NULL,
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"party_uuid" uuid NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"json" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tbl_form_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "tbl_organization" (
	"id" serial NOT NULL,
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"party_uuid" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"author_party_uuid" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tbl_organization_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "tbl_party" (
	"id" serial NOT NULL,
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tbl_party_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "tbl_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"party_uuid" uuid NOT NULL,
	"user_id" text NOT NULL,
	"stripe_customer_id" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_form" ADD CONSTRAINT "tbl_form_party_uuid_tbl_party_uuid1_fk" FOREIGN KEY ("party_uuid") REFERENCES "public"."tbl_party"("uuid1") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_organization" ADD CONSTRAINT "tbl_organization_party_uuid_tbl_party_uuid1_fk" FOREIGN KEY ("party_uuid") REFERENCES "public"."tbl_party"("uuid1") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_organization" ADD CONSTRAINT "tbl_organization_author_party_uuid_tbl_party_uuid1_fk" FOREIGN KEY ("author_party_uuid") REFERENCES "public"."tbl_party"("uuid1") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_party_uuid_tbl_party_uuid1_fk" FOREIGN KEY ("party_uuid") REFERENCES "public"."tbl_party"("uuid1") ON DELETE no action ON UPDATE no action;