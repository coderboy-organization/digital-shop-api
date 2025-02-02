import { relations } from "drizzle-orm";
import {
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import users from "./users";

const sellerAnalytics = pgTable("seller_analytics", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).default(
    "0.00"
  ),
  completedOrders: integer("completed_orders").default(0),
  avgRating: decimal("avg_rating", { precision: 3, scale: 2 }).default("0.00"), // e.g., 4.75
  responseRate: decimal("response_rate", { precision: 5, scale: 2 }).default(
    "0.00"
  ), // Percentage
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sellerAnalyticsRelations = relations(
  sellerAnalytics,
  ({ one }) => ({
    seller: one(users, {
      fields: [sellerAnalytics.sellerId],
      references: [users.id],
    }),
  })
);
export default sellerAnalytics;
