'use server';

/**
 * @fileOverview Dynamically describes a hospital room based on previous choices.
 *
 * - generateRoomDescription - A function that generates a description of the hospital room.
 * - RoomDescriptionInput - The input type for the generateRoomDescription function.
 * - RoomDescriptionOutput - The return type for the generateRoomDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoomDescriptionInputSchema = z.object({
  previousChoices: z.array(z.string()).describe('An array of the player\'s previous choices.'),
  currentScenario: z.string().describe('The current scenario or situation the player is in.'),
});
export type RoomDescriptionInput = z.infer<typeof RoomDescriptionInputSchema>;

const RoomDescriptionOutputSchema = z.object({
  description: z.string().describe('A detailed description of the hospital room.'),
});
export type RoomDescriptionOutput = z.infer<typeof RoomDescriptionOutputSchema>;

export async function generateRoomDescription(input: RoomDescriptionInput): Promise<RoomDescriptionOutput> {
  return generateRoomDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'roomDescriptionPrompt',
  input: {schema: RoomDescriptionInputSchema},
  output: {schema: RoomDescriptionOutputSchema},
  prompt: `You are a horror game environment designer. Generate a vivid description of a hospital room based on the player's previous choices and the current scenario.

Previous Choices:
{{#each previousChoices}}
- {{{this}}}
{{/each}}

Current Scenario: {{{currentScenario}}}

Description:`,
});

const generateRoomDescriptionFlow = ai.defineFlow(
  {
    name: 'generateRoomDescriptionFlow',
    inputSchema: RoomDescriptionInputSchema,
    outputSchema: RoomDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
