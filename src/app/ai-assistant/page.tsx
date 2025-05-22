
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { AiContentForm } from '@/components/features/ai-assistant/ai-content-form';
import { ContentSuggestionsList } from '@/components/features/ai-assistant/content-suggestions-list';
import React, { useState } from 'react';
import type { GenerateMarketingContentOutput } from '@/ai/flows/generate-marketing-content';
import { Separator } from '@/components/ui/separator';

export default function AiAssistantPage() {
  const [suggestionsOutput, setSuggestionsOutput] = useState<GenerateMarketingContentOutput | null>(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);


  const handleContentGenerated = (data: GenerateMarketingContentOutput) => {
    setSuggestionsOutput(data);
    setGenerationError(null); // Clear previous errors
  };

  return (
    <MainLayout pageTitle="AI Strategic Briefing & Content Generation">
      <div className="space-y-8">
        <AiContentForm 
          onContentGenerated={handleContentGenerated} 
          setIsLoadingSuggestions={setIsLoadingSuggestions}
          setGenerationError={setGenerationError}
        />
        
        <Separator className="my-8" />

        <ContentSuggestionsList 
          suggestionsOutput={suggestionsOutput} 
          isLoading={isLoadingSuggestions}
          error={generationError}
        />
      </div>
    </MainLayout>
  );
}
