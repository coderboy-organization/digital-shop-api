import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import products from "./products";

const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // e.g., "Graphic Design"
  slug: varchar("slug", { length: 100 }).notNull().unique(), // e.g., "graphic-design"
  description: text("description"), // Optional category description
  icon: varchar("icon", { length: 255 }), // URL to category icon/image
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations: One category → Many products
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export default categories;
