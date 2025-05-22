
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ListFilter, Search, Spline as SplineIcon } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

// Mock data for segments
const segmentsMock = [
  { id: '1', name: 'Active Users (Last 30 Days)', criteria: 'Last login < 30 days AGO AND open rate > 10%', contactsCount: 450, creationDate: '2023-08-01' },
  { id: '2', name: 'Construction Industry Newsletter', criteria: 'Industry = Construction AND List = Newsletter Subscribers', contactsCount: 320, creationDate: '2023-07-15' },
  { id: '3', name: 'Low Engagement Subscribers', criteria: 'No opens in last 3 campaigns', contactsCount: 150, creationDate: '2023-09-05' },
];

export default function SegmentsPage() {
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
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/email-marketing/segments/create">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Segment
            </Link>
          </Button>
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
