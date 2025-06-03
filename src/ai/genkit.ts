import {genkit, type Genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
// import {openai} from '@genkit-ai/openai'; // Commented out as package is not found
import {config} from 'dotenv';

config(); // Load environment variables

let genkitInstance: Genkit<any>;
let configuredModelId: string;

const aiProvider = process.env.AI_PROVIDER || 'googleai';
const googleApiKey = process.env.GOOGLE_API_KEY;
const geminiModelName = process.env.GEMINI_MODEL_NAME;

const openRouterApiKey = process.env.OPENROUTER_API_KEY;
const openRouterModelString = process.env.OPENROUTER_MODEL_STRING;
const openRouterBaseUrl = process.env.OPENROUTER_API_BASE_URL;

if (aiProvider === 'googleai') {
  if (!googleApiKey) {
    console.warn(
      'Google AI is selected, but GOOGLE_API_KEY is missing. Genkit may not function correctly for Google AI models.'
    );
  }
  console.log(
    `Configuring Genkit with Google AI. Model: ${
      geminiModelName || 'gemini-pro (default)'
    }`
  );
  genkitInstance = genkit({
    plugins: [googleAI({apiKey: googleApiKey || undefined})],
  });
  configuredModelId = geminiModelName || 'gemini-pro';
} else if (aiProvider === 'openrouter') {
  if (!openRouterApiKey || !openRouterModelString) {
    console.warn(
      'OpenRouter is selected, but OPENROUTER_API_KEY or OPENROUTER_MODEL_STRING is missing. OpenRouter will not be configured. Falling back to default Google AI if GOOGLE_API_KEY is present, otherwise AI functionality might be limited.'
    );
    // Fallback to Google AI if OpenRouter config is incomplete AND Google API key is present
    if (googleApiKey) {
       console.log(
        `Falling back to Google AI. Model: ${
          geminiModelName || 'gemini-pro (default)'
        }`
      );
      genkitInstance = genkit({
        plugins: [googleAI({apiKey: googleApiKey})],
      });
      configuredModelId = geminiModelName || 'gemini-pro';
    } else {
      console.error("CRITICAL: No valid AI provider could be configured. OPENROUTER keys missing and no GOOGLE_API_KEY for fallback.");
      // Initialize with no plugins or a dummy plugin to prevent crashes, but AI calls will fail.
      genkitInstance = genkit({ plugins: [] });
      configuredModelId = "no-model-configured";
    }
  } else {
    console.warn(
      `Configuring Genkit for OpenRouter: Model=${openRouterModelString}. ` +
      "NOTE: The '@genkit-ai/openai' package was not found and has been removed. " +
      "OpenRouter functionality via this plugin is currently disabled. " +
      "Falling back to Google AI if GOOGLE_API_KEY is present, otherwise AI functionality might be limited."
    );
    // генkitInstance = genkit({
    //   plugins: [
    //     openai({
    //       apiKey: openRouterApiKey,
    //       baseURL: openRouterBaseUrl || 'https://openrouter.ai/api/v1',
    //     }),
    //   ],
    // });
    // configuredModelId = openRouterModelString;

    // Fallback strategy if @genkit-ai/openai is not available
    if (googleApiKey) {
       console.log(
        `Falling back to Google AI due to missing OpenRouter plugin. Model: ${
          geminiModelName || 'gemini-pro (default)'
        }`
      );
      genkitInstance = genkit({
        plugins: [googleAI({apiKey: googleApiKey})],
      });
      configuredModelId = geminiModelName || 'gemini-pro';
    } else {
      console.error("CRITICAL: No valid AI provider could be configured for OpenRouter path. OPENROUTER plugin missing and no GOOGLE_API_KEY for fallback.");
      genkitInstance = genkit({ plugins: [] });
      configuredModelId = "no-model-configured";
    }
  }
} else {
  console.warn(
    `Unknown AI_PROVIDER: "${aiProvider}". Falling back to default Google AI if GOOGLE_API_KEY is present.`
  );
  genkitInstance = genkit({
    plugins: [googleAI({apiKey: googleApiKey || undefined})],
  });
  configuredModelId = geminiModelName || 'gemini-pro';
}

export const ai = genkitInstance;

/**
 * Returns the identifier of the currently configured primary model
 * based on environment variables.
 */
export function getConfiguredModelIdentifier(): string {
  if (!configuredModelId || configuredModelId === "no-model-configured") {
    console.warn("Warning: No specific model seems to be configured, ensure AI_PROVIDER and related keys are set. Defaulting might occur or calls may fail.");
    // Provide a sensible default if nothing else is configured, or let it be handled by Genkit's internal defaults.
    // For Google AI, Genkit might pick a default if model isn't specified in call.
    // For OpenRouter, a model string IS required.
    return geminiModelName || 'gemini-pro'; // Fallback for safety
  }
  return configuredModelId;
}
