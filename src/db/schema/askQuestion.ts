import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const askQuestion = pgTable("askQuestion", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 255 }).notNull().unique(),
  answer: text("answer").notNull().unique(),
});

export const askQuestionsRelations = relations(askQuestion, ({ many }) => ({}));

export default askQuestion;
