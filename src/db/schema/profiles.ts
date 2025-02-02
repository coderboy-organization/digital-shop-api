import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import users from "./users";

const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .unique() // One-to-One with users
    .references(() => users.id, { onDelete: "cascade" }),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  bio: text("bio"),
  country: varchar("country", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export default profiles;
