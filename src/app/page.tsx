
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  TrendingUp,
  Mail,
  Edit3,
  Users2 as Users2Icon,
  Filter as FilterIcon,
  ChevronDown,
  Check,
  ChevronsUpDown,
  LayoutDashboard,
  Lightbulb,
  PlusCircle,
  ImageIcon as ImageIconLucide,
  Facebook,
  Instagram,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIconLucide,
  Youtube,
  CalendarDays,
  Settings as SettingsIcon,
  MailPlus,
  Eye,
  ThumbsUp,
  UsersRound,
  UserPlus,
  UserCircle as UserCircleLucide, 
  PieChart as PieChartIcon,
  LineChart as LineChartIconLucide,
  ListChecks,
  Users,
  Loader2, 
  BarChart, // Added for the new demo
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart, // Aliased existing
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip, // Aliased existing
  Legend as RechartsLegend, // Aliased existing
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Command, CommandEmpty, CommandInput, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Skeleton } from '@/components/ui/skeleton';


type Timeframe = 'last7days' | 'last30days' | 'last90days';

interface SocialChannelUIData {
  id: string;
  platform: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected';
  engagementRate?: number;
  followerChange?: number;
  progressValue?: number; 
}

const allPossibleChannels: SocialChannelUIData[] = [
  { id: 'facebook', platform: "Facebook", icon: <Facebook className="h-5 w-5" />, status: 'connected', engagementRate: 5.2, followerChange: 302, progressValue: 52 },
  { id: 'instagram', platform: "Instagram", icon: <Instagram className="h-5 w-5" />, status: 'connected', engagementRate: 8.1, followerChange: 750, progressValue: 81 },
  { id: 'linkedin', platform: "LinkedIn", icon: <LinkedinIcon className="h-5 w-5" />, status: 'connected', engagementRate: 3.5, followerChange: 150, progressValue: 35 },
  { id: 'twitter', platform: "X (Twitter)", icon: <TwitterIconLucide className="h-5 w-5" />, status: 'connected', engagementRate: 4.5, followerChange: 220, progressValue: 45 },
  { id: 'youtube', platform: "YouTube", icon: <Youtube className="h-5 w-5" />, status: 'connected', engagementRate: 6.1, followerChange: 403, progressValue: 61 },
  { id: 'tiktok', platform: "TikTok", icon: <svg viewBox="0 0 28 28" fill="currentColor" className="h-5 w-5"><path d="M20.76,10.28A5.76,5.76,0,0,0,15,4.51V15.6a5.75,5.75,0,1,1-5.75-5.75,5.63,5.63,0,0,1,.13-1.27A0.76,0.76,0,0,0,9.2,8C8.7,8,8.47,8.21,8.47,8.6V15.3a0.76,0.76,0,0,0,.18,.51A8.09,8.09,0,0,0,9.2,16.1a8.24,8.24,0,1,0,8.23-8.24A8.12,8.12,0,0,0,15,7.61V13a0.75,0.75,0,0,0,.75.75h2.28A5.76,5.76,0,0,0,20.76,10.28Z"/></svg>, status: 'disconnected' },
  { id: 'pinterest', platform: "Pinterest", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-red-600"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.198-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.377-.752-.377-1.845c0-1.713 1.002-2.981 2.248-2.981 1.052 0 1.554.792 1.554 1.746 0 1.069-.678 2.671-1.011 4.128-.278 1.213.615 2.225 1.815 2.225 2.169 0 3.717-2.299 3.717-5.588 0-2.827-2.064-4.879-5.008-4.879-3.413 0-5.409 2.556-5.409 5.199 0 1.03.395 2.143.889 2.726.096.113.119.224.083.345l-.333 1.354c-.053.223-.174.274-.422.152-1.494-.693-2.424-2.875-2.424-4.627 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.627-2.759-1.371l-.748 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592 0 12.017 0z"/></svg>, status: 'disconnected'},
];

const LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY = 'marketMaestroDashboardChannels';

const metricDetails: ChartConfig & { [key: string]: { label?: string; plottable?: boolean; icon?: React.ElementType; color?: string; description?: string; } } = {
  followerGrowth: { label: "Follower Growth", plottable: true, color: "hsl(var(--chart-1))", icon: Users2Icon },
  avgEngagementRate: { label: "Avg. Engagement Rate (%)", plottable: true, color: "hsl(var(--chart-2))", icon: TrendingUp },
  postsPublished: { label: "Posts Published", plottable: true, color: "hsl(var(--chart-3))", icon: Edit3 },
  reach: { label: "Reach", plottable: true, color: "hsl(var(--chart-4))", icon: UsersRound },
  impressions: { label: "Impressions", plottable: true, color: "hsl(var(--chart-5))", icon: Eye },
  ctr: { label: "CTR (%)", plottable: true, color: "var(--color-cyan, hsl(180, 100%, 50%))", icon: ArrowRight }, 
  storyPostViews: { label: "Story/Post Views", plottable: true, color: "var(--color-orange, hsl(30, 100%, 50%))", icon: ImageIconLucide },
  profileVisits: { label: "Profile Visits", plottable: true, color: "var(--color-purple, hsl(270, 100%, 50%))", icon: UserCircleLucide },
  audienceGrowthRate: { label: "Audience Growth Rate (%)", plottable: true, color: "var(--color-teal, hsl(160, 100%, 50%))", icon: UserPlus },
  topPerformingPost: { label: "Top Performing Post", plottable: false, icon: ThumbsUp },
};

const initialSocialMetricsPlaceholder: Record<string, string | number> = Object.fromEntries(
  Object.keys(metricDetails).map(key => {
    if (key === 'topPerformingPost') {
      return [key, "Loading Top Post..."];
    }
    return [key, "--"];
  })
);

const plottableMetrics = Object.keys(metricDetails).filter(key => metricDetails[key].plottable);

const generateSocialChartData = (timeframe: Timeframe, platformId: string | null = null) => {
  const points = timeframe === 'last7days' ? 7 : timeframe === 'last30days' ? 4 : 12; 
  const labelPrefix = timeframe === 'last7days' ? 'Day ' : timeframe === 'last30days' ? 'W' : 'M';
  
  let platformMultiplier = 1; 
  if (platformId === 'facebook') platformMultiplier = 0.6;
  else if (platformId === 'instagram') platformMultiplier = 0.8;
  else if (platformId === 'linkedin') platformMultiplier = 0.4;
  else if (platformId === 'twitter') platformMultiplier = 0.5;
  else if (platformId === 'youtube') platformMultiplier = 0.7;

  return Array.from({ length: points }, (_, i) => {
    const baseFollowers = (Math.random() * 30 + 10) * platformMultiplier;
    const baseEngagement = (Math.random() * 2 + 1) * platformMultiplier;
    return {
      name: `${labelPrefix}${i + 1}`,
      followerGrowth: Math.floor(baseFollowers * (1 + (Math.random() - 0.5) * 0.2)),
      avgEngagementRate: parseFloat(Math.max(0.1, baseEngagement * (1 + (Math.random() - 0.5) * 0.3)).toFixed(1)),
      postsPublished: Math.floor((Math.random() * 2 + 1) * platformMultiplier * (points === 7 ? 1 : (points === 4 ? 7 : 30 / 12))), 
      reach: Math.floor((Math.random() * 500 + 200) * platformMultiplier),
      impressions: Math.floor((Math.random() * 1000 + 500) * platformMultiplier),
      ctr: parseFloat(Math.max(0.1, (Math.random() * 1 + 0.2) * platformMultiplier).toFixed(1)),
      storyPostViews: Math.floor((Math.random() * 300 + 100) * platformMultiplier),
      profileVisits: Math.floor((Math.random() * 50 + 10) * platformMultiplier),
      audienceGrowthRate: parseFloat(Math.max(0, (Math.random() * 0.5 - 0.1) * platformMultiplier).toFixed(1)),
    };
  });
};

const generateSocialSummaryMetrics = (timeframe: Timeframe, platformId: string | null = null) => {
  let platformMultiplier = 1; 
  if (platformId === 'facebook') platformMultiplier = 0.6;
  else if (platformId === 'instagram') platformMultiplier = 0.8;
  else if (platformId === 'linkedin') platformMultiplier = 0.4;
  else if (platformId === 'twitter') platformMultiplier = 0.5;
  else if (platformId === 'youtube') platformMultiplier = 0.7;

  return {
    followerGrowth: Math.floor((Math.random() * 100 + 50) * platformMultiplier * (timeframe === 'last7days' ? 0.25 : (timeframe === 'last30days' ? 1 : 3))),
    avgEngagementRate: parseFloat(Math.max(0.5, (Math.random() * 3 + 1.5) * platformMultiplier).toFixed(1)),
    postsPublished: Math.floor((Math.random() * 10 + 5) * platformMultiplier * (timeframe === 'last7days' ? 0.25 : (timeframe === 'last30days' ? 1 : 3))),
    reach: Math.floor((Math.random() * 2000 + 1000) * platformMultiplier * (timeframe === 'last7days' ? 0.25 : (timeframe === 'last30days' ? 1 : 3))),
    impressions: Math.floor((Math.random() * 5000 + 2500) * platformMultiplier * (timeframe === 'last7days' ? 0.25 : (timeframe === 'last30days' ? 1 : 3))),
    ctr: parseFloat(Math.max(0.2, (Math.random() * 1.5 + 0.5) * platformMultiplier).toFixed(1)),
    storyPostViews: Math.floor((Math.random() * 1500 + 700) * platformMultiplier * (timeframe === 'last7days' ? 0.25 : (timeframe === 'last30days' ? 1 : 3))),
    profileVisits: Math.floor((Math.random() * 200 + 100) * platformMultiplier * (timeframe === 'last7days' ? 0.25 : (timeframe === 'last30days' ? 1 : 3))),
    audienceGrowthRate: parseFloat(Math.max(0.1, (Math.random() * 0.8 + 0.1) * platformMultiplier).toFixed(1)),
    topPerformingPost: `Top post for ${platformId || 'Overall'} in ${timeframe}`,
  };
};


const generateEmailChartData = (timeframe: Timeframe) => {
  const baseOpen = 20 + Math.random() * 10;
  const baseCTR = 2 + Math.random() * 3;
  const baseBounce = 1 + Math.random() * 1;
  return [
    { name: "Open Rate", value: parseFloat(baseOpen.toFixed(1)), fill: "hsl(var(--chart-1))" },
    { name: "CTR", value: parseFloat(baseCTR.toFixed(1)), fill: "hsl(var(--chart-2))" },
    { name: "Bounce Rate", value: parseFloat(baseBounce.toFixed(1)), fill: "hsl(var(--chart-3))" },
  ];
};

const fixedChartDemoData = [
  { name: 'Jan', uv: 400, pv: 240 },
  { name: 'Feb', uv: 300, pv: 139 },
  { name: 'Mar', uv: 200, pv: 980 },
  { name: 'Apr', uv: 278, pv: 390 },
  { name: 'May', uv: 189, pv: 480 },
];

export default function DashboardPage() {
  const [hasMounted, setHasMounted] = React.useState(false);
  const [socialTimeframe, setSocialTimeframe] = useState<Timeframe>('last30days');
  const [emailTimeframe, setEmailTimeframe] = useState<Timeframe>('last30days');
  
  const [initiallyLoadedLocalStorage, setInitiallyLoadedLocalStorage] = useState(false);
  const [dashboardChannelsToDisplay, setDashboardChannelsToDisplay] = useState<SocialChannelUIData[]>([]);

  const [isSocialChannelFilterOpen, setIsSocialChannelFilterOpen] = useState(false);
  const [selectedSocialChannelId, setSelectedSocialChannelId] = useState<string | null>(null); 
  const [channelSearchValue, setChannelSearchValue] = useState("");

  const [isChartMetricFilterOpen, setIsChartMetricFilterOpen] = useState(false);
  const [selectedChartMetrics, setSelectedChartMetrics] = useState<string[]>(['followerGrowth', 'avgEngagementRate']);

  const [displayedSocialSummaryMetrics, setDisplayedSocialSummaryMetrics] =
    useState<Record<string, string | number> | null>(null);
  const [chartDataForSocial, setChartDataForSocial] =
    useState<any[] | null>(null);

  const [currentEmailChartData, setCurrentEmailChartData] = 
    useState<any[] | null>(null);
  const [emailSummaryMetrics, setEmailSummaryMetrics] = 
    useState<Record<string, string | number> | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) { 
      const storedPreferenceString = localStorage.getItem(LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY);
      let activeChannelIds: string[] = [];
      if (storedPreferenceString) {
        try {
          const parsedPreferences: Array<{ id: string; status: string }> = JSON.parse(storedPreferenceString);
          if (Array.isArray(parsedPreferences)) {
            activeChannelIds = parsedPreferences
              .filter(p => p.status === 'Connected' && typeof p.id === 'string')
              .map(p => p.id);
          }
        } catch (e) {
          console.error("Error parsing dashboard channels from localStorage", e);
        }
      }
      
      const channelsFromStorage = allPossibleChannels.filter(channel => 
        activeChannelIds.includes(channel.id) 
      );
      setDashboardChannelsToDisplay(channelsFromStorage);
      setInitiallyLoadedLocalStorage(true);
    }
  }, [hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      setDisplayedSocialSummaryMetrics(generateSocialSummaryMetrics(socialTimeframe, selectedSocialChannelId));
      setChartDataForSocial(generateSocialChartData(socialTimeframe, selectedSocialChannelId));
    }
  }, [selectedSocialChannelId, socialTimeframe, hasMounted]);

  useEffect(() => {
    if (hasMounted) {
      const newEmailChartData = generateEmailChartData(emailTimeframe);
      setCurrentEmailChartData(newEmailChartData);

      const openRateEntry = newEmailChartData.find(d => d.name === 'Open Rate');
      const ctrEntry = newEmailChartData.find(d => d.name === 'CTR');
      const bounceEntry = newEmailChartData.find(d => d.name === 'Bounce Rate');
      setEmailSummaryMetrics({
        avgOpenRate: `${openRateEntry?.value || '0.0'}% ${openRateEntry?.value && openRateEntry.value > 25 ? '🔥' : ''}`,
        avgClickRate: `${ctrEntry?.value || '0.0'}%`,
        estBounceRate: `${bounceEntry?.value || '0.0'}%`,
        newSubscribers: `+${Math.round((openRateEntry?.value || 0) * (emailTimeframe === 'last7days' ? 2.5 : emailTimeframe === 'last30days' ? 10 : 30))}`,
      });
    }
  }, [emailTimeframe, hasMounted]);


  const connectedPlatformsForFilter = useMemo(() => {
    return allPossibleChannels.filter(channel => channel.status === 'connected');
  }, []);

  const selectedChannelDetails = useMemo(() => {
    if (!selectedSocialChannelId) return null;
    return allPossibleChannels.find(c => c.id === selectedSocialChannelId);
  }, [selectedSocialChannelId]);

  const upcomingPublicationsMock = [
    { id: 1, icon: <Edit3 className="h-5 w-5 text-blue-500" />, title: "New Blog: AI in Modern Architecture", time: "Tomorrow, 09:00 AM", type: "Blog Post", link: "/social-media/create-post" },
    { id: 2, icon: <Mail className="h-5 w-5 text-green-500" />, title: "Weekly Project Digest", time: "Friday, 02:00 PM", type: "Newsletter", link: "/email-marketing/campaigns/create" },
    { id: 3, icon: <Instagram className="h-5 w-5 text-pink-500" />, title: "Insta Story: Q&A Highlights", time: "Next Mon, 11:00 AM", type: "Social Post", link: "/social-media/create-post"},
  ];
  
  return (
    <MainLayout pageTitle="Dashboard Overview">
      <div className="space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                 <CardTitle className="text-xl flex items-center flex-wrap gap-x-2">
                  {selectedChannelDetails && hasMounted ? (
                    <>
                      {React.cloneElement(selectedChannelDetails.icon as React.ReactElement, { className: "h-6 w-6" })}
                      {selectedChannelDetails.platform} Performance
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-6 w-6 text-primary" />
                      Overall Social Performance
                    </>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                  <Select value={socialTimeframe} onValueChange={(value) => setSocialTimeframe(value as Timeframe)}>
                    <SelectTrigger className="w-full xs:w-auto sm:w-[150px] h-9 text-xs">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 Days</SelectItem>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="last90days">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover open={isSocialChannelFilterOpen} onOpenChange={setIsSocialChannelFilterOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 w-full xs:w-auto text-xs">
                        <FilterIcon className="mr-2 h-4 w-4" /> 
                        {selectedChannelDetails && hasMounted ? (
                            <span className="flex items-center">
                                {React.cloneElement(selectedChannelDetails.icon as React.ReactElement, {className: "h-4 w-4 mr-1"})}
                                {selectedChannelDetails.platform}
                            </span>
                        ) : "All Channels"}
                        <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60 p-0" align="end">
                        <Command>
                           <CommandInput 
                             placeholder="Select channel..." 
                             value={channelSearchValue} 
                             onValueChange={setChannelSearchValue} />
                           <CommandList>
                            <CommandEmpty>No channel found.</CommandEmpty>
                            <CommandGroup>
                                <CommandItem 
                                  key="overall-social-filter"
                                  value="All Channels" 
                                  onSelect={() => { setSelectedSocialChannelId(null); setIsSocialChannelFilterOpen(false); setChannelSearchValue(""); }}>
                                    <LayoutDashboard className="mr-2 h-4 w-4"/> Overall Performance
                                    <Check className={cn("ml-auto h-4 w-4", selectedSocialChannelId === null ? "opacity-100" : "opacity-0")}/>
                                </CommandItem>
                                {connectedPlatformsForFilter
                                .filter(c => c.platform.toLowerCase().includes(channelSearchValue.toLowerCase()))
                                .map(channel => (
                                    <CommandItem
                                      key={channel.id}
                                      value={channel.platform} 
                                      onSelect={() => {
                                          setSelectedSocialChannelId(channel.id);
                                          setIsSocialChannelFilterOpen(false);
                                          setChannelSearchValue("");
                                      }}
                                    >
                                      <div className="flex items-center">
                                          {React.cloneElement(channel.icon as React.ReactElement, { className: "h-4 w-4 mr-2" })}
                                          {channel.platform}
                                      </div>
                                      <Check className={cn("ml-auto h-4 w-4", selectedSocialChannelId === channel.id ? "opacity-100" : "opacity-0")}/>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                           </CommandList>
                        </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <CardDescription className="text-xs sm:text-sm mt-1">
                Key metrics and trends for {selectedChannelDetails && hasMounted ? selectedChannelDetails.platform : "your connected social"} channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex-grow">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-3 text-left text-xs">
                {Object.entries(displayedSocialSummaryMetrics || initialSocialMetricsPlaceholder)
                .filter(([key]) => key !== 'topPerformingPost')
                .map(([key, value]) => {
                    const detail = metricDetails[key];
                    const IconComponent = detail?.icon as React.ElementType;
                    return (
                    <div key={key} className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                        <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground mb-0.5">
                        {IconComponent && <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 flex-shrink-0"/>}
                        <span className="truncate" title={String(detail?.label)}>{String(detail?.label)}</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold truncate" title={String(value || (key === 'topPerformingPost' ? 'Loading...' : '0'))}>
                          {value !== undefined ? String(value) : (key === 'topPerformingPost' ? 'Loading...' : "0")}
                          {(key.toLowerCase().includes('rate') || key.toLowerCase().includes('ctr')) && value !== undefined && value !== '--' && typeof value === 'number' ? '%' : ''}
                        </p>
                    </div>
                    );
                })}
              </div>
              
              <Separator />

              <div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                  <h4 className="font-semibold text-sm">Performance Chart</h4>
                   <Popover open={isChartMetricFilterOpen} onOpenChange={setIsChartMetricFilterOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="xs" className="h-7 text-xs px-2 w-full sm:w-auto">
                        <ListChecks className="mr-1.5 h-3.5 w-3.5" /> Metrics to Plot ({selectedChartMetrics.length})
                        <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-70" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0" align="end">
                      <Command>
                        <CommandInput placeholder="Search metrics..." />
                        <CommandList>
                          <CommandEmpty>No metric found.</CommandEmpty>
                          <CommandGroup heading="Select Metrics (Max 3 Recommended)">
                            {plottableMetrics.map(key => {
                                const metricConfig = metricDetails[key];
                                const IconComponent = metricConfig.icon;
                                return (
                                <CommandItem 
                                    key={key}
                                    value={String(metricConfig.label)}
                                    onSelect={() => {
                                        setSelectedChartMetrics(prev => 
                                            prev.includes(key) 
                                            ? (prev.length === 1 ? prev : prev.filter(k => k !== key)) 
                                            : (prev.length < 3 ? [...prev, key] : prev) 
                                        );
                                    }}
                                    className="cursor-pointer"
                                    >
                                    <Checkbox 
                                    id={`cb-chart-${key}`}
                                    checked={selectedChartMetrics.includes(key)}
                                    className="mr-2"
                                    />
                                    <Label htmlFor={`cb-chart-${key}`} className="flex items-center cursor-pointer text-xs w-full">
                                    {IconComponent && <IconComponent className="h-3.5 w-3.5 mr-1.5 opacity-70"/>}
                                    {String(metricConfig.label)}
                                    </Label>
                                </CommandItem>
                                );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {hasMounted && chartDataForSocial ? (
                  <ChartContainer config={metricDetails} className="aspect-auto h-[200px] sm:h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={chartDataForSocial} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <RechartsTooltip 
                          cursor={false}
                          content={<ChartTooltipContent 
                                      indicator="line" 
                                      nameKey="name"
                                      formatter={(value, name, itemPayload) => {
                                        const itemConfig = metricDetails[itemPayload.dataKey as string];
                                        const IconComp = itemConfig?.icon;
                                        return (
                                          <div className="flex items-center">
                                            {IconComp && <IconComp className="h-3 w-3 mr-1.5" style={{color: itemPayload.color}}/>}
                                            <span style={{color: itemPayload.color}}>{String(itemConfig?.label) || name}: {value}{(String(itemConfig?.label).includes('%') ? '%' : '')}</span>
                                          </div>
                                        );
                                      }}
                                      />} 
                          />
                        <ChartLegend content={<ChartLegendContent icon={LineChartIconLucide} wrapperStyle={{fontSize: '10px'}}/>} />
                        {selectedChartMetrics.map(metricKey => {
                          const metricConfig = metricDetails[metricKey];
                          if (!metricConfig || !metricConfig.plottable) return null;
                          return (
                            <Line 
                              key={metricKey} 
                              dataKey={metricKey} 
                              type="monotone" 
                              stroke={metricConfig.color || "hsl(var(--primary))"} 
                              strokeWidth={2} 
                              dot={{r:3, fill: metricConfig.color || "hsl(var(--primary))", strokeWidth:1}} 
                              activeDot={{r:5, strokeWidth:2}}
                              name={String(metricConfig.label)}
                            />
                          );
                        })}
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                   <div className="aspect-auto h-[200px] sm:h-[220px] w-full flex items-center justify-center bg-muted/30 rounded-md">
                    <Skeleton className="h-full w-full" />
                  </div>
                )}
              </div>
                <div className="mt-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">Top Performing Post (Mock)</Label>
                     <div className="p-2 border rounded-md bg-background hover:bg-muted/50 transition-colors text-xs flex items-center gap-2">
                        {metricDetails.topPerformingPost.icon && React.createElement(metricDetails.topPerformingPost.icon, {className:"h-4 w-4 text-green-500 flex-shrink-0"})}
                        <p className="truncate flex-1">
                          {hasMounted && displayedSocialSummaryMetrics ? (displayedSocialSummaryMetrics as any).topPerformingPost : "Loading..."}
                        </p>
                        <Button variant="link" size="xs" className="p-0 h-auto">View</Button>
                    </div>
                </div>
                <Alert variant="default" className="mt-3 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 text-xs">
                    <Lightbulb className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700 dark:text-blue-300 text-sm">Smart Suggestion</AlertTitle>
                    <AlertDescription className="text-blue-600 dark:text-blue-400">
                        Your {selectedChannelDetails && hasMounted ? selectedChannelDetails.platform : 'overall'} engagement rate is {hasMounted && displayedSocialSummaryMetrics ? (displayedSocialSummaryMetrics as any).avgEngagementRate : '--'}%. 
                        <Button size="xs" variant="link" className="p-0 h-auto ml-1 text-blue-700 dark:text-blue-300 text-xs hover:underline">Get AI ideas to boost it?</Button>
                    </AlertDescription>
                </Alert>
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Link href="/social-media/dashboard" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full text-xs")}>
                    View Full Social Media Dashboard
                </Link>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <CardTitle className="text-xl flex items-center"><Mail className="mr-2 h-6 w-6 text-primary" />Email Marketing Insights</CardTitle>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                    <Select value={emailTimeframe} onValueChange={(value) => setEmailTimeframe(value as Timeframe)}>
                        <SelectTrigger className="w-full xs:w-auto sm:w-[150px] h-9 text-xs">
                          <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last7days">Last 7 Days</SelectItem>
                          <SelectItem value="last30days">Last 30 Days</SelectItem>
                          <SelectItem value="last90days">Last 90 Days</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
              </div>
              <CardDescription className="text-xs sm:text-sm mt-1">Key metrics and performance of your email campaigns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-left text-xs">
                <div className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Avg. Open Rate</p>
                    <p className="text-sm sm:text-base font-bold">{hasMounted && emailSummaryMetrics ? emailSummaryMetrics.avgOpenRate : '--%'}</p>
                </div>
                 <div className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Avg. Click Rate</p>
                    <p className="text-sm sm:text-base font-bold">{hasMounted && emailSummaryMetrics ? emailSummaryMetrics.avgClickRate : '--%'}</p>
                </div>
                 <div className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">New Subscribers</p>
                    <p className="text-sm sm:text-base font-bold text-green-600 dark:text-green-400">{hasMounted && emailSummaryMetrics ? emailSummaryMetrics.newSubscribers : '--'}</p>
                </div>
                <div className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Est. Bounce Rate</p>
                    <p className="text-sm sm:text-base font-bold">{hasMounted && emailSummaryMetrics ? emailSummaryMetrics.estBounceRate : '--%'}</p>
                </div>
              </div>
              {hasMounted && currentEmailChartData ? (
                 <ChartContainer config={{
                    value: { label: "Percentage" },
                    "Open Rate": { label: "Open Rate", color: "hsl(var(--chart-1))" },
                    CTR: { label: "CTR", color: "hsl(var(--chart-2))" },
                    "Bounce Rate": { label: "Bounce Rate", color: "hsl(var(--chart-3))" },
                  } satisfies ChartConfig} className="aspect-auto h-[200px] sm:h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={currentEmailChartData} layout="vertical" margin={{ left: 10, right: 10, top: 5, bottom: 0 }}>
                      <CartesianGrid horizontal={false} strokeDasharray="3 3"/>
                      <XAxis type="number" dataKey="value" tickFormatter={(value) => `${value}%`} fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={10} width={70} />
                      <RechartsTooltip cursor={{fill: 'hsl(var(--muted)/0.3)'}} content={<ChartTooltipContent indicator="line" hideLabel />} />
                      <ChartLegend content={<ChartLegendContent icon={PieChartIcon} wrapperStyle={{fontSize: '10px'}} />} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={10}>
                       {currentEmailChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill || "hsl(var(--chart-1))"} />
                      ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                  <div className="aspect-auto h-[200px] sm:h-[220px] w-full flex items-center justify-center bg-muted/30 rounded-md">
                    <Skeleton className="h-full w-full" />
                  </div>
              )}
              <Separator className="my-2" />
              <div>
                <h4 className="font-semibold text-sm mb-1.5">Recent Campaigns (Mock)</h4>
                <div className="space-y-1.5">
                  {upcomingPublicationsMock.filter(p => p.type === "Newsletter").slice(0,2).map(campaign => ( 
                    <div key={campaign.id} className="flex items-center justify-between p-2 border rounded-md bg-background hover:bg-muted/50 transition-colors text-xs">
                      <div className="min-w-0 flex items-center gap-2">
                        {campaign.icon}
                        <div>
                            <p className="font-medium truncate">{campaign.title}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{campaign.time}</p>
                        </div>
                      </div>
                      <Link href={campaign.link} className={cn(buttonVariants({variant: "link", size: "xs"}), "text-xs text-primary hover:text-primary/80 p-0 h-auto ml-2 flex-shrink-0")}>
                        Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
               <Alert variant="default" className="mt-3 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 text-xs">
                  <Lightbulb className="h-4 w-4 text-blue-500" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300 text-sm">Smart Suggestion</AlertTitle>
                  <AlertDescription className="text-blue-600 dark:text-blue-400">
                      Your average email open rate is {hasMounted && emailSummaryMetrics ? emailSummaryMetrics.avgOpenRate : '--%'}. 
                      <Button size="xs" variant="link" className="p-0 h-auto ml-1 text-blue-700 dark:text-blue-300 text-xs hover:underline">Get AI ideas for subject lines?</Button>
                  </AlertDescription>
              </Alert>
            </CardContent>
             <CardFooter className="border-t pt-4">
                <Link href="/email-marketing/dashboard" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full text-xs")}>
                    View Full Email Marketing Dashboard
                </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center"><CalendarDays className="mr-2 h-6 w-6 text-primary" />Upcoming Publications</CardTitle>
                    <Link href="/calendar" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 text-xs")}>
                        View Full Calendar
                    </Link>
                </div>
                <CardDescription className="text-xs sm:text-sm mt-1">Overview of your scheduled content across platforms.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                {upcomingPublicationsMock.length > 0 ? (
                    <ul className="space-y-1.5">
                        {upcomingPublicationsMock.map(item => (
                        <li key={item.id} className="flex items-center gap-3 p-2 border rounded-md bg-background hover:bg-muted/50 transition-colors text-xs">
                            <div className="flex-shrink-0">{item.icon}</div>
                            <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{item.type} - {item.time}</p>
                            </div>
                            <Button variant="ghost" size="xs" asChild className="h-7 w-7 p-0 ml-2 flex-shrink-0">
                                <Link href={item.link}>
                                <Edit3 className="h-3.5 w-3.5" />
                                <span className="sr-only">Edit</span>
                                </Link>
                            </Button>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming publications scheduled.</p>
                )}
                <Alert variant="default" className="mt-3 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 text-xs">
                    <Lightbulb className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700 dark:text-blue-300 text-sm">Smart Suggestion</AlertTitle>
                    <AlertDescription className="text-blue-600 dark:text-blue-400">
                        Your content calendar looks a bit light for next week.
                        <Button size="xs" variant="link" className="p-0 h-auto ml-1 text-blue-700 dark:text-blue-300 text-xs hover:underline">Get AI Ideas?</Button>
                    </AlertDescription>
                </Alert>
                </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center"><SettingsIcon className="mr-2 h-6 w-6 text-primary"/>Quick Actions</CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-1">Jumpstart your marketing tasks.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow content-start">
                    <Link href="/social-media/create-post" className={cn(buttonVariants({ size: "lg", variant: "default" }), "w-full bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center py-3 text-sm")}>
                        <Edit3 className="mr-2 h-4 w-4" />New Social Post
                    </Link>
                    <Link href="/email-marketing/campaigns/create" className={cn(buttonVariants({ size: "lg" }), "w-full flex items-center justify-center py-3 text-sm")}>
                        <MailPlus className="mr-2 h-4 w-4" />New Email Campaign
                    </Link>
                    <Link href="/ai-assistant" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:col-span-2 flex items-center justify-center py-3 text-sm")}>
                        <Lightbulb className="mr-2 h-4 w-4" />AI Content Assistant
                    </Link>
                </CardContent>
            </Card>
        </div>

         <div className="pt-4">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
                <LayoutDashboard className="mr-2 h-5 w-5 text-muted-foreground" />
                Channel Specific Engagement
            </h3>
            {initiallyLoadedLocalStorage && dashboardChannelsToDisplay.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {dashboardChannelsToDisplay.map(channel => (
                    <Card key={channel.id} className="p-3 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col text-xs">
                    <div className="flex items-center space-x-2 mb-1.5">
                        {channel.icon && React.cloneElement(channel.icon as React.ReactElement, { className: "h-4 w-4" })}
                        <CardTitle className="text-sm">{channel.platform}</CardTitle>
                    </div>
                    <CardContent className="p-0 flex-grow space-y-1">
                        <div>
                        <p className="text-[10px] text-muted-foreground">Engagement Rate</p>
                        <p className="text-base font-bold">{channel.engagementRate || 0}%</p>
                        <Progress value={channel.progressValue || channel.engagementRate || 0} className="h-1.5 mt-0.5" />
                        </div>
                        <div>
                        <p className="text-[10px] text-muted-foreground">Follower Change</p>
                        <p className={cn(
                            "text-sm font-semibold flex items-center",
                            (channel.followerChange || 0) >= 0 
                                ? "text-green-600 dark:text-green-400" 
                                : "text-red-600 dark:text-red-400"
                        )}>
                            <TrendingUp className={cn("mr-1 h-3.5 w-3.5", (channel.followerChange || 0) < 0 && "transform rotate-180")} />
                            {(channel.followerChange || 0) >= 0 ? '+' : ''}
                            {(channel.followerChange || 0).toFixed(0)}
                        </p>
                        </div>
                    </CardContent>
                    </Card>
                ))}
                </div>
            ) : (
                 <Card className="shadow-sm">
                  <CardContent className="py-10 flex flex-col items-center justify-center text-center">
                  {!hasMounted || !initiallyLoadedLocalStorage ? ( 
                      <>
                          <Loader2 className="h-10 w-10 text-muted-foreground mb-3 animate-spin" />
                          <h3 className="text-md font-semibold">Loading Channel Preferences...</h3>
                      </>
                  ) : (
                      <>
                          <LayoutDashboard className="h-10 w-10 text-muted-foreground mb-3" />
                          <h3 className="text-md font-semibold">No social channels selected for dashboard display.</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                          Configure in <Link href="/admin/settings" className="underline hover:text-primary">System Configuration &gt; Social Accounts</Link>.
                          </p>
                      </>
                  )}
                  </CardContent>
              </Card>
            )}
        </div>

        {/* New Card for Demonstrating Fixed Chart Fix */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center"><BarChart className="mr-2 h-6 w-6 text-primary"/>Fixed Dimensions Chart Example</CardTitle>
            <CardDescription>Demonstrating how to handle charts with fixed dimensions (e.g., 453x220) without `ResponsiveContainer` warnings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">
              If you use <code>ResponsiveContainer</code> with hardcoded pixel values for width and height, Recharts might suggest you don't need it.
              The fix is to remove <code>ResponsiveContainer</code> and apply dimensions to a parent <code>div</code>, then pass those dimensions directly to the chart component (e.g., <code>BarChart</code>).
            </p>
            <div className="p-4 border rounded-md bg-muted/30">
              <h4 className="font-semibold mb-2">Chart with Fixed Dimensions (453px x 220px)</h4>
              {hasMounted ? (
                <div style={{ width: '453px', height: '220px' }} className="mx-auto bg-background p-2 rounded-md shadow">
                  <RechartsBarChart data={fixedChartDemoData} width={453} height={220} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} />
                    <RechartsTooltip wrapperStyle={{fontSize: '12px'}}/>
                    <RechartsLegend wrapperStyle={{fontSize: '10px'}} />
                    <Bar dataKey="pv" fill="hsl(var(--chart-1))" name="Page Views" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="uv" fill="hsl(var(--chart-2))" name="Unique Visitors" radius={[4, 4, 0, 0]}/>
                  </RechartsBarChart>
                </div>
              ) : (
                <div style={{ width: '453px', height: '220px' }} className="mx-auto bg-background p-2 rounded-md shadow flex items-center justify-center">
                  <Skeleton className="h-full w-full" />
                </div>
              )}
            </div>
            <Alert variant="default" className="mt-3 bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700 text-xs">
                <Lightbulb className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-700 dark:text-green-300 text-sm">Note on this Example</AlertTitle>
                <AlertDescription className="text-green-600 dark:text-green-400">
                    The chart above is rendered directly within a <code>div</code> styled with fixed dimensions. 
                    The <code>BarChart</code> component itself receives <code>width={453}</code> and <code>height={220}</code> props.
                    This avoids the specific warning you mentioned.
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}

