// schema/transactions.ts
import {
  pgTable,
  serial,
  integer,
  decimal,
  timestamp,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import orders from "./orders";

// Payment Method Enum
export const paymentMethodEnum = pgEnum("payment_method", [
  "stripe",
  "paypal",
  "card",
]);

// Transaction Status Enum
export const transactionStatusEnum = pgEnum("transaction_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);

const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: paymentMethodEnum().notNull(),
  status: transactionStatusEnum().default("pending"),
  gatewayTransactionId: varchar("gateway_transaction_id", { length: 255 }), // e.g., Stripe/PayPal ID
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transaction Relations
export const transactionsRelations = relations(transactions, ({ one }) => ({
  order: one(orders, {
    fields: [transactions.orderId],
    references: [orders.id],
  }),
}));

export default transactions;
