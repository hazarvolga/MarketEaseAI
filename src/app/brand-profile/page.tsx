
"use client";

import * as React from "react";
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, ImageIcon, Palette, Speaker, Link as LinkIcon, Briefcase, Settings2, ShieldCheck, Paperclip, Building2, Check, ChevronsUpDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast"; // Added useToast import

const industryOptions = [
  { value: "technology", label: "Technology (SaaS, Hardware, IT)" },
  { value: "healthcare", label: "Healthcare & Wellness" },
  { value: "finance", label: "Finance & Insurance" },
  { value: "retail_ecommerce", label: "Retail & E-commerce" },
  { value: "manufacturing", label: "Manufacturing & Industrial" },
  { value: "real_estate", label: "Real Estate & Construction" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "travel_hospitality", label: "Travel & Hospitality" },
  { value: "education", label: "Education & EdTech" },
  { value: "media_entertainment", label: "Media & Entertainment" },
  { value: "professional_services", label: "Professional Services (Consulting, Legal)" },
  { value: "non_profit", label: "Non-profit & Social Services" },
  { value: "automotive", label: "Automotive" },
  { value: "fashion_apparel", label: "Fashion & Apparel" },
  { value: "other", label: "Other" },
];

export default function BrandProfilePage() {
  const [openBusinessCategory, setOpenBusinessCategory] = React.useState(false);
  const [businessCategoryValue, setBusinessCategoryValue] = React.useState("technology");
  const { toast } = useToast(); // Initialize toast

  const handleSaveChanges = () => {
    // In a real application, you would gather form data and send it to a backend.
    // For this prototype, we just show a success toast.
    toast({
      title: "Profile Saved (Simulation)",
      description: "Your brand profile changes have been noted.",
      variant: "default",
    });
  };

  return (
    <MainLayout pageTitle="Manage Your Brand Profile">
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Brand Identity & Strategy</CardTitle>
            <CardDescription>
              This information will help the AI generate more accurate and effective content for your brand.
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="basic-info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1 mb-6 h-auto">
            <TabsTrigger value="basic-info" className="py-2 text-xs sm:text-sm">1. Basic Info</TabsTrigger>
            <TabsTrigger value="visual-identity" className="py-2 text-xs sm:text-sm">2. Visuals</TabsTrigger>
            <TabsTrigger value="tone-language" className="py-2 text-xs sm:text-sm">3. Tone/Lang</TabsTrigger>
            <TabsTrigger value="digital-presence" className="py-2 text-xs sm:text-sm">4. Digital</TabsTrigger>
            <TabsTrigger value="product-service" className="py-2 text-xs sm:text-sm">5. Products</TabsTrigger>
            <TabsTrigger value="ai-prefs" className="py-2 text-xs sm:text-sm">6. AI Prefs</TabsTrigger>
            <TabsTrigger value="legal" className="py-2 text-xs sm:text-sm">7. Legal</TabsTrigger>
            <TabsTrigger value="attachments" className="py-2 text-xs sm:text-sm">8. Files</TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="h-6 w-6 mr-3 text-primary" />
                  1. Basic Brand Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input id="brandName" placeholder="Your Brand LLC" defaultValue="ArchStruct Design Suite" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (if different)</Label>
                    <Input id="companyName" placeholder="Your Company Inc." defaultValue="Innovatech Solutions Inc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline / Slogan</Label>
                  <Input id="tagline" placeholder="Innovate. Create. Inspire." defaultValue="Designing Tomorrow's Structures, Today." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessCategory">Business Category</Label>
                    <Popover open={openBusinessCategory} onOpenChange={setOpenBusinessCategory}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openBusinessCategory}
                          id="businessCategory"
                          className="w-full justify-between"
                        >
                          {businessCategoryValue
                            ? industryOptions.find((option) => option.value === businessCategoryValue)?.label
                            : "Select a category..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {industryOptions.map((option) => (
                                <CommandItem
                                  key={option.value}
                                  value={option.value}
                                  onSelect={(currentValue) => {
                                    setBusinessCategoryValue(currentValue === businessCategoryValue ? "" : currentValue);
                                    setOpenBusinessCategory(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      businessCategoryValue === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {option.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetAudienceSimple">Target Audience (Simple)</Label>
                    <Input id="targetAudienceSimple" placeholder="e.g., Tech Enthusiasts, Small Business Owners" defaultValue="Architects, Structural Engineers, Construction Firms" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandDescription">Brand Description (Short Paragraph)</Label>
                  <Textarea id="brandDescription" placeholder="Explain what your brand stands for..." rows={3} defaultValue="ArchStruct Design Suite provides cutting-edge software solutions for architects and civil engineers, streamlining complex design, analysis, and collaboration processes from concept to construction." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea id="missionStatement" placeholder="Our mission is to..." rows={3} defaultValue="To empower design and engineering professionals with intuitive, powerful, and integrated software tools that enhance creativity, precision, and project efficiency." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visionStatement">Vision Statement</Label>
                  <Textarea id="visionStatement" placeholder="Our vision is to..." rows={3} defaultValue="To be the global leader in design and engineering software, shaping a future where sustainable and innovative structures are built with unparalleled ease and accuracy." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coreValues">Core Values (comma-separated)</Label>
                  <Input id="coreValues" placeholder="Innovation, Integrity, Customer Focus" defaultValue="Innovation, Precision, Collaboration, Customer Success, Integrity" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visual-identity">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Palette className="h-6 w-6 mr-3 text-primary" />
                  2. Visual Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <h4 className="font-semibold text-lg">Logo Upload</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor="mainLogo">Main Logo</Label>
                    <Input id="mainLogo" type="file" />
                    <p className="text-xs text-muted-foreground">Recommended: SVG, PNG. Clear background.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryLogo">Alternative/Secondary Logo</Label>
                    <Input id="secondaryLogo" type="file" />
                    <p className="text-xs text-muted-foreground">For different backgrounds or contexts.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon/Icon</Label>
                    <Input id="favicon" type="file" />
                    <p className="text-xs text-muted-foreground">Square format, e.g., 32x32, 64x64.</p>
                  </div>
                </div>

                <h4 className="font-semibold text-lg">Brand Colors</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 border rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color (Hex/RGB)</Label>
                    <Input id="primaryColor" placeholder="#29ABE2" defaultValue="#007BFF" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input id="secondaryColor" placeholder="#FF8C00" defaultValue="#6C757D" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <Input id="accentColor" placeholder="#F0F0F0" defaultValue="#28A745" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background/Base Color</Label>
                    <Input id="backgroundColor" placeholder="#FFFFFF" defaultValue="#F8F9FA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <Input id="textColor" placeholder="#333333" defaultValue="#212529" />
                  </div>
                </div>
                
                <h4 className="font-semibold text-lg">Typography</h4>
                <div className="p-4 border rounded-md space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="primaryFont">Primary Font Name</Label>
                        <Input id="primaryFont" placeholder="e.g., Inter, Roboto" defaultValue="Roboto" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="primaryFontLink">Primary Font Link (if external, e.g., Google Fonts)</Label>
                        <Input id="primaryFontLink" type="url" placeholder="https://fonts.google.com/specimen/Inter" defaultValue="https://fonts.google.com/specimen/Roboto" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="secondaryFont">Secondary Font Name</Label>
                        <Input id="secondaryFont" placeholder="e.g., Montserrat" defaultValue="Open Sans" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fontUsage">Font Usage Guidelines</Label>
                        <Textarea id="fontUsage" placeholder="e.g., Primary for headings, Secondary for body text." rows={2} defaultValue="Roboto for headings and key UI elements. Open Sans for body text and detailed descriptions."/>
                    </div>
                </div>

                <h4 className="font-semibold text-lg">Imagery Style</h4>
                <div className="p-4 border rounded-md space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="sampleImages">Sample Images (Upload a few examples)</Label>
                        <Input id="sampleImages" type="file" multiple />
                        <p className="text-xs text-muted-foreground">Images that reflect your brand's aesthetic.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imageryDosDonts">Imagery Do's and Don'ts</Label>
                        <Textarea id="imageryDosDonts" placeholder="e.g., Prefer illustrations, avoid dark stock photos." rows={3} defaultValue="Do: Use clean, modern visuals of architectural designs, 3D models, and collaborative team environments. Prefer professional software screenshots and abstract representations of data/structures. Don't: Use generic stock photos of people, overly cluttered images, or outdated architectural styles."/>
                    </div>
                </div>

                <h4 className="font-semibold text-lg">Graphic Elements</h4>
                <div className="p-4 border rounded-md space-y-2">
                    <Label htmlFor="graphicElements">Patterns, Icons, or Graphic Styles unique to the brand</Label>
                    <Textarea id="graphicElements" placeholder="Describe or link to examples of unique patterns or icons." rows={3} defaultValue="Geometric patterns inspired by blueprints, subtle grid lines, minimalist icons representing software features (e.g., analysis, modeling, collaboration)."/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tone-language">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                    <Speaker className="h-6 w-6 mr-3 text-primary" />
                    3. Tone of Voice & Language
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="brandVoice">Brand Voice</Label>
                    <Input id="brandVoice" placeholder="e.g., Formal, Casual, Playful, Professional" defaultValue="Professional, Innovative, Authoritative, Supportive" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="writingStyle">Writing Style</Label>
                    <Textarea id="writingStyle" placeholder="e.g., Prefer short sentences. Use contractions. Emojis are okay for social media." rows={3} defaultValue="Clear and concise. Use industry-standard terminology appropriately but explain complex concepts simply. Avoid overly casual language or slang. Emojis are generally not used in primary communications, but may be acceptable in very informal social media interactions."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="messagingPillars">Messaging Pillars (Key themes)</Label>
                    <Textarea id="messagingPillars" placeholder="e.g., Sustainability, Innovation, Community." rows={3} defaultValue="Efficiency & Productivity, Precision & Accuracy, Seamless Collaboration, Future-Ready Design"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="examplePhrases">Example Phrases / Catchphrases</Label>
                    <Textarea id="examplePhrases" placeholder="Reusable marketing copy or slogans." rows={3} defaultValue="Unlock new levels of design precision. Streamline your BIM workflows. Collaborate in real-time with your team. The future of structural engineering is here."/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="digital-presence">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                    <LinkIcon className="h-6 w-6 mr-3 text-primary" />
                    4. Social & Digital Presence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input id="websiteUrl" type="url" placeholder="https://yourbrand.com" defaultValue="https://www.archstructsuite.com" />
                </div>
                <h4 className="font-semibold text-lg">Social Media Handles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md">
                    <div className="space-y-2">
                        <Label htmlFor="instagramHandle">Instagram</Label>
                        <Input id="instagramHandle" placeholder="@yourbrand" defaultValue="@ArchStructDesign"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="facebookHandle">Facebook</Label>
                        <Input id="facebookHandle" placeholder="yourbrandfb" defaultValue="ArchStructSuite"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="twitterHandle">Twitter / X</Label>
                        <Input id="twitterHandle" placeholder="@yourbrandX" defaultValue="@ArchStructX"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedinHandle">LinkedIn</Label>
                        <Input id="linkedinHandle" placeholder="company/yourbrand" defaultValue="company/archstruct-design-suite"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tiktokHandle">TikTok</Label>
                        <Input id="tiktokHandle" placeholder="@yourbrandtiktok" defaultValue="@ArchStructTips"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="preferredHashtags">Preferred Hashtags (comma-separated)</Label>
                    <Input id="preferredHashtags" placeholder="#yourbrand #innovation #industryleader" defaultValue="#ArchStruct, #BIMSoftware, #StructuralEngineering, #ArchitecturalDesign, #AECtech, #ConstructionTech"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="socialBioTemplates">Social Media Bio Templates</Label>
                    <Textarea id="socialBioTemplates" placeholder="Example bios for different platforms." rows={3} defaultValue="LinkedIn: Empowering architects and engineers with next-gen design software. | Twitter: The latest in architectural & structural design technology. #ArchStruct #BIM"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ctaExamples">CTA (Call-to-Action) Examples</Label>
                    <Textarea id="ctaExamples" placeholder="e.g., Learn More, Shop Now, Sign Up" rows={3} defaultValue="Request a Demo, Learn More, Download Trial, Explore Features, Contact Sales"/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="product-service">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                    <Briefcase className="h-6 w-6 mr-3 text-primary" />
                    5. Product / Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="keyProducts">List of Key Products or Services</Label>
                    <Textarea id="keyProducts" placeholder="Product A, Service B, Solution C (one per line or comma-separated)" rows={4} defaultValue="ArchModeler Pro (BIM & 3D Modeling), StructAnalyse Ultimate (Structural Analysis & Simulation), CollabPlatform (Cloud-based Project Collaboration), RenderWorks (Photorealistic Rendering Engine)"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="productDescriptions">General Product/Service Descriptions</Label>
                    <Textarea id="productDescriptions" placeholder="Brief overview of what you offer." rows={4} defaultValue="Our integrated suite of software covers the entire lifecycle of building and infrastructure projects, from initial conceptual design and 3D modeling to advanced structural analysis, photorealistic rendering, and cloud-based team collaboration."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pricingModel">Pricing Model / Tiers</Label>
                    <Textarea id="pricingModel" placeholder="e.g., Subscription, One-time purchase, Tiered pricing info" rows={3} defaultValue="Subscription-based (Annual/Monthly tiers: Basic, Professional, Enterprise). Volume discounts available for large firms. Special licensing for educational institutions."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="targetMarkets">Target Markets (Specific segments, if any)</Label>
                    <Textarea id="targetMarkets" placeholder="e.g., Startups in SEA, Enterprise clients in North America" rows={3} defaultValue="Architectural firms (small to large), structural engineering consultancies, multidisciplinary engineering firms, construction companies with in-house design teams, government agencies involved in infrastructure."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="usp">Unique Selling Proposition (USP)</Label>
                    <Textarea id="usp" placeholder="What makes your products/services unique?" rows={3} defaultValue="Fully integrated suite reducing data silos, advanced AI-powered analysis tools for optimal material usage and structural integrity, intuitive user interface designed by industry professionals."/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-prefs">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                    <Settings2 className="h-6 w-6 mr-3 text-primary" />
                    6. AI-Specific Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="preferredContentTypes">Preferred Content Types for AI (comma-separated)</Label>
                    <Input id="preferredContentTypes" placeholder="Blog, Email, Ad Copy, Social Post, Video Script" defaultValue="Blog posts on industry trends, Case studies of successful projects, Technical whitepapers, 'How-to' video scripts for software features, LinkedIn articles for thought leadership, Instagram posts showcasing design possibilities."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="aiPromptsTemplates">Custom AI Prompts or Templates</Label>
                    <Textarea id="aiPromptsTemplates" placeholder="Example: 'Generate 5 Instagram post ideas about [topic] in a [tone] tone, focusing on [messaging pillar].'" rows={4} defaultValue="Generate 5 LinkedIn post ideas about the benefits of integrated BIM workflows for large architectural firms, in a professional and informative tone. Write a blog post outline on 'The Future of Sustainable Building Design with AI-Powered Software', targeting architects. Create 3 ad copy variations for Facebook targeting structural engineers, highlighting our new AI-driven analysis features."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="personaDefinitions">Buyer Persona Definitions for AI</Label>
                    <Textarea id="personaDefinitions" placeholder="Describe your buyer personas (e.g., Tech-savvy Tim, Marketing Mary)." rows={4} defaultValue="Architect Alex: 35, tech-savvy, looking for tools to improve design efficiency and creativity. Manages a small team. Concerned with aesthetics and client presentations. | Engineer Sarah: 42, Lead Structural Engineer, values precision, reliability, and compliance with codes. Needs software that handles complex calculations and integrates with other tools."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="prohibitedContent">Prohibited Content/Topics for AI</Label>
                    <Textarea id="prohibitedContent" placeholder="Topics or language the brand avoids." rows={3} defaultValue="Avoid making direct, unsubstantiated claims of superiority over specific competitors by name. Do not discuss pricing details in general marketing content unless specifically requested for a sales context. Avoid overly political or controversial topics unrelated to the AECO industry."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="industryJargon">Industry Jargon / Keywords for AI (comma-separated)</Label>
                    <Input id="industryJargon" placeholder="SEO, SaaS, B2B, ROI" defaultValue="BIM (Building Information Modeling), FEA (Finite Element Analysis), CAD (Computer-Aided Design), Parametric Design, Generative Design, Digital Twin, AEC (Architecture, Engineering, Construction), Structural Integrity, Load Bearing, Material Science."/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                    <ShieldCheck className="h-6 w-6 mr-3 text-primary" />
                    7. Legal & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="trademarkedElements">Trademarked Elements</Label>
                    <Textarea id="trademarkedElements" placeholder="Logos, phrases, designs that are trademarked." rows={3} defaultValue="ArchStruct Design Suite™, ArchModeler Pro™, StructAnalyse Ultimate™ logo."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="copyrightGuidelines">Copyright Guidelines</Label>
                    <Textarea id="copyrightGuidelines" placeholder="Internal guidelines for using copyrighted material." rows={3} defaultValue="All software UI, generated designs (unless user-owned), and marketing materials are © Innovatech Solutions Inc. Use of client project images requires explicit permission and attribution."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="disclosureRequirements">Disclosure Requirements</Label>
                    <Textarea id="disclosureRequirements" placeholder="e.g., FTC disclosures for sponsored content, affiliate disclaimers." rows={3} defaultValue="Testimonials should be clearly marked. If AI assistance is used in content creation in a way that's not obvious, consider a subtle disclosure if appropriate for transparency."/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dataHandlingPreferences">GDPR / Data Handling Preferences</Label>
                    <Textarea id="dataHandlingPreferences" placeholder="If applicable, outline data privacy notes." rows={3} defaultValue="User project data stored in CollabPlatform is encrypted and subject to GDPR/CCPA compliance where applicable. We do not sell user data."/>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                    <Paperclip className="h-6 w-6 mr-3 text-primary" />
                    8. File Attachments & Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="brandGuidelinesPdf">Brand Guidelines PDF</Label>
                    <Input id="brandGuidelinesPdf" type="file" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="marketingKits">Marketing Kits</Label>
                    <Input id="marketingKits" type="file" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="campaignSamples">Previous Campaign Samples</Label>
                    <Input id="campaignSamples" type="file" multiple />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="templateFiles">Template Files (Canva, PSD, etc.)</Label>
                    <Input id="templateFiles" type="file" multiple />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <CardFooter className="mt-8">
          <Button 
            size="lg" 
            className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={handleSaveChanges}
          >
            Save Brand Profile Changes
          </Button>
        </CardFooter>
      </div>
    </MainLayout>
  );
}

    
