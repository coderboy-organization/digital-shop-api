import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import product from "./product";

const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
  // subcategories: many(category),
}));

export default category;
