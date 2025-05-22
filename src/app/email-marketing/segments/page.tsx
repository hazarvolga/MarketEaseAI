
"use client";

import React, { useState } from 'react'; // Added useState
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ListFilter, Search, Spline as SplineIcon, Sparkles, Lightbulb } from 'lucide-react'; // Added Sparkles, Lightbulb
import Link from 'next/link';
import { Input } from '@/components/ui/input';
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
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock data for segments
const segmentsMock = [
  { id: '1', name: 'Active Users (Last 30 Days)', criteria: 'Last login < 30 days AGO AND open rate > 10%', contactsCount: 450, creationDate: '2023-08-01' },
  { id: '2', name: 'Construction Industry Newsletter', criteria: 'Industry = Construction AND List = Newsletter Subscribers', contactsCount: 320, creationDate: '2023-07-15' },
  { id: '3', name: 'Low Engagement Subscribers', criteria: 'No opens in last 3 campaigns', contactsCount: 150, creationDate: '2023-09-05' },
];

const mockAiSegmentSuggestions = [
  { id: 'ai_seg_1', name: "Highly Engaged Email Readers", description: "Contacts who opened your last 3 campaigns and clicked at least one link.", criteriaExample: "Opened last 3 campaigns AND Clicked > 0 links in last 3 campaigns" },
  { id: 'ai_seg_2', name: "Potential Leads for 'ArchModeler Pro'", description: "Contacts who visited 'ArchModeler Pro' product page but haven't purchased.", criteriaExample: "Visited page '/products/archmodeler-pro' AND Not in 'Customers' list" },
  { id: 'ai_seg_3', name: "New Subscribers - Welcome Series Candidates", description: "Contacts added in the last 7 days who haven't received the welcome series.", criteriaExample: "Subscription date < 7 days AGO AND Not in 'Welcome Series Completed' segment" },
  { id: 'ai_seg_4', name: "Architects Interested in BIM Software", description: "Contacts whose job title includes 'Architect' and have engaged with 'BIM' keyword content.", criteriaExample: "Job Title CONTAINS 'Architect' AND Tagged WITH 'BIM interest'" },
];

export default function SegmentsPage() {
  const [isAiSuggestModalOpen, setIsAiSuggestModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateSegmentFromSuggestion = (suggestionName: string) => {
    toast({
      title: "Create Segment (Simulation)",
      description: `Creating segment based on suggestion: "${suggestionName}". This would typically pre-fill the segment creation form.`,
    });
    setIsAiSuggestModalOpen(false);
    // In a real app, you might redirect to /email-marketing/segments/create with pre-filled data
    // router.push(`/email-marketing/segments/create?basedOn=${suggestionName}`);
  };

  return (
    <MainLayout pageTitle="Email Segments">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Segments</h1>
            <p className="text-sm text-muted-foreground">
              Create and manage contact segments for targeted campaigns.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Dialog open={isAiSuggestModalOpen} onOpenChange={setIsAiSuggestModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" /> AI Suggest Segments
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" /> AI Segment Suggestions (Prototype)
                  </DialogTitle>
                  <DialogDescription>
                    Based on your (simulated) brand profile, strategic briefing, and common best practices, here are some segment ideas.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
                  {mockAiSegmentSuggestions.map(suggestion => (
                    <Card key={suggestion.id} className="bg-muted/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{suggestion.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1 pb-3">
                        <p className="text-muted-foreground">{suggestion.description}</p>
                        <p><Badge variant="secondary" className="text-xs">Example Criteria:</Badge> {suggestion.criteriaExample}</p>
                      </CardContent>
                      <CardFooter className="pb-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="ml-auto"
                          onClick={() => handleCreateSegmentFromSuggestion(suggestion.name)}
                        >
                          Use this Idea
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/email-marketing/segments/create">
                <PlusCircle className="mr-2 h-5 w-5" /> Create New Segment
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Segments ({segmentsMock.length})</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search segments..." className="pl-8 w-full" />
              </div>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {segmentsMock.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Segment Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Criteria (Summary)</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contacts Count</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Creation Date</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {segmentsMock.map((segment) => (
                      <tr key={segment.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{segment.name}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate" title={segment.criteria}>{segment.criteria}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{segment.contactsCount.toLocaleString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{segment.creationDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                            <Link href={`/email-marketing/segments/${segment.id}`}>Edit/View</Link>
                          </Button>
                           <Button variant="link" size="sm" className="p-0 h-auto ml-2 text-destructive hover:text-destructive/80" onClick={() => alert('Delete action is not implemented in this prototype.')}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <SplineIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No segments found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Create a new segment to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
