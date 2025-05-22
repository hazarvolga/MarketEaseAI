
"use client";

import * as React from "react";
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Cog,
  Cpu,
  Link2 as Link2IconLucide,
  UserPlus,
  Mailbox,
  SlidersHorizontal,
  PlusCircle as PlusCircleIcon,
  Check,
  ChevronsUpDown,
  ListChecks,
  FileText as FileTextIcon,
  ExternalLink,
  Search,
  Trash2,
  Users as UsersIconLucide,
  Bell as BellIcon,
  Briefcase,
  AlertCircle as AlertCircleIcon,
  RefreshCw,
  Share2 as Share2Icon,
  Building,
  ImageIcon as ImageIconLucide,
  Youtube,
  ShieldCheck,
  Paperclip,
  Settings2,
  BarChart3,
  ListChecks as ListChecksIcon,
  Spline as SplineIcon,
  Send as SendIcon,
  LayoutTemplate as TemplateIcon,
  Home,
  Lightbulb,
  PanelLeft,
  UserCircle,
  Mail,
  MailPlus,
  Edit3,
  CalendarDays,
  MessageSquare,
  Clock,
  Tag,
  ThumbsUp,
  FileWarning,
  ImagePlus,
  Video,
  FileText,
  Filter,
  UploadCloud,
  HardDrive // Added HardDrive icon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { handleUpdateAiConfigurationAction, type AiConfigurationInput } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";


interface CustomIconProps extends React.SVGProps<SVGSVGElement> {}

const FacebookIconSVG = (props: CustomIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props} className={cn("h-5 w-5", props.className)}>
    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.64 9.5 5.45V7.46H6.06V11h3.44v12.5h5V11h3.97l.4-3.54z" />
  </svg>
);

const InstagramIconSVG = (props: CustomIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props} className={cn("h-5 w-5", props.className)}>
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

const TwitterIconSVG = (props: CustomIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props} className={cn("h-5 w-5", props.className)}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIconSVG = (props: CustomIconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} className={cn("h-5 w-5", props.className)}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const TikTokIconSVG = (props: CustomIconProps) => (
  <svg viewBox="0 0 28 28" fill="currentColor" {...props} className={cn("h-5 w-5", props.className)}>
    <path d="M20.76,10.28A5.76,5.76,0,0,0,15,4.51V15.6a5.75,5.75,0,1,1-5.75-5.75,5.63,5.63,0,0,1,.13-1.27A0.76,0.76,0,0,0,9.2,8C8.7,8,8.47,8.21,8.47,8.6V15.3a0.76,0.76,0,0,0,.18,.51A8.09,8.09,0,0,0,9.2,16.1a8.24,8.24,0,1,0,8.23-8.24A8.12,8.12,0,0,0,15,7.61V13a0.75,0.75,0,0,0,.75.75h2.28A5.76,5.76,0,0,0,20.76,10.28Z"/>
  </svg>
);

const PinterestIconSVG = (props: CustomIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props} className={cn("h-5 w-5", props.className)}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.198-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.377-.752-.377-1.845c0-1.713 1.002-2.981 2.248-2.981 1.052 0 1.554.792 1.554 1.746 0 1.069-.678 2.671-1.011 4.128-.278 1.213.615 2.225 1.815 2.225 2.169 0 3.717-2.299 3.717-5.588 0-2.827-2.064-4.879-5.008-4.879-3.413 0-5.409 2.556-5.409 5.199 0 1.03.395 2.143.889 2.726.096.113.119.224.083.345l-.333 1.354c-.053.223-.174.274-.422.152-1.494-.693-2.424-2.875-2.424-4.627 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.627-2.759-1.371l-.748 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592 0 12.017 0z"/>
  </svg>
);


type AiProvider = "gemini" | "openrouter";
type EmailServiceProvider =
  | "generic_smtp"
  | "gmail"
  | "outlook"
  | "ses"
  | "mailgun"
  | "sendgrid"
  | "postmark"
  | "brevo"
  | "mailjet"
  | "zoho_mail";

interface AvailableSocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  oauthPermissionsExample?: string[];
}

const availableSocialPlatforms: AvailableSocialPlatform[] = [
  { id: 'facebook', name: 'Facebook', icon: <FacebookIconSVG className="h-5 w-5 text-blue-600" />, oauthPermissionsExample: ['pages_manage_posts', 'pages_show_list', 'pages_read_engagement'] },
  { id: 'instagram', name: 'Instagram', icon: <InstagramIconSVG className="h-5 w-5 text-pink-500" />, oauthPermissionsExample: ['instagram_basic', 'instagram_manage_insights', 'instagram_content_publish'] },
  { id: 'twitter', name: 'X (Twitter)', icon: <TwitterIconSVG className="h-5 w-5" />, oauthPermissionsExample: ['tweet.read', 'tweet.write', 'users.read'] },
  { id: 'linkedin', name: 'LinkedIn', icon: <LinkedinIconSVG className="h-5 w-5 text-sky-700" />, oauthPermissionsExample: ['r_liteprofile', 'w_member_social', 'rw_organization_admin'] },
  { id: 'tiktok', name: 'TikTok', icon: <TikTokIconSVG className="h-5 w-5" />, oauthPermissionsExample: ['user.info.basic', 'video.list', 'video.upload'] },
  { id: 'pinterest', name: 'Pinterest', icon: <PinterestIconSVG className="h-5 w-5 text-red-600" />, oauthPermissionsExample: ['pins:read', 'boards:read', 'pins:write'] },
  { id: 'youtube', name: 'YouTube', icon: <Youtube className="h-5 w-5 text-red-500" />, oauthPermissionsExample: ['youtube.readonly', 'youtube.upload'] },
];

interface ConfiguredSocialChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'Connected' | 'Disconnected' | 'Needs Re-auth';
  accountIdentifier?: string;
  oauthPermissionsExample?: string[];
}

const awsRegions = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "af-south-1", "ap-east-1", "ap-south-1", "ap-northeast-2",
  "ap-southeast-1", "ap-southeast-2", "ap-northeast-1",
  "ca-central-1", "eu-central-1", "eu-west-1", "eu-west-2",
  "eu-south-1", "eu-west-3", "eu-north-1", "me-south-1", "sa-east-1"
];

const LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY = 'marketMaestroDashboardChannels';


export default function SystemConfigurationPage() {
  const [selectedProvider, setSelectedProvider] = React.useState<AiProvider>("gemini");
  const [geminiApiKey, setGeminiApiKey] = React.useState("");
  const [openRouterApiKey, setOpenRouterApiKey] = React.useState("");
  const [openRouterModelName, setOpenRouterModelName] = React.useState("");
  const [systemPassword, setSystemPassword] = React.useState("");

  const [isAiConfigModalOpen, setIsAiConfigModalOpen] = React.useState(false);

  const [selectedEmailService, setSelectedEmailService] = React.useState<EmailServiceProvider>("generic_smtp");
  const [smtpHost, setSmtpHost] = React.useState("");
  const [smtpPort, setSmtpPort] = React.useState("");
  const [smtpUser, setSmtpUser] = React.useState("");
  const [smtpPassword, setSmtpPassword] = React.useState("");
  const [smtpEncryption, setSmtpEncryption] = React.useState("tls");
  const [apiKey, setApiKey] = React.useState("");
  const [apiSecret, setApiSecret] = React.useState(""); // Used for API key based services
  const [sendingDomain, setSendingDomain] = React.useState(""); // Used for some API key based services
  const [sesAccessKey, setSesAccessKey] = React.useState("");
  const [sesSecretKey, setSesSecretKey] = React.useState("");
  const [sesRegion, setSesRegion] = React.useState("us-east-1");
  const [sesVerifiedIdentity, setSesVerifiedIdentity] = React.useState("");


  const [configuredChannels, setConfiguredChannels] = React.useState<ConfiguredSocialChannel[]>([]);
  const [openPlatformCombobox, setOpenPlatformCombobox] = React.useState(false);
  const [platformSearchValue, setPlatformSearchValue] = React.useState("");
  const [expandedChannelId, setExpandedChannelId] = React.useState<string | null>(null);


  const { toast } = useToast();

  React.useEffect(() => {
    const initialChannels: ConfiguredSocialChannel[] = [
      { id: 'facebook', name: 'Facebook', icon: <FacebookIconSVG className="h-5 w-5 text-blue-600" />, status: 'Connected', accountIdentifier: 'MarketMaestro FB Page', oauthPermissionsExample: availableSocialPlatforms.find(p=>p.id==='facebook')?.oauthPermissionsExample },
      { id: 'instagram', name: 'Instagram', icon: <InstagramIconSVG className="h-5 w-5 text-pink-500" />, status: 'Connected', accountIdentifier: '@MarketMaestroIG', oauthPermissionsExample: availableSocialPlatforms.find(p=>p.id==='instagram')?.oauthPermissionsExample },
      { id: 'twitter', name: 'X (Twitter)', icon: <TwitterIconSVG className="h-5 w-5" />, status: 'Needs Re-auth', accountIdentifier: '@MarketMaestroX', oauthPermissionsExample: availableSocialPlatforms.find(p=>p.id==='twitter')?.oauthPermissionsExample },
    ];
    // In a real app, this would be fetched from a backend
    setConfiguredChannels(initialChannels);
  }, []);

  const handleAddPlatformToConfiguredList = (platform: AvailableSocialPlatform) => {
    if (!configuredChannels.find(p => p.id === platform.id)) {
      const newChannel: ConfiguredSocialChannel = { ...platform, status: 'Disconnected', accountIdentifier: undefined };
      const updatedChannels = [...configuredChannels, newChannel];
      setConfiguredChannels(updatedChannels);
      setExpandedChannelId(platform.id); 
      toast({ title: `${platform.name} added. Please connect your account below.`});
    } else {
      toast({ title: `${platform.name} is already in your list.`, variant: "default"});
    }
    setPlatformSearchValue(""); 
    setOpenPlatformCombobox(false); 
  };

  const handleRemoveChannelFromConfiguration = (platformId: string) => {
    setConfiguredChannels(prev => prev.filter(p => p.id !== platformId));
    if (expandedChannelId === platformId) {
      setExpandedChannelId(null);
    }
    toast({ title: "Platform removed from list."});
  };

  const performConnectionAction = React.useCallback((channelId: string, currentStatus: ConfiguredSocialChannel['status']) => {
      let newStatus: ConfiguredSocialChannel['status'] = 'Connected';
      let toastTitle = "";
      let toastDescription = "";

      if (currentStatus === 'Disconnected') {
        toastTitle = `Connecting ${configuredChannels.find(c=>c.id===channelId)?.name}... (Simulation)`;
        toastDescription = "OAuth flow would happen here. Simulating successful connection.";
        newStatus = 'Connected';
      } else if (currentStatus === 'Needs Re-auth') {
        toastTitle = `Re-authenticating ${configuredChannels.find(c=>c.id===channelId)?.name}... (Simulation)`;
        toastDescription = "OAuth re-authentication flow would happen here. Simulating success.";
        newStatus = 'Connected';
      }
      
      // Simulate API call and then update
      setTimeout(() => {
        setConfiguredChannels(prev =>
          prev.map(channel => {
            if (channel.id === channelId) {
                return { ...channel, status: newStatus, accountIdentifier: channel.accountIdentifier || `${channel.name} User (Mock)` };
            }
            return channel;
          })
        );
        setExpandedChannelId(null); // Close panel after action
        toast({ title: toastTitle.replace('...', 'Success!'), description: toastDescription.replace('...', 'successful.') });
      }, 1000);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, configuredChannels]);


  const handleDisconnectChannel = (channelId: string) => {
    setConfiguredChannels(prev =>
      prev.map(channel =>
        channel.id === channelId ? { ...channel, status: 'Disconnected', accountIdentifier: undefined } : channel
      )
    );
    if (expandedChannelId === channelId) {
        setExpandedChannelId(null);
    }
    toast({ title: "Channel disconnected (simulation)." });
  };

  const handleToggleManageSection = (channelId: string) => {
    setExpandedChannelId(prevId => (prevId === channelId ? null : channelId));
  };


  const handleSaveSocialMediaConnections = () => {
    // For prototype, save the currently "configured" channels to localStorage to influence dashboard
    const channelsForDashboard = configuredChannels.filter(c => c.status === 'Connected').map(c => c.id);
    localStorage.setItem(LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY, JSON.stringify(channelsForDashboard));
    toast({
      title: "Social Account Preferences Saved",
      description: "Your preferences for dashboard visibility have been saved.",
      variant: "default",
    });
  };

  const handleSaveAiConfiguration = async () => {
    if (systemPassword !== "password123") { 
      toast({
        title: "Authentication Failed",
        description: "Incorrect system admin password.",
        variant: "destructive",
      });
      return;
    }
    const configData: AiConfigurationInput = {
      provider: selectedProvider,
      geminiApiKey: selectedProvider === 'gemini' ? geminiApiKey : undefined,
      openRouterApiKey: selectedProvider === 'openrouter' ? openRouterApiKey : undefined,
      openRouterModel: selectedProvider === 'openrouter' ? openRouterModelName : undefined,
    };
    const result = await handleUpdateAiConfigurationAction(configData);
    if (result.success) {
      toast({
        title: "AI Configuration Update Noted",
        description: (result.message || "Settings noted.") + " Please update your .env file and restart the server manually as instructed.",
        variant: "default",
        duration: 10000,
      });
    } else {
      let errorDescription = "An unknown error occurred.";
      if (typeof result.error === 'string') {
        errorDescription = result.error;
      } else if (result.error && 'flatten' in result.error) { 
        const flatError = (result.error as any).flatten();
        const fieldErrors = Object.entries(flatError.fieldErrors)
          .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
          .join('; ');
        errorDescription = `Validation failed. ${fieldErrors || 'Please check your input.'}`;
      }
      toast({
        title: "AI Configuration Update Failed",
        description: errorDescription,
        variant: "destructive",
      });
    }
    setSystemPassword(""); 
    setIsAiConfigModalOpen(false);
  };

  const handleSaveSmtpSettings = () => {
    let settingsToLog: any = { serviceProvider: selectedEmailService };
    switch (selectedEmailService) {
      case "generic_smtp":
        settingsToLog = { ...settingsToLog, smtpHost, smtpPort, smtpUser, smtpEncryption, smtpPassword: smtpPassword ? '********' : '' };
        break;
      case "gmail":
      case "outlook":
        settingsToLog = { ...settingsToLog, connectionMethod: "OAuth 2.0 (Simulated)" };
        break;
      case "ses":
        settingsToLog = { ...settingsToLog, sesAccessKey, sesSecretKey: sesSecretKey ? '********' : '', sesRegion, sesVerifiedIdentity };
        break;
      case "mailgun":
      case "sendgrid":
      case "postmark":
      case "brevo":
      case "mailjet":
      case "zoho_mail":
        settingsToLog = { ...settingsToLog, apiKey: apiKey ? '********' : '', apiSecret: apiSecret ? '********' : '', sendingDomain };
        break;
    }
    console.log("SMTP/Email Service Settings to save (simulation):", settingsToLog);
    toast({
      title: "Email Service Settings Saved (Simulation)",
      description: `Configuration for ${selectedEmailService.replace(/_/g, ' ').toUpperCase()} has been noted. In a real app, this would be securely saved to a backend.`,
      variant: "default",
    });
  };

  const getStatusBadgeVariant = (status: ConfiguredSocialChannel['status']): "default" | "secondary" | "destructive" | "outline" => {
    if (status === 'Connected') return 'default'; 
    if (status === 'Needs Re-auth') return 'destructive'; 
    return 'secondary'; 
  };


  return (
    <MainLayout pageTitle="System Configuration">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">System Configuration</CardTitle>
          <CardDescription>Manage global settings and configurations for MarketMaestro.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="ai-settings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-1 mb-6 h-auto">
              <TabsTrigger value="ai-settings" className="py-2 text-xs sm:text-sm"><Cpu className="mr-1 h-4 w-4 hidden sm:inline-block"/>AI Settings</TabsTrigger>
              <TabsTrigger value="smtp-settings" className="py-2 text-xs sm:text-sm"><Mailbox className="mr-1 h-4 w-4 hidden sm:inline-block"/>SMTP Settings</TabsTrigger>
              <TabsTrigger value="email-config" className="py-2 text-xs sm:text-sm"><Mail className="mr-1 h-4 w-4 hidden sm:inline-block"/>Email Config</TabsTrigger>
              <TabsTrigger value="social-accounts" className="py-2 text-xs sm:text-sm"><Share2Icon className="mr-1 h-4 w-4 hidden sm:inline-block"/>Social Accounts</TabsTrigger>
              <TabsTrigger value="storage-settings" className="py-2 text-xs sm:text-sm"><HardDrive className="mr-1 h-4 w-4 hidden sm:inline-block"/>Storage Settings</TabsTrigger>
              <TabsTrigger value="user-management" className="py-2 text-xs sm:text-sm"><UsersIconLucide className="mr-1 h-4 w-4 hidden sm:inline-block"/>User Management</TabsTrigger>
              <TabsTrigger value="notifications" className="py-2 text-xs sm:text-sm"><BellIcon className="mr-1 h-4 w-4 hidden sm:inline-block"/>Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="ai-settings">
              <div className="space-y-6 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-primary" />
                  Generative AI Provider
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="aiProvider">AI Provider</Label>
                  <Select value={selectedProvider} onValueChange={(value) => setSelectedProvider(value as AiProvider)}>
                    <SelectTrigger id="aiProvider" className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select AI Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">Google Gemini (Default)</SelectItem>
                      <SelectItem value="openrouter">OpenRouter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedProvider === 'gemini' && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <Label htmlFor="geminiApiKey">Google Gemini API Key</Label>
                    <Input
                      id="geminiApiKey"
                      type="password"
                      placeholder="Enter your Gemini API Key"
                      value={geminiApiKey}
                      onChange={(e) => setGeminiApiKey(e.target.value)}
                    />
                  </div>
                )}

                {selectedProvider === 'openrouter' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="openRouterApiKey">OpenRouter API Key</Label>
                      <Input
                        id="openRouterApiKey"
                        type="password"
                        placeholder="Enter your OpenRouter API Key (e.g., sk-or-...) "
                        value={openRouterApiKey}
                        onChange={(e) => setOpenRouterApiKey(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="openRouterModelName">OpenRouter Model Name</Label>
                      <Input
                        id="openRouterModelName"
                        placeholder="e.g., openai/gpt-4o, anthropic/claude-3-opus"
                        value={openRouterModelName}
                        onChange={(e) => setOpenRouterModelName(e.target.value)}
                      />
                       <p className="text-xs text-muted-foreground">
                        Specify the model identifier from OpenRouter.
                        Refer to <a href="https://openrouter.ai/docs" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">OpenRouter documentation <ExternalLink className="inline-block h-3 w-3 ml-0.5"/></a> for available models and pricing.
                      </p>
                    </div>
                  </div>
                )}
                 <Alert variant="default" className="bg-background/70">
                  <AlertCircleIcon className="h-4 w-4 text-accent" />
                  <AlertTitle className="text-accent-foreground">Model Costs & Configuration</AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    Using models via OpenRouter may incur costs. Please review the pricing for your selected model on OpenRouter.
                    Note: Genkit configuration in <code>src/ai/genkit.ts</code> has been updated to read provider and model details from the <code>.env</code> file.
                  </AlertDescription>
                </Alert>
                 <Dialog open={isAiConfigModalOpen} onOpenChange={setIsAiConfigModalOpen}>
                    <DialogTrigger asChild>
                        <Button>Save AI Configuration</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                        <DialogTitle>Confirm AI Configuration Update</DialogTitle>
                        <DialogDescription>
                            Please enter the system admin password to apply these changes.
                            You will be prompted with instructions to update your <code>.env</code> file, and the server will need to be restarted manually after that.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-3">
                            <Label htmlFor="systemPassword">System Admin Password</Label>
                            <Input
                                id="systemPassword"
                                type="password"
                                value={systemPassword}
                                onChange={(e) => setSystemPassword(e.target.value)}
                                placeholder="Enter admin password"
                            />
                        </div>
                        <DialogFooter className="sm:justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleSaveAiConfiguration} disabled={!systemPassword.trim()}>
                            Confirm & Apply
                        </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              </div>
            </TabsContent>

            <TabsContent value="smtp-settings">
               <div className="space-y-6 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Mailbox className="mr-2 h-5 w-5 text-primary" />
                  Email Sending Service
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure how the platform will send emails (e.g., campaign emails, notifications).
                </p>

                <div className="space-y-2">
                  <Label htmlFor="emailServiceProvider">Email Service Provider</Label>
                  <Select value={selectedEmailService} onValueChange={(value) => setSelectedEmailService(value as EmailServiceProvider)}>
                    <SelectTrigger id="emailServiceProvider" className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select a service provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="generic_smtp">Generic SMTP Server</SelectItem>
                      <SelectItem value="gmail">Gmail / Google Workspace</SelectItem>
                      <SelectItem value="outlook">Microsoft Outlook / Office 365</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="postmark">Postmark</SelectItem>
                      <SelectItem value="brevo">Brevo (Sendinblue)</SelectItem>
                      <SelectItem value="mailjet">Mailjet</SelectItem>
                      <SelectItem value="zoho_mail">Zoho Mail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedEmailService === "generic_smtp" && (
                  <div className="space-y-4 p-4 border rounded-md mt-4 animate-in fade-in duration-300">
                    <h4 className="font-medium">Generic SMTP Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input id="smtpHost" placeholder="e.g., smtp.example.com" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input id="smtpPort" type="number" placeholder="e.g., 587 or 465" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="smtpUser">SMTP Username</Label>
                        <Input id="smtpUser" placeholder="e.g., your_email@example.com" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="smtpPassword">SMTP Password</Label>
                        <Input id="smtpPassword" type="password" placeholder="Enter SMTP password" value={smtpPassword} onChange={(e) => setSmtpPassword(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1.5 md:max-w-[300px]">
                      <Label htmlFor="smtpEncryption">Encryption</Label>
                      <Select value={smtpEncryption} onValueChange={setSmtpEncryption}>
                        <SelectTrigger id="smtpEncryption">
                          <SelectValue placeholder="Select encryption type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="ssl">SSL/TLS</SelectItem>
                          <SelectItem value="starttls">STARTTLS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {(selectedEmailService === "gmail" || selectedEmailService === "outlook") && (
                  <div className="space-y-4 p-4 border rounded-md mt-4 animate-in fade-in duration-300">
                    <h4 className="font-medium">Connect via OAuth 2.0 (Recommended)</h4>
                    <p className="text-sm text-muted-foreground">
                      For {selectedEmailService === "gmail" ? "Gmail/Google Workspace" : "Microsoft Outlook/Office 365"}, connecting via OAuth is more secure.
                    </p>
                    <Button variant="outline" onClick={() => toast({ title: "OAuth Connection (Simulation)", description: `Redirecting to ${selectedEmailService === "gmail" ? "Google" : "Microsoft"} for authorization...` })}>
                      <Link2IconLucide className="mr-2 h-4 w-4"/> Connect with {selectedEmailService === "gmail" ? "Google" : "Microsoft"}
                    </Button>
                    <p className="text-sm">Status: <Badge variant="secondary">Not Connected (Simulation)</Badge></p>
                  </div>
                )}

                {selectedEmailService === "ses" && (
                   <div className="space-y-4 p-4 border rounded-md mt-4 animate-in fade-in duration-300">
                    <h4 className="font-medium">Amazon SES Configuration</h4>
                    <div className="space-y-1.5">
                        <Label htmlFor="sesAccessKey">Access Key ID</Label>
                        <Input id="sesAccessKey" placeholder="Your AWS Access Key ID" value={sesAccessKey} onChange={e => setSesAccessKey(e.target.value)} />
                    </div>
                     <div className="space-y-1.5">
                        <Label htmlFor="sesSecretKey">Secret Access Key</Label>
                        <Input id="sesSecretKey" type="password" placeholder="Your AWS Secret Access Key" value={sesSecretKey} onChange={e => setSesSecretKey(e.target.value)}/>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="sesRegion">AWS Region</Label>
                        <Select value={sesRegion} onValueChange={setSesRegion}>
                            <SelectTrigger id="sesRegion"> <SelectValue placeholder="Select AWS Region"/> </SelectTrigger>
                            <SelectContent> {awsRegions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)} </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="sesVerifiedIdentity">Verified Sending Email/Domain</Label>
                        <Input id="sesVerifiedIdentity" placeholder="e.g., noreply@yourdomain.com" value={sesVerifiedIdentity} onChange={e => setSesVerifiedIdentity(e.target.value)}/>
                         <p className="text-xs text-muted-foreground">Ensure this email/domain is verified in AWS SES.</p>
                    </div>
                    <Button variant="outline" onClick={() => toast({ title: "Verify SES (Simulation)", description: "Checking SES configuration..."})}>Verify & Save SES Configuration</Button>
                  </div>
                )}

                {["mailgun", "sendgrid", "postmark", "brevo", "mailjet", "zoho_mail"].includes(selectedEmailService) && (
                  <div className="space-y-4 p-4 border rounded-md mt-4 animate-in fade-in duration-300">
                    <h4 className="font-medium">Configure with API Key: {selectedEmailService.replace(/_/g, ' ').toUpperCase()}</h4>
                     <div className="space-y-1.5">
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input id="apiKey" type="password" placeholder={`Enter ${selectedEmailService.replace(/_/g, ' ').toUpperCase()} API Key`} value={apiKey} onChange={e => setApiKey(e.target.value)} />
                    </div>
                    {(selectedEmailService === "mailgun" || selectedEmailService === "sendgrid" || selectedEmailService === "brevo") &&
                        <div className="space-y-1.5">
                            <Label htmlFor="sendingDomain">Sending Domain (Recommended)</Label>
                            <Input id="sendingDomain" placeholder="e.g., mg.yourdomain.com" value={sendingDomain} onChange={e => setSendingDomain(e.target.value)}/>
                        </div>
                    }
                     <div className="space-y-1.5">
                        <Label htmlFor="apiSecret">API Secret / Password (Optional)</Label>
                        <Input id="apiSecret" type="password" placeholder="If provider requires a secret" value={apiSecret} onChange={e => setApiSecret(e.target.value)}/>
                    </div>
                     <p className="text-xs text-muted-foreground">
                        Refer to your <a href="#" className="underline hover:text-primary" onClick={(e) => {e.preventDefault(); toast({title:"Documentation", description:"Link to specific provider docs would go here."})}}>{selectedEmailService.replace(/_/g, ' ').toUpperCase()} documentation <ExternalLink className="inline-block h-3 w-3 ml-0.5"/></a> for API key details.
                    </p>
                    <Button variant="outline" onClick={() => toast({ title: `Verify ${selectedEmailService.toUpperCase()} (Simulation)`, description: "Checking API key..."})}>Verify & Save API Key</Button>
                  </div>
                )}
                <Button onClick={handleSaveSmtpSettings} className="mt-6">Save Email Service Settings</Button>
              </div>
            </TabsContent>

            <TabsContent value="email-config">
              <div className="space-y-4 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  General Email Settings
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure default sender information and global footers.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="defaultFromName">Default Sender Name</Label>
                  <Input id="defaultFromName" placeholder="Your Brand Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultFromEmail">Default Sender Email</Label>
                  <Input id="defaultFromEmail" type="email" placeholder="noreply@yourbrand.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="globalEmailFooter">Global Email Footer Text/HTML (Optional)</Label>
                  <Textarea id="globalEmailFooter" rows={3} placeholder="e.g., © 2024 Your Company. All rights reserved. ..." />
                </div>
                 <Button onClick={() => toast({title: "Email Settings Saved", description:"General email settings saved (simulation)."})} className="mt-4">Save Email Settings</Button>
              </div>
            </TabsContent>

            <TabsContent value="social-accounts">
              <div className="space-y-4 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Share2Icon className="h-5 w-5 mr-2 text-primary" />
                  Social Media Account Connections
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Manage which social media accounts are connected and their settings. Changes saved here can influence dashboard visibility.
                </p>
                <div className="space-y-2">
                    <Label htmlFor="platformCombobox">Add Platform to Manage</Label>
                    <Popover open={openPlatformCombobox} onOpenChange={setOpenPlatformCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          id="platformCombobox"
                          aria-expanded={openPlatformCombobox}
                          className="w-full md:w-[300px] justify-between"
                        >
                          {platformSearchValue && availableSocialPlatforms.find(p => p.name.toLowerCase() === platformSearchValue.toLowerCase())?.name
                            || "Select platform..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search platform..."
                            value={platformSearchValue}
                            onValueChange={setPlatformSearchValue}
                          />
                          <CommandEmpty>No platform found.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {availableSocialPlatforms
                                .filter(p => !configuredChannels.find(cp => cp.id === p.id))
                                .map((platform) => (
                                <CommandItem
                                  key={platform.id}
                                  value={platform.name}
                                  onSelect={() => {
                                    handleAddPlatformToConfiguredList(platform);
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  {platform.icon}
                                  {platform.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                {configuredChannels.length > 0 ? (
                  <ScrollArea className="h-auto max-h-[60vh] mt-4 border rounded-md">
                    <div className="p-3 space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Configured Channels:</h4>
                      {configuredChannels.map((channel) => (
                        <div key={channel.id} className="flex flex-col p-3 border rounded-md hover:bg-muted/50 gap-2">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
                                <div className="flex items-center gap-2 flex-grow">
                                    {channel.icon}
                                    <div className="flex-1">
                                        <span className="font-medium text-sm">{channel.name}</span>
                                        <p className="text-xs text-muted-foreground break-words">
                                            {channel.status === 'Connected' ? channel.accountIdentifier || 'Account Connected' : channel.status === 'Needs Re-auth' ? 'Needs Re-authentication' : 'Not Connected'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                                    <Badge variant={getStatusBadgeVariant(channel.status)} className="text-xs">
                                        {channel.status}
                                    </Badge>
                                    {channel.status === 'Disconnected' && (
                                      <Button variant="default" size="sm" onClick={() => handleToggleManageSection(channel.id)}>Connect</Button>
                                    )}
                                    {channel.status === 'Connected' && (
                                    <>
                                        <Button variant="ghost" size="sm" onClick={() => handleToggleManageSection(channel.id)}>Manage</Button>
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80" onClick={() => handleDisconnectChannel(channel.id)}>Disconnect</Button>
                                    </>
                                    )}
                                    {channel.status === 'Needs Re-auth' && (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => handleToggleManageSection(channel.id)}
                                        className="bg-muted hover:bg-card border border-accent text-primary-foreground"
                                    >
                                        Re-authenticate
                                    </Button>
                                    )}
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90 h-8 w-8" onClick={() => handleRemoveChannelFromConfiguration(channel.id)} title={`Remove ${channel.name}`}>
                                    <Trash2 className="h-4 w-4"/>
                                    <span className="sr-only">Remove {channel.name}</span>
                                    </Button>
                                </div>
                            </div>

                            {expandedChannelId === channel.id && (
                            <div className="mt-3 pt-3 border-t border-dashed bg-muted/30 p-3 rounded-b-md animate-in fade-in duration-300">
                                {(channel.status === 'Disconnected' || channel.status === 'Needs Re-auth') && (
                                  <>
                                    <h4 className="text-sm font-semibold mb-2 text-foreground">
                                        {channel.status === 'Disconnected' ? `Connect to ${channel.name}` : `Re-authenticate with ${channel.name}`}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mb-1">This will simulate an OAuth 2.0 flow. We will request permissions for (example):</p>
                                    {channel.oauthPermissionsExample && channel.oauthPermissionsExample.length > 0 && (
                                      <ul className="list-disc list-inside text-xs text-muted-foreground pl-2 mb-3">
                                        {channel.oauthPermissionsExample.map(perm => <li key={perm}>{perm}</li>)}
                                      </ul>
                                    )}
                                     <div className="space-y-3 my-3">
                                        <div>
                                            <Label htmlFor={`apiKey-${channel.id}`} className="text-xs">API Key (if applicable)</Label>
                                            <Input id={`apiKey-${channel.id}`} placeholder="Enter API Key (optional)" className="h-8 text-xs mt-0.5"/>
                                        </div>
                                        <div>
                                            <Label htmlFor={`appId-${channel.id}`} className="text-xs">App ID / Client ID (if applicable)</Label>
                                            <Input id={`appId-${channel.id}`} placeholder="Enter App ID (optional)" className="h-8 text-xs mt-0.5"/>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Note: Most connections are via OAuth. Enter details above only if specifically required by the platform's alternative connection method.</p>
                                    </div>
                                    <Button
                                      variant="default"
                                      className="w-full"
                                      onClick={() => performConnectionAction(channel.id, channel.status)}
                                    >
                                      {channel.status === 'Disconnected' ? <Link2IconLucide className="mr-2 h-4 w-4" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                                       Proceed to {channel.status === 'Disconnected' ? `Connect with ${channel.name}` : `Re-authenticate ${channel.name}`}
                                    </Button>
                                  </>
                                )}
                                {channel.status === 'Connected' && (
                                  <>
                                    <h4 className="text-sm font-semibold mb-2 text-foreground">Connection Details for {channel.name}</h4>
                                    <div className="space-y-3 text-xs">
                                        <div className="space-y-1">
                                            <Label className="text-xs text-muted-foreground">Connected Account</Label>
                                            <p className="text-sm font-medium bg-background/70 p-2 rounded-md break-words">
                                                {channel.accountIdentifier || "N/A"}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-muted-foreground">Permissions Granted (Mock)</Label>
                                            <div className="text-xs bg-background/70 p-2 rounded-md leading-relaxed break-words">
                                                Standard permissions for posting, reading engagement, and managing insights have been granted (simulation).
                                                Specific permissions vary by platform and are handled during the OAuth connection process.
                                                {(channel.oauthPermissionsExample && channel.oauthPermissionsExample.length > 0) && (
                                                  <> <br/>Example requested scopes might include: {channel.oauthPermissionsExample.join(', ')}.</>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-muted-foreground">Connected Since</Label>
                                            <p className="text-sm font-medium bg-background/70 p-2 rounded-md break-words">
                                                January 1, 2024 (Mock)
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`customApiEndpoint-${channel.id}`} className="text-xs text-muted-foreground">Custom API Endpoint (Optional)</Label>
                                            <Input id={`customApiEndpoint-${channel.id}`} placeholder="e.g., https://graph.facebook.com/v18.0" className="text-xs h-8"/>
                                            <p className="text-xs text-muted-foreground">For advanced users with specific API needs (not functional).</p>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-2">
                                            <Button type="button" variant="outline" size="sm" onClick={() => toast({ title: "Refresh Connection (Simulated)", description: `Attempting to refresh connection for ${channel.name}...`})}>
                                                <RefreshCw className="mr-2 h-4 w-4"/> Refresh
                                            </Button>
                                            <Button type="button" variant="outline" size="sm" onClick={() => toast({ title: "View Platform Settings (Simulated)", description: `Opening ${channel.name} settings (not implemented).`})}>
                                                <ExternalLink className="mr-2 h-4 w-4"/> View on {channel.name}
                                            </Button>
                                        </div>
                                    </div>
                                  </>
                                )}
                            </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-sm text-muted-foreground mt-4 text-center py-4 border border-dashed rounded-md">
                    No platforms configured yet. Add platforms using the selector above.
                  </p>
                )}

                 <Button onClick={handleSaveSocialMediaConnections} className="mt-6">Save Dashboard Preferences</Button>
                 <p className="text-xs text-muted-foreground mt-2">This saves which channels (and their connection status) are considered for dashboard visibility and posting. Only 'Connected' channels will be fully active.</p>
              </div>
            </TabsContent>

            <TabsContent value="storage-settings">
              <div className="space-y-4 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <HardDrive className="mr-2 h-5 w-5 text-primary" />
                  Storage Settings
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure where your media assets and other large files will be stored. (Placeholder)
                </p>
                <div className="space-y-2">
                  <Label htmlFor="storageProvider">Storage Provider</Label>
                  <Select disabled>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select storage provider (e.g., Firebase Storage, AWS S3)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="firebase_storage">Firebase Cloud Storage</SelectItem>
                      <SelectItem value="aws_s3">Amazon S3</SelectItem>
                      <SelectItem value="local">Local Server Storage (Not recommended for production)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">Configuration options for the selected provider would appear here.</p>
                <Button variant="outline" disabled>Configure Storage</Button>
              </div>
            </TabsContent>

            <TabsContent value="user-management">
              <div className="space-y-4 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <UsersIconLucide className="h-5 w-5 mr-2 text-primary" />
                  User Management
                </h3>
                <Button variant="outline" onClick={() => window.location.href='/admin/team-management'}>
                  Go to Team Management Page
                </Button>
                 <p className="text-xs text-muted-foreground mt-1">Invite, remove, and manage roles for team members who can access this MarketMaestro instance.</p>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="space-y-4 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <BellIcon className="h-5 w-5 mr-2 text-primary" />
                  Notification Settings
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure system-wide notification preferences for events like post failures, approvals, or significant engagement spikes. (Placeholder)
                </p>
                <Button variant="outline" onClick={() => toast({title: "Configure Notifications", description:"This feature is not implemented yet."})}>Configure Notifications</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
