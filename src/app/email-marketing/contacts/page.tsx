
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, UploadCloud, ListFilter, Search, Users } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for contacts
const contactsMock = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', lists: ['Newsletter Subscribers', 'Potential Leads'], dateAdded: '2023-10-01', company: 'Innovatech Solutions' },
  { id: '2', name: 'Alice Smith', email: 'alice.smith@example.com', lists: ['Newsletter Subscribers'], dateAdded: '2023-09-15', company: 'ArchStruct Inc.' },
  { id: '3', name: 'Robert Johnson', email: 'robert.j@example.com', lists: ['VIP Clients'], dateAdded: '2023-08-20', company: 'DesignPro Ltd.' },
  { id: '4', name: 'Emily White', email: 'emily.white@example.com', lists: ['Newsletter Subscribers', 'Event Attendees'], dateAdded: '2023-10-05', company: 'BuildWell Group' },
];

export default function ContactsPage() {
  return (
    <MainLayout pageTitle="Contacts">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Contact Management</h1>
            <p className="text-sm text-muted-foreground">
              View, manage, and segment contacts in your email list.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" asChild>
                <Link href="/email-marketing/contacts/import">
                    <UploadCloud className="mr-2 h-4 w-4" /> Import Contacts
                </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/email-marketing/contacts/add">
                    <PlusCircle className="mr-2 h-5 w-5" /> Add New Contact
                </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Contacts ({contactsMock.length})</CardTitle>
             <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts (name, email, company...)" className="pl-8 w-full" />
              </div>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" /> Filter/Segment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {contactsMock.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th scope="col" className="px-1 py-3 text-left">
                        <Checkbox aria-label="Select all" />
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Lists</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date Added</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {contactsMock.map((contact) => (
                      <tr key={contact.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-1 py-3 whitespace-nowrap">
                           <Checkbox aria-label={`Select contact: ${contact.name}`} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{contact.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{contact.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{contact.company || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                          {contact.lists.map(list => (
                            <span key={list} className="mr-1 mb-1 inline-block px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">{list}</span>
                          ))}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{contact.dateAdded}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                            <Link href={`/email-marketing/contacts/${contact.id}`}>Edit</Link>
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
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No contacts found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Add a new contact or import existing contacts to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
