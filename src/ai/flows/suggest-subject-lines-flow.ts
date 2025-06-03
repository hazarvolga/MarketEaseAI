
'use server';
/**
 * @fileOverview AI-powered subject line suggestion for emails.
 *
 * - suggestSubjectLines - Suggests relevant subject lines based on a brief.
 * - SuggestSubjectLinesInput - Input type for the suggestSubjectLines function.
 * - SuggestSubjectLinesOutput - Return type for the suggestSubjectLines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getConfiguredModelIdentifier } from '@/ai/genkit';

const SuggestSubjectLinesInputSchemaInternal = z.object({
  subjectBrief: z.string().min(5, "Subject brief must be at least 5 characters.").max(200, "Subject brief cannot exceed 200 characters.").describe("A brief description or keywords for the email subject line."),
  emailContext: z.string().optional().describe("Optional: A snippet of the email body or main purpose of the email for better context."),
});
export type SuggestSubjectLinesInput = z.infer<typeof SuggestSubjectLinesInputSchemaInternal>;

const SuggestSubjectLinesOutputSchemaInternal = z.object({
  subjectSuggestions: z.array(z.string()).describe('Array of suggested email subject lines.'),
});
export type SuggestSubjectLinesOutput = z.infer<typeof SuggestSubjectLinesOutputSchemaInternal>;

export async function suggestSubjectLines(input: SuggestSubjectLinesInput): Promise<SuggestSubjectLinesOutput> {
  return suggestSubjectLinesFlow(input);
}

const suggestSubjectLinesPrompt = ai.definePrompt({
  name: 'suggestSubjectLinesPrompt',
  model: getConfiguredModelIdentifier(),
  input: {schema: SuggestSubjectLinesInputSchemaInternal},
  output: {schema: SuggestSubjectLinesOutputSchemaInternal},
  prompt: `You are an expert email marketing copywriter. Your task is to generate 3-5 compelling and concise email subject line suggestions.
  The subject lines should be engaging and encourage recipients to open the email.
  Consider clickbait-free, clear, and benefit-driven language.
  If emailContext is provided, use it to tailor the subject lines more effectively.

  User's brief for the subject line:
  {{{subjectBrief}}}

  {{#if emailContext}}
  Additional context from the email body or purpose:
  {{{emailContext}}}
  {{/if}}

  Return your suggestions as an array of strings. For example: ["Unlock Exclusive Savings Today!", "Your Weekly News Digest is Here", "Don't Miss Out: Limited Time Offer"]`,
});

const suggestSubjectLinesFlow = ai.defineFlow(
  {
    name: 'suggestSubjectLinesFlow',
    inputSchema: SuggestSubjectLinesInputSchemaInternal,
    outputSchema: SuggestSubjectLinesOutputSchemaInternal,
  },
  async input => {
    const {output} = await suggestSubjectLinesPrompt(input);
    return output!;
  }
);
