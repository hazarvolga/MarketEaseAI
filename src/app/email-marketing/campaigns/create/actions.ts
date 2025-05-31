'use server';

import { 
  generateCampaignElements, 
  type GenerateCampaignElementsInput, 
  type GenerateCampaignElementsOutput 
} from '@/ai/flows/generate-campaign-elements';
import { z } from 'zod';

// We'll use the schema directly from the flow import for consistency
// const ActionInputSchema = ... (no need to redefine if types are imported)

export async function handleGenerateCampaignElementsAction(
  input: GenerateCampaignElementsInput
): Promise<{ success: boolean; data?: GenerateCampaignElementsOutput; error?: string | z.ZodError<GenerateCampaignElementsInput> }> {
  
  // The input should already be validated on the client side against a similar schema,
  // but Zod in the flow will perform the definitive validation.
  // For server actions, it's good practice to ensure the input matches expectations.
  // However, since GenerateCampaignElementsInput is already a Zod schema via import,
  // we can rely on the flow's internal validation.

  try {
    const output = await generateCampaignElements(input);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error generating campaign elements:", error);
    if (error instanceof Error) {
        return { success: false, error: `AI service error: ${error.message}. Please try again.` };
    }
    return { success: false, error: "An unexpected error occurred while generating campaign elements. Please try again." };
  }
}
