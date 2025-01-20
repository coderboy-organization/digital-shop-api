import {
  integer,
  pgTable,
  serial,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

import city from "./city";
import user from "./user";
import { relations } from "drizzle-orm";

const account = pgTable("account", {
  id: serial("id").primaryKey(),
  balance: numeric("balance", { precision: 12, scale: 2 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export default account;
