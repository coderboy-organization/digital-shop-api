import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  timestamp,
  varchar,
  boolean,
  json,
  integer,
  text,
} from "drizzle-orm/pg-core";

import order from "./order";
import address from "./address";
import category from "./category";
import askQuestion from "./askQuestion";

const product = pgTable("product", {
  id: serial("id").primaryKey(),
  //=== OVERVIEW ===//
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => category.id),
  serviceType: varchar("service_type", { length: 255 }).notNull(), // e.g. "product" or "service"
  searchTag: json("search_tag").notNull().default(["website"]),
  //=== OVERVIEW END ===//
  //=== PRICING ===//
  price: integer("price").notNull().default(0),
  //=== PRICING END ===//
  //=== DESCRIPTION ===//
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  //=== DESCRIPTION END ===//
  phone: varchar("contact_phone", { length: 255 }).notNull().unique(),
  phoneVerified: boolean("phone_verified").notNull().default(false),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  confirmationCode: varchar("confirmation_code", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const productRelations = relations(product, ({ many }) => ({
  addresses: many(address),
  orders: many(order),
  askQuestions: many(askQuestion), // as product has multiple Frequently Asked Questions
}));

export default product;
