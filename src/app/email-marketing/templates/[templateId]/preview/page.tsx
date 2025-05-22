
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
<<<<<<< HEAD
import { ArrowLeft, Edit, Eye, Loader2, AlertTriangle, Facebook, Instagram, Linkedin, Twitter as TwitterIcon } from 'lucide-react';
=======
import { ArrowLeft, Edit, Loader2, AlertTriangle } from 'lucide-react'; // Added AlertTriangle
>>>>>>> MeastroMerketReactMailProblem
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data';
import React, { useEffect, useState, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
<<<<<<< HEAD
// import { render } from 'react-email'; // Temporarily commented out
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { GenericBrandEmail } from '@/emails/GenericBrandEmail'; // Temporarily commented out


// Placeholder for brand data that would come from a profile or global state
const mockBrand = {
  companyName: "ArchStruct Design Suite",
  logoPlaceholderText: "ArchStruct",
  address: "123 Innovation Drive, Tech City, CA 90210",
  websiteUrl: "https://www.archstructsuite.com",
  primaryColor: "#007BFF", 
  textColor: "#333333",    
  accentColor: "#FF8C00", 
  footerLinkColor: "#0056b3", 
  socialLinks: {
    facebook: "https://facebook.com/archstruct",
    instagram: "https://instagram.com/archstruct",
    twitter: "https://twitter.com/archstruct",
    linkedin: "https://linkedin.com/company/archstruct",
  },
  product: "ArchModeler Pro",
  targetAudience: "architects and structural engineers",
  corePurpose: "to empower design and engineering professionals with intuitive, powerful, and integrated software tools"
};

interface MockEmailTextContent {
  subject: string;
  preheader?: string;
  greeting?: string;
  body: string;
  ctaText?: string;
  offer?: string;
}

// Simplified mock content generation
function generateMockEmailContent(templateCategory: string, brand: typeof mockBrand): MockEmailTextContent {
  const { companyName, product, targetAudience } = brand;
  let subject = `An Update from ${companyName}`;
  let preheader = `News for ${targetAudience}.`;
  let greeting = `Hi [User Name],`;
  let body = `This is a general update regarding ${product}.`;
  let ctaText = 'Learn More';

  switch (templateCategory?.toLowerCase()) {
    case 'welcome':
      subject = `Welcome to ${companyName}!`;
      preheader = `Get started with ${product}.`;
      body = `We're thrilled to have you!\n\nExplore how ${product} helps ${targetAudience}.`;
      ctaText = 'Get Started';
      break;
    case 'promotion':
    case 'sales':
    case 'product promotion / launch email':
      subject = `Special Offer on ${product}!`;
      preheader = `Exclusive discounts for ${targetAudience}.`;
      body = `Don't miss our limited-time offer on ${product}.\n\nEnhance your workflow today!`;
      ctaText = 'Claim Discount';
      break;
    case 'newsletter':
      subject = `${companyName} Monthly Insights`;
      preheader = `Latest news and tips.`;
      body = `Here's your monthly update from ${companyName}, covering:\n- New features in ${product}\n- Industry news for ${targetAudience}\n- Upcoming events`;
      ctaText = 'Read Newsletter';
      break;
    // Add more cases as needed based on your template categories
    default:
      subject = `A Message from ${companyName} about ${product || 'our services'}`;
      preheader = `Updates and information.`;
      body = `Stay informed with the latest from ${companyName}.`;
      ctaText = 'Discover More';
      break;
  }
  return { subject, preheader, greeting, body, ctaText };
}


=======
// import { render } from 'react-email'; // REMOVED: Assuming react-email is installed
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// Assuming GenericBrandEmail will be created in src/emails/
// For now, we comment it out until the file is created and react-email issues are resolved
// import { GenericBrandEmail } from '@/emails/GenericBrandEmail'; 


>>>>>>> MeastroMerketReactMailProblem
export default function TemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = typeof params.templateId === 'string' ? params.templateId : undefined;
  
  const [template, setTemplate] = useState<EmailTemplate | null | undefined>(undefined);
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true);
  // const [emailHtml, setEmailHtml] = useState<string | null>(null); // Temporarily commented out
=======
  // const [emailHtml, setEmailHtml] = useState<string | null>(null); // REMOVED for now
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);
>>>>>>> MeastroMerketReactMailProblem



  useEffect(() => {
    setIsLoading(true);
    if (templateId) {
      const foundTemplate = mockTemplates.find(t => t.id === templateId);
      setTemplate(foundTemplate || null);
      setIsLoadingPreview(false); // Moved here, as we are not generating HTML for now
    } else {
      setTemplate(null);
    }
    setIsLoading(false);
  }, [templateId]);

<<<<<<< HEAD
  // Temporarily comment out react-email rendering logic
  /*
  useEffect(() => {
    if (template && emailTextContent) {
      try {
        // const html = render(
        //   <GenericBrandEmail 
        //     brandData={mockBrand} 
        //     emailContent={emailTextContent} 
        //     templateCategory={template.category} 
        //   />
        // );
        // setEmailHtml(html);
        setEmailHtml("<p>React-email rendering temporarily disabled.</p>"); // Placeholder
      } catch (error) {
        console.error("Error rendering email with react-email:", error);
        setEmailHtml("<p>Error rendering email preview. Check console.</p>");
      }
    } else {
      setEmailHtml(null);
    }
  }, [template, emailTextContent]);
  */
=======
  // REMOVED HTML rendering logic for now
  // useEffect(() => {
  //   if (template && emailTextContent) {
  //     try {
  //       const html = render(<GenericBrandEmail brandData={mockBrand} emailContent={emailTextContent} templateCategory={template.category} />);
  //       setEmailHtml(html);
  //     } catch (error) {
  //       console.error("Error rendering email template with react-email:", error);
  //       setEmailHtml("<p>Error rendering email preview.</p>");
  //     }
  //     setIsLoadingPreview(false);
  //   } else if (template === null) { 
  //       setIsLoadingPreview(false);
  //   }
  // }, [template, emailTextContent]);

>>>>>>> MeastroMerketReactMailProblem

  const handleUseThisTemplate = () => {
    if (!template) return;
    // This navigation will be updated once the custom renderer is in place
    // For now, it might lead to a page expecting the custom renderer setup
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
              <CardTitle className="text-2xl text-destructive">Template Not Found</CardTitle>
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
  
<<<<<<< HEAD
=======
  // Simplified preview showing metadata
>>>>>>> MeastroMerketReactMailProblem
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
                 <Button onClick={handleUseThisTemplate} className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                    <Edit className="mr-2 h-4 w-4" /> Use This Template
                </Button>
            </div>
        </div>

<<<<<<< HEAD
        <Separator />
        
        <Card className="shadow-lg overflow-hidden">
            <CardHeader>
                <CardTitle className="text-xl">Template Preview (Static)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex justify-center items-center h-[300px] bg-muted rounded-md">
                 <Image
                    src={template.thumbnailUrl || "https://placehold.co/600x400.png"}
                    alt={`${template.name} thumbnail`}
                    width={500}
                    height={375}
                    className="object-contain border rounded-sm"
                    data-ai-hint={template.dataAiHint || "email template"}
                  />
                </div>
                 {emailTextContent && (
                    <div className="mt-4 p-4 border rounded-md bg-background">
                        <h3 className="font-semibold text-lg">Mock Content:</h3>
                        <p><strong>Subject:</strong> {emailTextContent.subject}</p>
                        <p><strong>Preheader:</strong> {emailTextContent.preheader}</p>
                        <p className="mt-2 whitespace-pre-line"><strong>Body:</strong><br />{emailTextContent.greeting}<br /><br />{emailTextContent.body}</p>
                        {emailTextContent.ctaText && <p className="mt-2"><strong>CTA:</strong> {emailTextContent.ctaText}</p>}
                    </div>
                )}
            </CardContent>
=======
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{template.name}</CardTitle>
            <CardDescription>Category: <span className="font-semibold">{template.category}</span></CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Template Description</h3>
              <p className="text-muted-foreground">{template.description}</p>
            </div>
            {template.thumbnailUrl && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Thumbnail</h3>
                <Image 
                  src={template.thumbnailUrl} 
                  alt={`${template.name} thumbnail`} 
                  width={400} 
                  height={300} 
                  className="rounded-md border object-contain"
                  data-ai-hint={template.dataAiHint}
                />
              </div>
            )}
            <Separator />
             <Alert variant="default" className="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                <AlertTriangle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-700 dark:text-blue-300">Preview Note</AlertTitle>
                <AlertDescription className="text-blue-600 dark:text-blue-400">
                    This is a basic preview showing template metadata. Full HTML email rendering using the planned custom email rendering system will be implemented once all necessary components are provided.
                </AlertDescription>
            </Alert>
          </CardContent>
>>>>>>> MeastroMerketReactMailProblem
        </Card>

        <Alert variant="default" className="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
            <AlertTriangle className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-700 dark:text-blue-300">Preview Note</AlertTitle>
            <AlertDescription className="text-blue-600 dark:text-blue-400">
                This is a basic preview showing template metadata. Full HTML email rendering using react-email will be re-integrated once dependency issues are resolved.
            </AlertDescription>
        </Alert>
      </div>
    </MainLayout>
  );
}
