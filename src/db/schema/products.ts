import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  serial,
  varchar,
  decimal,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import users from "./users";
import packages from "./packages";
import categories from "./categories";

const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  deliveryTime: integer("delivery_time").notNull(), // Days
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  seller: one(users, { fields: [products.sellerId], references: [users.id] }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  packages: many(packages),
}));

export default products;
