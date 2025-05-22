
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, AlertCircle, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function EmailMarketingReportsPage() {
  return (
    <MainLayout pageTitle="Email Marketing Reports">
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Reports & Analytics</CardTitle>
            <CardDescription>
              Analyze your email marketing performance with detailed reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              In this section, you will find detailed reports on your campaign performance, list growth, contact engagement, and more.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Campaign Performance</CardTitle>
              <LineChart className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track open, click, bounce, and unsubscribe rates for your campaigns.
              </p>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/email-marketing/reports/campaigns">View Campaign Reports</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">List Growth</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analyze subscriber count changes over time and your growth sources.
              </p>
              <Button variant="outline" className="mt-4 w-full" asChild>
                 <Link href="/email-marketing/reports/list-growth">View List Growth Reports</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Contact Engagement</CardTitle>
              <BarChart3 className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor your most engaged subscribers and overall subscriber activity.
              </p>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/email-marketing/reports/engagement">View Engagement Reports</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-blue-700 dark:text-blue-300 text-base">Development Note</CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-sm text-blue-600 dark:text-blue-400">
                Detailed report pages and charts will be added in later stages of this prototype.
            </p>
            </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}
