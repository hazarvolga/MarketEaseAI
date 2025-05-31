
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Loader2, AlertTriangle, Eye } from 'lucide-react'; 
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data';
import React, { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { render } from 'react-email';
import { GenericBrandEmail } from '@/emails/GenericBrandEmail';

// Mock brand data - this would typically come from a global state or backend
const mockBrand = {
  companyName: "ArchStruct Design Suite",
  logoPlaceholderText: "ArchStruct",
  logoUrl: "https://placehold.co/150x50/007BFF/FFFFFF?text=ArchStruct", // Added a placeholder logo URL
  address: "123 Innovation Drive, Tech City, CA 90210, USA",
  websiteUrl: "https://www.archstructsuite.com",
  primaryColor: "#007BFF", // Example: A vibrant blue
  textColor: "#333333",    // Example: Dark grey for text
  accentColor: "#FF8C00",  // Example: A warm orange for CTAs
  footerLinkColor: "#0056b3", // Example: A darker blue for footer links
  socialLinks: {
    facebook: "https://facebook.com/archstruct",
    instagram: "https://instagram.com/archstruct",
    twitter: "https://twitter.com/archstruct",
    linkedin: "https://linkedin.com/company/archstruct",
  },
};

// Mock email text content generation (simplified)
interface EmailTextContent {
  subject: string;
  preheader?: string;
  greeting?: string;
  body: string;
  ctaText?: string;
  offer?: string;
}

function generateMockEmailContent(templateCategory: string, brand: typeof mockBrand): EmailTextContent {
  const { companyName } = brand;
  const product = "our innovative solutions"; // Simplified for this example
  const targetAudience = "valued members"; // Simplified

  let subject = `An Update from ${companyName}`;
  let preheader = `News for ${targetAudience}.`;
  let greeting = `Hi there,`;
  let body = `This is a general update regarding ${product}.\n\nWe aim to empower professionals like you with our cutting-edge tools and resources.\n\nExplore our latest offerings and see how we can help you achieve more.`;
  let ctaText = 'Learn More';
  let offer;

  switch (templateCategory?.toLowerCase()) {
    case 'welcome':
      subject = `Welcome to ${companyName}!`;
      preheader = `Get started with ${product}.`;
      greeting = `Welcome, New Member!`;
      body = `We're thrilled to have you! Explore how ${product} helps professionals like you achieve more.\n\nHere are some next steps:\n- Explore your dashboard\n- Check out our tutorials\n- Join our community forum`;
      ctaText = 'Get Started';
      break;
    case 'promotion':
    case 'sales':
      subject = `Special Offer on ${product}!`;
      preheader = `Exclusive discounts for ${targetAudience}.`;
      body = `Don't miss our limited-time offer on ${product}. Enhance your workflow today and save big! We're committed to providing you with the best tools.`;
      offer = "Get 25% OFF - Use code SAVE25";
      ctaText = 'Claim Discount Now';
      break;
    case 'newsletter':
      subject = `${companyName} Monthly Insights`;
      preheader = `Latest news, tips, and updates.`;
      greeting = `Hello,`;
      body = `Here's your monthly update from ${companyName}, covering new features in ${product}, industry news for ${targetAudience}, and helpful tips to maximize your success.`;
      ctaText = 'Read Newsletter';
      break;
    default:
      // Keep generic content
      break;
  }
  return { subject, preheader, greeting, body, ctaText, offer };
}


export default function TemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = typeof params.templateId === 'string' ? params.templateId : undefined;

  const [template, setTemplate] = useState<EmailTemplate | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [emailHtml, setEmailHtml] = useState<string | null>(null);
  const [renderingError, setRenderingError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setEmailHtml(null);
    setRenderingError(null);

    if (templateId) {
      const foundTemplate = mockTemplates.find(t => t.id === templateId);
      setTemplate(foundTemplate || null);
      if (foundTemplate) {
        const emailTextContent = generateMockEmailContent(foundTemplate.category, mockBrand);
        try {
          const renderedHtml = render(
            <GenericBrandEmail 
              brandData={mockBrand} 
              emailContent={emailTextContent} 
              templateCategory={foundTemplate.category} 
            />
          );
          setEmailHtml(renderedHtml);
        } catch (error) {
          console.error("Error rendering email with react-email:", error);
          let message = "Error rendering email preview.";
          if (error instanceof Error) {
            message += ` Details: ${error.message}`;
          }
          setRenderingError(message);
        }
      }
    } else {
      setTemplate(null);
    }
    setIsLoading(false);
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
            <CardTitle className="text-xl flex items-center">
              <Eye className="mr-2 h-5 w-5 text-primary" /> Email Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderingError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Rendering Error</AlertTitle>
                <AlertDescription>{renderingError}</AlertDescription>
              </Alert>
            )}
            {emailHtml && !renderingError && (
              <div 
                className="border rounded-md shadow-inner p-2 bg-white mx-auto max-w-3xl overflow-x-auto"
                style={{ minHeight: '400px' }} // Ensure some height for the preview container
              >
                <iframe 
                  srcDoc={emailHtml}
                  title="Email Preview"
                  className="w-full h-[600px] border-0" // Adjust height as needed
                  sandbox="allow-same-origin" // Basic sandboxing
                />
              </div>
            )}
            {!emailHtml && !renderingError && !isLoading && (
                 <Alert variant="default" className="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                    <AlertTriangle className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700 dark:text-blue-300">Preview Note</AlertTitle>
                    <AlertDescription className="text-blue-600 dark:text-blue-400">
                        Email content could not be loaded or rendered.
                    </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

    