import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import productTags from "./productTags";

const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(), // e.g., "logo-design"
});

// Relations
export const tagsRelations = relations(tags, ({ many }) => ({
  products: many(productTags),
}));

export default tags;
