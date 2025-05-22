
'use server';

import {
  suggestHashtags,
  type SuggestHashtagsInput,
  type SuggestHashtagsOutput,
} from '@/ai/flows/suggest-hashtags-flow';
import { z } from 'zod';

// Schema for server-side validation, matching the one in the flow.
const SuggestHashtagsActionInputSchema = z.object({
  postContent: z.string().min(10, "Post content must be at least 10 characters to suggest hashtags."),
});

export async function handleSuggestHashtagsAction(
  input: SuggestHashtagsInput
): Promise<{ success: boolean; data?: SuggestHashtagsOutput; error?: string | z.ZodError<SuggestHashtagsInput> }> {
  const validationResult = SuggestHashtagsActionInputSchema.safeParse(input);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }

  try {
    const output = await suggestHashtags(validationResult.data);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error suggesting hashtags:", error);
    if (error instanceof Error) {
      return { success: false, error: `AI service error: ${error.message}. Please try again.` };
    }
    return { success: false, error: "An unexpected error occurred while suggesting hashtags. Please try again." };
  }
}
