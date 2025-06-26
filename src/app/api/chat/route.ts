import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: openai('gpt-4-turbo'),
        system: 'You are interviewing users based on their personality, trying to determine their enneagram number',
        messages,
    });

    return result.toDataStreamResponse();
}