CREATE TABLE "spirit-animal_chat" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "spirit-animal_chat" ADD CONSTRAINT "spirit-animal_chat_userId_spirit-animal_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."spirit-animal_user"("id") ON DELETE no action ON UPDATE no action;