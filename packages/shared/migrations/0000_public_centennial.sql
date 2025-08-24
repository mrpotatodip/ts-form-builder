CREATE TABLE "tbl_form" (
	"id" serial NOT NULL,
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"party_uuid" uuid NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"description" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tbl_form_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "tbl_hodl_organization" (
	"id" serial NOT NULL,
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"party_uuid" uuid NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"author_party_uuid" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tbl_hodl_organization_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "tbl_hodl_party_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"party_uuid" uuid NOT NULL,
	"user_id" text NOT NULL,
	"stripe_customer_id" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tbl_hodl_party" (
	"id" serial NOT NULL,
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tbl_hodl_party_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "tbl_user" (
	"id" serial NOT NULL,
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	CONSTRAINT "tbl_user_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "tbl_form" ADD CONSTRAINT "tbl_form_party_uuid_tbl_hodl_party_uuid1_fk" FOREIGN KEY ("party_uuid") REFERENCES "public"."tbl_hodl_party"("uuid1") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_hodl_organization" ADD CONSTRAINT "tbl_hodl_organization_party_uuid_tbl_hodl_party_uuid1_fk" FOREIGN KEY ("party_uuid") REFERENCES "public"."tbl_hodl_party"("uuid1") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_hodl_organization" ADD CONSTRAINT "tbl_hodl_organization_author_party_uuid_tbl_hodl_party_uuid1_fk" FOREIGN KEY ("author_party_uuid") REFERENCES "public"."tbl_hodl_party"("uuid1") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_hodl_party_user" ADD CONSTRAINT "tbl_hodl_party_user_party_uuid_tbl_hodl_party_uuid1_fk" FOREIGN KEY ("party_uuid") REFERENCES "public"."tbl_hodl_party"("uuid1") ON DELETE no action ON UPDATE no action;