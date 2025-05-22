
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit3, Image as ImageIcon, Settings2, Users, TrendingUp, AlertCircle } from 'lucide-react';
import React from 'react';

export default function SocialMediaPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <MainLayout pageTitle="Social Media Deck">
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Content Calendar</CardTitle>
            <CardDescription>Plan and visualize your social media posts. Scheduled and published posts will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center md:flex-row md:items-start md:justify-center gap-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm w-full md:w-auto"
            />
            {/* Placeholder for selected date's posts or details */}
            <div className="p-4 border rounded-md shadow-sm w-full md:w-[300px] bg-card">
              <h4 className="font-semibold mb-2 text-lg">
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date"}
              </h4>
              <p className="text-sm text-muted-foreground">
                Posts scheduled for this day will appear here. (Placeholder)
              </p>
              {/* Example:
              <ul className="mt-4 space-y-2">
                <li className="text-sm p-2 border-l-4 border-primary bg-primary/10 rounded">Instagram Post: "New Product Launch" - 10:00 AM</li>
                <li className="text-sm p-2 border-l-4 border-accent bg-accent/10 rounded">Facebook Post: "Weekly Tip" - 2:00 PM</li>
              </ul>
              */}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Manage your social media activities.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button size="lg" className="w-full justify-start text-base py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Edit3 className="mr-3 h-5 w-5" />
              Create New Post
            </Button>
            <Button variant="secondary" size="lg" className="w-full justify-start text-base py-6">
              <ImageIcon className="mr-3 h-5 w-5" />
              Media Library
            </Button>
            <Button variant="secondary" size="lg" className="w-full justify-start text-base py-6">
              <Settings2 className="mr-3 h-5 w-5" />
              Manage Accounts
            </Button>
            {/* 
            Future capabilities based on module description:
            <Button variant="secondary" size="lg" className="w-full justify-start text-base py-6">
              <Users className="mr-3 h-5 w-5" />
              Team Collaboration
            </Button>
            <Button variant="secondary" size="lg" className="w-full justify-start text-base py-6">
              <TrendingUp className="mr-3 h-5 w-5" />
              View Analytics
            </Button>
             <Button variant="secondary" size="lg" className="w-full justify-start text-base py-6">
              <AlertCircle className="mr-3 h-5 w-5" />
              Smart Alerts
            </Button>
            */}
          </CardContent>
        </Card>

        {/* Placeholder for AI Content Suggestions integrated here or linked */}
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle>AI Content Suggestions</CardTitle>
                <CardDescription>Get AI-powered ideas tailored to your brand.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Leverage AI to generate engaging content. You can use the AI Assistant or we can integrate a specialized suggestion tool here.
                </p>
                <Button variant="outline" onClick={() => window.location.href='/ai-assistant'}>
                    Go to AI Assistant
                </Button>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

