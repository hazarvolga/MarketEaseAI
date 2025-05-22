
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ListFilter, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input'; 

// Mock data for campaigns
const campaignsMock = [
  { id: '1', name: 'Weekly Newsletter - Oct 23', status: 'Sent', sentDate: '2023-10-23', recipients: 1205, openRate: '25.3%', clickRate: '4.1%' },
  { id: '2', name: 'New Product Announcement - Model X', status: 'Scheduled', scheduledDate: '2023-10-28 10:00 AM', recipients: 1150 },
  { id: '3', name: 'Fall Discount Campaign', status: 'Draft', lastModified: '2023-10-20', recipients: 0 },
  { id: '4', name: 'Event Invitation: Webinar', status: 'Sent', sentDate: '2023-10-15', recipients: 850, openRate: '30.1%', clickRate: '5.5%' },
];

export default function CampaignsPage() {
  return (
    <MainLayout pageTitle="Email Campaigns">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
            <p className="text-sm text-muted-foreground">
              Create, manage, and track the performance of your email campaigns.
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/email-marketing/campaigns/create">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Campaign
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search campaigns..." className="pl-8 w-full" />
              </div>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {campaignsMock.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Recipients</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Open Rate</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Click Rate</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {campaignsMock.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{campaign.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            campaign.status === 'Sent' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                            campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                          {campaign.status === 'Sent' ? campaign.sentDate : campaign.status === 'Scheduled' ? campaign.scheduledDate : campaign.lastModified}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{campaign.recipients?.toLocaleString() || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{campaign.openRate || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{campaign.clickRate || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                            <Link href={`/email-marketing/campaigns/${campaign.id}/details`}>Details</Link>
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
              <p className="text-center text-muted-foreground py-8">No campaigns created yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
