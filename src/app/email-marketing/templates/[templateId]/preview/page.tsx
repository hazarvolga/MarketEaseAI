
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Loader2, AlertTriangle, Eye, ExternalLink } from 'lucide-react'; 
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function TemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = typeof params.templateId === 'string' ? params.templateId : undefined;

  const [template, setTemplate] = useState<EmailTemplate | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [emailHtml, setEmailHtml] = useState<string | null>(null);
  const [htmlRenderingError, setHtmlRenderingError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchTemplateAndRender() {
      setIsLoading(true);
      setHtmlRenderingError(null);
      setEmailHtml(null);

      if (!templateId) {
        setTemplate(null);
        setIsLoading(false);
        return;
      }

      const foundTemplate = mockTemplates.find(t => t.id === templateId);
      setTemplate(foundTemplate || null);

      if (foundTemplate) {
        try {
          const response = await fetch(`/api/email-preview?templateId=${templateId}`);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch email HTML: ${response.status} ${errorText}`);
          }
          const html = await response.text();
          setEmailHtml(html);
        } catch (error) {
          console.error("Error fetching or rendering email HTML:", error);
          setHtmlRenderingError(error instanceof Error ? error.message : String(error));
        }
      }
      setIsLoading(false);
    }

    fetchTemplateAndRender();
  }, [templateId]);

  const handleUseThisTemplate = () => {
    if (!template) return;
    router.push(`/email-marketing/campaigns/create?templateId=${template.id}&campaignName=${encodeURIComponent(`Campaign using ${template.name}`)}`);
  };

  if (isLoading || template === undefined) {
    return (
      <MainLayout pageTitle="Loading Template Preview...">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Fetching template details and preview...</p>
        </div>
      </MainLayout>
    );
  }

  if (template === null) {
    return (
      <MainLayout pageTitle="Template Not Found">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
          <Card className="w-full max-w-md p-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-destructive flex items-center">
                <AlertTriangle className="mr-2 h-6 w-6" /> Template Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The email template you are looking for (ID: {templateId || 'N/A'}) could not be found.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/email-marketing/templates">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout pageTitle={`Preview: ${template.name}`}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-grow">
            <Button variant="outline" asChild className="mb-2 sm:mb-0">
              <Link href="/email-marketing/templates">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
              </Link>
            </Button>
            <CardHeader className="px-0 pb-2 pt-3">
              <CardTitle className="text-2xl">{template.name}</CardTitle>
            </CardHeader>
            <p className="text-sm text-muted-foreground px-0">
              <span className="font-semibold text-foreground">Category:</span> {template.category}
            </p>
            <p className="text-sm text-muted-foreground px-0 mt-1">
              <span className="font-semibold text-foreground">Purpose:</span> {template.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-center mt-2 sm:mt-0">
            <Button 
              variant="outline" 
              onClick={() => window.open(`/api/email-preview?templateId=${template.id}`, '_blank')}
              disabled={!emailHtml || !!htmlRenderingError}
            >
              <ExternalLink className="mr-2 h-4 w-4" /> Open HTML in New Tab
            </Button>
            <Button onClick={handleUseThisTemplate} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" /> Use This Template
            </Button>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Eye className="mr-2 h-5 w-5 text-primary" /> Email HTML Preview
            </CardTitle>
            <CardDescription>
              This is a rendered HTML preview of your email template.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {htmlRenderingError && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error Rendering Preview</AlertTitle>
                    <AlertDescription>{htmlRenderingError}</AlertDescription>
                </Alert>
            )}
            {isLoading && !emailHtml && !htmlRenderingError && (
                 <div className="w-full min-h-[400px] bg-muted rounded-md flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2 text-muted-foreground">Loading HTML preview...</p>
                </div>
            )}
            {emailHtml && !htmlRenderingError && (
              <iframe
                srcDoc={emailHtml}
                title={`${template.name} Preview`}
                className="w-full h-[600px] border rounded-md bg-white"
                sandbox="allow-same-origin" // Restrict iframe capabilities for security
              />
            )}
             {!isLoading && !emailHtml && !htmlRenderingError && (
                 <div className="w-full min-h-[400px] bg-muted rounded-md flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    <p className="ml-2 text-muted-foreground">Could not load HTML preview.</p>
                </div>
            )}
            <Alert variant="default" className="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                <AlertTriangle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-700 dark:text-blue-300">Preview Note</AlertTitle>
                <AlertDescription className="text-blue-600 dark:text-blue-400">
                    This preview is rendered in an iframe. For the most accurate representation, always send a test email to different email clients. Some styles might appear differently here than in an actual email client.
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
