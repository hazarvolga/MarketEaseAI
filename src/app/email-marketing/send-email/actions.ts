'use server';

import {
  suggestSubjectLines,
  type SuggestSubjectLinesInput,
  type SuggestSubjectLinesOutput,
} from '@/ai/flows/suggest-subject-lines-flow';
import { z } from 'zod';

// Schema for server-side validation, matching the one in the flow.
const SuggestSubjectLinesActionInputSchema = z.object({
  subjectBrief: z.string().min(5, "Subject brief must be at least 5 characters.").max(200),
  emailContext: z.string().optional(),
});

export async function handleSuggestSubjectLinesAction(
  input: SuggestSubjectLinesInput
): Promise<{ success: boolean; data?: SuggestSubjectLinesOutput; error?: string | z.ZodError<SuggestSubjectLinesInput> }> {
  const validationResult = SuggestSubjectLinesActionInputSchema.safeParse(input);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }

  try {
    const output = await suggestSubjectLines(validationResult.data);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error suggesting subject lines:", error);
    if (error instanceof Error) {
      return { success: false, error: `AI service error: ${error.message}. Please try again.` };
    }
    return { success: false, error: "An unexpected error occurred while suggesting subject lines. Please try again." };
  }
}
