ALTER TABLE "books" ADD CONSTRAINT "books_isbn_unique" UNIQUE("isbn");--> statement-breakpoint
ALTER TABLE "publishers" ADD CONSTRAINT "publishers_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "topics" ADD CONSTRAINT "topics_topic_unique" UNIQUE("topic");