
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
  Users,
  Eye, // Ensured Eye is imported
  BarChart3,
  Lightbulb,
  Filter as FilterIcon,
  ChevronDown,
  Check,
  ChevronsUpDown,
  LayoutDashboard,
  Settings as SettingsIcon,
  PlusCircle,
  ImageIcon as ImageIconLucide, // Alias for Image from lucide-react
  Facebook,
  Instagram,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIconLucide,
  Youtube,
  CalendarDays,
  Users2 as Users2Icon, // Alias for Users2
  Building,
  ListChecks,
  Spline as SplineIcon,
  Send as SendIcon,
  LayoutTemplate as TemplateIcon,
  MailPlus,
  Cog,
  SlidersHorizontal,
  UserPlus,
  PanelLeft,
  UserCircle as UserCircleLucide, // Alias for UserCircle
  Loader2,
  PieChart as PieChartIcon,
  LineChart as LineChartIconLucide,
  ThumbsUp, // Ensured ThumbsUp is imported
  UsersRound, // Added UsersRound
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
  BarChart as RechartsBarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Pie,
  Cell,
  LabelList
} from "recharts";
import { cn } from "@/lib/utils";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Command, CommandEmpty, CommandInput, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"; // Added Command imports

type Timeframe = 'last7days' | 'last30days' | 'last90days';

interface SocialChannelUIData {
  id: string;
  platform: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected';
  engagementRate?: number;
  followerChange?: number;
  progressValue?: number;
  postsPublished?: number;
  totalLikes?: number;
}

const allPossibleChannels: SocialChannelUIData[] = [
  { id: 'facebook', platform: "Facebook", icon: <Facebook className="h-5 w-5 text-blue-600" />, status: 'connected', engagementRate: 5.2, followerChange: 30, progressValue: 52, postsPublished: 10, totalLikes: 300 },
  { id: 'instagram', platform: "Instagram", icon: <Instagram className="h-5 w-5 text-pink-500" />, status: 'connected', engagementRate: 8.1, followerChange: 75, progressValue: 81, postsPublished: 15, totalLikes: 600 },
  { id: 'linkedin', platform: "LinkedIn", icon: <LinkedinIcon className="h-5 w-5 text-sky-700" />, status: 'connected', engagementRate: 3.5, followerChange: 15, progressValue: 35, postsPublished: 5, totalLikes: 100 },
  { id: 'twitter', platform: "X (Twitter)", icon: <TwitterIconLucide className="h-5 w-5" />, status: 'connected', engagementRate: 4.5, followerChange: 22, progressValue: 45, postsPublished: 20, totalLikes: 200 },
  { id: 'youtube', platform: "YouTube", icon: <Youtube className="h-5 w-5 text-red-500" />, status: 'connected', engagementRate: 6.1, followerChange: 40, progressValue: 61, postsPublished: 8, totalLikes: 150 },
  { id: 'tiktok', platform: "TikTok", icon: <svg viewBox="0 0 28 28" fill="currentColor" className="h-5 w-5"><path d="M20.76,10.28A5.76,5.76,0,0,0,15,4.51V15.6a5.75,5.75,0,1,1-5.75-5.75,5.63,5.63,0,0,1,.13-1.27A0.76,0.76,0,0,0,9.2,8C8.7,8,8.47,8.21,8.47,8.6V15.3a0.76,0.76,0,0,0,.18,.51A8.09,8.09,0,0,0,9.2,16.1a8.24,8.24,0,1,0,8.23-8.24A8.12,8.12,0,0,0,15,7.61V13a0.75,0.75,0,0,0,.75.75h2.28A5.76,5.76,0,0,0,20.76,10.28Z"/></svg>, status: 'disconnected', engagementRate: 7.2, followerChange: 90, progressValue: 72, postsPublished: 25, totalLikes: 700 },
  { id: 'pinterest', platform: "Pinterest", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-red-600"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.198-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.377-.752-.377-1.845c0-1.713 1.002-2.981 2.248-2.981 1.052 0 1.554.792 1.554 1.746 0 1.069-.678 2.671-1.011 4.128-.278 1.213.615 2.225 1.815 2.225 2.169 0 3.717-2.299 3.717-5.588 0-2.827-2.064-4.879-5.008-4.879-3.413 0-5.409 2.556-5.409 5.199 0 1.03.395 2.143.889 2.726.096.113.119.224.083.345l-.333 1.354c-.053.223-.174.274-.422.152-1.494-.693-2.424-2.875-2.424-4.627 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.627-2.759-1.371l-.748 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592 0 12.017 0z"/></svg>, status: 'disconnected', engagementRate: 4.8, followerChange: 25, progressValue: 48, postsPublished: 12, totalLikes: 120 },
];

const LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY = 'marketMaestroDashboardChannels';

const metricDetails: ChartConfig = {
  followerGrowth: { label: "Follower Growth", plottable: true, color: "hsl(var(--chart-1))", icon: Users2Icon },
  avgEngagementRate: { label: "Avg. Engagement Rate (%)", plottable: true, color: "hsl(var(--chart-2))", icon: TrendingUp },
  postsPublished: { label: "Posts Published", plottable: true, color: "hsl(var(--chart-3))", icon: Edit3 },
  reach: { label: "Reach", plottable: true, color: "hsl(var(--chart-4))", icon: UsersRound },
  impressions: { label: "Impressions", plottable: true, color: "hsl(var(--chart-5))", icon: Eye },
  ctr: { label: "Click-Through Rate (CTR %)", plottable: true, color: "var(--color-cyan)", icon: ArrowRight },
  storyPostViews: { label: "Story/Post Views", plottable: true, color: "var(--color-orange)", icon: ImageIconLucide },
  profileVisits: { label: "Profile Visits", plottable: true, color: "hsl(var(--chart-3))", icon: UserCircleLucide }, // Reused chart-3 for demo
  audienceGrowthRate: { label: "Audience Growth Rate (%)", plottable: true, color: "hsl(var(--chart-4))", icon: UserPlus }, // Reused chart-4 for demo
  topPerformingPost: { label: "Top Performing Post", plottable: false, icon: ThumbsUp },
};

const plottableMetrics = Object.keys(metricDetails).filter(key => metricDetails[key].plottable);

const platformMetricData: Record<string, Record<Timeframe, { summary: any; chart: any[] }>> = {
  overall: {
    last7days: { summary: { followerGrowth: 150, avgEngagementRate: "3.5", postsPublished: 20, reach: 15000, impressions: 25000, ctr: "1.8", storyPostViews: 5000, profileVisits: 300, audienceGrowthRate: "0.5", totalLikes: "1.2k", topPerformingPost: "Overall top post - 7d" }, chart: Array.from({ length: 7 }, (_, i) => ({ name: `D${i + 1}`, followerGrowth: Math.floor(Math.random() * 30) + 10, avgEngagementRate: parseFloat((Math.random() * 2 + 2).toFixed(1)), postsPublished: Math.floor(Math.random()*3)+1, reach: Math.floor(Math.random()*1000)+1000, impressions: Math.floor(Math.random()*1500)+1500, ctr: parseFloat((Math.random()*1+1).toFixed(1)), storyPostViews: Math.floor(Math.random()*500)+300, profileVisits: Math.floor(Math.random()*30)+20, audienceGrowthRate: parseFloat((Math.random()*0.2+0.1).toFixed(1)) })) },
    last30days: { summary: { followerGrowth: 600, avgEngagementRate: "4.1", postsPublished: 80, reach: 60000, impressions: 100000, ctr: "2.1", storyPostViews: 20000, profileVisits: 1200, audienceGrowthRate: "0.8", totalLikes: "5k", topPerformingPost: "Overall top post - 30d" }, chart: Array.from({ length: 4 }, (_, i) => ({ name: `W${i + 1}`, followerGrowth: Math.floor(Math.random() * 150) + 50, avgEngagementRate: parseFloat((Math.random() * 2 + 3).toFixed(1)), postsPublished: Math.floor(Math.random()*10)+10, reach: Math.floor(Math.random()*10000)+10000, impressions: Math.floor(Math.random()*15000)+15000, ctr: parseFloat((Math.random()*1+1.5).toFixed(1)), storyPostViews: Math.floor(Math.random()*3000)+2000, profileVisits: Math.floor(Math.random()*200)+100, audienceGrowthRate: parseFloat((Math.random()*0.3+0.2).toFixed(1)) })) },
    last90days: { summary: { followerGrowth: 1800, avgEngagementRate: "4.5", postsPublished: 240, reach: 180000, impressions: 300000, ctr: "2.5", storyPostViews: 60000, profileVisits: 3600, audienceGrowthRate: "1.2", totalLikes: "15k", topPerformingPost: "Overall top post - 90d" }, chart: Array.from({ length: 12 }, (_, i) => ({ name: `M${i + 1}`, followerGrowth: Math.floor(Math.random() * 200) + 100, avgEngagementRate: parseFloat((Math.random() * 2 + 3.5).toFixed(1)), postsPublished: Math.floor(Math.random()*10)+15, reach: Math.floor(Math.random()*12000)+12000, impressions: Math.floor(Math.random()*18000)+18000, ctr: parseFloat((Math.random()*1+1.8).toFixed(1)), storyPostViews: Math.floor(Math.random()*4000)+3000, profileVisits: Math.floor(Math.random()*250)+150, audienceGrowthRate: parseFloat((Math.random()*0.4+0.3).toFixed(1)) })) },
  },
  facebook: {
    last7days: { summary: { followerGrowth: 30, avgEngagementRate: "2.5", postsPublished: 5, reach: 3000, impressions: 5000, ctr: "1.2", storyPostViews: 1000, profileVisits: 60, audienceGrowthRate: "0.2", totalLikes: "200", topPerformingPost: "FB top post - 7d" }, chart: Array.from({ length: 7 }, (_, i) => ({ name: `D${i + 1}`, followerGrowth: Math.floor(Math.random() * 5) + 2, avgEngagementRate: parseFloat((Math.random() * 1 + 1.5).toFixed(1)), postsPublished: Math.floor(Math.random()*2), reach: Math.floor(Math.random()*200)+200, impressions: Math.floor(Math.random()*300)+300, ctr: parseFloat((Math.random()*0.5+0.5).toFixed(1)), storyPostViews: Math.floor(Math.random()*100)+50, profileVisits: Math.floor(Math.random()*5)+3, audienceGrowthRate: parseFloat((Math.random()*0.1+0.05).toFixed(1)) })) },
    last30days: { summary: { followerGrowth: 120, avgEngagementRate: "2.8", postsPublished: 20, reach: 12000, impressions: 20000, ctr: "1.5", storyPostViews: 4000, profileVisits: 240, audienceGrowthRate: "0.3", totalLikes: "800", topPerformingPost: "FB top post - 30d" }, chart: Array.from({ length: 4 }, (_, i) => ({ name: `W${i + 1}`, followerGrowth: Math.floor(Math.random() * 30) + 10, avgEngagementRate: parseFloat((Math.random() * 1 + 2).toFixed(1)), postsPublished: Math.floor(Math.random()*3)+2, reach: Math.floor(Math.random()*2000)+2000, impressions: Math.floor(Math.random()*3000)+3000, ctr: parseFloat((Math.random()*0.5+1).toFixed(1)), storyPostViews: Math.floor(Math.random()*500)+300, profileVisits: Math.floor(Math.random()*30)+20, audienceGrowthRate: parseFloat((Math.random()*0.1+0.1).toFixed(1)) })) },
    last90days: { summary: { followerGrowth: 360, avgEngagementRate: "3.1", postsPublished: 60, reach: 36000, impressions: 60000, ctr: "1.8", storyPostViews: 12000, profileVisits: 720, audienceGrowthRate: "0.4", totalLikes: "2.4k", topPerformingPost: "FB top post - 90d" }, chart: Array.from({ length: 12 }, (_, i) => ({ name: `M${i + 1}`, followerGrowth: Math.floor(Math.random() * 40) + 20, avgEngagementRate: parseFloat((Math.random() * 1 + 2.5).toFixed(1)), postsPublished: Math.floor(Math.random()*3)+3, reach: Math.floor(Math.random()*2500)+2500, impressions: Math.floor(Math.random()*3500)+3500, ctr: parseFloat((Math.random()*0.5+1.2).toFixed(1)), storyPostViews: Math.floor(Math.random()*800)+500, profileVisits: Math.floor(Math.random()*50)+30, audienceGrowthRate: parseFloat((Math.random()*0.15+0.1).toFixed(1)) })) },
  },
  // Add similar mock data for instagram, linkedin, twitter, youtube
  instagram: { // Example for Instagram
    last7days: { summary: { followerGrowth: 70, avgEngagementRate: "5.5", postsPublished: 7, reach: 7000, impressions: 10000, ctr: "2.2", storyPostViews: 3000, profileVisits: 150, audienceGrowthRate: "0.8", totalLikes: "500", topPerformingPost: "IG top post - 7d" }, chart: Array.from({ length: 7 }, (_, i) => ({ name: `D${i + 1}`, followerGrowth: Math.floor(Math.random() * 15) + 5, avgEngagementRate: parseFloat((Math.random() * 2 + 4).toFixed(1)), postsPublished: Math.floor(Math.random()*2)+1, reach: Math.floor(Math.random()*500)+500, impressions: Math.floor(Math.random()*800)+700, ctr: parseFloat((Math.random()*1+1.5).toFixed(1)), storyPostViews: Math.floor(Math.random()*300)+200, profileVisits: Math.floor(Math.random()*15)+10, audienceGrowthRate: parseFloat((Math.random()*0.3+0.1).toFixed(1)) })) },
    last30days: { summary: { followerGrowth: 280, avgEngagementRate: "6.1", postsPublished: 30, reach: 28000, impressions: 40000, ctr: "2.8", storyPostViews: 12000, profileVisits: 600, audienceGrowthRate: "1.0", totalLikes: "2k", topPerformingPost: "IG top post - 30d" }, chart: Array.from({ length: 4 }, (_, i) => ({ name: `W${i + 1}`, followerGrowth: Math.floor(Math.random() * 70) + 30, avgEngagementRate: parseFloat((Math.random() * 2 + 5).toFixed(1)), postsPublished: Math.floor(Math.random()*5)+5, reach: Math.floor(Math.random()*5000)+5000, impressions: Math.floor(Math.random()*8000)+7000, ctr: parseFloat((Math.random()*1+2).toFixed(1)), storyPostViews: Math.floor(Math.random()*2000)+1500, profileVisits: Math.floor(Math.random()*100)+50, audienceGrowthRate: parseFloat((Math.random()*0.4+0.2).toFixed(1)) })) },
    last90days: { summary: { followerGrowth: 800, avgEngagementRate: "6.8", postsPublished: 90, reach: 80000, impressions: 120000, ctr: "3.2", storyPostViews: 36000, profileVisits: 1800, audienceGrowthRate: "1.5", totalLikes: "6k", topPerformingPost: "IG top post - 90d" }, chart: Array.from({ length: 12 }, (_, i) => ({ name: `M${i + 1}`, followerGrowth: Math.floor(Math.random() * 80) + 40, avgEngagementRate: parseFloat((Math.random() * 2 + 5.5).toFixed(1)), postsPublished: Math.floor(Math.random()*6)+6, reach: Math.floor(Math.random()*6000)+6000, impressions: Math.floor(Math.random()*10000)+9000, ctr: parseFloat((Math.random()*1+2.5).toFixed(1)), storyPostViews: Math.floor(Math.random()*2500)+2000, profileVisits: Math.floor(Math.random()*120)+80, audienceGrowthRate: parseFloat((Math.random()*0.5+0.3).toFixed(1)) })) },
  },
   // Placeholder for other platforms to avoid errors if selected
  linkedin: {
    last7days: { summary: { followerGrowth: 20, avgEngagementRate: "1.5", postsPublished: 3, reach: 2000, impressions: 3000, ctr: "0.8", storyPostViews: 500, profileVisits: 40, audienceGrowthRate: "0.1", totalLikes: "100", topPerformingPost: "LI top post - 7d" }, chart: Array.from({ length: 7 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
    last30days: { summary: { followerGrowth: 80, avgEngagementRate: "1.8", postsPublished: 12, reach: 8000, impressions: 12000, ctr: "1.0", storyPostViews: 2000, profileVisits: 160, audienceGrowthRate: "0.2", totalLikes: "400", topPerformingPost: "LI top post - 30d" }, chart: Array.from({ length: 4 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
    last90days: { summary: { followerGrowth: 240, avgEngagementRate: "2.0", postsPublished: 36, reach: 24000, impressions: 36000, ctr: "1.2", storyPostViews: 6000, profileVisits: 480, audienceGrowthRate: "0.3", totalLikes: "1.2k", topPerformingPost: "LI top post - 90d" }, chart: Array.from({ length: 12 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
  },
  twitter: {
    last7days: { summary: { followerGrowth: 25, avgEngagementRate: "2.0", postsPublished: 10, reach: 2500, impressions: 4000, ctr: "1.0", storyPostViews: 0, profileVisits: 50, audienceGrowthRate: "0.15", totalLikes: "150", topPerformingPost: "X top post - 7d" }, chart: Array.from({ length: 7 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
    last30days: { summary: { followerGrowth: 100, avgEngagementRate: "2.2", postsPublished: 40, reach: 10000, impressions: 16000, ctr: "1.2", storyPostViews: 0, profileVisits: 200, audienceGrowthRate: "0.25", totalLikes: "600", topPerformingPost: "X top post - 30d" }, chart: Array.from({ length: 4 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
    last90days: { summary: { followerGrowth: 300, avgEngagementRate: "2.5", postsPublished: 120, reach: 30000, impressions: 48000, ctr: "1.5", storyPostViews: 0, profileVisits: 600, audienceGrowthRate: "0.4", totalLikes: "1.8k", topPerformingPost: "X top post - 90d" }, chart: Array.from({ length: 12 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
  },
  youtube: {
    last7days: { summary: { followerGrowth: 15, avgEngagementRate: "3.0", postsPublished: 2, reach: 5000, impressions: 7000, ctr: "1.5", storyPostViews: 3500, profileVisits: 30, audienceGrowthRate: "0.1", totalLikes: "300", topPerformingPost: "YT top post - 7d" }, chart: Array.from({ length: 7 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
    last30days: { summary: { followerGrowth: 60, avgEngagementRate: "3.3", postsPublished: 8, reach: 20000, impressions: 28000, ctr: "1.8", storyPostViews: 14000, profileVisits: 120, audienceGrowthRate: "0.2", totalLikes: "1.2k", topPerformingPost: "YT top post - 30d" }, chart: Array.from({ length: 4 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
    last90days: { summary: { followerGrowth: 180, avgEngagementRate: "3.5", postsPublished: 24, reach: 60000, impressions: 84000, ctr: "2.0", storyPostViews: 42000, profileVisits: 360, audienceGrowthRate: "0.3", totalLikes: "3.6k", topPerformingPost: "YT top post - 90d" }, chart: Array.from({ length: 12 }, () => ({ followerGrowth: 0, avgEngagementRate: 0, postsPublished: 0, reach:0, impressions:0, ctr:0, storyPostViews:0, profileVisits:0, audienceGrowthRate:0 })) },
  },
   tiktok: {
    last7days: { summary: { followerGrowth: 0, avgEngagementRate: "0", postsPublished: 0, reach: 0, impressions: 0, ctr: "0", storyPostViews: 0, profileVisits: 0, audienceGrowthRate: "0", totalLikes: "0", topPerformingPost: "N/A" }, chart: [] },
    last30days: { summary: { followerGrowth: 0, avgEngagementRate: "0", postsPublished: 0, reach: 0, impressions: 0, ctr: "0", storyPostViews: 0, profileVisits: 0, audienceGrowthRate: "0", totalLikes: "0", topPerformingPost: "N/A" }, chart: [] },
    last90days: { summary: { followerGrowth: 0, avgEngagementRate: "0", postsPublished: 0, reach: 0, impressions: 0, ctr: "0", storyPostViews: 0, profileVisits: 0, audienceGrowthRate: "0", totalLikes: "0", topPerformingPost: "N/A" }, chart: [] },
  },
  pinterest: {
    last7days: { summary: { followerGrowth: 0, avgEngagementRate: "0", postsPublished: 0, reach: 0, impressions: 0, ctr: "0", storyPostViews: 0, profileVisits: 0, audienceGrowthRate: "0", totalLikes: "0", topPerformingPost: "N/A" }, chart: [] },
    last30days: { summary: { followerGrowth: 0, avgEngagementRate: "0", postsPublished: 0, reach: 0, impressions: 0, ctr: "0", storyPostViews: 0, profileVisits: 0, audienceGrowthRate: "0", totalLikes: "0", topPerformingPost: "N/A" }, chart: [] },
    last90days: { summary: { followerGrowth: 0, avgEngagementRate: "0", postsPublished: 0, reach: 0, impressions: 0, ctr: "0", storyPostViews: 0, profileVisits: 0, audienceGrowthRate: "0", totalLikes: "0", topPerformingPost: "N/A" }, chart: [] },
  },
};


export default function DashboardPage() {
  const [socialTimeframe, setSocialTimeframe] = useState<Timeframe>('last30days');
  const [emailTimeframe, setEmailTimeframe] = useState<Timeframe>('last30days');
  
  const [initiallyLoadedLocalStorage, setInitiallyLoadedLocalStorage] = useState(false);
  const [dashboardChannelsToDisplay, setDashboardChannelsToDisplay] = useState<SocialChannelUIData[]>([]);

  const [isSocialChannelFilterOpen, setIsSocialChannelFilterOpen] = useState(false);
  const [selectedSocialChannelId, setSelectedSocialChannelId] = useState<string | null>(null); // Single select
  const [channelSearchValue, setChannelSearchValue] = useState("");

  const [isChartMetricFilterOpen, setIsChartMetricFilterOpen] = useState(false);
  const [selectedChartMetrics, setSelectedChartMetrics] = useState<string[]>(['followerGrowth', 'avgEngagementRate']);

  const [displayedSocialSummaryMetrics, setDisplayedSocialSummaryMetrics] = useState<any>(platformMetricData.overall.last30days.summary);
  const [chartDataForSocial, setChartDataForSocial] = useState<any[]>(platformMetricData.overall.last30days.chart);


  // Effect to load dashboard channel preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedChannelIdsString = localStorage.getItem(LOCAL_STORAGE_DASHBOARD_CHANNELS_KEY);
      let activeChannelIdsFromStorage: string[] = [];

      if (storedChannelIdsString) {
        try {
          const parsedIds = JSON.parse(storedChannelIdsString);
          if (Array.isArray(parsedIds) && parsedIds.every(id => typeof id === 'string')) {
            activeChannelIdsFromStorage = parsedIds;
          }
        } catch (e) {
          console.error("Error parsing dashboard channels from localStorage", e);
        }
      }
      
      const filteredForDashboard = allPossibleChannels.filter(channel => 
        activeChannelIdsFromStorage.includes(channel.id) && channel.status === 'connected'
      );
      setDashboardChannelsToDisplay(filteredForDashboard);
      if (filteredForDashboard.length > 0 && !selectedSocialChannelId) {
        // setSelectedSocialChannelId(filteredForDashboard[0].id); // Default to first connected if none selected
      }
      setInitiallyLoadedLocalStorage(true);
    }
  }, []);


  // Effect to update Social Media Performance card data based on timeframe and selected channel
  useEffect(() => {
    const channelKey = selectedSocialChannelId || 'overall';
    const dataSet = platformMetricData[channelKey]?.[socialTimeframe] || platformMetricData.overall[socialTimeframe];
    
    setDisplayedSocialSummaryMetrics(dataSet.summary);
    setChartDataForSocial(dataSet.chart);

  }, [selectedSocialChannelId, socialTimeframe]);
  
  const selectedChannelDetails = useMemo(() => {
    if (!selectedSocialChannelId) return null;
    return allPossibleChannels.find(c => c.id === selectedSocialChannelId);
  }, [selectedSocialChannelId]);

  const connectedPlatformsForFilter = useMemo(() => {
    return allPossibleChannels.filter(channel => channel.status === 'connected');
  }, []);


  const emailChartDataSets: Record<Timeframe, any[]> = {
    last7days: [ { name: "Open Rate", value: 22.1, fill: "hsl(var(--chart-1))" }, { name: "CTR", value: 3.5, fill: "hsl(var(--chart-2))" }, { name: "Bounce Rate", value: 2.0, fill: "hsl(var(--chart-3))" }, ],
    last30days: [ { name: "Open Rate", value: 25.3, fill: "hsl(var(--chart-1))" }, { name: "CTR", value: 4.1, fill: "hsl(var(--chart-2))" }, { name: "Bounce Rate", value: 1.8, fill: "hsl(var(--chart-3))" }, ],
    last90days: [ { name: "Open Rate", value: 28.9, fill: "hsl(var(--chart-1))" }, { name: "CTR", value: 4.8, fill: "hsl(var(--chart-2))" }, { name: "Bounce Rate", value: 1.5, fill: "hsl(var(--chart-3))" }, ],
  };
  
  const currentEmailChartData = useMemo(() => {
    return emailChartDataSets[emailTimeframe];
  }, [emailTimeframe]);

  const emailSummaryMetrics = useMemo(() => {
    const data = currentEmailChartData;
    const openRateEntry = data.find(d => d.name === 'Open Rate');
    return {
      avgOpenRate: `${openRateEntry?.value || '0.0'}% ${openRateEntry?.value && openRateEntry.value > 25 ? '🔥' : ''}`,
      avgClickRate: `${data.find(d => d.name === 'CTR')?.value || '0.0'}%`,
      estBounceRate: `${data.find(d => d.name === 'Bounce Rate')?.value || '0.0'}%`,
      newSubscribers: `+${Math.round((openRateEntry?.value || 0) * (emailTimeframe === 'last7days' ? 2.5 : emailTimeframe === 'last30days' ? 10 : 30))}`,
    };
  }, [currentEmailChartData, emailTimeframe]);

  const recentCampaigns = [
    { id: 1, title: 'Q4 Product Launch', status: 'Sent', openRate: currentEmailChartData.find(d => d.name === 'Open Rate')?.value + "%", ctr: currentEmailChartData.find(d => d.name === 'CTR')?.value + "%" , link: '/email-marketing/campaigns' },
    { id: 2, title: 'Holiday Special Offer', status: 'Scheduled', scheduledFor: 'Dec 15, 10:00 AM', link: '/email-marketing/campaigns' },
  ];

  const upcomingPublicationsMock = [
    { id: 1, icon: <Edit3 className="h-5 w-5 text-blue-500" />, title: "New Blog: AI in Modern Architecture", time: "Tomorrow, 09:00 AM", type: "Blog Post", link: "/social-media/create-post" },
    { id: 2, icon: <Mail className="h-5 w-5 text-green-500" />, title: "Weekly Project Digest", time: "Friday, 02:00 PM", type: "Newsletter", link: "/email-marketing/campaigns/create" },
    { id: 3, icon: <Instagram className="h-5 w-5 text-pink-500" />, title: "Insta Story: Q&A Highlights", time: "Next Mon, 11:00 AM", type: "Social Post", link: "/social-media/create-post"},
  ];
  

  return (
    <MainLayout pageTitle="Dashboard Overview">
      <div className="space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Social Media Performance Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                 <CardTitle className="text-xl flex items-center flex-wrap gap-x-2">
                  {selectedChannelDetails ? (
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
                        {selectedChannelDetails ? (
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
                           <CommandList className="max-h-[250px]">
                            <CommandEmpty>No channel found.</CommandEmpty>
                            <CommandGroup>
                                <CommandItem 
                                  key="overall-social-filter"
                                  value="Overall Performance"
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
                Key metrics and trends for {selectedChannelDetails ? selectedChannelDetails.platform : "all connected"} social channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex-grow">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-3 text-left text-xs">
                {Object.entries(metricDetails)
                .filter(([key, detail]) => key !== 'topPerformingPost') 
                .map(([key, detail]) => {
                    const metricConfig = detail as { label: string; icon: React.ElementType };
                    const IconComponent = metricConfig.icon;
                    const value = displayedSocialSummaryMetrics[key];
                    return (
                    <div key={key} className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                        <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground mb-0.5">
                        {IconComponent && <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 flex-shrink-0"/>}
                        <span className="truncate" title={metricConfig.label}>{metricConfig.label}</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold truncate" title={String(value || '0')}>
                        {value !== undefined ? String(value) : "0"}
                        {(key.toLowerCase().includes('rate') || key.toLowerCase().includes('ctr')) && value !== undefined ? '%' : ''}
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
                        <CommandList className="max-h-[250px]">
                          <CommandEmpty>No metric found.</CommandEmpty>
                          <CommandGroup heading="Select Metrics (Max 3 Recommended)">
                            {plottableMetrics.map(key => {
                                const metricConfig = metricDetails[key] as { label: string; icon: React.ElementType };
                                const IconComponent = metricConfig.icon;
                                return (
                                <CommandItem 
                                    key={key}
                                    value={metricConfig.label}
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
                                    {metricConfig.label}
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
                <ChartContainer config={metricDetails} className="aspect-auto h-[200px] sm:h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={chartDataForSocial} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <ChartTooltip 
                        cursor={false}
                        content={<ChartTooltipContent 
                                    indicator="line" 
                                    nameKey="name"
                                    formatter={(value, name, itemPayload) => {
                                      const itemConfig = metricDetails[itemPayload.dataKey as string] as { label: string; icon?: React.ElementType };
                                      return (
                                        <div className="flex items-center">
                                          {itemConfig?.icon && <itemConfig.icon className="h-3 w-3 mr-1.5" style={{color: itemPayload.color}}/>}
                                          <span style={{color: itemPayload.color}}>{itemConfig?.label || name}: {value}{(itemConfig?.label && (itemConfig.label as string).includes('%') ? '%' : '')}</span>
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
                            name={metricConfig.label as string}
                          />
                        );
                      })}
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
                <div className="mt-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">Top Performing Post (Mock)</Label>
                    <div className="p-2 border rounded-md bg-background hover:bg-muted/50 transition-colors text-xs flex items-center gap-2">
                        {metricDetails.topPerformingPost.icon && React.createElement(metricDetails.topPerformingPost.icon as React.ElementType, {className:"h-4 w-4 text-green-500 flex-shrink-0"})}
                        <p className="truncate flex-1">{displayedSocialSummaryMetrics.topPerformingPost || "No data"}</p>
                        <Button variant="link" size="xs" className="p-0 h-auto">View</Button>
                    </div>
                </div>
                <Alert variant="default" className="mt-3 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 text-xs">
                    <Lightbulb className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700 dark:text-blue-300 text-sm">Smart Suggestion</AlertTitle>
                    <AlertDescription className="text-blue-600 dark:text-blue-400">
                        Your {selectedChannelDetails ? selectedChannelDetails.platform : 'overall'} engagement rate is {displayedSocialSummaryMetrics.avgEngagementRate}%. 
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

          {/* Email Marketing Insights Card */}
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
                     {/* Placeholder for potential future email-specific filters */}
                  </div>
              </div>
              <CardDescription className="text-xs sm:text-sm mt-1">Key metrics and performance of your email campaigns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-left text-xs">
                <div className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Avg. Open Rate</p>
                    <p className="text-sm sm:text-base font-bold">{emailSummaryMetrics.avgOpenRate}</p>
                </div>
                 <div className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Avg. Click Rate</p>
                    <p className="text-sm sm:text-base font-bold">{emailSummaryMetrics.avgClickRate}</p>
                </div>
                 <div className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">New Subscribers</p>
                    <p className="text-sm sm:text-base font-bold text-green-600 dark:text-green-400">{emailSummaryMetrics.newSubscribers}</p>
                </div>
                <div className="p-1.5 rounded-md bg-muted/40 hover:bg-muted/70">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Est. Bounce Rate</p>
                    <p className="text-sm sm:text-base font-bold">{emailSummaryMetrics.estBounceRate}</p>
                </div>
              </div>
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
              <Separator className="my-2" />
              <div>
                <h4 className="font-semibold text-sm mb-1.5">Recent Campaigns (Mock)</h4>
                <div className="space-y-1.5">
                  {recentCampaigns.slice(0,2).map(campaign => (
                    <div key={campaign.id} className="flex items-center justify-between p-2 border rounded-md bg-background hover:bg-muted/50 transition-colors text-xs">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{campaign.title}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{campaign.status === 'Sent' ? `Open: ${campaign.openRate}, CTR: ${campaign.ctr}` : `Scheduled: ${campaign.scheduledFor}`}</p>
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
                      Your average email open rate is {emailSummaryMetrics.avgOpenRate}. 
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
                    <CardTitle className="text-xl flex items-center"><LayoutDashboard className="mr-2 h-6 w-6 text-primary"/>Quick Actions</CardTitle>
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
                <SettingsIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                Channel Specific Engagement (From System Config)
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
                        <Progress value={channel.engagementRate || 0} className="h-1.5 mt-0.5" />
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
                        <ImageIconLucide className="h-10 w-10 text-muted-foreground mb-3" />
                        <h3 className="text-md font-semibold">No social channels selected for dashboard display.</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                        Configure in <Link href="/admin/settings" className="underline hover:text-primary">System Configuration &gt; Social Accounts</Link>.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </MainLayout>
  );
}

    