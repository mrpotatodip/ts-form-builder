import { pgTable, unique, serial, uuid, text, timestamp, foreignKey, json, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const tblHodlParty = pgTable("tbl_hodl_party", {
	id: serial().notNull(),
	uuid1: uuid().defaultRandom().primaryKey().notNull(),
	type: text().default('user').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("tbl_hodl_party_id_unique").on(table.id),
]);

export const tblForm = pgTable("tbl_form", {
	id: serial().notNull(),
	uuid1: uuid().defaultRandom().primaryKey().notNull(),
	name: text().default(').notNull(),
	description: json().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	partyUuid: uuid("party_uuid").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.partyUuid],
			foreignColumns: [tblHodlParty.uuid1],
			name: "tbl_form_party_uuid_tbl_hodl_party_uuid1_fk"
		}),
	unique("tbl_form_id_unique").on(table.id),
]);

export const tblUser = pgTable("tbl_user", {
	id: serial().notNull(),
	uuid1: uuid().defaultRandom().primaryKey().notNull(),
	name: text().default(').notNull(),
}, (table) => [
	unique("tbl_user_id_unique").on(table.id),
]);

export const tblHodlOrganization = pgTable("tbl_hodl_organization", {
	id: serial().notNull(),
	uuid1: uuid().defaultRandom().primaryKey().notNull(),
	partyUuid: uuid("party_uuid").notNull(),
	name: text().notNull(),
	status: text().default('active').notNull(),
	authorPartyUuid: uuid("author_party_uuid").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.partyUuid],
			foreignColumns: [tblHodlParty.uuid1],
			name: "tbl_hodl_organization_party_uuid_tbl_hodl_party_uuid1_fk"
		}),
	foreignKey({
			columns: [table.authorPartyUuid],
			foreignColumns: [tblHodlParty.uuid1],
			name: "tbl_hodl_organization_author_party_uuid_tbl_hodl_party_uuid1_fk"
		}),
	unique("tbl_hodl_organization_id_unique").on(table.id),
]);

export const tblHodlPartyUser = pgTable("tbl_hodl_party_user", {
	id: serial().primaryKey().notNull(),
	partyUuid: uuid("party_uuid").notNull(),
	userId: text("user_id").notNull(),
	stripeCustomerId: text("stripe_customer_id").default(').notNull(),
	email: text().default(').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.partyUuid],
			foreignColumns: [tblHodlParty.uuid1],
			name: "tbl_hodl_party_user_party_uuid_tbl_hodl_party_uuid1_fk"
		}),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);
