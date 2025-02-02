import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import users from "./users";

export const verificationStatus = pgEnum("verification_status", [
  "pending",
  "verified",
  "rejected",
]);

const verifications = pgTable("verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  documentType: varchar("document_type", { length: 50 }), // e.g., "passport"
  documentUrl: varchar("document_url", { length: 255 }).notNull(),
  status: verificationStatus().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const verificationsRelations = relations(verifications, ({ one }) => ({
  user: one(users, { fields: [verifications.userId], references: [users.id] }),
}));

export default verifications;
