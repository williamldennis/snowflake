CREATE TABLE "spirit-animal_chat_transcript" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"transcript" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "spirit-animal_chat_transcript" ADD CONSTRAINT "spirit-animal_chat_transcript_userId_spirit-animal_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."spirit-animal_user"("id") ON DELETE no action ON UPDATE no action;