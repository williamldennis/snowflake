import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { systemPrompt } from './systemprompt';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: openai('gpt-4-turbo'),
        system: systemPrompt,
        messages,
    });

    return result.toDataStreamResponse();
}