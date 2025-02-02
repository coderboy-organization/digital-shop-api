import {
  pgTable,
  serial,
  integer,
  decimal,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import users from "./users";
import files from "./files";
import packages from "./packages";
import products from "./products";
import reviews from "./reviews";
import transactions from "./transactions";

// Order Status Enum
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "in_progress",
  "delivered",
  "completed",
  "cancelled",
]);

const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  buyerId: integer("buyer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  packageId: integer("package_id")
    .notNull()
    .references(() => packages.id, { onDelete: "cascade" }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum().default("pending"),
  deadline: timestamp("deadline").notNull(), // Delivery deadline
  deliveredAt: timestamp("delivered_at"), // Actual delivery time
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Explicit Relations for Orders
export const ordersRelations = relations(orders, ({ one, many }) => ({
  buyer: one(users, { fields: [orders.buyerId], references: [users.id] }),
  seller: one(users, { fields: [orders.sellerId], references: [users.id] }),
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
  package: one(packages, {
    fields: [orders.packageId],
    references: [packages.id],
  }),
  transactions: many(transactions), // One order can have multiple transactions (e.g., refunds)
  review: one(reviews), // One review per order
  files: many(files), // Files exchanged during the order
}));

export default orders;
