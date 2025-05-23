
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Loader2, AlertTriangle, Eye, Link as LinkIconLucide } from 'lucide-react'; // Added Eye and LinkIconLucide
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data';
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

// This mockBrand and generateMockEmailContent were previously used for a more dynamic preview.
// Keeping them here (commented out or simplified) in case we successfully re-integrate react-email or a custom renderer.
/*
const mockBrand = {
  companyName: "ArchStruct Design Suite",
  logoPlaceholderText: "ArchStruct",
  address: "123 Innovation Drive, Tech City, CA 90210",
  websiteUrl: "https://www.archstructsuite.com",
  primaryColor: "#007BFF", // A nice blue
  textColor: "#333333",    // Dark grey for text
  accentColor: "#FF8C00",  // A warm orange
  footerLinkColor: "#0056b3", // A slightly darker blue for links
  socialLinks: {
    facebook: "https://facebook.com/archstruct",
    instagram: "https://instagram.com/archstruct",
    twitter: "https://twitter.com/archstruct",
    linkedin: "https://linkedin.com/company/archstruct",
  },
};

interface EmailTextContent {
  subject: string;
  preheader?: string;
  greeting?: string;
  body: string;
  ctaText?: string;
  offer?: string;
}

function generateMockEmailContent(templateCategory: string | undefined, brand: typeof mockBrand): EmailTextContent {
  // ... (implementation as provided before, or a simplified version) ...
  // For now, let's return very basic content to avoid complexity until react-email is stable
  return {
    subject: `Subject for ${templateCategory || 'Generic'} Email`,
    preheader: `This is a preheader for the ${templateCategory || 'generic'} email.`,
    greeting: `Hi [User Name],`,
    body: `This is the main body content for a ${templateCategory || 'generic'} email from ${brand.companyName}.\n\nWe hope you find this useful.`,
    ctaText: "Learn More",
  };
}
*/

export default function TemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = typeof params.templateId === 'string' ? params.templateId : undefined;

  const [template, setTemplate] = useState<EmailTemplate | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  // const [emailHtml, setEmailHtml] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    // setEmailHtml(null); // Reset email HTML when templateId changes
    if (templateId) {
      const foundTemplate = mockTemplates.find(t => t.id === templateId);
      setTemplate(foundTemplate || null);
      /*
      // This part is commented out as we are not using react-email or custom renderer for now
      if (foundTemplate) {
        const emailContent = generateMockEmailContent(foundTemplate.category, mockBrand);
        // const html = render(<GenericBrandEmail brandData={mockBrand} emailContent={emailContent} templateCategory={foundTemplate.category} />);
        // setEmailHtml(html);
      }
      */
    } else {
      setTemplate(null);
    }
    setIsLoading(false);
  }, [templateId]);

  const handleUseThisTemplate = () => {
    if (!template) return;
    // This navigation logic is kept from when the "Use Template" dialog was directly on this page.
    // It should now be handled by the templates listing page.
    // For now, this button will just redirect back to the create campaign page with templateId.
    router.push(`/email-marketing/campaigns/create?templateId=${template.id}&campaignName=${encodeURIComponent(`Campaign using ${template.name}`)}`);
  };

  if (isLoading || template === undefined) {
    return (
      <MainLayout pageTitle="Loading Template Preview...">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Fetching template details...</p>
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

  // Simplified preview showing metadata
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
            <Button onClick={handleUseThisTemplate} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" /> Use This Template
            </Button>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Template Thumbnail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {template.thumbnailUrl && (
              <div className="mt-4">
                <Image
                  src={template.thumbnailUrl}
                  alt={`${template.name} thumbnail`}
                  width={600}
                  height={450}
                  className="rounded-md border object-contain mx-auto"
                  data-ai-hint={template.dataAiHint || "email template"}
                />
              </div>
            )}
            <Separator />
            <Alert variant="default" className="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                <AlertTriangle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-700 dark:text-blue-300">Preview Note</AlertTitle>
                <AlertDescription className="text-blue-600 dark:text-blue-400">
                    This is a basic preview showing template metadata. Full HTML email rendering using react-email will be re-integrated once dependency issues are resolved.
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
