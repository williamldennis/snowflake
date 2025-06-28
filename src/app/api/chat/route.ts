import { openai } from '@ai-sdk/openai';
import { appendResponseMessages, streamText, type Message } from 'ai';
import { systemPrompt } from './systemprompt';
import { saveChat } from '@/lib/chat-store';

type ChatRequestBody = {
    messages: Message[];
    id: string;
};
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, id } = await req.json() as ChatRequestBody

    const result = streamText({
        model: openai('gpt-4-turbo'),
        system: systemPrompt,
        messages,
        async onFinish({ response }) {
            console.log("onFinish triggered — response:", response);

            await saveChat({
                id,
                messages: appendResponseMessages({
                    messages,
                    responseMessages: response.messages,
                }),
            });
        },
    });

    return result.toDataStreamResponse();
}