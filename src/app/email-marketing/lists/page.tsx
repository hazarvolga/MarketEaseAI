
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ListFilter, Search, ListChecks as ListChecksIcon } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

// Mock data for lists
const listsMock = [
  { id: '1', name: 'Newsletter Subscribers', contactsCount: 850, creationDate: '2023-01-15', type: 'Static' },
  { id: '2', name: 'Leads - Webinar Attendees', contactsCount: 120, creationDate: '2023-09-20', type: 'Dynamic' },
  { id: '3', name: 'VIP Clients', contactsCount: 75, creationDate: '2023-05-01', type: 'Static' },
  { id: '4', name: 'Event Attendees - October', contactsCount: 210, creationDate: '2023-10-10', type: 'Static' },
];

export default function ListsPage() {
  return (
    <MainLayout pageTitle="Email Lists">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Lists</h1>
            <p className="text-sm text-muted-foreground">
              Create and manage your contact lists.
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/email-marketing/lists/create">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New List
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Lists ({listsMock.length})</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search lists..." className="pl-8 w-full" />
              </div>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {listsMock.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">List Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contacts Count</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Creation Date</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {listsMock.map((list) => (
                      <tr key={list.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{list.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{list.contactsCount.toLocaleString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{list.creationDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{list.type}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                            <Link href={`/email-marketing/lists/${list.id}`}>View/Manage Contacts</Link>
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
                <ListChecksIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No lists found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Create a new email list to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
