import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import orders from "./orders";

export const disputeStatus = pgEnum("dispute_status", [
  "open",
  "resolved",
  "closed",
]);

const disputes = pgTable("disputes", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  status: disputeStatus().default("open"),

  resolution: text("resolution"), // Admin's resolution notes
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const disputesRelations = relations(disputes, ({ one }) => ({
  order: one(orders, { fields: [disputes.orderId], references: [orders.id] }),
}));
export default disputes;
