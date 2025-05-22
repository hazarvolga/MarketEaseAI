
'use server';

import { 
  generateMarketingContent, 
  type GenerateMarketingContentInput, 
  type GenerateMarketingContentOutput 
} from '@/ai/flows/generate-marketing-content';
import { z } from 'zod';

// Re-define schema here for server-side validation, matching the one in the flow.
const ActionInputSchema = z.object({
  brandCorePurpose: z.string().min(10, "Brand's core purpose must be at least 10 characters."),
  customerValueProposition: z.string().min(10, "Customer value proposition must be at least 10 characters."),
  focusedProductService: z.string().optional(),
  priorityPlatforms: z.object({
    instagram: z.boolean().optional(),
    facebook: z.boolean().optional(),
    linkedin: z.boolean().optional(),
    twitter: z.boolean().optional(),
    pinterest: z.boolean().optional(),
    youtube: z.boolean().optional(),
    tiktok: z.boolean().optional(),
    companyBlog: z.boolean().optional(),
  }).optional(),
  campaignPeriods: z.string().optional(),
  frequentlyAskedQuestions: z.string().optional(),
  desiredUserEmotion: z.string().optional(),
  competitorInspirations: z.string().optional(),
  additionalStrategicInfo: z.string().optional(),
  brandKeywords: z.string().optional(),
  thingsToAvoid: z.string().optional(),
  uniqueSellingPropositions: z.string().optional(),
  contentRequest: z.string().min(10, "Content request must be at least 10 characters (e.g., '5 Instagram post ideas')."),
});

export async function handleGenerateContentAction(
  input: GenerateMarketingContentInput
): Promise<{ success: boolean; data?: GenerateMarketingContentOutput; error?: string | z.ZodError<GenerateMarketingContentInput> }> {
  
  const validationResult = ActionInputSchema.safeParse(input);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }

  try {
    // Ensure optional fields that are empty strings are sent as undefined
    const payload: GenerateMarketingContentInput = {
      ...validationResult.data,
      focusedProductService: validationResult.data.focusedProductService || undefined,
      campaignPeriods: validationResult.data.campaignPeriods || undefined,
      frequentlyAskedQuestions: validationResult.data.frequentlyAskedQuestions || undefined,
      desiredUserEmotion: validationResult.data.desiredUserEmotion || undefined,
      competitorInspirations: validationResult.data.competitorInspirations || undefined,
      additionalStrategicInfo: validationResult.data.additionalStrategicInfo || undefined,
      brandKeywords: validationResult.data.brandKeywords || undefined,
      thingsToAvoid: validationResult.data.thingsToAvoid || undefined,
      uniqueSellingPropositions: validationResult.data.uniqueSellingPropositions || undefined,
    };
    const output = await generateMarketingContent(payload);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error generating marketing content:", error);
    if (error instanceof Error) {
        return { success: false, error: `AI service error: ${error.message}. Please try again.` };
    }
    return { success: false, error: "An unexpected error occurred while generating content. Please try again." };
  }
}
