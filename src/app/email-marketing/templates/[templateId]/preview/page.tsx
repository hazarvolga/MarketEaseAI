
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Loader2, AlertTriangle, Eye, Facebook, Instagram, Linkedin as LinkedinIcon, Twitter as TwitterIcon } from 'lucide-react'; 
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data';
import React, { useEffect, useState, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { render } from 'react-email';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GenericBrandEmail } from '@/emails/GenericBrandEmail'; 

// Define a more comprehensive mock brand data structure, similar to what GenericBrandEmail expects
const mockBrand = {
  companyName: "ArchStruct Design Suite",
  logoPlaceholderText: "ArchStruct",
  logoUrl: "", // Optional: "https://placehold.co/150x50/007BFF/FFFFFF?text=ArchStruct",
  address: "123 Innovation Drive, Tech City, CA 90210, USA",
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
  const { companyName, product, targetAudience, corePurpose } = {
    product: "ArchModeler Pro",
    targetAudience: "architects and structural engineers",
    corePurpose: "to empower design and engineering professionals",
    ...brand // Spread brand to get companyName
  };

  let subject = `An Update from ${companyName}`;
  let preheader = `News for ${targetAudience}.`;
  let greeting = `Hi [User Name],`;
  let body = `This is a general update regarding ${product}.\n\nWe aim ${corePurpose}.`;
  let ctaText = 'Learn More';
  let offer: string | undefined = undefined;

  const category = templateCategory?.toLowerCase();

  switch (category) {
    case 'welcome':
      subject = `Welcome to ${companyName}! Your Adventure Begins.`;
      preheader = `Get started with ${product} and discover a new world of possibilities.`;
      greeting = `Hello [User Name],`;
      body = `We're thrilled to have you join the ${companyName} family!\n\nExplore how ${product} can help ${targetAudience} achieve amazing results.\n\nHere are a few things you can do next:\n- Complete your profile\n- Check out our quick start guide\n- Join our community forum`;
      ctaText = 'Explore Your Dashboard';
      break;
    case 'promotion':
    case 'sales':
      subject = `🎉 Special Offer on ${product}! Save Big Today!`;
      preheader = `Don't miss out on exclusive discounts for ${targetAudience}. Limited time only!`;
      body = `Unlock premium features and enhance your workflow with our special limited-time offer on ${product}!\n\nFor a short period, get X% off or access exclusive bundles.`;
      offer = "Get 25% OFF All Plans This Week Only!";
      ctaText = 'Claim Your Discount Now';
      break;
    case 'product launch':
      subject = `🚀 Introducing ${product} v2.0 - The Future of Design!`;
      preheader = `Discover the groundbreaking new features in our latest release.`;
      greeting = `Big News, [User Name]!`;
      body = `The wait is over! ${companyName} is proud to announce the launch of ${product} v2.0, packed with innovative features designed for ${targetAudience}.\n\nExperience:\n- Feature A: [Benefit A]\n- Feature B: [Benefit B]\n- Feature C: [Benefit C]`;
      ctaText = 'Discover What’s New';
      break;
    case 'newsletter':
      subject = `📰 ${companyName} Monthly Insights: [Month] Edition`;
      preheader = `Your update on the latest news, tips, and successes for ${targetAudience}.`;
      body = `Here's your monthly update from ${companyName}, packed with valuable content:\n\n**Featured Article:** [Title of Article]\n[Short summary of article]...\n\n**Quick Tips:**\n- Tip 1 for ${product}\n- Tip 2 for improving workflow\n\n**Community Spotlight:** [Highlight a user or event]`;
      ctaText = 'Read the Full Newsletter';
      break;
    case 'transactional': // Generic transactional
    case 'order confirmation':
      subject = category === 'order confirmation' ? `Your ${companyName} Order Confirmation #[Order ID]` : `Important Update from ${companyName}`;
      preheader = category === 'order confirmation' ? `Thank you for your purchase! Details inside.` : `An important notice regarding your account.`;
      greeting = `Hello [User Name],`;
      body = category === 'order confirmation' ? 
        `Thank you for your order! We've received it and are getting it ready for you.\n\n**Order Summary:**\n- Item 1: Details\n- Item 2: Details\n\nWe'll notify you once it ships.` :
        `This email contains an important update regarding your ${companyName} account or a recent transaction. Please review the details below carefully.`;
      ctaText = category === 'order confirmation' ? 'View Your Order' : 'View Account Details';
      break;
    case 'shipping notification':
      subject = `🚚 Your ${companyName} Order #[Order ID] Has Shipped!`;
      preheader = `Track your package and get ready for its arrival.`;
      body = `Good news! Your recent order from ${companyName} (Order #[Order ID]) has been shipped.\n\nYou can track its progress using the link below.\n\nEstimated delivery: [Date]`;
      ctaText = 'Track Your Package';
      break;
    case 'onboarding':
      subject = `Getting Started with ${companyName} - Step 1`;
      preheader = `Let's make the most of your new ${product} account.`;
      body = `Welcome aboard! To help you get the most out of ${product}, here’s your first step:\n\n**Action:** [Describe first key action, e.g., "Set up your first project"]\n\nWhy it's important: [Explain benefit]`;
      ctaText = 'Complete Step 1';
      break;
    case 're-engagement':
    case 'win-back':
      subject = `👋 We've Missed You, [User Name]! A Special Offer Inside?`;
      preheader = `Come back and see what's new at ${companyName} – plus a little something extra!`;
      body = `It's been a while since we last saw you, and we've made some exciting updates to ${product} that we think you'll love!\n\nTo welcome you back, we're offering you:`;
      offer = "A Special 15% Discount on Your Next Subscription!";
      ctaText = 'Come Back & Redeem';
      break;
    // Add more cases for other categories like Event, Feedback, etc.
    default: // Fallback for other categories
      subject = `A Message from ${companyName} about ${templateCategory || 'Our Services'}`;
      preheader = `Updates and information for ${targetAudience}.`;
      body = `Stay informed with the latest from ${companyName}. We are dedicated ${corePurpose}. Discover how ${product} can help you.`;
      ctaText = 'Discover More';
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

  useEffect(() => {
    setIsLoading(true);
    setEmailHtml(null); 
    if (templateId) {
      const foundTemplate = mockTemplates.find(t => t.id === templateId);
      setTemplate(foundTemplate || null);
      if (foundTemplate) {
        const emailTextContent = generateMockEmailContent(foundTemplate.category, mockBrand);
        try {
          const html = render(
            <GenericBrandEmail 
              brandData={mockBrand} 
              emailContent={emailTextContent} 
              templateCategory={foundTemplate.category} 
            />
          );
          setEmailHtml(html);
        } catch (error) {
          console.error("Error rendering email with react-email:", error);
          setEmailHtml("<p>Error rendering email preview. Check console.</p>");
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
            <CardTitle className="text-xl">Live Email Preview</CardTitle>
            <CardDescription>Rendered using react-email. Styles may vary slightly in actual email clients.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailHtml ? (
              <iframe
                srcDoc={emailHtml}
                title={`${template.name} Preview`}
                className="w-full h-[600px] border rounded-md bg-white"
                sandbox="allow-same-origin" // Important for security if loading external resources, though srcDoc is safer
              />
            ) : (
              <div className="flex items-center justify-center h-[300px] border rounded-md bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-3 text-muted-foreground">Rendering email preview...</p>
              </div>
            )}
            <Separator />
             <Alert variant="default" className="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                <AlertTriangle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-700 dark:text-blue-300">Renderer Note</AlertTitle>
                <AlertDescription className="text-blue-600 dark:text-blue-400">
                    This preview is rendered using `react-email`. Actual appearance in different email clients (Outlook, Gmail, etc.) can vary due to their specific HTML/CSS rendering engines. Thorough testing across clients is recommended for production emails.
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

