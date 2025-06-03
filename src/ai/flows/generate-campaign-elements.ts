
'use server';
/**
 * @fileOverview AI-powered campaign element generation.
 *
 * - generateCampaignElements - Generates campaign name, subject lines, preview text, email body draft, and CTAs.
 * - GenerateCampaignElementsInput - Input type for the generateCampaignElements function.
 * - GenerateCampaignElementsOutput - Return type for the generateCampaignElements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// CampaignGoalSchema is not exported directly
const CampaignGoalSchema = z.enum([
  "new_product_feature", 
  "sale_discount", 
  "newsletter_update", 
  "website_traffic", 
  "event_invitation",
  "lead_generation",
  "re_engagement",
  "other"
]).describe("The primary goal of the email campaign.");
export type CampaignGoal = z.infer<typeof CampaignGoalSchema>; // Exporting the type

// CampaignToneSchema is not exported directly
const CampaignToneSchema = z.enum([
  "professional",
  "friendly",
  "urgent",
  "informative",
  "playful",
  "empathetic",
  "inspirational"
]).describe("The desired tone of voice for the campaign content.");
export type CampaignTone = z.infer<typeof CampaignToneSchema>; // Exporting the type

const GenerateCampaignElementsInputSchema = z.object({
  campaignGoal: CampaignGoalSchema, 
  customCampaignGoalText: z.string().optional().describe("A user-defined custom goal for the campaign, used if campaignGoal is 'other'."),
  keyMessageOrOffer: z.string().min(10, "Key message or offer must be at least 10 characters.").max(500, "Key message or offer cannot exceed 500 characters.").describe("The core message, product, or offer for this campaign."),
  targetAudienceDescription: z.string().optional().describe("Specific target audience for this campaign. If blank, Brand Profile audience will be primary."),
  desiredTone: CampaignToneSchema.optional(), 
  
  brandProfile: z.object({
    brandName: z.string().describe("The official name of the brand."),
    brandCorePurpose: z.string().describe("The brand's fundamental reason for existence."),
    customerValueProposition: z.string().describe("The main value or benefit customers receive."),
    targetAudience: z.string().describe("General target audience of the brand."),
    brandVoice: z.string().describe("The overall brand voice (e.g., professional, friendly)."),
    keyProductsOrServices: z.string().optional().describe("Comma-separated list of key products or services."),
    uniqueSellingPropositions: z.string().optional().describe("What makes the brand/product unique."),
  }).describe("Core information about the brand to guide AI generation.")
});

export type GenerateCampaignElementsInput = z.infer<typeof GenerateCampaignElementsInputSchema>;

const GenerateCampaignElementsOutputSchema = z.object({
  campaignNameSuggestions: z.array(z.string()).describe('Array of 3-5 suggested campaign names.'),
  subjectLineSuggestions: z.array(z.string()).describe('Array of 3-5 suggested email subject lines.'),
  previewTextSuggestions: z.array(z.string()).describe('Array of 2-3 suggested email preview texts (preheaders).'),
  emailBodyDraft: z.string().describe('A draft for the email body content, written in a style suitable for direct use or minor editing. This should be a complete thought or a few paragraphs.'),
  ctaSuggestions: z.array(z.string()).describe('Array of 2-3 suggested call-to-action texts.'),
});

export type GenerateCampaignElementsOutput = z.infer<typeof GenerateCampaignElementsOutputSchema>;

export async function generateCampaignElements(input: GenerateCampaignElementsInput): Promise<GenerateCampaignElementsOutput> {
  return generateCampaignElementsFlow(input);
}

const generateCampaignElementsPrompt = ai.definePrompt({
  name: 'generateCampaignElementsPrompt',
  input: {schema: GenerateCampaignElementsInputSchema},
  output: {schema: GenerateCampaignElementsOutputSchema},
  prompt: `You are an expert marketing campaign strategist and copywriter for the brand "{{brandProfile.brandName}}".
Your task is to generate key elements for an email campaign based on the provided user inputs and brand profile.

**Brand Profile Information:**
- Core Purpose: {{brandProfile.brandCorePurpose}}
- Value Proposition: {{brandProfile.customerValueProposition}}
- General Target Audience: {{brandProfile.targetAudience}}
- Brand Voice: {{brandProfile.brandVoice}}
{{#if brandProfile.keyProductsOrServices}}- Key Products/Services: {{brandProfile.keyProductsOrServices}}{{/if}}
{{#if brandProfile.uniqueSellingPropositions}}- USPs: {{brandProfile.uniqueSellingPropositions}}{{/if}}

**User Input for This Specific Campaign:**
- Campaign Objective:
  {{#if customCampaignGoalText}}
    User-defined: "{{{customCampaignGoalText}}}" (This is a custom goal because 'other' was selected as the general category for the campaign objective).
  {{else}}
    Selected category: "{{campaignGoal}}".
  {{/if}}
  (Please use the "Key Message/Offer" below as the primary detail for this objective, and interpret the objective in actionable marketing terms.)
- Key Message/Offer for this campaign: {{{keyMessageOrOffer}}}
{{#if targetAudienceDescription}}- Specific Target Audience for this campaign: {{{targetAudienceDescription}}}{{else}}- (Use general brand target audience for this campaign.){{/if}}
{{#if desiredTone}}- Desired Tone for this campaign: {{desiredTone}}{{else}}- (Use general brand voice for this campaign.)"{{/if}}

Based on ALL the information above, generate the following:
1.  **Campaign Name Suggestions (3-5 options):** These should be concise, descriptive, and suitable for internal tracking.
2.  **Subject Line Suggestions (3-5 options):** These should be compelling, clear, and encourage opens. Consider using personalization placeholders like "[Name]" if appropriate for the brand voice.
3.  **Preview Text Suggestions (2-3 options):** These should complement the subject lines and provide additional incentive to open.
4.  **Email Body Draft (1 complete draft):** This should be a well-structured email body of a few paragraphs (around 100-250 words). It should clearly convey the key message/offer, align with the campaign goal and brand voice, and naturally lead to a call to action. Include placeholders like "[User Name]" for personalization if appropriate.
5.  **CTA Suggestions (2-3 options):** These should be clear, action-oriented calls to action.

Return all outputs in the specified JSON schema format. Ensure the email body draft is a single string, ready to be used.
Focus on creativity, clarity, and alignment with the brand's identity and campaign objectives.
`,
});

const generateCampaignElementsFlow = ai.defineFlow(
  {
    name: 'generateCampaignElementsFlow',
    inputSchema: GenerateCampaignElementsInputSchema,
    outputSchema: GenerateCampaignElementsOutputSchema,
  },
  async input => {
    const {output} = await generateCampaignElementsPrompt(input);
    if (!output) {
      throw new Error("AI failed to generate campaign elements.");
    }
    // Ensure all arrays have at least one element if AI returns empty, or provide defaults
    return {
      campaignNameSuggestions: output.campaignNameSuggestions?.length > 0 ? output.campaignNameSuggestions : ["New Campaign Idea"],
      subjectLineSuggestions: output.subjectLineSuggestions?.length > 0 ? output.subjectLineSuggestions : ["Your Compelling Subject"],
      previewTextSuggestions: output.previewTextSuggestions?.length > 0 ? output.previewTextSuggestions : ["Exciting update inside!"],
      emailBodyDraft: output.emailBodyDraft || `Dear [User Name],\n\nWe have an exciting update for you regarding ${input.keyMessageOrOffer}.\n\n[Further details about the offer or message.]\n\nBest regards,\nThe ${input.brandProfile.brandName} Team`,
      ctaSuggestions: output.ctaSuggestions?.length > 0 ? output.ctaSuggestions : ["Learn More"],
    };
  }
);

    