import { relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import messages from "./messages";
import users from "./users";
import orders from "./orders";

const threads = pgTable("threads", {
  id: serial("id").primaryKey(),
  buyerId: integer("buyer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "cascade",
  }), // Optional (linked to order)
  createdAt: timestamp("created_at").defaultNow(),
});

export const threadsRelations = relations(threads, ({ one, many }) => ({
  buyer: one(users, { fields: [threads.buyerId], references: [users.id] }),
  seller: one(users, { fields: [threads.sellerId], references: [users.id] }),
  order: one(orders, { fields: [threads.orderId], references: [orders.id] }),
  messages: many(messages),
}));

export default threads;
