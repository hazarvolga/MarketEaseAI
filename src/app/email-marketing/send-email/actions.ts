
'use server';

import {
  suggestSubjectLines,
  type SuggestSubjectLinesInput,
  type SuggestSubjectLinesOutput,
} from '@/ai/flows/suggest-subject-lines-flow';
import { 
  generateMarketingContent, 
  type GenerateMarketingContentInput, 
  type GenerateMarketingContentOutput 
} from '@/ai/flows/generate-marketing-content';
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

// Schema for AI Email Body Generation
const GenerateEmailBodyActionInputSchema = z.object({
  emailBodyBrief: z.string().min(10, "Email body brief must be at least 10 characters.").max(500),
  // Minimal brand context - in a real app, this might come from a stored profile
  brandCorePurpose: z.string().min(10).optional().default("To provide excellent products and services."),
  customerValueProposition: z.string().min(10).optional().default("We offer high-quality solutions to meet your needs."),
});

export type GenerateEmailBodyActionInput = z.infer<typeof GenerateEmailBodyActionInputSchema>;

export async function handleGenerateEmailBodyAction(
  input: GenerateEmailBodyActionInput
): Promise<{ success: boolean; data?: GenerateMarketingContentOutput; error?: string | z.ZodError<GenerateEmailBodyActionInput> }> {
  const validationResult = GenerateEmailBodyActionInputSchema.safeParse(input);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }

  const { emailBodyBrief, brandCorePurpose, customerValueProposition } = validationResult.data;

  // Construct the input for the main marketing content flow
  const flowInput: GenerateMarketingContentInput = {
    contentRequest: `Generate a compelling email body based on the following brief: "${emailBodyBrief}". The email should be suitable for direct sending. Focus on clear, concise, and engaging language.`,
    brandCorePurpose: brandCorePurpose,
    customerValueProposition: customerValueProposition,
    // Other fields are optional for this direct email context or will be handled by the flow's defaults
  };

  try {
    const output = await generateMarketingContent(flowInput);
    // The flow returns an array of suggestions, we might want to refine this if it's too generic.
    // For now, we assume 'contentSuggestions' will contain suitable email body parts or full drafts.
    return { success: true, data: output };
  } catch (error) {
    console.error("Error generating email body content:", error);
    if (error instanceof Error) {
        return { success: false, error: `AI service error: ${error.message}. Please try again.` };
    }
    return { success: false, error: "An unexpected error occurred while generating email content. Please try again." };
  }
}
