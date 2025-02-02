import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import userRoles from "./userRoles";

const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).unique().notNull(), // e.g., "buyer", "seller", "admin"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(userRoles), // Many users can have this role
}));

export default roles;
