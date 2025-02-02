// schema/packages.ts
import {
  pgTable,
  serial,
  integer,
  decimal,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import products from "./products";
import orders from "./orders";

export const packageTierEnum = pgEnum("package_tier", [
  "basic",
  "standard",
  "premium",
]);

const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  tier: packageTierEnum().notNull().default("basic"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  revisions: integer("revisions"), // Number of allowed revisions
  deliveryTime: integer("delivery_time").notNull(), // Days specific to this tier
});

export const packagesRelations = relations(packages, ({ one, many }) => ({
  product: one(products, {
    fields: [packages.productId],
    references: [products.id],
  }),
  orders: many(orders), // Add this line to link packages to orders
}));

export default packages;
