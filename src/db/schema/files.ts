import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import orders from "./orders";
import users from "./users";

export const fileTypeEnum = pgEnum("file_type", [
  "delivery", // Final delivery from seller
  "revision", // Revision request from buyer
  "requirement", // Initial requirements from buyer
]);

const files = pgTable("files", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  uploadedBy: integer("uploaded_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 255 }).notNull(),
  type: fileTypeEnum().notNull().default("requirement"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const filesRelations = relations(files, ({ one }) => ({
  order: one(orders, { fields: [files.orderId], references: [orders.id] }),
  uploader: one(users, { fields: [files.uploadedBy], references: [users.id] }),
}));

export default files;
