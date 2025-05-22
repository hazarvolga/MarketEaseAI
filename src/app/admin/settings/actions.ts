
'use server';

import { z } from 'zod';

// Schema for the AI configuration data
const AiConfigurationSchema = z.object({
  provider: z.enum(['gemini', 'openrouter']),
  geminiApiKey: z.string().optional(),
  openRouterApiKey: z.string().optional(),
  openRouterModel: z.string().optional(),
});

export type AiConfigurationInput = z.infer<typeof AiConfigurationSchema>;

export async function handleUpdateAiConfigurationAction(
  data: AiConfigurationInput
): Promise<{ success: boolean; message?: string; error?: string | z.ZodError<AiConfigurationInput> }> {
  const validationResult = AiConfigurationSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error };
  }

  const { provider, geminiApiKey, openRouterApiKey, openRouterModel } = validationResult.data;

  // In a real application, you would securely store these or update a config file.
  // For this prototype, we'll just log the intent and what .env changes would be needed.
  console.log("Received AI configuration update request:", validationResult.data);

  let envInstructions = "To apply these settings, update your .env file with the following:\n";
  envInstructions += `AI_PROVIDER="${provider}"\n`;

  if (provider === 'gemini') {
    if (geminiApiKey) {
      envInstructions += `GOOGLE_API_KEY="${geminiApiKey}"\n`;
    } else {
       envInstructions += "# GOOGLE_API_KEY is not set.\n";
    }
    // Optionally, clear OpenRouter keys if Gemini is selected
    envInstructions += "# OPENROUTER_API_KEY=\n";
    envInstructions += "# OPENROUTER_MODEL_STRING=\n";
  } else if (provider === 'openrouter') {
    if (openRouterApiKey) {
      envInstructions += `OPENROUTER_API_KEY="${openRouterApiKey}"\n`;
    } else {
      envInstructions += "# OPENROUTER_API_KEY is not set.\n";
    }
    if (openRouterModel) {
      envInstructions += `OPENROUTER_MODEL_STRING="${openRouterModel}"\n`;
    } else {
      envInstructions += "# OPENROUTER_MODEL_STRING is not set.\n";
    }
     // Optionally, clear Gemini key if OpenRouter is selected
    envInstructions += "# GOOGLE_API_KEY=\n";
  }
  
  envInstructions += "\nThen, restart your application server for the changes to take effect.";
  
  console.log(envInstructions);

  // Simulate a successful update for the prototype
  return { 
    success: true, 
    message: `AI configuration for '${provider}' provider noted. ${envInstructions}` 
  };
}
