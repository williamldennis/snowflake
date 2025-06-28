CREATE TABLE "spirit-animal_match_result" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"chatId" varchar(255) NOT NULL,
	"matchedChatId" varchar(255) NOT NULL,
	"score" integer NOT NULL,
	"reason" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
