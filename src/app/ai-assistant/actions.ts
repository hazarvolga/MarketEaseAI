
'use server';

import { 
  generateMarketingContent, 
  type GenerateMarketingContentInput, 
  type GenerateMarketingContentOutput 
} from '@/ai/flows/generate-marketing-content';
import { z } from 'zod';

// This schema now only requires contentRequest from the AI Assistant page form.
// Other strategic fields are optional here, as they should ideally come from the Brand Profile.
// The AI flow itself has its own schema which might make some of these mandatory
// (like brandCorePurpose), so we pass placeholders if they are not available from a saved profile.
const ActionInputSchema = z.object({
  contentRequest: z.string().min(10, "Content request must be at least 10 characters (e.g., '5 Instagram post ideas').").max(1000),
  // Make other fields optional as they'd ideally come from a saved Brand Profile
  brandCorePurpose: z.string().min(10).optional(),
  customerValueProposition: z.string().min(10).optional(),
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
});

export async function handleGenerateContentAction(
  input: GenerateMarketingContentInput // The input will match this type from the calling page
): Promise<{ success: boolean; data?: GenerateMarketingContentOutput; error?: string | z.ZodError<GenerateMarketingContentInput> }> {
  
  // Validate only the contentRequest for now, as other fields are from Brand Profile (conceptually)
  const validationResult = z.object({ contentRequest: ActionInputSchema.shape.contentRequest }).safeParse({ contentRequest: input.contentRequest });

  if (!validationResult.success) {
    return { success: false, error: validationResult.error as z.ZodError<GenerateMarketingContentInput> };
  }

  try {
    // The payload passed to the AI flow includes all fields from GenerateMarketingContentInput.
    // If they are not provided by the simplified AI assistant form (which only provides contentRequest),
    // they will be undefined. The AI flow should handle undefined optional fields.
    // For mandatory fields in the AI flow not covered by 'contentRequest',
    // the calling component (AiAssistantPage) provides generic placeholders.
    const payload: GenerateMarketingContentInput = {
      ...input, // This will include contentRequest and any placeholders for mandatory fields
      focusedProductService: input.focusedProductService || undefined,
      campaignPeriods: input.campaignPeriods || undefined,
      frequentlyAskedQuestions: input.frequentlyAskedQuestions || undefined,
      desiredUserEmotion: input.desiredUserEmotion || undefined,
      competitorInspirations: input.competitorInspirations || undefined,
      additionalStrategicInfo: input.additionalStrategicInfo || undefined,
      brandKeywords: input.brandKeywords || undefined,
      thingsToAvoid: input.thingsToAvoid || undefined,
      uniqueSellingPropositions: input.uniqueSellingPropositions || undefined,
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
