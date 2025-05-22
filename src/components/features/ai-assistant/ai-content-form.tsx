
"use client";

import type { GenerateMarketingContentInput, GenerateMarketingContentOutput } from '@/ai/flows/generate-marketing-content';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { handleGenerateContentAction } from '@/app/ai-assistant/actions';
import React, { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from '@/components/ui/separator';

// Schema for form validation, mirroring GenerateMarketingContentInput
const formSchema = z.object({
  brandCorePurpose: z.string().min(10, { message: "Brand's core purpose must be at least 10 characters." }).max(2000),
  customerValueProposition: z.string().min(10, { message: "Customer value proposition must be at least 10 characters." }).max(2000),
  focusedProductService: z.string().max(500).optional(),
  priorityPlatforms: z.object({
    instagram: z.boolean().optional().default(false),
    facebook: z.boolean().optional().default(false),
    linkedin: z.boolean().optional().default(false),
    twitter: z.boolean().optional().default(false),
    pinterest: z.boolean().optional().default(false),
    youtube: z.boolean().optional().default(false),
    tiktok: z.boolean().optional().default(false),
    companyBlog: z.boolean().optional().default(false),
  }).optional(),
  campaignPeriods: z.string().max(1000).optional(),
  frequentlyAskedQuestions: z.string().max(3000).optional(),
  desiredUserEmotion: z.string().max(500).optional(),
  competitorInspirations: z.string().max(2000).optional(),
  additionalStrategicInfo: z.string().max(2000).optional(),
  brandKeywords: z.string().max(1000).optional().describe("Comma-separated brand keywords or key phrases."),
  thingsToAvoid: z.string().max(1000).optional().describe("Specific tones, topics, or words the AI should avoid."),
  uniqueSellingPropositions: z.string().max(1000).optional().describe("What makes the brand/product unique compared to competitors."),
  contentRequest: z.string().min(10, { message: "Content request must be at least 10 characters." }).max(500),
});

type FormValues = z.infer<typeof formSchema>;

const platformOptions = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'X (Twitter)' },
  { id: 'pinterest', label: 'Pinterest' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'companyBlog', label: 'Company Blog' },
] as const;


interface AiContentFormProps {
  onContentGenerated: (data: GenerateMarketingContentOutput) => void;
  setIsLoadingSuggestions: (isLoading: boolean) => void;
  setGenerationError: (error: string | null) => void;
}

export function AiContentForm({ onContentGenerated, setIsLoadingSuggestions, setGenerationError }: AiContentFormProps) {
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandCorePurpose: "",
      customerValueProposition: "",
      focusedProductService: "",
      priorityPlatforms: {
        instagram: false,
        facebook: false,
        linkedin: false,
        twitter: false,
        pinterest: false,
        youtube: false,
        tiktok: false,
        companyBlog: false,
      },
      campaignPeriods: "",
      frequentlyAskedQuestions: "",
      desiredUserEmotion: "",
      competitorInspirations: "",
      additionalStrategicInfo: "",
      brandKeywords: "",
      thingsToAvoid: "",
      uniqueSellingPropositions: "",
      contentRequest: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoadingSuggestions(true);
    setGenerationError(null);
    startTransition(async () => {
      const payload: GenerateMarketingContentInput = {
        ...data,
        focusedProductService: data.focusedProductService || undefined,
        campaignPeriods: data.campaignPeriods || undefined,
        frequentlyAskedQuestions: data.frequentlyAskedQuestions || undefined,
        desiredUserEmotion: data.desiredUserEmotion || undefined,
        competitorInspirations: data.competitorInspirations || undefined,
        additionalStrategicInfo: data.additionalStrategicInfo || undefined,
        brandKeywords: data.brandKeywords || undefined,
        thingsToAvoid: data.thingsToAvoid || undefined,
        uniqueSellingPropositions: data.uniqueSellingPropositions || undefined,
        priorityPlatforms: data.priorityPlatforms 
      };
      const result = await handleGenerateContentAction(payload);
      if (result.success && result.data) {
        onContentGenerated(result.data);
      } else {
        if (typeof result.error === 'string') {
          setGenerationError(result.error);
        } else if (result.error) { 
          // ZodError handling
          const fieldErrors = Object.entries(result.error.flatten().fieldErrors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('; ');
          setGenerationError(`Validation failed. Please check the form fields. ${fieldErrors || ''}`);
        } else {
          setGenerationError("An unknown error occurred.");
        }
      }
      setIsLoadingSuggestions(false);
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Briefing Form (Strategic Information)</CardTitle>
        <CardDescription>
          Critical questions for the AI to understand your strategy. Fill this out to get tailored content suggestions.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="brandCorePurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your brand's core purpose?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., To empower architects and designers with intuitive software..." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerValueProposition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is the main value you offer to customers?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., We provide a user-friendly yet highly capable architecture design suite..." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="focusedProductService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What product/service are you focusing on right now? (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ArchX Pro Suite v2.0, Our new integrated design software" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Which social media platforms are your priority? (Optional)</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                {platformOptions.map((platform) => (
                  <FormField
                    key={platform.id}
                    control={form.control}
                    name={`priorityPlatforms.${platform.id}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {platform.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="campaignPeriods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have campaign periods? If so, what are the date ranges? (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., New version launch (Oct-Nov), Pre-Summer sale (May 15-30)" {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequentlyAskedQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are the frequently asked questions (and their answers)? (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Q: What are the system requirements for ArchX Pro? A: Our new generation ..." {...field} rows={4} />
                  </FormControl>
                  <FormDescription>This helps in creating informative content and addressing customer queries proactively.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredUserEmotion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What emotion do you want the user to experience? (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Empowered, Confident, Inspired, Curious, Reassured" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="competitorInspirations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Examples of competitor content you like (and why)? (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Autodesk's 'Tips and Tricks' video series on YouTube. SketchUp's user stories on Instagram." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="additionalStrategicInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Strategic Information (General - Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any other general details relevant to your content strategy..." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Separator className="my-4"/>
            <p className="text-sm text-muted-foreground">Additional details to help AI generate even more specialized content:</p>

            <FormField
              control={form.control}
              name="brandKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Keywords (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., sustainable fashion, ethical sourcing, eco-friendly, AI marketing, content strategy" {...field} rows={2} />
                  </FormControl>
                  <FormDescription>Comma-separated important keywords or key phrases related to your brand.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thingsToAvoid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Things to Avoid (Tone/Topic/Words - Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Avoid overly technical jargon, don't mention specific past controversies, no negative comments about competitors" {...field} rows={3} />
                  </FormControl>
                  <FormDescription>Specific tones, topics, or words the AI should avoid using.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uniqueSellingPropositions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unique Selling Propositions (USPs - Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Patented technology, 24/7 customer support, Made from 100% recycled materials" {...field} rows={3} />
                  </FormControl>
                  <FormDescription>What makes your brand/product unique compared to competitors?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4"/>

            <FormField
              control={form.control}
              name="contentRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What specific content do you need now?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 3 catchy email subject lines for a new product launch, 5 engaging Instagram post ideas about sustainability" {...field} rows={3} />
                  </FormControl>
                  <FormDescription>
                    Be specific about the type and topic of content. This is what the AI will generate based on the strategy above.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Suggestions...
                </>
              ) : (
                "Get Content Suggestions"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
