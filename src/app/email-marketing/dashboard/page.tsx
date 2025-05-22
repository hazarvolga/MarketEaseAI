
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChartBig, MailPlus, Users2, Activity, LineChart, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies import("@/components/ui/chart").ChartConfig;


export default function EmailMarketingDashboardPage() {
  // Placeholder data
  const stats = {
    totalContacts: 1250,
    campaignsSentLast30Days: 15,
    averageOpenRate: "22.5%",
    averageClickRate: "3.1%",
  };

  const recentCampaigns = [
    { id: 1, name: "Weekly Newsletter - Oct W1", status: "Sent", openRate: "25%", clickRate: "4%" },
    { id: 2, name: "New Product Launch", status: "Scheduled", scheduledFor: "Oct 28, 10:00 AM" },
    { id: 3, name: "Fall Discount Announcement", status: "Draft" },
  ];

  return (
    <MainLayout pageTitle="Email Marketing Dashboard">
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Email Marketing Overview</CardTitle>
            <CardDescription>Track the performance of your campaigns, contacts, and lists.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button asChild>
              <Link href="/email-marketing/contacts/import">Import Contacts</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/email-marketing/campaigns/create">
                <MailPlus className="mr-2 h-5 w-5" /> Create New Campaign
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+20 in last 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campaigns (Last 30 Days)</CardTitle>
              <MailPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.campaignsSentLast30Days}</div>
               <p className="text-xs text-muted-foreground">Sent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageOpenRate}</div>
              <p className="text-xs text-muted-foreground">All campaigns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Click Rate</CardTitle>
              <BarChartBig className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageClickRate}</div>
              <p className="text-xs text-muted-foreground">All campaigns</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Campaigns</CardTitle>
                    <CardDescription>Your latest sent or scheduled campaigns.</CardDescription>
                </CardHeader>
                <CardContent>
                    {recentCampaigns.length > 0 ? (
                        <ul className="space-y-3">
                            {recentCampaigns.map(campaign => (
                                <li key={campaign.id} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-sm">{campaign.name}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.status === "Sent" ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200" : campaign.status === "Scheduled" ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"}`}>{campaign.status}</span>
                                    </div>
                                    {campaign.status === "Sent" && <p className="text-xs text-muted-foreground">Open: {campaign.openRate}, Click: {campaign.clickRate}</p>}
                                    {campaign.status === "Scheduled" && <p className="text-xs text-muted-foreground">Time: {campaign.scheduledFor}</p>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No campaigns yet.</p>
                    )}
                     <Button variant="outline" className="w-full mt-4" asChild>
                        <Link href="/email-marketing/campaigns">View All Campaigns</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-primary"/>Subscriber Growth</CardTitle>
                <CardDescription>Subscriber trends over the last 6 months (Placeholder Data).</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                     <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
        </div>
      </div>
    </MainLayout>
  );
}

    