import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import products from "./products";
import users from "./users";

const favorites = pgTable(
  "favorites",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    uniqueFavorite: uniqueIndex("unique_favorite").on(t.userId, t.productId), // Prevent duplicates
  })
);

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
  product: one(products, {
    fields: [favorites.productId],
    references: [products.id],
  }),
}));

export default favorites;
