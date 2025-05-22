"use client";

import type { GenerateMarketingContentOutput } from '@/ai/flows/generate-marketing-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Copy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ContentSuggestionsListProps {
  suggestionsOutput: GenerateMarketingContentOutput | null;
  isLoading: boolean;
  error: string | null;
}

export function ContentSuggestionsList({ suggestionsOutput, isLoading, error }: ContentSuggestionsListProps) {
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Content suggestion copied successfully.",
        variant: "default",
        duration: 3000,
      });
    }).catch(err => {
      toast({
        title: "Copy failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
        duration: 3000,
      });
      console.error('Failed to copy text: ', err);
    });
  };

  if (isLoading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center text-center p-10 border border-dashed rounded-lg">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold text-foreground">Generating brilliant ideas...</p>
        <p className="text-sm text-muted-foreground">Our AI is hard at work. This might take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Error Generating Content</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!suggestionsOutput || suggestionsOutput.contentSuggestions.length === 0) {
    return (
       <div className="mt-8 text-center p-10 border border-dashed rounded-lg">
        <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-semibold text-foreground">No suggestions yet.</p>
        <p className="text-sm text-muted-foreground">Fill out the form above to generate content ideas.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">Generated Suggestions</h2>
      {suggestionsOutput.contentSuggestions.map((suggestion, index) => (
        <Card key={index} className="shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start gap-4">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap flex-1">{suggestion}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(suggestion)}
                className="shrink-0"
                aria-label="Copy suggestion"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
