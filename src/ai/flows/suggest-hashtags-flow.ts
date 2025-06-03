
'use server';
/**
 * @fileOverview AI-powered hashtag suggestion.
 *
 * - suggestHashtags - Suggests relevant hashtags based on post content.
 * - SuggestHashtagsInput - Input type for the suggestHashtags function.
 * - SuggestHashtagsOutput - Return type for the suggestHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getConfiguredModelIdentifier } from '@/ai/genkit';

const SuggestHashtagsInputSchemaInternal = z.object({
  postContent: z.string().min(10, "Post content must be at least 10 characters.").describe("The content of the social media post for which to suggest hashtags."),
});
export type SuggestHashtagsInput = z.infer<typeof SuggestHashtagsInputSchemaInternal>;

const SuggestHashtagsOutputSchemaInternal = z.object({
  hashtags: z.array(z.string()).describe('Array of suggested hashtags, including the # symbol.'),
});
export type SuggestHashtagsOutput = z.infer<typeof SuggestHashtagsOutputSchemaInternal>;

export async function suggestHashtags(input: SuggestHashtagsInput): Promise<SuggestHashtagsOutput> {
  return suggestHashtagsFlow(input);
}

const suggestHashtagsPrompt = ai.definePrompt({
  name: 'suggestHashtagsPrompt',
  model: getConfiguredModelIdentifier(),
  input: {schema: SuggestHashtagsInputSchemaInternal},
  output: {schema: SuggestHashtagsOutputSchemaInternal},
  prompt: `Analyze the following social media post content and suggest 3 to 7 relevant hashtags.
Each hashtag must start with the # symbol.
Prioritize a mix of niche and broader hashtags if applicable.

Post Content:
{{{postContent}}}

Return your suggestions as an array of strings. For example: ["#example1", "#example2"]`,
});

const suggestHashtagsFlow = ai.defineFlow(
  {
    name: 'suggestHashtagsFlow',
    inputSchema: SuggestHashtagsInputSchemaInternal,
    outputSchema: SuggestHashtagsOutputSchemaInternal,
  },
  async input => {
    const {output} = await suggestHashtagsPrompt(input);
    return output!;
  }
);

