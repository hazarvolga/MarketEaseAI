
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
  Cpu,
  Link2 as Link2IconLucide,
  Mailbox,
  PlusCircle as PlusCircleIcon,
  Check,
  ChevronsUpDown,
  ListChecks,
  ExternalLink,
  Search,
  Trash2,
  Bell as BellIcon,
  AlertCircle as AlertCircleIcon,
  RefreshCw,
  Share2 as Share2Icon,
  Building,
  ImageIcon as ImageIconLucide,
  Youtube,
  HardDrive,
  Database,
  Cloud,
  BoxIcon as Box,
  Server,
  KeyRound,
  FileCog,
  UsersRound,
  Mail,
  Settings as SettingsIcon,
  Send as SendIcon,
  ServerCog,
  PanelLeft,
  Eye,
  SlidersHorizontal,
  Users as UsersIconLucide,
  Briefcase,
  Smartphone,
  Plug,
  BarChartBig,
  LayoutDashboard, // Added for Brand Profile link
  CheckCircle, // For connected status
  XCircle, // For disconnected status
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
import type { AiConfigurationInput } from "./actions"; // Assuming this type is still relevant
import { handleUpdateAiConfigurationAction } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


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


type AiProvider = "gemini" | "openrouter" | "openai" | "anthropic";

interface EmailServiceProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const emailServiceProviders: EmailServiceProvider[] = [
  { id: "generic_smtp", name: "Generic SMTP Server", icon: <ServerCog className="h-5 w-5 text-muted-foreground" /> },
  { id: "gmail", name: "Gmail / Google Workspace", icon: <Mail className="h-5 w-5 text-red-500" /> },
  { id: "outlook", name: "Microsoft Outlook / Office 365", icon: <Mail className="h-5 w-5 text-blue-500" /> },
  { id: "ses", name: "Amazon SES", icon: <Database className="h-5 w-5 text-orange-500" /> },
  { id: "mailgun", name: "Mailgun", icon: <SendIcon className="h-5 w-5 text-red-600" /> },
  { id: "sendgrid", name: "SendGrid", icon: <SendIcon className="h-5 w-5 text-sky-500" /> },
  { id: "postmark", name: "Postmark", icon: <Mailbox className="h-5 w-5 text-black dark:text-white" /> },
  { id: "resend", name: "Resend", icon: <SendIcon className="h-5 w-5 text-slate-500" /> },
  { id: "brevo", name: "Brevo (Sendinblue)", icon: <SendIcon className="h-5 w-5 text-teal-500" /> },
  { id: "mailjet", name: "Mailjet", icon: <SendIcon className="h-5 w-5 text-yellow-500" /> },
  { id: "zoho_mail", name: "Zoho Mail", icon: <Mail className="h-5 w-5 text-orange-600" /> },
];


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

interface ConfiguredSocialChannel extends AvailableSocialPlatform {
  status: 'Connected' | 'Disconnected' | 'Needs Re-auth';
  accountIdentifier?: string;
}

const awsRegions = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "af-south-1", "ap-east-1", "ap-south-1", "ap-northeast-2",
  "ap-southeast-1", "ap-southeast-2", "ap-northeast-1",
  "ca-central-1", "eu-central-1", "eu-west-1", "eu-west-2",
  "eu-south-1", "eu-west-3", "eu-north-1", "me-south-1", "sa-east-1"
];

const LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY = 'marketMaestroDashboardChannels';

interface StorageProviderConfigField {
  id: string;
  label: string;
  type: 'text' | 'password' | 'select';
  placeholder?: string;
  options?: string[];
}
interface StorageProviderOption {
  id: string;
  name: string;
  icon?: React.ReactNode;
  configFields: StorageProviderConfigField[];
}

const availableStorageProviders: StorageProviderOption[] = [
  {
    id: "firebase_storage",
    name: "Firebase Cloud Storage",
    icon: <Database className="h-4 w-4 text-yellow-500" />,
    configFields: [
      { id: "projectId", label: "Firebase Project ID", type: "text", placeholder: "your-firebase-project-id" },
      { id: "bucketName", label: "Storage Bucket Name", type: "text", placeholder: "your-project-id.appspot.com" },
      { id: "serviceAccount", label: "Service Account JSON (Path or Content)", type: "password", placeholder: "Paste JSON or path to file" },
    ],
  },
  {
    id: "aws_s3",
    name: "Amazon S3",
    icon: <Database className="h-4 w-4 text-orange-500" />,
    configFields: [
      { id: "accessKeyId", label: "AWS Access Key ID", type: "text", placeholder: "AKIAIOSFODNN7EXAMPLE" },
      { id: "secretAccessKey", label: "AWS Secret Access Key", type: "password", placeholder: "Your Secret Key" },
      { id: "bucketName", label: "S3 Bucket Name", type: "text", placeholder: "your-s3-bucket-name" },
      { id: "region", label: "AWS Region", type: "select", options: awsRegions },
    ],
  },
  {
    id: "cloudinary",
    name: "Cloudinary",
    icon: <ImageIconLucide className="h-4 w-4 text-blue-400" />,
    configFields: [
      { id: "cloudName", label: "Cloud Name", type: "text", placeholder: "your-cloud-name" },
      { id: "apiKey", label: "API Key", type: "text", placeholder: "Your Cloudinary API Key" },
      { id: "apiSecret", label: "API Secret", type: "password", placeholder: "Your Cloudinary API Secret" },
    ],
  },
  {
    id: "google_drive",
    name: "Google Drive",
    icon: <Cloud className="h-4 w-4 text-green-500" />,
    configFields: [
      { id: "clientId", label: "Google Client ID", type: "text", placeholder: "Your Google Client ID" },
      { id: "clientSecret", label: "Google Client Secret", type: "password", placeholder: "Your Google Client Secret" },
      { id: "folderId", label: "Default Folder ID (Optional)", type: "text", placeholder: "Optional root folder ID" },
    ],
  },
  {
    id: "onedrive",
    name: "Microsoft OneDrive",
    icon: <Cloud className="h-4 w-4 text-sky-500" />,
    configFields: [
      { id: "clientId", label: "Microsoft App (Client) ID", type: "text", placeholder: "Your Microsoft App ID" },
      { id: "clientSecret", label: "Microsoft App Secret", type: "password", placeholder: "Your Microsoft App Secret" },
      { id: "tenantId", label: "Microsoft Tenant ID (Optional)", type: "text", placeholder: "Optional Tenant ID" },
    ],
  },
  {
    id: "dropbox",
    name: "Dropbox",
    icon: <Box className="h-4 w-4 text-blue-500" />,
    configFields: [
      { id: "appKey", label: "Dropbox App Key", type: "text", placeholder: "Your Dropbox App Key" },
      { id: "appSecret", label: "Dropbox App Secret", type: "password", placeholder: "Your Dropbox App Secret" },
    ],
  },
  {
    id: "box_storage",
    name: "Box",
    icon: <Box className="h-4 w-4 text-blue-700" />,
    configFields: [
      { id: "clientId", label: "Box Client ID", type: "text", placeholder: "Your Box Client ID" },
      { id: "clientSecret", label: "Box Client Secret", type: "password", placeholder: "Your Box Client Secret" },
    ],
  },
  {
    id: "backblaze_b2",
    name: "Backblaze B2",
    icon: <Server className="h-4 w-4 text-red-700" />,
    configFields: [
      { id: "applicationKeyId", label: "Application Key ID", type: "text", placeholder: "Your B2 Key ID" },
      { id: "applicationKey", label: "Application Key", type: "password", placeholder: "Your B2 Application Key" },
      { id: "bucketName", label: "Bucket Name", type: "text", placeholder: "Your B2 Bucket Name" },
      { id: "bucketId", label: "Bucket ID (Optional)", type: "text", placeholder: "Optional Bucket ID" },
    ],
  },
  {
    id: "local_server",
    name: "Local Server Storage",
    icon: <HardDrive className="h-4 w-4 text-gray-500" />,
    configFields: [
      { id: "storagePath", label: "Storage Path", type: "text", placeholder: "/var/www/myapp/storage" },
      { id: "baseUrl", label: "Public Base URL (Optional)", type: "text", placeholder: "https://cdn.example.com/media" },
    ],
  },
];

interface IntegrationPlaceholder {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    type?: 'cms' | 'crm' | 'analytics' | 'other';
}

const integrationPlaceholders: IntegrationPlaceholder[] = [
    { id: 'strapi', name: 'Strapi (CMS)', icon: <FileCog className="h-6 w-6 text-purple-600"/>, description: "Sync content from your Strapi CMS for AI suggestions and asset management.", type: 'cms' },
    { id: 'wordpress', name: 'WordPress (CMS)', icon: <FileCog className="h-6 w-6 text-blue-500"/>, description: "Integrate with your WordPress site to pull blog posts and pages.", type: 'cms' },
    { id: 'hubspot', name: 'HubSpot (CRM)', icon: <UsersRound className="h-6 w-6 text-orange-500"/>, description: "Sync contacts and company data from HubSpot for targeted campaigns.", type: 'crm' },
    { id: 'ga', name: 'Google Analytics', icon: <BarChartBig className="h-6 w-6 text-yellow-500"/>, description: "Track campaign performance and website traffic more effectively.", type: 'analytics' },
];


export default function SystemConfigurationPage() {
  const [selectedProvider, setSelectedProvider] = React.useState<AiProvider>("gemini");
  const [geminiApiKey, setGeminiApiKey] = React.useState("");
  const [geminiModelName, setGeminiModelName] = React.useState("gemini-1.0-pro"); // Updated default
  const [openRouterApiKey, setOpenRouterApiKey] = React.useState("");
  const [openRouterModelName, setOpenRouterModelName] = React.useState("");
  const [openAiApiKey, setOpenAiApiKey] = React.useState("");
  const [openAiModelName, setOpenAiModelName] = React.useState("gpt-4o");
  const [anthropicApiKey, setAnthropicApiKey] = React.useState("");
  const [anthropicModelName, setAnthropicModelName] = React.useState("claude-3-opus-20240229");

  const [systemPassword, setSystemPassword] = React.useState("");
  const [isAiConfigModalOpen, setIsAiConfigModalOpen] = React.useState(false);

  const [selectedEmailService, setSelectedEmailService] = React.useState<string>(emailServiceProviders[0].id);
  const [smtpHost, setSmtpHost] = React.useState("");
  const [smtpPort, setSmtpPort] = React.useState("");
  const [smtpUser, setSmtpUser] = React.useState("");
  const [smtpPassword, setSmtpPassword] = React.useState("");
  const [smtpEncryption, setSmtpEncryption] = React.useState("tls");
  const [apiKey, setApiKey] = React.useState(""); 
  const [apiSecret, setApiSecret] = React.useState(""); 
  const [sesAccessKey, setSesAccessKey] = React.useState("");
  const [sesSecretKey, setSesSecretKey] = React.useState("");
  const [sesRegion, setSesRegion] = React.useState("us-east-1");
  const [sesVerifiedIdentity, setSesVerifiedIdentity] = React.useState("");
  const [sendingDomain, setSendingDomain] = React.useState(""); 

  const [configuredDashboardChannels, setConfiguredDashboardChannels] = React.useState<string[]>([]);
  const [configuredSocialAccounts, setConfiguredSocialAccounts] = React.useState<ConfiguredSocialChannel[]>([]);
  const [openPlatformCombobox, setOpenPlatformCombobox] = React.useState(false);
  const [platformSearchValue, setPlatformSearchValue] = React.useState("");
  const [expandedChannelId, setExpandedChannelId] = React.useState<string | null>(null);
  
  const [selectedStorageProviderId, setSelectedStorageProviderId] = React.useState<string | null>(null);
  const [storageConfigInputs, setStorageConfigInputs] = React.useState<Record<string, string>>({});
  const [isStorageProviderPopoverOpen, setIsStorageProviderPopoverOpen] = React.useState(false);
  const [storageProviderSearchValue, setStorageProviderSearchValue] = React.useState("");
  const [integrationStatuses, setIntegrationStatuses] = React.useState<Record<string, boolean>>({});


  const { toast } = useToast();

   React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDashboardPreference = localStorage.getItem(LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY);
      if (storedDashboardPreference) {
        try {
          const parsedPreferences: ConfiguredSocialChannel[] = JSON.parse(storedDashboardPreference);
          setConfiguredSocialAccounts(parsedPreferences);
        } catch (e) {
          console.error("Failed to parse social media preferences from localStorage", e);
          // Initialize with some defaults if parsing fails or nothing stored
          const defaultConnected = availableSocialPlatforms.slice(0, 2).map(p => ({
             ...p,
             status: 'Disconnected', // Start as disconnected
             accountIdentifier: undefined
          }));
          setConfiguredSocialAccounts(defaultConnected);
        }
      } else {
         const defaultPlatforms = availableSocialPlatforms.slice(0, 2).map(p => ({
           ...p,
           status: 'Disconnected',
           accountIdentifier: undefined
         }));
         setConfiguredSocialAccounts(defaultPlatforms);
      }
    }
  }, []);
  
  const handleAddPlatformToConfiguredList = (platform: AvailableSocialPlatform) => {
    if (!configuredSocialAccounts.find(p => p.id === platform.id)) {
      const newChannel: ConfiguredSocialChannel = { ...platform, status: 'Disconnected', accountIdentifier: undefined };
      setConfiguredSocialAccounts(prev => [...prev, newChannel].sort((a,b) => a.name.localeCompare(b.name)));
      setExpandedChannelId(null); // Don't auto-expand, let user click connect
      toast({ title: `${platform.name} added to your channels list. Click 'Connect' to proceed.`});
    } else {
      toast({ title: `${platform.name} is already in your list.`, variant: "default"});
    }
    setPlatformSearchValue("");
    setOpenPlatformCombobox(false);
  };

  const handleRemoveChannelFromConfiguration = (platformId: string) => {
    setConfiguredSocialAccounts(prev => prev.filter(p => p.id !== platformId));
    if (expandedChannelId === platformId) {
      setExpandedChannelId(null);
    }
    toast({ title: "Platform removed from configuration."});
  };

 const performConnectionAction = React.useCallback((channelId: string, actionType: 'Connect' | 'Re-authenticate') => {
    let toastTitle = "";
    let newStatus: ConfiguredSocialChannel['status'] = 'Disconnected';
    let newAccountIdentifier: string | undefined = undefined;
    const channel = configuredSocialAccounts.find(c => c.id === channelId);
    if (!channel) return;

    switch (actionType) {
      case 'Connect':
        toastTitle = `Connecting ${channel.name}...`;
        newStatus = 'Connected';
        newAccountIdentifier = `${channel.name} User (Mock)`;
        break;
      case 'Re-authenticate':
        toastTitle = `Re-authenticating ${channel.name}...`;
        newStatus = 'Connected';
        newAccountIdentifier = channel.accountIdentifier || `${channel.name} User (Mock)`;
        break;
    }
    
    setTimeout(() => { // Simulate API call
      setConfiguredSocialAccounts(prevChannels =>
        prevChannels.map(ch =>
          ch.id === channelId ? { ...ch, status: newStatus, accountIdentifier: newAccountIdentifier } : ch
        )
      );
      setExpandedChannelId(null); // Close panel after action
      toast({ title: `${toastTitle.replace('...','')} (Simulation Successful)` });
    }, 500);
  }, [configuredSocialAccounts, toast]);


  const handleToggleChannelStatus = (channelId: string, currentStatus: ConfiguredSocialChannel['status']) => {
    if (currentStatus === 'Connected') { // Disconnect action
        setConfiguredSocialAccounts(prev =>
            prev.map(ch => ch.id === channelId ? { ...ch, status: 'Disconnected', accountIdentifier: undefined } : ch)
        );
        if (expandedChannelId === channelId) setExpandedChannelId(null);
        setTimeout(() => toast({ title: `Channel disconnected (Simulation).` }),0);
    } else { // Connect or Re-authenticate action (will be handled inside the expanded panel)
        // This function is now primarily for direct disconnect or triggering re-auth state.
        // The actual "connect/re-auth" happens via performConnectionAction from within the panel.
        if (currentStatus === 'Needs Re-auth') {
             // This is just an example to show how to trigger re-auth state, 
             // actual re-auth would be via performConnectionAction
             setConfiguredSocialAccounts(prev =>
                prev.map(ch => ch.id === channelId ? { ...ch, status: 'Needs Re-auth' } : ch)
            );
            setExpandedChannelId(channelId); // Keep panel open for re-auth
            setTimeout(() => toast({ title: `${configuredSocialAccounts.find(c=>c.id===channelId)?.name} needs re-authentication.`, variant: "default" }),0);
        }
    }
  };

  const handleToggleManageSection = (channelId: string) => {
    setExpandedChannelId(prevId => prevId === channelId ? null : channelId);
  };

  const handleSaveSocialMediaDashboardPreferences = () => {
    // Save the whole configuredSocialAccounts array which includes status, id, name, icon etc.
    // The dashboard will then filter by status === 'Connected'
    localStorage.setItem(LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY, JSON.stringify(configuredSocialAccounts));
    toast({
      title: "Social Media Preferences Saved",
      description: "Your list of configured social media channels and their statuses has been saved.",
      variant: "default",
    });
  };

  const handleSaveAiConfiguration = async () => {
    const configData : AiConfigurationInput = {
      provider: selectedProvider as AiConfigurationInput['provider'], 
      geminiApiKey: selectedProvider === 'gemini' ? geminiApiKey : undefined,
      openRouterApiKey: selectedProvider === 'openrouter' ? openRouterApiKey : undefined,
      openRouterModel: selectedProvider === 'openrouter' ? openRouterModelName : undefined,
    };
    
    if (selectedProvider === 'openai') {
        (configData as any).openAiApiKey = openAiApiKey;
        (configData as any).openAiModelName = openAiModelName;
    } else if (selectedProvider === 'anthropic') {
        (configData as any).anthropicApiKey = anthropicApiKey;
        (configData as any).anthropicModelName = anthropicModelName;
    }

    if (systemPassword !== "password123") { 
      toast({ title: "Authentication Failed", description: "Incorrect system admin password.", variant: "destructive" });
      return;
    }

    const result = await handleUpdateAiConfigurationAction(configData);
    if (result.success) {
      toast({ title: "AI Configuration Update Noted", description: (result.message || "Settings noted.") + " Please update your .env file and restart the server manually as instructed.", variant: "default", duration: 10000 });
    } else {
      let errorDescription = "An unknown error occurred.";
      if (typeof result.error === 'string') errorDescription = result.error;
      else if (result.error && 'flatten' in result.error) {
        const flatError = (result.error as any).flatten();
        const fieldErrors = Object.entries(flatError.fieldErrors).map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`).join('; ');
        errorDescription = `Validation failed. ${fieldErrors || 'Please check your input.'}`;
      }
      toast({ title: "AI Configuration Update Failed", description: errorDescription, variant: "destructive" });
    }
    setSystemPassword("");
    setIsAiConfigModalOpen(false);
  };

  const handleSaveSmtpSettings = () => {
    let settingsToLog: any = { serviceProvider: selectedEmailService };
    const currentService = emailServiceProviders.find(p=>p.id === selectedEmailService);
    switch (selectedEmailService) {
      case "generic_smtp": settingsToLog = { ...settingsToLog, smtpHost, smtpPort, smtpUser, smtpEncryption, smtpPassword: smtpPassword ? '********' : '' }; break;
      case "gmail": case "outlook": settingsToLog = { ...settingsToLog, connectionMethod: "OAuth 2.0 (Simulated)" }; break;
      case "ses": settingsToLog = { ...settingsToLog, sesAccessKey, sesSecretKey: sesSecretKey ? '********' : '', sesRegion, sesVerifiedIdentity }; break;
      case "mailgun": case "sendgrid": case "postmark": case "brevo": case "mailjet": case "zoho_mail": case "resend":
        settingsToLog = { ...settingsToLog, apiKey: apiKey ? '********' : '', apiSecret: apiSecret ? '********' : '', sendingDomain };
        break;
    }
    console.log("SMTP/Email Service Settings to save (simulation):", settingsToLog);
    toast({ title: "Email Service Settings Saved (Simulation)", description: `Configuration for ${currentService?.name} has been noted.`, variant: "default" });
  };

  const getStatusBadgeVariant = (status: ConfiguredSocialChannel['status']): "default" | "secondary" | "destructive" | "outline" => {
    if (status === 'Connected') return 'default'; 
    if (status === 'Needs Re-auth') return 'destructive'; 
    return 'secondary'; 
  };

  const handleStorageConfigInputChange = (fieldId: string, value: string) => {
    setStorageConfigInputs(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSaveStorageConfiguration = () => {
    if (!selectedStorageProviderId) {
      toast({ title: "No Provider Selected", description: "Please select a storage provider first.", variant: "destructive" });
      return;
    }
    const provider = availableStorageProviders.find(p => p.id === selectedStorageProviderId);
    console.log("Saving Storage Configuration (Simulation):", { Provider: provider?.name, Config: storageConfigInputs });
    toast({ title: "Storage Configuration Saved (Simulation)", description: `Settings for ${provider?.name} have been noted.` });
  };

 const handleToggleIntegrationStatus = (integrationId: string) => {
    setIntegrationStatuses(prev => {
      const newStatus = !prev[integrationId];
      const integrationName = integrationPlaceholders.find(p => p.id === integrationId)?.name || "Integration";
      toast({
        title: `${integrationName} ${newStatus ? "Connected" : "Disconnected"} (Simulation)`,
        variant: "default",
      });
      return { ...prev, [integrationId]: newStatus };
    });
  };

  const activeServiceIcons = React.useMemo(() => {
    const icons: React.ReactNode[] = [];
    // AI
    if (selectedProvider === 'gemini' && geminiApiKey) {
      icons.push(<Tooltip key="ai-gemini-active"><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-primary"><Cpu className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>AI: Google Gemini ({geminiModelName || "Default"})</p></TooltipContent></Tooltip>);
    } else if (selectedProvider === 'openrouter' && openRouterApiKey && openRouterModelName) {
      icons.push(<Tooltip key="ai-openrouter-active"><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-primary"><Cpu className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>AI: OpenRouter ({openRouterModelName})</p></TooltipContent></Tooltip>);
    } else if (selectedProvider === 'openai' && openAiApiKey && openAiModelName) {
      icons.push(<Tooltip key="ai-openai-active"><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-primary"><Cpu className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>AI: OpenAI ({openAiModelName})</p></TooltipContent></Tooltip>);
    } else if (selectedProvider === 'anthropic' && anthropicApiKey && anthropicModelName) {
      icons.push(<Tooltip key="ai-anthropic-active"><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-primary"><Cpu className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>AI: Anthropic ({anthropicModelName})</p></TooltipContent></Tooltip>);
    }

    // SMTP
    const smtpService = emailServiceProviders.find(p => p.id === selectedEmailService);
    if (smtpService && (
        (selectedEmailService === "generic_smtp" && smtpHost && smtpPort && smtpUser) ||
        (selectedEmailService === "ses" && sesAccessKey && sesSecretKey && sesRegion && sesVerifiedIdentity) ||
        (["gmail", "outlook"].includes(selectedEmailService)) || 
        (!["generic_smtp", "gmail", "outlook", "ses"].includes(selectedEmailService) && apiKey)
    )) {
         icons.push(<Tooltip key={`smtp-${smtpService.id}-active`}><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7">{React.cloneElement(smtpService.icon as React.ReactElement, { className: "h-5 w-5" })}</Button></TooltipTrigger><TooltipContent><p>Email Sending: {smtpService.name}</p></TooltipContent></Tooltip>);
    }
    // Social Media
    configuredSocialAccounts.filter(c => c.status === 'Connected').slice(0, 3).forEach(channel => {
      icons.push(<Tooltip key={`social-${channel.id}-active`}><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7">{React.cloneElement(channel.icon as React.ReactElement, { className: "h-5 w-5" })}</Button></TooltipTrigger><TooltipContent><p>Social: {channel.name} ({channel.accountIdentifier})</p></TooltipContent></Tooltip>);
    });
    if (configuredSocialAccounts.filter(c => c.status === 'Connected').length > 3) {
        icons.push(<Tooltip key="social-more-active"><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><PlusCircleIcon className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>+ More Connected Social Channels</p></TooltipContent></Tooltip>);
    }
    // Storage
    const storageProvider = availableStorageProviders.find(p => p.id === selectedStorageProviderId);
    const isStorageConfigured = selectedStorageProviderId && storageProvider && Object.values(storageConfigInputs).some(val => val && val.trim() !== "");
    if (isStorageConfigured && storageProvider?.icon) {
      icons.push(<Tooltip key={`storage-${storageProvider.id}-active`}><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7">{React.cloneElement(storageProvider.icon as React.ReactElement, { className: "h-5 w-5" })}</Button></TooltipTrigger><TooltipContent><p>Storage: {storageProvider.name}</p></TooltipContent></Tooltip>);
    } else if (isStorageConfigured && storageProvider) {
       icons.push(<Tooltip key={`storage-${storageProvider.id}-active-generic`}><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><HardDrive className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>Storage: {storageProvider.name}</p></TooltipContent></Tooltip>);
    }
    // Other Integrations
    Object.entries(integrationStatuses).filter(([, isActive]) => isActive).slice(0,3).forEach(([id]) => {
        const integration = integrationPlaceholders.find(int => int.id === id);
        if (integration) {
            icons.push(<Tooltip key={`integration-${integration.id}-active`}><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7">{React.cloneElement(integration.icon as React.ReactElement, { className: "h-5 w-5" })}</Button></TooltipTrigger><TooltipContent><p>Integration: {integration.name}</p></TooltipContent></Tooltip>);
        }
    });
     if (Object.values(integrationStatuses).filter(isActive => isActive).length > 3) {
        icons.push(<Tooltip key="integration-more-active"><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Plug className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>+ More Integrations</p></TooltipContent></Tooltip>);
    }


    return icons;
  }, [
    selectedProvider, geminiApiKey, geminiModelName, openRouterApiKey, openRouterModelName, openAiApiKey, openAiModelName, anthropicApiKey, anthropicModelName,
    selectedEmailService, smtpHost, smtpPort, smtpUser, sesAccessKey, sesSecretKey, sesRegion, sesVerifiedIdentity, apiKey,
    configuredSocialAccounts,
    selectedStorageProviderId, storageConfigInputs,
    integrationStatuses
  ]);


  return (
    <MainLayout pageTitle="System Configuration">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">System Configuration</CardTitle>
          <CardDescription>Manage global settings and configurations for MarketMaestro.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <TooltipProvider>
            <Card className="mb-6 bg-muted/30 dark:bg-card/50 border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <ServerCog className="mr-2 h-5 w-5 text-muted-foreground" />
                  Active Integrations Overview
                </CardTitle>
                <CardDescription className="text-xs">
                  Quick view of currently configured core services.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-1 py-3">
                {activeServiceIcons.length > 0 ? activeServiceIcons.map((icon, index) => (
                  <React.Fragment key={index}>{icon}</React.Fragment>
                )) : (
                  <p className="text-sm text-muted-foreground px-2">No core services appear to be configured yet.</p>
                )}
              </CardContent>
            </Card>
          </TooltipProvider>

          <Tabs defaultValue="ai-settings" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-1 mb-6 h-auto">
              <TabsTrigger value="ai-settings" className="py-2 text-xs sm:text-sm"><Cpu className="mr-1 h-4 w-4 hidden sm:inline-block"/>AI Settings</TabsTrigger>
              <TabsTrigger value="smtp-settings" className="py-2 text-xs sm:text-sm"><Mailbox className="mr-1 h-4 w-4 hidden sm:inline-block"/>SMTP Settings</TabsTrigger>
              <TabsTrigger value="email-config" className="py-2 text-xs sm:text-sm"><Mail className="mr-1 h-4 w-4 hidden sm:inline-block"/>Email Config</TabsTrigger>
              <TabsTrigger value="social-accounts" className="py-2 text-xs sm:text-sm"><Share2Icon className="mr-1 h-4 w-4 hidden sm:inline-block"/>Social Accounts</TabsTrigger>
              <TabsTrigger value="storage-settings" className="py-2 text-xs sm:text-sm"><HardDrive className="mr-1 h-4 w-4 hidden sm:inline-block"/>Storage Settings</TabsTrigger>
              <TabsTrigger value="integrations" className="py-2 text-xs sm:text-sm"><Plug className="mr-1 h-4 w-4 hidden sm:inline-block"/>Integrations</TabsTrigger>
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
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedProvider === 'gemini' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                        <Label htmlFor="geminiApiKey">Google Gemini API Key</Label>
                        <Input
                        id="geminiApiKey"
                        type="password"
                        placeholder="Enter your Gemini API Key"
                        value={geminiApiKey}
                        onChange={(e) => setGeminiApiKey(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="geminiModelName">Gemini Model Name (Optional)</Label>
                        <Input
                        id="geminiModelName"
                        placeholder="e.g., gemini-1.0-pro (default)"
                        value={geminiModelName}
                        onChange={(e) => setGeminiModelName(e.target.value)}
                        />
                    </div>
                  </div>
                )}

                {selectedProvider === 'openrouter' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="openRouterApiKey">OpenRouter API Key</Label>
                      <Input
                        id="openRouterApiKey"
                        type="password"
                        placeholder="Enter your OpenRouter API Key (e.g., sk-or-...)"
                        value={openRouterApiKey}
                        onChange={(e) => setOpenRouterApiKey(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="openRouterModelName">OpenRouter Model String</Label>
                      <Input
                        id="openRouterModelName"
                        placeholder="e.g., openai/gpt-4o, anthropic/claude-3-opus"
                        value={openRouterModelName}
                        onChange={(e) => setOpenRouterModelName(e.target.value)}
                      />
                       <p className="text-xs text-muted-foreground">
                        Specify the model identifier string from OpenRouter.
                        Refer to <Link href="https://openrouter.ai/docs#models" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">OpenRouter documentation <ExternalLink className="inline-block h-3 w-3 ml-0.5"/></Link> for available models and pricing.
                      </p>
                    </div>
                  </div>
                )}

                {selectedProvider === 'openai' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="openAiApiKey">OpenAI API Key</Label>
                      <Input
                        id="openAiApiKey"
                        type="password"
                        placeholder="Enter your OpenAI API Key (e.g., sk-...)"
                        value={openAiApiKey}
                        onChange={(e) => setOpenAiApiKey(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="openAiModelName">OpenAI Model Name (Optional)</Label>
                      <Input
                        id="openAiModelName"
                        placeholder="e.g., gpt-4o, gpt-3.5-turbo (defaults if empty)"
                        value={openAiModelName}
                        onChange={(e) => setOpenAiModelName(e.target.value)}
                      />
                       <p className="text-xs text-muted-foreground">
                        Specify the model identifier. Refer to <Link href="https://platform.openai.com/docs/models" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">OpenAI documentation <ExternalLink className="inline-block h-3 w-3 ml-0.5"/></Link>.
                      </p>
                    </div>
                  </div>
                )}

                {selectedProvider === 'anthropic' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="anthropicApiKey">Anthropic API Key</Label>
                      <Input
                        id="anthropicApiKey"
                        type="password"
                        placeholder="Enter your Anthropic API Key (e.g., sk-ant-...)"
                        value={anthropicApiKey}
                        onChange={(e) => setAnthropicApiKey(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="anthropicModelName">Anthropic Model Name (Optional)</Label>
                      <Input
                        id="anthropicModelName"
                        placeholder="e.g., claude-3-opus-20240229 (defaults if empty)"
                        value={anthropicModelName}
                        onChange={(e) => setAnthropicModelName(e.target.value)}
                      />
                       <p className="text-xs text-muted-foreground">
                        Specify the model identifier. Refer to <Link href="https://docs.anthropic.com/claude/models-overview" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Anthropic documentation <ExternalLink className="inline-block h-3 w-3 ml-0.5"/></Link>.
                      </p>
                    </div>
                  </div>
                )}

                 <Alert variant="default" className="bg-background/70">
                  <AlertCircleIcon className="h-4 w-4" />
                  <AlertTitle>Model Costs & Configuration</AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    Using models via OpenRouter, OpenAI, or Anthropic will likely incur costs based on their pricing.
                    This UI helps you prepare values for your <code>.env</code> file. Genkit configuration in <code>src/ai/genkit.ts</code> reads provider and model details from <code>.env</code> variables.
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
                            Please enter the system admin password (mock: password123).
                            You will be shown instructions to update your <code>.env</code> file. The server will need to be restarted manually after that for changes to take effect.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-3">
                            <Label htmlFor="systemPasswordAi">System Admin Password</Label>
                            <Input
                                id="systemPasswordAi"
                                type="password"
                                value={systemPassword}
                                onChange={(e) => setSystemPassword(e.target.value)}
                                placeholder="Enter admin password (mock: password123)"
                            />
                        </div>
                        <DialogFooter className="sm:justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleSaveAiConfiguration} disabled={!systemPassword.trim()}>
                            Confirm & Get .env Instructions
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
                  Configure how the platform will send emails.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="emailServiceProvider">Email Service Provider</Label>
                  <Select value={selectedEmailService} onValueChange={(value) => setSelectedEmailService(value as string)}>
                    <SelectTrigger id="emailServiceProvider" className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select a service provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {emailServiceProviders.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          <div className="flex items-center gap-2">
                            {React.cloneElement(provider.icon as React.ReactElement, { className: "h-4 w-4" })}
                            {provider.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedEmailService === "generic_smtp" && (
                  <div className="space-y-4 p-4 border rounded-md mt-4 animate-in fade-in duration-300">
                    <h4 className="font-medium">Generic SMTP Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5"> <Label htmlFor="smtpHost">SMTP Host</Label> <Input id="smtpHost" placeholder="e.g., smtp.example.com" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} /> </div>
                      <div className="space-y-1.5"> <Label htmlFor="smtpPort">SMTP Port</Label> <Input id="smtpPort" type="number" placeholder="e.g., 587 or 465" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} /> </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5"> <Label htmlFor="smtpUser">SMTP Username</Label> <Input id="smtpUser" placeholder="e.g., your_email@example.com" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} /> </div>
                      <div className="space-y-1.5"> <Label htmlFor="smtpPassword">SMTP Password</Label> <Input id="smtpPassword" type="password" placeholder="Enter SMTP password" value={smtpPassword} onChange={(e) => setSmtpPassword(e.target.value)} /> </div>
                    </div>
                    <div className="space-y-1.5 md:max-w-[300px]"> <Label htmlFor="smtpEncryption">Encryption</Label> <Select value={smtpEncryption} onValueChange={setSmtpEncryption}> <SelectTrigger id="smtpEncryption"> <SelectValue placeholder="Select encryption type" /> </SelectTrigger> <SelectContent> <SelectItem value="none">None</SelectItem> <SelectItem value="ssl">SSL/TLS</SelectItem> <SelectItem value="starttls">STARTTLS</SelectItem> </SelectContent> </Select> </div>
                  </div>
                )}

                {(selectedEmailService === "gmail" || selectedEmailService === "outlook") && (
                  <div className="space-y-4 p-4 border rounded-md mt-4 animate-in fade-in duration-300">
                    <h4 className="font-medium flex items-center">
                        {React.cloneElement(emailServiceProviders.find(p=>p.id === selectedEmailService)?.icon as React.ReactElement, {className: "h-5 w-5 mr-2"})}
                        Connect via OAuth 2.0 (Recommended)
                    </h4>
                    <p className="text-sm text-muted-foreground"> For {emailServiceProviders.find(p=>p.id === selectedEmailService)?.name}, connecting via OAuth is more secure. </p>
                    <Button variant="outline" onClick={() => toast({ title: "OAuth Connection (Simulation)", description: `Redirecting to ${selectedEmailService === "gmail" ? "Google" : "Microsoft"} for authorization...` })}> <Link2IconLucide className="mr-2 h-4 w-4"/> Connect with {selectedEmailService === "gmail" ? "Google" : "Microsoft"} </Button>
                    <p className="text-sm">Status: <Badge variant="secondary">Not Connected (Simulation)</Badge></p>
                  </div>
                )}

                {selectedEmailService === "ses" && (
                   <div className="space-y-4 p-4 border rounded-md mt-4 animate-in fade-in duration-300">
                    <h4 className="font-medium flex items-center">
                        {React.cloneElement(emailServiceProviders.find(p=>p.id === selectedEmailService)?.icon as React.ReactElement, {className: "h-5 w-5 mr-2"})}
                        Amazon SES Configuration
                    </h4>
                    <div className="space-y-1.5"> <Label htmlFor="sesAccessKey">Access Key ID</Label> <Input id="sesAccessKey" placeholder="Your AWS Access Key ID" value={sesAccessKey} onChange={e => setSesAccessKey(e.target.value)} /> </div>
                    <div className="space-y-1.5"> <Label htmlFor="sesSecretKey">Secret Access Key</Label> <Input id="sesSecretKey" type="password" placeholder="Your AWS Secret Access Key" value={sesSecretKey} onChange={e => setSesSecretKey(e.target.value)}/> </div>
                    <div className="space-y-1.5"> <Label htmlFor="sesRegion">AWS Region</Label> <Select value={sesRegion} onValueChange={setSesRegion}> <SelectTrigger id="sesRegion"> <SelectValue placeholder="Select AWS Region"/> </SelectTrigger> <SelectContent> {awsRegions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)} </SelectContent> </Select> </div>
                    <div className="space-y-1.5"> <Label htmlFor="sesVerifiedIdentity">Verified Sending Email/Domain</Label> <Input id="sesVerifiedIdentity" placeholder="e.g., noreply@yourdomain.com" value={sesVerifiedIdentity} onChange={e => setSesVerifiedIdentity(e.target.value)}/> <p className="text-xs text-muted-foreground">Ensure this email/domain is verified in AWS SES.</p> </div>
                    <Button variant="outline" onClick={() => toast({ title: "Verify SES (Simulation)", description: "Checking SES configuration..."})}>Verify & Save SES Configuration</Button>
                  </div>
                )}

                {["mailgun", "sendgrid", "postmark", "brevo", "mailjet", "zoho_mail", "resend"].includes(selectedEmailService) && (
                  <div className="space-y-4 p-4 border rounded-md mt-4 animate-in fade-in duration-300">
                    <h4 className="font-medium flex items-center">
                        {React.cloneElement(emailServiceProviders.find(p=>p.id === selectedEmailService)?.icon as React.ReactElement, {className: "h-5 w-5 mr-2"})}
                        Configure with API Key: {emailServiceProviders.find(p=>p.id === selectedEmailService)?.name}
                    </h4>
                    <div className="space-y-1.5"> <Label htmlFor="apiKey">API Key</Label> <Input id="apiKey" type="password" placeholder={`Enter ${emailServiceProviders.find(p=>p.id === selectedEmailService)?.name} API Key`} value={apiKey} onChange={e => setApiKey(e.target.value)} /> </div>
                    <div className="space-y-1.5"> <Label htmlFor="apiSecret">API Secret / Password (Optional)</Label> <Input id="apiSecret" type="password" placeholder="Enter API Secret if required" value={apiSecret} onChange={e => setApiSecret(e.target.value)} /> </div>
                    {(selectedEmailService === "mailgun" || selectedEmailService === "sendgrid" || selectedEmailService === "brevo") &&
                        <div className="space-y-1.5"> <Label htmlFor="sendingDomain">Sending Domain (Recommended)</Label> <Input id="sendingDomain" placeholder="e.g., mg.yourdomain.com" value={sendingDomain} onChange={e => setSendingDomain(e.target.value)}/> </div>
                    }
                    <p className="text-xs text-muted-foreground"> Refer to your <Link href="#" className="underline hover:text-primary" onClick={(e) => {e.preventDefault(); toast({title:"Documentation", description:"Link to specific provider docs would go here."})}}>{emailServiceProviders.find(p=>p.id === selectedEmailService)?.name} documentation <ExternalLink className="inline-block h-3 w-3 ml-0.5"/></Link> for API key details. </p>
                    <Button variant="outline" onClick={() => toast({ title: `Verify ${selectedEmailService.toUpperCase()} (Simulation)`, description: "Checking API key..."})}>Verify & Save API Key</Button>
                  </div>
                )}
                <Button onClick={handleSaveSmtpSettings} className="mt-6">Save Email Service Settings</Button>
              </div>
            </TabsContent>

            <TabsContent value="email-config">
              <div className="space-y-4 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center"> <Mail className="mr-2 h-5 w-5 text-primary" /> General Email Settings </h3>
                <p className="text-sm text-muted-foreground"> Configure default sender information and global footers. </p>
                <div className="space-y-2"> <Label htmlFor="defaultFromName">Default Sender Name</Label> <Input id="defaultFromName" placeholder="Your Brand Name" /> </div>
                <div className="space-y-2"> <Label htmlFor="defaultFromEmail">Default Sender Email</Label> <Input id="defaultFromEmail" type="email" placeholder="noreply@yourbrand.com" /> </div>
                <div className="space-y-2"> <Label htmlFor="globalEmailFooter">Global Email Footer Text/HTML (Optional)</Label> <Textarea id="globalEmailFooter" rows={3} placeholder="e.g., © 2024 Your Company. All rights reserved. ..." /> </div>
                <Button onClick={() => toast({title: "Email Settings Saved", description:"General email settings saved (simulation)."})} className="mt-4">Save Email Settings</Button>
              </div>
            </TabsContent>

            <TabsContent value="social-accounts">
              <div className="space-y-4 p-4 border rounded-md bg-card">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <h3 className="text-lg font-medium mb-1 flex items-center"> <Share2Icon className="h-5 w-5 mr-2 text-primary" /> Social Media Connections </h3>
                        <p className="text-sm text-muted-foreground mb-1"> Add social platforms to manage and select which ones appear on your Dashboard Overview. </p>
                    </div>
                    <Button onClick={handleSaveSocialMediaDashboardPreferences} size="sm">Save Dashboard Preferences</Button>
                </div>


                <div className="space-y-2">
                    <Label htmlFor="platformCombobox">Add Platform to Configuration List</Label>
                    <Popover open={openPlatformCombobox} onOpenChange={setOpenPlatformCombobox}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" id="platformCombobox" aria-expanded={openPlatformCombobox} className="w-full md:w-[300px] justify-between">
                          {platformSearchValue ? availableSocialPlatforms.find(p => p.name.toLowerCase() === platformSearchValue.toLowerCase())?.name : "Select platform to add..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Search platform..." value={platformSearchValue} onValueChange={setPlatformSearchValue}/>
                          <CommandList className="max-h-[250px]">
                            <CommandEmpty>No platform found.</CommandEmpty>
                            <CommandGroup>
                              {availableSocialPlatforms.filter(p => !configuredSocialAccounts.find(cp => cp.id === p.id) && p.name.toLowerCase().includes(platformSearchValue.toLowerCase()))
                                .map((platform) => (
                                <CommandItem key={platform.id} value={platform.name} onSelect={() => handleAddPlatformToConfiguredList(platform)} className="flex items-center gap-2 cursor-pointer">
                                  {platform.icon} {platform.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                {configuredSocialAccounts.length > 0 ? (
                  <ScrollArea className="h-auto max-h-[60vh] mt-4 border rounded-md">
                    <div className="p-3 space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Configured Channels ({configuredSocialAccounts.length}):</h4>
                      {configuredSocialAccounts.map((channel) => (
                        <div key={channel.id} className="flex flex-col p-3 border rounded-md hover:bg-muted/50 gap-2">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
                                <div className="flex items-center gap-2 flex-grow">
                                    {channel.icon}
                                    <div className="flex-1">
                                        <span className="font-medium text-sm">{channel.name}</span>
                                        <p className="text-xs text-muted-foreground break-words"> {channel.status === 'Connected' ? (channel.accountIdentifier || 'Account Connected') : (channel.status === 'Needs Re-auth' ? 'Needs Re-authentication' : 'Not Connected')} </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0 self-end sm:self-center">
                                    <Badge variant={getStatusBadgeVariant(channel.status)} className="text-xs mr-1">{channel.status}</Badge>
                                    
                                    {channel.status === 'Disconnected' && (
                                        <Button variant="default" size="sm" onClick={() => handleToggleManageSection(channel.id)}>Connect</Button>
                                    )}
                                    {channel.status === 'Connected' && (<>
                                        <Button variant="ghost" size="sm" onClick={() => handleToggleManageSection(channel.id)}>Manage</Button>
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80" onClick={() => handleToggleChannelStatus(channel.id, 'Connected')}>Disconnect</Button>
                                    </>)}
                                    {channel.status === 'Needs Re-auth' && (
                                        <Button variant="default" size="sm" onClick={() => handleToggleManageSection(channel.id)} className="bg-muted hover:bg-card border border-accent text-primary-foreground">Re-authenticate</Button>
                                    )}
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90 h-8 w-8" onClick={() => handleRemoveChannelFromConfiguration(channel.id)} title={`Remove ${channel.name} from configuration list`}> <Trash2 className="h-4 w-4"/> <span className="sr-only">Remove {channel.name}</span> </Button>
                                </div>
                            </div>

                            {expandedChannelId === channel.id && (
                            <div className="mt-3 pt-3 border-t border-dashed bg-muted/30 p-3 rounded-b-md animate-in fade-in duration-300">
                                { (channel.status === 'Disconnected') && (
                                  <>
                                    <h4 className="text-sm font-semibold mb-2 text-foreground"> Connect to {channel.name} </h4>
                                    <p className="text-xs text-muted-foreground mb-1">This will simulate an OAuth 2.0 flow. We would request permissions for (example):</p>
                                    {channel.oauthPermissionsExample && channel.oauthPermissionsExample.length > 0 && ( <ul className="list-disc list-inside text-xs text-muted-foreground pl-2 mb-3"> {channel.oauthPermissionsExample.map(perm => <li key={perm}>{perm}</li>)} </ul> )}
                                    <div className="space-y-3 my-3">
                                      <div> <Label htmlFor={`apiKey-${channel.id}`} className="text-xs">API Key (if applicable)</Label> <Input id={`apiKey-${channel.id}`} placeholder="Enter API Key (optional)" className="h-8 text-xs mt-0.5"/> </div>
                                      <div> <Label htmlFor={`appId-${channel.id}`} className="text-xs">App ID / Client ID (if applicable)</Label> <Input id={`appId-${channel.id}`} placeholder="Enter App ID (optional)" className="h-8 text-xs mt-0.5"/> </div>
                                      <p className="text-xs text-muted-foreground">Note: Most connections are via OAuth. Enter details above only if specifically required by the platform's alternative connection method.</p>
                                    </div>
                                    <Button variant="default" className="w-full" onClick={() => performConnectionAction(channel.id, 'Connect')}> <Link2IconLucide className="mr-2 h-4 w-4" /> Proceed to Connect with {channel.name} </Button>
                                  </>
                                )}
                                 { (channel.status === 'Needs Re-auth') && (
                                  <>
                                    <h4 className="text-sm font-semibold mb-2 text-foreground"> Re-authenticate with {channel.name} </h4>
                                    <p className="text-xs text-muted-foreground mb-1">Your connection needs to be refreshed. This will simulate an OAuth 2.0 flow.</p>
                                    {channel.oauthPermissionsExample && channel.oauthPermissionsExample.length > 0 && ( <ul className="list-disc list-inside text-xs text-muted-foreground pl-2 mb-3"> {channel.oauthPermissionsExample.map(perm => <li key={perm}>{perm}</li>)} </ul> )}
                                    <div className="space-y-3 my-3">
                                      <div> <Label htmlFor={`reauth-apiKey-${channel.id}`} className="text-xs">API Key (if applicable)</Label> <Input id={`reauth-apiKey-${channel.id}`} placeholder="Confirm API Key (optional)" className="h-8 text-xs mt-0.5"/> </div>
                                    </div>
                                    <Button variant="default" className="w-full" onClick={() => performConnectionAction(channel.id, 'Re-authenticate')}> <RefreshCw className="mr-2 h-4 w-4" /> Proceed to Re-authenticate {channel.name} </Button>
                                  </>
                                )}
                                {channel.status === 'Connected' && ( 
                                  <>
                                    <h4 className="text-sm font-semibold mb-2 text-foreground">Connection Details for {channel.name}</h4>
                                    <div className="space-y-3 text-xs">
                                        <div className="space-y-1"> <Label className="text-xs text-muted-foreground">Connected Account</Label> <p className="text-sm font-medium bg-background/70 p-2 rounded-md break-words">{channel.accountIdentifier || "N/A"}</p> </div>
                                        <div className="space-y-1"> <Label className="text-xs text-muted-foreground">Permissions Granted (Mock)</Label> <div className="text-xs bg-background/70 p-2 rounded-md leading-relaxed break-words"> Standard permissions for posting, reading engagement, and managing insights have been granted (simulation). Specific permissions vary by platform and are handled during the OAuth connection process. {(channel.oauthPermissionsExample && channel.oauthPermissionsExample.length > 0) && ( <> <br/>Example requested scopes might include: {channel.oauthPermissionsExample.join(', ')}.</> )} </div> </div>
                                        <div className="space-y-1"> <Label className="text-xs text-muted-foreground">Connected Since</Label> <p className="text-sm font-medium bg-background/70 p-2 rounded-md break-words">January 1, 2024 (Mock)</p> </div>
                                        <div className="space-y-1"> <Label htmlFor={`customApiEndpoint-${channel.id}`} className="text-xs text-muted-foreground">Custom API Endpoint (Optional)</Label> <Input id={`customApiEndpoint-${channel.id}`} placeholder="e.g., https://graph.facebook.com/v18.0" className="text-xs h-8" disabled/> <p className="text-xs text-muted-foreground">For advanced users with specific API needs (not functional).</p> </div>
                                        <div className="flex justify-end gap-2 pt-2">
                                            <Button type="button" variant="outline" size="sm" onClick={() => { setConfiguredSocialAccounts(prev => prev.map(c => c.id === channel.id ? {...c, status: 'Needs Re-auth'} : c)); setExpandedChannelId(channel.id); setTimeout(() => toast({ title: "Refresh Connection (Simulated)", description: `${channel.name} needs re-authentication.`}), 100); }}> <RefreshCw className="mr-2 h-4 w-4"/> Refresh </Button>
                                            <Button type="button" variant="outline" size="sm" onClick={() => toast({ title: "View Platform Settings (Simulated)", description: `Opening ${channel.name} settings (not implemented).`})}> <ExternalLink className="mr-2 h-4 w-4"/> View on {channel.name} </Button>
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
              </div>
            </TabsContent>

            <TabsContent value="storage-settings">
              <div className="space-y-6 p-4 border rounded-md bg-card">
                <h3 className="text-lg font-medium mb-2 flex items-center"> <HardDrive className="mr-2 h-5 w-5 text-primary" /> Storage Settings </h3>
                <p className="text-sm text-muted-foreground"> Configure where your media assets and other large files will be stored. </p>
                <div className="space-y-2">
                  <Label htmlFor="storageProviderCombobox">Storage Provider</Label>
                    <Popover open={isStorageProviderPopoverOpen} onOpenChange={setIsStorageProviderPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" id="storageProviderCombobox" aria-expanded={isStorageProviderPopoverOpen} className="w-full md:w-[300px] justify-between">
                          {selectedStorageProviderId ? availableStorageProviders.find(p => p.id === selectedStorageProviderId)?.name : "Select storage provider..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Search provider..." value={storageProviderSearchValue} onValueChange={setStorageProviderSearchValue} />
                          <CommandList className="max-h-[250px]">
                            <CommandEmpty>No provider found.</CommandEmpty>
                            <CommandGroup>
                              {availableStorageProviders.filter(p => p.name.toLowerCase().includes(storageProviderSearchValue.toLowerCase()))
                                .map((provider) => (
                                <CommandItem key={provider.id} value={provider.name} onSelect={() => { setSelectedStorageProviderId(provider.id); setStorageConfigInputs({}); setIsStorageProviderPopoverOpen(false); setStorageProviderSearchValue(""); }} className="flex items-center gap-2 cursor-pointer">
                                  {provider.icon || <Database className="h-4 w-4 text-muted-foreground" />} {provider.name}
                                  <Check className={cn("ml-auto h-4 w-4", selectedStorageProviderId === provider.id ? "opacity-100" : "opacity-0")}/>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                </div>

                {selectedStorageProviderId && availableStorageProviders.find(p => p.id === selectedStorageProviderId)?.configFields.map(field => (
                  <div key={field.id} className="space-y-2 animate-in fade-in duration-300">
                    <Label htmlFor={`storage-${field.id}`}>{field.label}</Label>
                    {field.type === 'select' ? (
                      <Select value={storageConfigInputs[field.id] || (field.options && field.options.length > 0 ? field.options[0] : '')} onValueChange={(value) => handleStorageConfigInputChange(field.id, value)}>
                        <SelectTrigger id={`storage-${field.id}`}> <SelectValue placeholder={`Select ${field.label}`} /> </SelectTrigger>
                        <SelectContent> {field.options?.map(option => ( <SelectItem key={option} value={option}>{option}</SelectItem> ))} </SelectContent>
                      </Select>
                    ) : (
                      <Input id={`storage-${field.id}`} type={field.type} placeholder={field.placeholder || `Enter ${field.label}`} value={storageConfigInputs[field.id] || ''} onChange={(e) => handleStorageConfigInputChange(field.id, e.target.value)} />
                    )}
                  </div>
                ))}

                {selectedStorageProviderId && ( <Button onClick={handleSaveStorageConfiguration} className="mt-4">Save Storage Configuration</Button> )}
                {!selectedStorageProviderId && ( <p className="text-xs text-muted-foreground mt-2">Select a provider to see configuration options.</p> )}
              </div>
            </TabsContent>

            <TabsContent value="integrations">
                <div className="space-y-4 p-4 border rounded-md bg-card">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                        <Plug className="mr-2 h-5 w-5 text-primary"/> Third-Party Integrations
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Connect MarketMaestro with other services like your existing CMS, CRM, or analytics platforms.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {integrationPlaceholders.map(integration => (
                            <Card key={integration.id} className="shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between space-x-3 pb-3">
                                    <div className="flex items-center gap-2">
                                        {integration.icon}
                                        <CardTitle className="text-base">{integration.name}</CardTitle>
                                    </div>
                                    <Badge variant={integrationStatuses[integration.id] ? "default" : "secondary"} className="text-xs">
                                      {integrationStatuses[integration.id] ? "Connected" : "Not Connected"}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="text-xs text-muted-foreground pb-3">
                                    {integration.description}
                                </CardContent>
                                <CardFooter className="pb-3 flex-col items-start gap-2">
                                    <Button 
                                      variant={integrationStatuses[integration.id] ? "outline" : "default"} 
                                      size="sm" 
                                      className="w-full"
                                      onClick={() => handleToggleIntegrationStatus(integration.id)}
                                    >
                                        {integrationStatuses[integration.id] ? "Disconnect" : "Connect"} (Simulation)
                                    </Button>
                                    {integration.type === 'cms' && (
                                      <>
                                        <Button variant="outline" size="sm" className="w-full" disabled>
                                            <FileCog className="mr-2 h-4 w-4"/> Sync Content Types (Future)
                                        </Button>
                                        <p className="text-[10px] text-muted-foreground pl-1">Map and import content structures from this CMS.</p>
                                      </>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
}

    

    
