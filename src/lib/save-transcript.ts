// // lib/save-transcript.ts
// import { db } from "@/server/db";
// import { chatTranscripts } from "src/server/db/schema";
// import { eq } from "drizzle-orm";

// export async function appendToTranscript({
//     userId,
//     role,
//     content,
// }: {
//     userId: string;
//     role: "user" | "assistant";
//     content: string;
// }) {
//     // 1. Find the latest transcript for this user (assume 1 per user for now)
//     const [existing] = await db
//         .select()
//         .from(chatTranscripts)
//         .where(eq(chatTranscripts.userId, userId));

//     const line = `${role === "user" ? "User" : "Assistant"}: ${content}`;

//     if (existing) {
//         const updated = existing.transcript + "\n" + line;

//         await db
//             .update(chatTranscripts)
//             .set({ transcript: updated })
//             .where(eq(chatTranscripts.id, existing.id));
//     } else {
//         // No transcript yet — create new
//         await db.insert(chatTranscripts).values({
//             userId,
//             transcript: line,
//         });
//     }
// }
