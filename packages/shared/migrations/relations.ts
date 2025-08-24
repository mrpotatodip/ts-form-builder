import { relations } from "drizzle-orm/relations";
import { tblHodlParty, tblForm, tblHodlOrganization, tblHodlPartyUser, user, session, account } from "./schema";

export const tblFormRelations = relations(tblForm, ({one}) => ({
	tblHodlParty: one(tblHodlParty, {
		fields: [tblForm.partyUuid],
		references: [tblHodlParty.uuid1]
	}),
}));

export const tblHodlPartyRelations = relations(tblHodlParty, ({many}) => ({
	tblForms: many(tblForm),
	tblHodlOrganizations_partyUuid: many(tblHodlOrganization, {
		relationName: "tblHodlOrganization_partyUuid_tblHodlParty_uuid1"
	}),
	tblHodlOrganizations_authorPartyUuid: many(tblHodlOrganization, {
		relationName: "tblHodlOrganization_authorPartyUuid_tblHodlParty_uuid1"
	}),
	tblHodlPartyUsers: many(tblHodlPartyUser),
}));

export const tblHodlOrganizationRelations = relations(tblHodlOrganization, ({one}) => ({
	tblHodlParty_partyUuid: one(tblHodlParty, {
		fields: [tblHodlOrganization.partyUuid],
		references: [tblHodlParty.uuid1],
		relationName: "tblHodlOrganization_partyUuid_tblHodlParty_uuid1"
	}),
	tblHodlParty_authorPartyUuid: one(tblHodlParty, {
		fields: [tblHodlOrganization.authorPartyUuid],
		references: [tblHodlParty.uuid1],
		relationName: "tblHodlOrganization_authorPartyUuid_tblHodlParty_uuid1"
	}),
}));

export const tblHodlPartyUserRelations = relations(tblHodlPartyUser, ({one}) => ({
	tblHodlParty: one(tblHodlParty, {
		fields: [tblHodlPartyUser.partyUuid],
		references: [tblHodlParty.uuid1]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	accounts: many(account),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));