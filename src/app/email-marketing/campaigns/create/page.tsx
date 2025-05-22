
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar as ShadcnCalendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  CalendarIcon, 
  ChevronDown, 
  AlertCircle, 
  Info, 
  Eye, 
  TestTube2, 
  ListChecks, 
  Users, 
  Target, 
  Settings2, 
  BarChart3, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  MailWarning, 
  Repeat, 
  Loader2,
  LayoutTemplate,
  Trash2,
  Users2Icon, 
  PencilLine, 
  Settings, 
  Send, 
  FileText,
  Check, // Added for CommandItem selection indication
  Search // Added for search input
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { EmailTemplate } from '@/lib/email-template-data';
import { mockTemplates as allMockTemplates } from '@/lib/email-template-data';

interface MockRecipientGroup {
  id: string;
  name: string;
  type: 'list' | 'segment';
  count: number; // Added count
}

const mockRecipientGroups: MockRecipientGroup[] = [
    { id: 'list1', name: 'All Subscribers', type: 'list', count: 1250 },
    { id: 'list2', name: 'Newsletter Signups', type: 'list', count: 870 },
    { id: 'list3', name: 'Event Attendees - Q1', type: 'list', count: 230 },
    { id: 'seg1', name: 'Engaged Users (Last 30 Days)', type: 'segment', count: 450 },
    { id: 'seg2', name: 'High Value Customers', type: 'segment', count: 150 },
    { id: 'seg3', name: 'Inactive Users (Last 90 Days)', type: 'segment', count: 320 },
    { id: 'list4', name: 'Website Lead Magnet Downloads', type: 'list', count: 600 },
    { id: 'seg4', name: 'Potential Leads (No Purchase Yet)', type: 'segment', count: 780 },
];

const mockBrand = {
  name: "ArchStruct Design Suite",
  product: "ArchModeler Pro",
  targetAudience: "architects and structural engineers",
  corePurpose: "to empower design and engineering professionals with intuitive, powerful, and integrated software tools",
  supportEmail: "support@archstructsolutions.com",
  websiteUrl: "https://www.archstructsuite.com",
};

interface MockEmailTextContent {
  subject: string;
  preheader?: string;
  greeting?: string;
  body: string;
  ctaText?: string;
}

function generateMockEmailContent(templateCategory: string, brand: typeof mockBrand): MockEmailTextContent {
  const { name: brandName, product, targetAudience, corePurpose } = brand;
  let subject = `An Update from ${brandName}`;
  let preheader = `News for ${targetAudience}.`;
  let greeting = `Hi [User Name],`;
  let body = `This is a general update regarding ${product}.\n\nWe aim ${corePurpose}.`;
  let ctaText = 'Learn More';

  switch (templateCategory.toLowerCase()) {
    case 'welcome':
      subject = `Welcome to ${brandName}!`;
      preheader = `Get started with ${product}.`;
      body = `We're thrilled to have you! Explore how ${product} helps ${targetAudience}.`;
      ctaText = 'Get Started';
      break;
    case 'promotion':
      subject = `Special Offer on ${product}!`;
      preheader = `Exclusive discounts for ${targetAudience}.`;
      body = `Don't miss our limited-time offer on ${product}. Enhance your workflow today!`;
      ctaText = 'Claim Discount';
      break;
    case 'newsletter':
      subject = `${brandName} Monthly Insights`;
      preheader = `Latest news and tips.`;
      body = `Here's your monthly update from ${brandName}, covering new features in ${product} and industry news for ${targetAudience}.`;
      ctaText = 'Read Newsletter';
      break;
    default:
      subject = `A Message from ${brandName} about ${product}`;
      preheader = `Updates and information.`;
      body = `Stay informed with the latest from ${brandName}. We are dedicated ${corePurpose}.`;
      ctaText = 'Discover More';
      break;
  }
  return { subject, preheader, greeting, body, ctaText };
}


type CampaignType = "standard" | "automation" | "ab_test" | "rss_feed";
type ScheduleOption = "immediate" | "later";
type PreviewDevice = "desktop" | "mobile";

function CreateCampaignFormComponent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [campaignName, setCampaignName] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedTemplateName, setSelectedTemplateName] = useState<string | null>(null);
  const [isTemplateSelectionModalOpen, setIsTemplateSelectionModalOpen] = useState(false);
  const [templateSearchTerm, setTemplateSearchTerm] = useState('');


  const [subjectLine, setSubjectLine] = useState('');
  const [subjectLineB, setSubjectLineB] = useState('');
  const [enableSubjectABTest, setEnableSubjectABTest] = useState(false);
  const [previewText, setPreviewText] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [replyToEmail, setReplyToEmail] = useState('');

  const [emailContent, setEmailContent] = useState('');
  const [includeUnsubscribeLink, setIncludeUnsubscribeLink] = useState(true);
  
  const [campaignType, setCampaignType] = useState<CampaignType>('standard');

  const [includedRecipientGroups, setIncludedRecipientGroups] = useState<string[]>([]);
  const [excludedRecipientGroups, setExcludedRecipientGroups] = useState<string[]>([]);
  const [audienceSearchTerm, setAudienceSearchTerm] = useState('');


  const [scheduleOption, setScheduleOption] = useState<ScheduleOption>('immediate');
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>();
  const [scheduleTime, setScheduleTime] = useState('10:00');
  const [sendInRecipientTimezone, setSendInRecipientTimezone] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  const [enableOpenTracking, setEnableOpenTracking] = useState(true);
  const [enableClickTracking, setEnableClickTracking] = useState(true);
  const [enableGoogleAnalytics, setEnableGoogleAnalytics] = useState(false);
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [currentPreviewDevice, setCurrentPreviewDevice] = useState<PreviewDevice>('desktop');

  useEffect(() => {
    const templateIdFromQuery = searchParams.get('templateId');
    const campaignNameFromQuery = searchParams.get('campaignName');

    if (campaignNameFromQuery) {
      const decodedCampaignName = decodeURIComponent(campaignNameFromQuery);
      setCampaignName(decodedCampaignName);
      if(enableGoogleAnalytics && !utmCampaign) setUtmCampaign(decodedCampaignName);
    }
    if (templateIdFromQuery) {
      const template = allMockTemplates.find(t => t.id === templateIdFromQuery);
      if (template) {
        handleTemplateSelect(template, false); 
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, enableGoogleAnalytics]); 

  const handleTemplateSelect = (template: EmailTemplate, closeModal: boolean = true) => {
    setSelectedTemplateId(template.id);
    setSelectedTemplateName(template.name);
    const mockContent = generateMockEmailContent(template.category, mockBrand);
    setSubjectLine(mockContent.subject);
    setPreviewText(mockContent.preheader || '');
    setEmailContent(`<!-- Selected Template: ${template.name} -->\n${mockContent.greeting ? mockContent.greeting + '\\n\\n' : ''}${mockContent.body}\n\n${mockContent.ctaText ? `CTA: ${mockContent.ctaText}` : ''}`);
    if (closeModal) {
      setIsTemplateSelectionModalOpen(false);
    }
    setTemplateSearchTerm(''); 
    toast({ title: `Template Selected: ${template.name}` });
  };

  const handleClearTemplate = () => {
    setSelectedTemplateId(null);
    setSelectedTemplateName(null);
    setEmailContent('');
    setSubjectLine('');
    setPreviewText('');
    toast({ title: "Template Cleared" });
  };

  const handleRecipientGroupSelection = (groupId: string, type: 'include' | 'exclude') => {
    const updater = type === 'include' ? setIncludedRecipientGroups : setExcludedRecipientGroups;
    updater(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const handleSaveDraft = () => {
    toast({ title: "Draft Saved (Simulation)", description: "Your campaign draft has been saved." });
  };

  const handleSendTestEmail = () => {
    if (!testEmailAddress.trim() || !/^\S+@\S+\.\S+$/.test(testEmailAddress.trim())) {
        toast({ title: "Invalid Email", description: "Please enter a valid email address for the test.", variant: "destructive" });
        return;
    }
    toast({ title: "Test Email Sent (Simulation)", description: `A test email has been sent to ${testEmailAddress}.` });
  };

  const handleSubmitCampaign = () => {
    if (!campaignName.trim()) {
        toast({title: "Missing Information", description: "Please provide a campaign name.", variant: "destructive"});
        return;
    }
    if (!subjectLine.trim()) {
        toast({title: "Missing Information", description: "Please provide a subject line.", variant: "destructive"});
        return;
    }
     if (enableSubjectABTest && !subjectLineB.trim()) {
        toast({title: "Missing Information", description: "Please provide Subject Line B for A/B test.", variant: "destructive"});
        return;
    }
    if (!senderName.trim() || !senderEmail.trim()) {
        toast({title: "Missing Information", description: "Please provide sender name and email.", variant: "destructive"});
        return;
    }
    if (!emailContent.trim()) {
        toast({title: "Missing Information", description: "Email content cannot be empty.", variant: "destructive"});
        return;
    }
    if (includedRecipientGroups.length === 0) {
        toast({title: "Missing Information", description: "Please select at least one recipient list/segment.", variant: "destructive"});
        return;
    }
     if (scheduleOption === 'later' && !scheduleDate) {
        toast({title: "Missing Information", description: "Please pick a date for scheduled sending.", variant: "destructive"});
        return;
    }

    const action = scheduleOption === 'immediate' ? 'Sent' : 'Scheduled';
    toast({ title: `Campaign ${action} (Simulation)`, description: `Your campaign "${campaignName}" has been ${action.toLowerCase()}.` });
  };

  const handleSetupAdvancedABTest = () => {
    if (campaignType !== 'ab_test') {
      toast({
        title: "Incorrect Campaign Type",
        description: "Please select 'A/B Test Campaign' as the campaign type to access advanced A/B testing features.",
        variant: "default",
      });
    } else {
      toast({
        title: "Advanced A/B/n Test Setup (Coming Soon)",
        description: "You'll be able to define the test variable (e.g., subject, content, sender, send time), add multiple variations (A, B, C...), and configure test parameters like audience percentage, winning metric, and test duration.",
        duration: 7000, 
      });
    }
  };

  const filteredTemplates = allMockTemplates.filter(template =>
    template.name.toLowerCase().includes(templateSearchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(templateSearchTerm.toLowerCase())
  );

  const filteredRecipientGroups = (type: 'list' | 'segment') => 
    mockRecipientGroups.filter(group => 
        group.type === type && 
        group.name.toLowerCase().includes(audienceSearchTerm.toLowerCase())
    );

  return (
    <MainLayout pageTitle={campaignName ? `Create Campaign: ${campaignName}` : "Create New Email Campaign"}>
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Campaign Setup</CardTitle>
            <CardDescription>Define the core details, content, recipients, and tracking for your new email campaign.</CardDescription>
          </CardHeader>
        </Card>

        { (campaignType === 'automation' || (campaignType === 'ab_test' && !enableSubjectABTest) || campaignType === 'rss_feed') && (
            <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-700 dark:text-blue-300">Campaign Type Specifics</AlertTitle>
                <AlertDescription className="text-blue-600 dark:text-blue-400">
                    You've selected a campaign type ({campaignType.replace('_', ' ')}) that will have a specialized builder or more detailed configuration options in a future update. 
                    For now, you can set up the basic details using the standard form below. A/B testing for elements other than subject line is also part of this future update.
                </AlertDescription>
            </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 mb-4 h-auto">
                <TabsTrigger value="details" className="py-2 text-xs sm:text-sm"><FileText className="mr-1 h-4 w-4 hidden sm:inline-block"/>Details</TabsTrigger>
                <TabsTrigger value="sender" className="py-2 text-xs sm:text-sm"><Send className="mr-1 h-4 w-4 hidden sm:inline-block"/>Sender</TabsTrigger>
                <TabsTrigger value="content" className="py-2 text-xs sm:text-sm"><PencilLine className="mr-1 h-4 w-4 hidden sm:inline-block"/>Content</TabsTrigger>
                <TabsTrigger value="audience" className="py-2 text-xs sm:text-sm"><Users2Icon className="mr-1 h-4 w-4 hidden sm:inline-block"/>Audience</TabsTrigger>
                <TabsTrigger value="tracking" className="py-2 text-xs sm:text-sm"><Settings className="mr-1 h-4 w-4 hidden sm:inline-block"/>Tracking</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaignName">Campaign Name</Label>
                      <Input id="campaignName" placeholder="e.g., Q4 Product Launch Newsletter" value={campaignName} onChange={(e) => {setCampaignName(e.target.value); if(enableGoogleAnalytics && !utmCampaign) setUtmCampaign(e.target.value);}} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="campaignType">Campaign Type / Purpose</Label>
                      <Select value={campaignType} onValueChange={(value) => setCampaignType(value as CampaignType)}>
                        <SelectTrigger id="campaignType">
                          <SelectValue placeholder="Select campaign type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Campaign (One-time)</SelectItem>
                          <SelectItem value="automation">Automation/Workflow (e.g., Welcome Series)</SelectItem>
                          <SelectItem value="ab_test">A/B Test Campaign</SelectItem>
                          <SelectItem value="rss_feed">RSS-Powered Campaign</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subjectLine">Subject Line</Label>
                      <Input id="subjectLine" placeholder="Your catchy subject line (Emojis supported 👍)" value={subjectLine} onChange={(e) => setSubjectLine(e.target.value)} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="enableSubjectABTest" checked={enableSubjectABTest} onCheckedChange={(checked) => setEnableSubjectABTest(Boolean(checked))} />
                        <Label htmlFor="enableSubjectABTest" className="font-normal text-sm">Enable A/B Test for Subject Line</Label>
                    </div>
                    {enableSubjectABTest && (
                        <div className="space-y-2 pl-6 mt-2 border-l-2 ml-2 border-muted">
                            <Label htmlFor="subjectLineB">Subject Line B</Label>
                            <Input id="subjectLineB" placeholder="Alternative subject line for A/B test" value={subjectLineB} onChange={(e) => setSubjectLineB(e.target.value)} />
                        </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="previewText">Preview Text (Preheader)</Label>
                      <Input id="previewText" placeholder="Short text shown after subject in inbox" value={previewText} onChange={(e) => setPreviewText(e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sender">
                 <Card>
                  <CardHeader>
                    <CardTitle>Sender Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senderName">Sender Name</Label>
                      <Input id="senderName" placeholder="e.g., MarketMaestro Team" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">Sender Email Address</Label>
                      <Input id="senderEmail" type="email" placeholder="e.g., news@marketmaestro.com" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="replyToEmail">Reply-To Email (Optional)</Label>
                      <Input id="replyToEmail" type="email" placeholder="e.g., support@marketmaestro.com" value={replyToEmail} onChange={(e) => setReplyToEmail(e.target.value)} />
                      <p className="text-xs text-muted-foreground">If different from sender email.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Email Content</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast({title: "Personalization Tags", description: "Soon you'll be able to insert tags like {{firstName}}, {{companyName}} etc."})}>
                                <Sparkles className="mr-2 h-4 w-4 text-primary"/> Insert Personalization
                            </Button>
                            <Dialog open={isTemplateSelectionModalOpen} onOpenChange={setIsTemplateSelectionModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <LayoutTemplate className="mr-2 h-4 w-4" /> {selectedTemplateName ? "Change Template" : "Choose a Template"}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle>Select an Email Template</DialogTitle>
                                        <DialogDescription>Choose a base template for your campaign content. You can search by name or category.</DialogDescription>
                                    </DialogHeader>
                                    <Command className="rounded-lg border shadow-md mt-4">
                                      <CommandInput 
                                        placeholder="Search templates by name or category..." 
                                        value={templateSearchTerm}
                                        onValueChange={setTemplateSearchTerm}
                                      />
                                      <ScrollArea className="h-[40vh]">
                                        <CommandList className="max-h-[450px]">
                                          <CommandEmpty>No templates found.</CommandEmpty>
                                          <CommandGroup heading="Available Templates">
                                            {filteredTemplates.map((template) => (
                                              <CommandItem
                                                key={template.id}
                                                value={`${template.name} ${template.category}`} 
                                                onSelect={() => handleTemplateSelect(template)}
                                                className="flex justify-between items-center cursor-pointer"
                                              >
                                                <div>
                                                  <p className="font-medium">{template.name}</p>
                                                  <p className="text-xs text-muted-foreground">{template.category}</p>
                                                </div>
                                                <Check className={cn("mr-2 h-4 w-4", selectedTemplateId === template.id ? "opacity-100" : "opacity-0")} />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </ScrollArea>
                                    </Command>
                                    <DialogFooter className="mt-4">
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    {selectedTemplateName && (
                      <div className="flex items-center gap-2 text-sm mt-2">
                        <span className="text-muted-foreground">Using template:</span> 
                        <span className="font-semibold">{selectedTemplateName}</span>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs text-destructive hover:text-destructive/80" onClick={handleClearTemplate}>
                            <Trash2 className="mr-1 h-3 w-3"/>Clear
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2 mb-2 justify-end items-center">
                        <span className="text-xs text-muted-foreground mr-auto">Preview Mode:</span>
                        <Button variant={currentPreviewDevice === 'desktop' ? 'secondary' : 'ghost'} size="sm" onClick={() => setCurrentPreviewDevice('desktop')} aria-label="Preview on Desktop">
                            <Monitor className="mr-1 h-4 w-4"/> Desktop
                        </Button>
                        <Button variant={currentPreviewDevice === 'mobile' ? 'secondary' : 'ghost'} size="sm" onClick={() => setCurrentPreviewDevice('mobile')} aria-label="Preview on Mobile">
                            <Smartphone className="mr-1 h-4 w-4"/> Mobile
                        </Button>
                    </div>
                    <Textarea
                      placeholder="Compose your email content here... (Rich text / Drag & Drop editor coming soon!)"
                      rows={15}
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      className={cn("transition-all duration-300 ease-in-out", currentPreviewDevice === 'mobile' ? 'max-w-xs mx-auto shadow-md border-2 border-dashed p-2' : 'w-full')}
                    />
                    <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="includeUnsubscribeLink" checked={includeUnsubscribeLink} onCheckedChange={(checked) => setIncludeUnsubscribeLink(Boolean(checked))} />
                        <Label htmlFor="includeUnsubscribeLink" className="font-normal text-sm">Include Unsubscribe Link (Recommended)</Label>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm" onClick={() => toast({ title: "Visual Editor coming soon!"})}>Visual Editor</Button>
                        <Button variant="outline" size="sm" onClick={() => toast({ title: "Import HTML feature coming soon!"})}>Import HTML</Button>
                        <Button variant="outline" size="sm" onClick={() => toast({ title: "Spam Check (Simulation)", description:"Spam score: Low. No major issues found."})}>
                            <MailWarning className="mr-2 h-4 w-4"/> Check Spam Score
                        </Button>
                      </div>
                    </div>
                     <Alert variant="default" className="bg-background/70">
                        <Info className="h-4 w-4" />
                        <AlertTitle>AI Content Assistance</AlertTitle>
                        <AlertDescription>
                            Use the main <a href="/ai-assistant" className="underline hover:text-primary">AI Assistant</a> page or the integrated AI tools (coming soon to editor) to generate or refine your email copy.
                        </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audience">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-primary"/>Recipients</CardTitle>
                    <CardDescription>Select who will receive this campaign. You can search lists and segments.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative w-full sm:w-auto sm:max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            type="search"
                            placeholder="Search lists/segments..." 
                            className="pl-8 w-full"
                            value={audienceSearchTerm}
                            onChange={(e) => setAudienceSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="text-base font-medium">Include Sources</Label>
                        <p className="text-sm text-muted-foreground mb-2">Select one or more lists/segments to send this campaign to.</p>
                        <ScrollArea className="h-[200px] border p-3 rounded-md">
                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-semibold text-sm mb-1.5 text-foreground">Lists</h4>
                                    {filteredRecipientGroups('list').map(list => (
                                        <div key={`inc-${list.id}`} className="flex items-center space-x-2 ml-1 mb-1">
                                            <Checkbox 
                                                id={`inc-${list.id}`} 
                                                checked={includedRecipientGroups.includes(list.id)}
                                                onCheckedChange={() => handleRecipientGroupSelection(list.id, 'include')}
                                            />
                                            <Label htmlFor={`inc-${list.id}`} className="font-normal text-sm cursor-pointer">
                                                {list.name} <span className="text-xs text-muted-foreground">({list.count} subscribers)</span>
                                            </Label>
                                        </div>
                                    ))}
                                    {filteredRecipientGroups('list').length === 0 && <p className="text-xs text-muted-foreground ml-1">No matching lists found.</p>}
                                </div>
                                <Separator/>
                                <div>
                                    <h4 className="font-semibold text-sm mb-1.5 text-foreground">Segments</h4>
                                    {filteredRecipientGroups('segment').map(seg => (
                                        <div key={`inc-${seg.id}`} className="flex items-center space-x-2 ml-1 mb-1">
                                            <Checkbox 
                                                id={`inc-${seg.id}`} 
                                                checked={includedRecipientGroups.includes(seg.id)}
                                                onCheckedChange={() => handleRecipientGroupSelection(seg.id, 'include')}
                                            />
                                            <Label htmlFor={`inc-${seg.id}`} className="font-normal text-sm cursor-pointer">
                                                {seg.name} <span className="text-xs text-muted-foreground">({seg.count} subscribers)</span>
                                            </Label>
                                        </div>
                                    ))}
                                    {filteredRecipientGroups('segment').length === 0 && <p className="text-xs text-muted-foreground ml-1">No matching segments found.</p>}
                                </div>
                            </div>
                        </ScrollArea>
                        <p className="text-xs text-muted-foreground mt-1">Selected to include: {includedRecipientGroups.length} group(s)</p>
                    </div>
                    <div>
                        <Label className="text-base font-medium">Exclude Sources (Optional)</Label>
                         <p className="text-sm text-muted-foreground mb-2">Select lists/segments to exclude from this campaign.</p>
                        <ScrollArea className="h-[200px] border p-3 rounded-md">
                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-semibold text-sm mb-1.5 text-foreground">Lists</h4>
                                    {filteredRecipientGroups('list').map(list => (
                                        <div key={`exc-${list.id}`} className="flex items-center space-x-2 ml-1 mb-1">
                                            <Checkbox 
                                                id={`exc-${list.id}`} 
                                                checked={excludedRecipientGroups.includes(list.id)}
                                                onCheckedChange={() => handleRecipientGroupSelection(list.id, 'exclude')}
                                            />
                                            <Label htmlFor={`exc-${list.id}`} className="font-normal text-sm cursor-pointer">
                                                {list.name} <span className="text-xs text-muted-foreground">({list.count} subscribers)</span>
                                            </Label>
                                        </div>
                                    ))}
                                    {filteredRecipientGroups('list').length === 0 && <p className="text-xs text-muted-foreground ml-1">No matching lists available for exclusion.</p>}
                                </div>
                                <Separator/>
                                <div>
                                    <h4 className="font-semibold text-sm mb-1.5 text-foreground">Segments</h4>
                                    {filteredRecipientGroups('segment').map(seg => (
                                        <div key={`exc-${seg.id}`} className="flex items-center space-x-2 ml-1 mb-1">
                                            <Checkbox 
                                                id={`exc-${seg.id}`} 
                                                checked={excludedRecipientGroups.includes(seg.id)}
                                                onCheckedChange={() => handleRecipientGroupSelection(seg.id, 'exclude')}
                                            />
                                            <Label htmlFor={`exc-${seg.id}`} className="font-normal text-sm cursor-pointer">
                                                {seg.name} <span className="text-xs text-muted-foreground">({seg.count} subscribers)</span>
                                            </Label>
                                        </div>
                                    ))}
                                    {filteredRecipientGroups('segment').length === 0 && <p className="text-xs text-muted-foreground ml-1">No matching segments available for exclusion.</p>}
                                </div>
                            </div>
                        </ScrollArea>
                         <p className="text-xs text-muted-foreground mt-1">Selected to exclude: {excludedRecipientGroups.length} group(s)</p>
                    </div>
                    <p className="text-sm font-medium text-foreground mt-4">Estimated Reach: <span className="text-primary">1,234 subscribers</span> (Simulation)</p>
                    <Button variant="outline" onClick={() => toast({title: "Advanced Segmentation coming soon!"})}>
                        <Target className="mr-2 h-4 w-4"/> Define Advanced Segments
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tracking">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary"/>Tracking & Analytics</CardTitle>
                        <CardDescription>Configure how you want to track engagement for this campaign.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="openTracking" checked={enableOpenTracking} onCheckedChange={(checked) => setEnableOpenTracking(Boolean(checked))} />
                            <Label htmlFor="openTracking" className="font-normal">Enable Open Tracking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="clickTracking" checked={enableClickTracking} onCheckedChange={(checked) => setEnableClickTracking(Boolean(checked))} />
                            <Label htmlFor="clickTracking" className="font-normal">Enable Click Tracking</Label>
                        </div>
                        <Separator />
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="gaTracking" 
                                checked={enableGoogleAnalytics} 
                                onCheckedChange={(checked) => {
                                    const isChecked = Boolean(checked);
                                    setEnableGoogleAnalytics(isChecked);
                                    if(isChecked && !utmCampaign && campaignName) setUtmCampaign(campaignName); 
                                    if(isChecked && !utmSource) setUtmSource('email'); 
                                    if(isChecked && !utmMedium) setUtmMedium('newsletter'); 
                                }} />
                            <Label htmlFor="gaTracking" className="font-normal">Enable Google Analytics Tracking</Label>
                        </div>
                        {enableGoogleAnalytics && (
                            <div className="pl-6 space-y-3 pt-2 border-l-2 ml-2 border-muted animate-in fade-in duration-300">
                                <p className="text-xs text-muted-foreground">UTM parameters will be added to links in your email.</p>
                                <div className="space-y-1">
                                    <Label htmlFor="utmSource" className="text-xs">UTM Source</Label>
                                    <Input id="utmSource" placeholder="e.g., email, newsletter" value={utmSource} onChange={e => setUtmSource(e.target.value)} className="h-8 text-xs"/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="utmMedium" className="text-xs">UTM Medium</Label>
                                    <Input id="utmMedium" placeholder="e.g., email, cpc" value={utmMedium} onChange={e => setUtmMedium(e.target.value)} className="h-8 text-xs"/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="utmCampaign" className="text-xs">UTM Campaign Name</Label>
                                    <Input id="utmCampaign" placeholder="e.g., spring_sale_2024" value={utmCampaign} onChange={e => setUtmCampaign(e.target.value)} className="h-8 text-xs"/>
                                </div>
                            </div>
                        )}
                         <div className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                            <Checkbox id="ecommerceTracking" disabled />
                            <Label htmlFor="ecommerceTracking" className="font-normal text-muted-foreground">Enable E-commerce Tracking (Requires Integration)</Label>
                        </div>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start"> 
            <Card>
              <CardHeader>
                <CardTitle>Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={scheduleOption} onValueChange={(value) => setScheduleOption(value as ScheduleOption)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate" className="font-normal">Send Immediately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="later" id="later" />
                    <Label htmlFor="later" className="font-normal">Schedule for Later</Label>
                  </div>
                </RadioGroup>
                {scheduleOption === 'later' && (
                  <div className="pt-2 space-y-3 animate-in fade-in duration-300">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !scheduleDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? format(scheduleDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <ShadcnCalendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          initialFocus
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
                    <div className="flex items-center space-x-2">
                        <Checkbox id="sendInRecipientTimezone" checked={sendInRecipientTimezone} onCheckedChange={(checked) => setSendInRecipientTimezone(Boolean(checked))} />
                        <Label htmlFor="sendInRecipientTimezone" className="font-normal text-sm">Send in recipient's local timezone (if available)</Label>
                    </div>
                  </div>
                )}
                {campaignType === 'standard' && (
                     <div className="flex items-center space-x-2 pt-3">
                        <Checkbox id="isRecurring" checked={isRecurring} onCheckedChange={(checked) => setIsRecurring(Boolean(checked))} />
                        <Label htmlFor="isRecurring" className="font-normal text-sm">Make this a recurring campaign</Label>
                    </div>
                )}
                {isRecurring && campaignType === 'standard' && (
                    <div className="pl-6 mt-2 border-l-2 ml-2 border-muted space-y-2 animate-in fade-in duration-300">
                        <p className="text-xs text-muted-foreground">Recurring settings (e.g., frequency) will appear here (Not Implemented).</p>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => toast({title: "Recurring settings coming soon!"})}>Configure Recurrence</Button>
                    </div>
                )}
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><TestTube2 className="mr-2 h-5 w-5 text-primary"/>A/B Testing</CardTitle>
                    <CardDescription>More A/B test options for this campaign.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full" onClick={handleSetupAdvancedABTest}>
                        Setup Advanced A/B Test
                    </Button>
                     <p className="text-xs text-muted-foreground mt-2">
                        {enableSubjectABTest ? "Subject A/B test is active. " : ""}
                        Test different content, sender, or sending times to optimize performance.
                    </p>
                </CardContent>
            </Card>
            
            <Card className="shadow-md"> 
                <CardHeader>
                    <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full" onClick={handleSaveDraft}>Save Draft</Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full"><Eye className="mr-2 h-4 w-4"/>Preview & Test</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg"> 
                            <DialogHeader>
                                <DialogTitle>Preview & Test Campaign</DialogTitle>
                                <DialogDescription>
                                    Review your campaign content and send a test email.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <div className="p-4 border rounded-md bg-muted/30 max-h-60 overflow-y-auto text-sm">
                                    <p className="font-semibold">Subject: <span className="font-normal">{subjectLine}</span></p>
                                    {enableSubjectABTest && subjectLineB && (
                                        <p className="font-semibold">Subject B: <span className="font-normal">{subjectLineB}</span></p>
                                    )}
                                    <p className="text-xs text-muted-foreground mt-0.5">Preview Text: {previewText || "N/A"}</p>
                                    <Separator className="my-3"/>
                                    <h4 className="font-medium mb-1 text-xs uppercase text-muted-foreground">Email Content:</h4>
                                    <div className="whitespace-pre-wrap text-xs leading-relaxed">{emailContent || "No content entered yet."}</div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="testEmailAddress">Send test email to:</Label>
                                    <Input 
                                        id="testEmailAddress" 
                                        type="email" 
                                        placeholder="your-email@example.com" 
                                        value={testEmailAddress} 
                                        onChange={(e) => setTestEmailAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-between">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="button" onClick={handleSendTestEmail} disabled={!testEmailAddress.trim()}>Send Test</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSubmitCampaign}>
                        {scheduleOption === 'immediate' ? 'Send Campaign Now' : 'Schedule Campaign'}
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function CreateCampaignPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary"/> <p className="ml-3">Loading Campaign Creator...</p></div>}>
      <CreateCampaignFormComponent />
    </Suspense>
  );
}
