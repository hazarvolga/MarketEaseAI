
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Calendar as ShadcnCalendar } from '@/components/ui/calendar'; // Renamed to avoid conflict
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { PlusCircle, ListFilter, Search, CalendarDays, Edit, Trash2, Send, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Mock data for upcoming posts
const mockUpcomingPosts = [
  { id: '1', platform: 'Facebook', icon: <Facebook className="h-5 w-5 text-blue-600" />, contentSummary: "Exciting news about our new feature release coming next week! #innovation", scheduledTime: "10:00 AM", status: "Scheduled" },
  { id: '2', platform: 'Instagram', icon: <Instagram className="h-5 w-5 text-pink-500" />, contentSummary: "Behind the scenes at MarketMaestro! 📸 #companyculture", scheduledTime: "02:30 PM", status: "Scheduled" },
  { id: '3', platform: 'LinkedIn', icon: <Linkedin className="h-5 w-5 text-sky-700" />, contentSummary: "Our CEO discusses the future of AI in marketing. Read the full article...", scheduledTime: "09:00 AM", status: "Scheduled" },
  { id: '4', platform: 'Twitter', icon: <Twitter className="h-5 w-5" />, contentSummary: "Quick tip: Optimize your social media bios for better discoverability! #socialmediatips", scheduledTime: "04:15 PM", status: "Published" },
];


export default function ScheduledPostsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleActionClick = (action: string, postId: string) => {
    toast({
      title: `${action} Post ${postId}`,
      description: `This action (${action.toLowerCase()}) is not implemented in this prototype.`,
    });
  };

  // Filter mock posts for the selected date (for demo purposes)
  const postsForSelectedDate = date 
    ? mockUpcomingPosts.filter(post => {
        // This is a very basic date match for demo. 
        // In a real app, you'd compare the post's scheduledDate with the selected 'date'.
        // For this mock, we'll just show all if any date is selected.
        return true; 
      })
    : [];


  return (
    <MainLayout pageTitle="Scheduled Posts & Content Calendar">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Content Calendar & Scheduled Posts</h1>
            <p className="text-sm text-muted-foreground">
              Plan, view, and manage your scheduled social media content.
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
            <Link href="/social-media/create-post">
              <PlusCircle className="mr-2 h-5 w-5" /> Schedule New Post
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters & Calendar</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 pt-2 border-t">
              <div className="relative flex-grow sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search posts..." className="pl-8 w-full" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">X (Twitter)</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <ListFilter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex justify-center md:justify-start">
              <ShadcnCalendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm bg-card"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {date ? `Upcoming Posts for ${format(date, "MMMM d, yyyy")}` : "Select a date to see posts"}
              </h4>
              {date && postsForSelectedDate.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {postsForSelectedDate.map((post) => (
                    <Card key={post.id} className="shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 pt-1">{post.icon}</div>
                          <div className="flex-grow">
                            <p className="text-xs text-muted-foreground">{post.platform} - {post.scheduledTime} - <span className={`font-medium ${post.status === 'Published' ? 'text-green-600' : 'text-blue-600'}`}>{post.status}</span></p>
                            <p className="text-sm text-foreground mt-0.5 truncate" title={post.contentSummary}>{post.contentSummary}</p>
                          </div>
                        </div>
                        <CardFooter className="p-0 pt-3 mt-2 border-t flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleActionClick('Edit', post.id)}>
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90" onClick={() => handleActionClick('Delete', post.id)}>
                            <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                          </Button>
                           <Button variant="outline" size="sm" onClick={() => handleActionClick('Publish Now', post.id)} disabled={post.status === 'Published'}>
                            <Send className="h-3.5 w-3.5 mr-1" /> Publish Now
                          </Button>
                        </CardFooter>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : date ? (
                <p className="text-sm text-muted-foreground p-4 border border-dashed rounded-md text-center">
                  No posts scheduled for this day.
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
            <CardHeader>
                <CardTitle>AI Content Suggestions</CardTitle>
                <CardDescription>Get AI-powered ideas tailored to your brand for upcoming posts.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Need inspiration for your content calendar? Leverage AI to generate engaging content.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/ai-assistant">
                    Go to AI Assistant
                  </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
