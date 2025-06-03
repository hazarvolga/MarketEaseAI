
'use server';

/**
 * @fileOverview AI-powered content generation for marketing.
 *
 * - generateMarketingContent - Generates marketing content suggestions based on strategic brand briefing.
 * - GenerateMarketingContentInput - Input type for the generateMarketingContent function.
 * - GenerateMarketingContentOutput - Return type for the generateMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getConfiguredModelIdentifier } from '@/ai/genkit';

const GenerateMarketingContentInputSchema = z.object({
  brandCorePurpose: z.string().min(10, "Brand's core purpose must be at least 10 characters.").describe("The brand's fundamental reason for existence beyond making money."),
  customerValueProposition: z.string().min(10, "Customer value proposition must be at least 10 characters.").describe("The main value or benefit customers receive from the brand."),
  focusedProductService: z.string().optional().describe("The specific product or service the brand is currently emphasizing."),
  priorityPlatforms: z.object({
    instagram: z.boolean().optional(),
    facebook: z.boolean().optional(),
    linkedin: z.boolean().optional(),
    twitter: z.boolean().optional().describe("X (formerly Twitter)"),
    pinterest: z.boolean().optional(),
    youtube: z.boolean().optional(),
    tiktok: z.boolean().optional(),
    companyBlog: z.boolean().optional(),
  }).optional().describe("Which social media platforms are a priority."),
  campaignPeriods: z.string().optional().describe("Information about specific campaign periods and their date ranges."),
  frequentlyAskedQuestions: z.string().optional().describe("Frequently asked questions about the brand/products and their answers."),
  desiredUserEmotion: z.string().optional().describe("The primary emotion the brand wants users to feel or associate with the content."),
  competitorInspirations: z.string().optional().describe("Examples of competitor content the brand likes, and why."),
  additionalStrategicInfo: z.string().optional().describe("Any other strategic information relevant for content generation."),
  brandKeywords: z.string().optional().describe("Comma-separated brand keywords or key phrases."),
  thingsToAvoid: z.string().optional().describe("Specific tones, topics, or words the AI should avoid."),
  uniqueSellingPropositions: z.string().optional().describe("What makes the brand/product unique compared to competitors."),
  contentRequest: z.string().min(10, "Content request must be at least 10 characters.").describe('Specific request for the type of content needed (e.g., "5 Instagram post ideas about our new product", "A blog post outline for sustainability in tech").'),
});

export type GenerateMarketingContentInput = z.infer<typeof GenerateMarketingContentInputSchema>;

const GenerateMarketingContentOutputSchema = z.object({
  contentSuggestions: z.array(z.string()).describe('Array of content suggestions.'),
});

export type GenerateMarketingContentOutput = z.infer<typeof GenerateMarketingContentOutputSchema>;

export async function generateMarketingContent(input: GenerateMarketingContentInput): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

const generateMarketingContentPrompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  model: getConfiguredModelIdentifier(),
  input: {schema: GenerateMarketingContentInputSchema},
  output: {schema: GenerateMarketingContentOutputSchema},
  prompt: `You are an AI marketing assistant. Your task is to generate content suggestions based on the following strategic brand briefing.

  Brand's Core Purpose:
  {{{brandCorePurpose}}}

  Main Value Offered to Customers:
  {{{customerValueProposition}}}

  {{#if focusedProductService}}
  Current Product/Service Focus:
  {{{focusedProductService}}}
  {{/if}}

  {{#if priorityPlatforms}}
  Priority Social Media Platforms:
  {{#if priorityPlatforms.instagram}}Instagram {{/if}}
  {{#if priorityPlatforms.facebook}}Facebook {{/if}}
  {{#if priorityPlatforms.linkedin}}LinkedIn {{/if}}
  {{#if priorityPlatforms.twitter}}X (Twitter) {{/if}}
  {{#if priorityPlatforms.pinterest}}Pinterest {{/if}}
  {{#if priorityPlatforms.youtube}}YouTube {{/if}}
  {{#if priorityPlatforms.tiktok}}TikTok {{/if}}
  {{#if priorityPlatforms.companyBlog}}Company Blog {{/if}}
  (Note: If no platforms are listed here, consider general applicability or common platforms based on the content request.)
  {{/if}}

  {{#if campaignPeriods}}
  Campaign Periods / Date Ranges:
  {{{campaignPeriods}}}
  {{/if}}

  {{#if frequentlyAskedQuestions}}
  Frequently Asked Questions & Answers:
  {{{frequentlyAskedQuestions}}}
  {{/if}}

  {{#if desiredUserEmotion}}
  Desired User Emotion to Evoke:
  {{{desiredUserEmotion}}}
  {{/if}}

  {{#if competitorInspirations}}
  Competitor Content Inspirations (and why they are liked):
  {{{competitorInspirations}}}
  {{/if}}

  {{#if additionalStrategicInfo}}
  Additional Strategic Information (General):
  {{{additionalStrategicInfo}}}
  {{/if}}

  {{#if brandKeywords}}
  Brand Keywords:
  {{{brandKeywords}}}
  {{/if}}

  {{#if thingsToAvoid}}
  Things to Avoid (Tone/Topic/Words):
  {{{thingsToAvoid}}}
  {{/if}}

  {{#if uniqueSellingPropositions}}
  Unique Selling Propositions (USPs):
  {{{uniqueSellingPropositions}}}
  {{/if}}

  Based on ALL the strategic information provided above, please generate content suggestions for the following specific request:
  Content Request: {{{contentRequest}}}

  Ensure your suggestions are engaging, relevant to the brand's strategy and target audience, and tailored to the content request. Return an array of strings.
  If some strategic information seems missing or insufficient for a highly targeted suggestion, use your best judgment to provide helpful, more general suggestions that still align with the provided details.
  Focus on creativity and actionable ideas.`,
});

const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await generateMarketingContentPrompt(input);
    return output!;
  }
);

