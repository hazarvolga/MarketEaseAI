
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { CalendarIcon, Facebook, Instagram, Twitter, Linkedin, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // ChartLegend and ChartLegendContent are not used in this simplified version
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from "recharts";
import { cn } from '@/lib/utils';

const mockSentimentTrendData = [
  { date: 'Mon', positive: 60, negative: 10, neutral: 30 },
  { date: 'Tue', positive: 65, negative: 12, neutral: 23 },
  { date: 'Wed', positive: 70, negative: 8, neutral: 22 },
  { date: 'Thu', positive: 62, negative: 15, neutral: 23 },
  { date: 'Fri', positive: 75, negative: 5, neutral: 20 },
  { date: 'Sat', positive: 80, negative: 7, neutral: 13 },
  { date: 'Sun', positive: 72, negative: 10, neutral: 18 },
];

const mockPlatformSentimentData = [
  { platform: 'Facebook', positive: 120, negative: 30, neutral: 50 },
  { platform: 'Instagram', positive: 250, negative: 20, neutral: 80 },
  { platform: 'Twitter', positive: 90, negative: 45, neutral: 65 },
  { platform: 'LinkedIn', positive: 150, negative: 10, neutral: 40 },
];

const mockRecentMentions = [
  { id: '1', platform: 'Twitter', user: 'UserX', avatar: 'https://placehold.co/40x40.png', text: 'Just tried the new feature, it\'s amazing! So intuitive. #productlove', sentiment: 'Positive', date: '2h ago', dataAiHint: 'user avatar' },
  { id: '2', platform: 'Facebook', user: 'John Doe', avatar: 'https://placehold.co/40x40.png', text: 'The recent update seems a bit buggy, especially on mobile.', sentiment: 'Negative', date: '5h ago', dataAiHint: 'profile picture' },
  { id: '3', platform: 'Instagram', user: 'InstaQueen', avatar: 'https://placehold.co/40x40.png', text: 'Loving the new aesthetic! Great job on the redesign. ✨', sentiment: 'Positive', date: '1d ago', dataAiHint: 'social media user' },
  { id: '4', platform: 'Twitter', user: 'TechReviewer', avatar: 'https://placehold.co/40x40.png', text: 'Interesting new product, looking forward to seeing how it evolves.', sentiment: 'Neutral', date: '2d ago', dataAiHint: 'reviewer photo' },
  { id: '5', platform: 'LinkedIn', user: 'BizProfessional', avatar: 'https://placehold.co/40x40.png', text: 'Great insights shared in the latest article by MarketMaestro.', sentiment: 'Positive', date: '3d ago', dataAiHint: 'professional photo' },
];

const platformIcons: { [key: string]: React.ReactNode } = {
  Facebook: <Facebook className="h-5 w-5 text-blue-600" />,
  Instagram: <Instagram className="h-5 w-5 text-pink-500" />,
  Twitter: <Twitter className="h-5 w-5" />,
  LinkedIn: <Linkedin className="h-5 w-5 text-sky-700" />,
};

const sentimentColors: { [key: string]: string } = {
  Positive: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-700/30 dark:text-green-300 dark:border-green-600',
  Negative: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-700/30 dark:text-red-300 dark:border-red-600',
  Neutral: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-700/30 dark:text-yellow-300 dark:border-yellow-600',
};
const chartSentimentColors = {
    positive: "hsl(var(--chart-2))",
    negative: "hsl(var(--chart-5))", 
    neutral: "hsl(var(--chart-4))",  
};

export default function SentimentAnalysisPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
    to: new Date(),
  });
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const overallSentimentScore = 78; 
  const overallSentimentLabel = overallSentimentScore > 70 ? 'Positive' : overallSentimentScore > 40 ? 'Neutral' : 'Negative';

  return (
    <MainLayout pageTitle="Sentiment Analysis Dashboard">
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold tracking-tight">Sentiment Overview</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <ShadcnCalendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter (X)</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-xl">Overall Sentiment Score</CardTitle>
            <CardDescription>Based on mentions in the selected period (mock data).</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className={`text-6xl font-bold ${
                overallSentimentLabel === 'Positive' ? 'text-green-500' : 
                overallSentimentLabel === 'Negative' ? 'text-red-500' : 
                'text-yellow-500'
            }`}>
                {overallSentimentScore}
            </div>
            <Badge className={cn("mt-2 text-lg px-4 py-1 font-semibold", sentimentColors[overallSentimentLabel])}>
              {overallSentimentLabel}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">+3 points since last period (mock data)</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Sentiment Trend Over Time</CardTitle>
              <CardDescription>Positive, negative, and neutral mentions (mock data).</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ChartContainer config={{}} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockSentimentTrendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                    <RechartsTooltip
                      contentStyle={{ 
                          backgroundColor: "hsl(var(--background))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          boxShadow: "var(--shadow-md)"
                      }}
                      labelStyle={{color: "hsl(var(--foreground))"}}
                      itemStyle={{color: "hsl(var(--foreground))"}}
                    />
                    <RechartsLegend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/>
                    <Line type="monotone" dataKey="positive" stroke={chartSentimentColors.positive} strokeWidth={2} name="Positive" dot={{r:3, strokeWidth:1}} activeDot={{r:5, strokeWidth:2}}/>
                    <Line type="monotone" dataKey="negative" stroke={chartSentimentColors.negative} strokeWidth={2} name="Negative" dot={{r:3, strokeWidth:1}} activeDot={{r:5, strokeWidth:2}}/>
                    <Line type="monotone" dataKey="neutral" stroke={chartSentimentColors.neutral} strokeWidth={2} name="Neutral" dot={{r:3, strokeWidth:1}} activeDot={{r:5, strokeWidth:2}}/>
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Sentiment by Platform</CardTitle>
              <CardDescription>Distribution of sentiments for each platform (mock data).</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ChartContainer config={{}} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockPlatformSentimentData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis dataKey="platform" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={70} />
                    <RechartsTooltip
                       contentStyle={{ 
                          backgroundColor: "hsl(var(--background))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          boxShadow: "var(--shadow-md)"
                      }}
                      labelStyle={{color: "hsl(var(--foreground))"}}
                      itemStyle={{color: "hsl(var(--foreground))"}}
                    />
                    <RechartsLegend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/>
                    <Bar dataKey="positive" fill={chartSentimentColors.positive} name="Positive" radius={[0, 4, 4, 0]} barSize={12}/>
                    <Bar dataKey="neutral" fill={chartSentimentColors.neutral} name="Neutral" radius={[0, 4, 4, 0]} barSize={12}/>
                    <Bar dataKey="negative" fill={chartSentimentColors.negative} name="Negative" radius={[0, 4, 4, 0]} barSize={12}/>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Key Themes & Topics</CardTitle>
              <CardDescription>Common topics associated with sentiment (mock data).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Positive Themes</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-green-500 text-green-700 dark:border-green-400 dark:text-green-300">Customer Service</Badge>
                  <Badge variant="outline" className="border-green-500 text-green-700 dark:border-green-400 dark:text-green-300">Ease of Use</Badge>
                  <Badge variant="outline" className="border-green-500 text-green-700 dark:border-green-400 dark:text-green-300">New Feature X</Badge>
                  <Badge variant="outline" className="border-green-500 text-green-700 dark:border-green-400 dark:text-green-300">Fast Response</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Negative Themes</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-red-500 text-red-700 dark:border-red-400 dark:text-red-300">Pricing</Badge>
                  <Badge variant="outline" className="border-red-500 text-red-700 dark:border-red-400 dark:text-red-300">Login Issues</Badge>
                  <Badge variant="outline" className="border-red-500 text-red-700 dark:border-red-400 dark:text-red-300">Mobile App Bug</Badge>
                </div>
              </div>
               <div>
                <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Neutral/Improvement Themes</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-700 dark:border-yellow-400 dark:text-yellow-300">More Integrations</Badge>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-700 dark:border-yellow-400 dark:text-yellow-300">Documentation</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Recent Mentions</CardTitle>
              <CardDescription>Latest social media mentions with their sentiment (mock data).</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-3">
                <div className="space-y-4">
                  {mockRecentMentions.map(mention => (
                    <div key={mention.id} className="p-3 border rounded-md bg-muted/20 hover:bg-muted/40 transition-colors">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={mention.avatar} alt={mention.user} data-ai-hint={mention.dataAiHint}/>
                          <AvatarFallback>{mention.user.substring(0,1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {platformIcons[mention.platform] || <CalendarIcon className="h-5 w-5 text-muted-foreground" />}
                              <span className="font-semibold text-sm text-foreground">{mention.user}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{mention.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{mention.text}</p>
                        </div>
                         <Badge className={cn("ml-auto self-start shrink-0 text-xs py-0.5 px-2", sentimentColors[mention.sentiment])}>
                            {mention.sentiment}
                          </Badge>
                      </div>
                       <div className="mt-2 flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs">Reply</Button>
                        <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs">View Post</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
         <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 mt-6">
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-blue-700 dark:text-blue-300 text-base">Development Note</CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-sm text-blue-600 dark:text-blue-400">
                This dashboard displays mock data for demonstration purposes. Real-time sentiment analysis, data fetching, and filtering would require backend integration with social media APIs and a sentiment analysis AI model.
            </p>
            </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}

    