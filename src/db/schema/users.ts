import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import userRoles from "./userRoles";
import profiles from "./profiles";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  roles: many(userRoles), // Users can have multiple roles
  profiles: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}));

export default users;
