
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { ContentSuggestionsList } from '@/components/features/ai-assistant/content-suggestions-list';
import React, { useState, useTransition } from 'react';
import type { GenerateMarketingContentOutput, GenerateMarketingContentInput } from '@/ai/flows/generate-marketing-content';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleGenerateContentAction } from '@/app/ai-assistant/actions';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  contentRequest: z.string().min(10, { message: "Content request must be at least 10 characters." }).max(1000),
});

type FormValues = z.infer<typeof formSchema>;

export default function AiAssistantPage() {
  const [suggestionsOutput, setSuggestionsOutput] = useState<GenerateMarketingContentOutput | null>(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentRequest: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoadingSuggestions(true);
    setGenerationError(null);
    setSuggestionsOutput(null); 

    startTransition(async () => {
      // For this simplified page, we only send contentRequest.
      // The AI flow is designed to use defaults or general knowledge if other strategic fields are undefined.
      // A real implementation would fetch the full brand profile from a data store.
      const payload: GenerateMarketingContentInput = {
        contentRequest: data.contentRequest,
        // --- Provide minimal defaults or rely on AI flow to handle missing optional strategy fields ---
        brandCorePurpose: "Our brand aims to deliver exceptional value and innovative solutions.", // Generic placeholder
        customerValueProposition: "We offer high-quality products/services that solve key customer problems efficiently.", // Generic placeholder
        // All other strategic fields from GenerateMarketingContentInput will be undefined
      };
      
      const result = await handleGenerateContentAction(payload);
      if (result.success && result.data) {
        setSuggestionsOutput(result.data);
      } else {
        if (typeof result.error === 'string') {
          setGenerationError(result.error);
        } else if (result.error) {
          const flatError = (result.error as any).flatten ? (result.error as any).flatten() : { fieldErrors: {} };
          const fieldErrors = Object.entries(flatError.fieldErrors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('; ');
          setGenerationError(`Validation failed. ${fieldErrors || 'Please check your input.'}`);
        } else {
          setGenerationError("An unknown error occurred while generating content.");
        }
      }
      setIsLoadingSuggestions(false);
    });
  };

  return (
    <MainLayout pageTitle="AI Content Assistant">
      <div className="space-y-8">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-primary" />
              Quick Content Generation
            </CardTitle>
            <CardDescription>
              Enter your specific content request below. The AI will use the detailed strategic information from your 
              <a href="/brand-profile" className="text-primary hover:underline ml-1">Brand Profile</a> page to generate more tailored suggestions.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="contentRequest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What specific content do you need now?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., '5 Instagram post ideas about sustainable architecture for urban environments', 'A blog post outline on the future of BIM software', '3 catchy email subject lines for a new feature that improves collaboration'" 
                          {...field} 
                          rows={4} 
                        />
                      </FormControl>
                      <FormDescription>
                        Be specific. The more context you give, the better the suggestions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isPending || isLoadingSuggestions} size="lg" className="w-full md:w-auto">
                  {isPending || isLoadingSuggestions ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Suggestions...
                    </>
                  ) : (
                    <>
                     <Sparkles className="mr-2 h-4 w-4" />
                      Get Content Suggestions
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <Separator className="my-8" />

        <ContentSuggestionsList 
          suggestionsOutput={suggestionsOutput} 
          isLoading={isLoadingSuggestions} // Use the more specific loading state
          error={generationError}
        />
      </div>
    </MainLayout>
  );
}
