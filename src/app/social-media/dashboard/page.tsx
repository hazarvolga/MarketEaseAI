
"use client";
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, MessageSquare, ThumbsUp, Share2, UserPlus, BarChart3, FileText, CalendarDays, Edit3, Bell, AlertCircle,
  Instagram, Facebook, Linkedin, Youtube, Twitter as TwitterIcon, CheckCircle, UserCircle as UserCircleIcon,
  LayoutDashboard, // Added for consistency
  ImageIcon, // Added for consistency
  Settings2, // Added for consistency
  ListChecks, // Added for consistency
  Spline, // Added for consistency
  Send // Added for consistency
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import React, { useState, useEffect, useMemo } from 'react'; // Added useEffect
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend as RechartsLegend } from "recharts";

const chartData = [
  { month: "Jan", engagement: 186, followers: 80 },
  { month: "Feb", engagement: 305, followers: 90 },
  { month: "Mar", engagement: 237, followers: 120 },
  { month: "Apr", engagement: 273, followers: 190 },
  { month: "May", engagement: 209, followers: 130 },
  { month: "Jun", engagement: 314, followers: 140 },
];

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "hsl(var(--chart-1))",
  },
  followers: {
    label: "New Followers",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


// Mock data for connected accounts
const connectedAccountsMock = [
  { id: 'ig', name: 'Instagram', icon: <Instagram className="h-6 w-6 text-pink-500" />, username: '@marketmaestro_ig', status: 'connected' },
  { id: 'fb', name: 'Facebook', icon: <Facebook className="h-6 w-6 text-blue-600" />, username: 'MarketMaestro Official', status: 'connected' },
  { id: 'li', name: 'LinkedIn', icon: <Linkedin className="h-6 w-6 text-sky-700" />, username: 'MarketMaestro Inc.', status: 'connected' },
  { id: 'tw', name: 'X (Twitter)', icon: <TwitterIcon className="h-6 w-6 text-foreground" />, username: '@MarketMaestroX', status: 'needs_reauth' },
];

// Mock data for upcoming posts
const upcomingPostsMock = [
  { id: 1, platformIcon: <Instagram className="h-4 w-4 text-pink-500 mr-2"/>, platform: 'Instagram', type: 'Image Post', title: 'New Product Launch Teaser', time: 'Tomorrow, 10:00 AM' },
  { id: 2, platformIcon: <Linkedin className="h-4 w-4 text-sky-700 mr-2"/>, platform: 'LinkedIn', type: 'Article', title: 'The Future of AI in Marketing', time: 'Oct 28, 02:00 PM' },
  { id: 3, platformIcon: <Facebook className="h-4 w-4 text-blue-600 mr-2"/>, platform: 'Facebook', type: 'Video Ad', title: 'Fall Campaign Kick-off', time: 'Nov 01, 09:30 AM' },
];

// Mock data for team activity
const teamActivityMock = [
  { id: 'act1', user: 'Alice Smith', action: 'created a new draft: "Winter Sale Preview"', icon: <Edit3 className="h-5 w-5 text-blue-500" />, time: '2 hours ago' },
  { id: 'act2', user: 'Bob Johnson', action: 'scheduled a post for Instagram: "Behind the Scenes"', icon: <CalendarDays className="h-5 w-5 text-green-500" />, time: '5 hours ago' },
  { id: 'act3', user: 'Carol White', action: 'approved the post: "Monthly Newsletter - October"', icon: <CheckCircle className="h-5 w-5 text-teal-500" />, time: 'Yesterday' },
  { id: 'act4', user: 'Admin', action: 'connected a new LinkedIn account', icon: <UserPlus className="h-5 w-5 text-purple-500" />, time: '2 days ago' },
];


type Timeframe = 'daily' | 'weekly' | 'monthly';

export default function SocialMediaDashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<Timeframe>('weekly');
  const [mockEngagementRate, setMockEngagementRate] = useState<string | null>(null);

  useEffect(() => {
    // Generate random value on client side after mount
    setMockEngagementRate(`${(Math.random() * 5 + 1).toFixed(1)}%`);
  }, []);


  // Placeholder data - in a real app, this would change based on selectedTimeframe and API calls
  const engagementData = {
    likes: 1258,
    comments: 345,
    shares: 102,
    followerChange: selectedTimeframe === 'weekly' ? 78 : (selectedTimeframe === 'monthly' ? 250 : 15),
    postsPublished: selectedTimeframe === 'weekly' ? 15 : (selectedTimeframe === 'monthly' ? 60 : 2),
  };

  return (
    <MainLayout pageTitle="Social Media Hub">
      <div className="space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Social Media Hub</h1>
            <p className="text-muted-foreground">Overview of your brand's social media activity and performance.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              <Link href="/social-media/create-post">
                <Edit3 className="mr-2 h-5 w-5" /> Create New Post
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/social-media/asset-library">
                 <ImageIcon className="mr-2 h-5 w-5" /> Asset Library
              </Link>
            </Button>
          </div>
        </div>

        <Separator />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Connected Accounts</CardTitle>
            <CardDescription>Manage and view status of your linked social media profiles.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {connectedAccountsMock.map(account => (
                <Card key={account.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                    {account.icon}
                    <p className="font-semibold text-sm">{account.name}</p>
                    <p className="text-xs text-muted-foreground">{account.username}</p>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${account.status === 'connected' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-200' : 'bg-orange-100 text-orange-700 dark:bg-orange-700/30 dark:text-orange-200'}`}>
                      {account.status === 'connected' ? 'Connected' : 'Needs Re-auth'}
                    </div>
                  </CardContent>
                </Card>
              ))}
               <Button variant="outline" className="w-full h-full border-dashed hover:border-primary hover:text-primary flex flex-col items-center justify-center py-4 text-muted-foreground">
                <UserPlus className="h-8 w-8 mb-2" />
                <span className="text-sm">Connect New Account</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-start space-x-2 py-2">
          {(['daily', 'weekly', 'monthly'] as Timeframe[]).map((tf) => (
            <Button key={tf} variant={selectedTimeframe === tf ? 'default' : 'outline'} onClick={() => setSelectedTimeframe(tf)} className="capitalize">
              {tf}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center"><ThumbsUp className="mr-2 h-5 w-5 text-primary" /> Likes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{engagementData.likes.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground capitalize">{selectedTimeframe} total</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary" /> Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{engagementData.comments.toLocaleString()}</p>
               <p className="text-xs text-muted-foreground capitalize">{selectedTimeframe} total</p>
            </CardContent>
          </Card>
           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center"><Share2 className="mr-2 h-5 w-5 text-primary" /> Shares</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{engagementData.shares.toLocaleString()}</p>
               <p className="text-xs text-muted-foreground capitalize">{selectedTimeframe} total</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center"><UserPlus className="mr-2 h-5 w-5 text-green-500" /> Follower Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${engagementData.followerChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {engagementData.followerChange >= 0 ? '+' : ''}{engagementData.followerChange.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground capitalize">This {selectedTimeframe.replace('ly', '')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" /> Posts Published</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{engagementData.postsPublished.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground capitalize">{selectedTimeframe} total</p>
            </CardContent>
          </Card>
           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary" /> Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockEngagementRate !== null ? mockEngagementRate : "--%"}
              </p> 
              <p className="text-xs text-muted-foreground capitalize">{selectedTimeframe} average</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                  <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary"/>Performance Trends</CardTitle>
                  <CardDescription>Key performance indicators over the last 6 months (Placeholder Data).</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] pt-4">
                 <ChartContainer config={chartConfig} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip
                        contentStyle={{ 
                            backgroundColor: "hsl(var(--background))", 
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            boxShadow: "var(--card-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1))" 
                        }}
                        labelStyle={{color: "hsl(var(--foreground))"}}
                        itemStyle={{color: "hsl(var(--foreground))"}}
                        content={<ChartTooltipContent />}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} dot={{r:4, fill: "var(--color-engagement)", strokeWidth:1}} activeDot={{r:6, strokeWidth:2}}/>
                      <Line type="monotone" dataKey="followers" stroke="var(--color-followers)" strokeWidth={2} dot={{r:4, fill: "var(--color-followers)", strokeWidth:1}} activeDot={{r:6, strokeWidth:2}}/>
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-primary"/>Upcoming Posts</CardTitle>
              <CardDescription>A quick look at your scheduled content.</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingPostsMock.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingPostsMock.map(post => (
                    <li key={post.id} className="p-3 border rounded-md bg-muted/30 hover:bg-muted/60 transition-colors duration-150">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                           {post.platformIcon}
                          <span className="font-semibold text-sm">{post.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.platform}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{post.time}</p>
                      <div className="mt-1">
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs" asChild>
                           <Link href={`/social-media/create-post?postId=${post.id}`}>Edit/Preview</Link>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No posts scheduled yet.</p>
              )}
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/social-media/scheduled-posts">View Full Calendar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                <Bell className="h-6 w-6 text-accent" />
                <div>
                  <CardTitle className="text-lg">Smart Alerts</CardTitle>
                  <CardDescription className="text-xs">Notifications for publishing issues or engagement spikes. (Coming Soon)</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No active alerts.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center"><UserCircleIcon className="mr-2 h-5 w-5 text-primary" />Recent Team Activity</CardTitle>
                <CardDescription className="text-xs">A brief log of recent team actions.</CardDescription>
              </CardHeader>
              <CardContent>
                {teamActivityMock.length > 0 ? (
                  <ul className="space-y-3">
                    {teamActivityMock.slice(0, 3).map(activity => ( // Show first 3 activities
                      <li key={activity.id} className="flex items-start space-x-3 text-sm">
                        <div className="flex-shrink-0 pt-0.5">{activity.icon}</div>
                        <div>
                          <span className="font-medium text-foreground">{activity.user}</span>
                          <span className="text-muted-foreground"> {activity.action}</span>
                          <p className="text-xs text-muted-foreground/80">{activity.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No recent team activity.</p>
                )}
                <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => alert("Full activity log page coming soon!")}>
                  View Full Activity Log
                </Button>
              </CardContent>
            </Card>
        </div>
        
      </div>
    </MainLayout>
  );
}
