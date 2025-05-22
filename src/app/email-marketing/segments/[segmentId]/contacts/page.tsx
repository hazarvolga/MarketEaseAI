
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users, Download, AlertTriangle } from 'lucide-react';
import { initialSegmentsMock, type Segment } from '@/lib/segment-data'; // Import shared data

interface MockContactInSegment {
  id: string;
  name: string;
  email: string;
  company: string;
  dateAddedToSegment: string;
}

export default function SegmentContactsPage() {
  const params = useParams();
  const segmentId = params.segmentId as string;
  const [segment, setSegment] = useState<Segment | null | undefined>(undefined); // undefined for loading state
  const [mockContacts, setMockContacts] = useState<MockContactInSegment[]>([]);

  useEffect(() => {
    if (segmentId) {
      const foundSegment = initialSegmentsMock.find(s => s.id === segmentId);
      setSegment(foundSegment || null);

      if (foundSegment) {
        // Generate some mock contacts for this segment
        const generatedContacts: MockContactInSegment[] = Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map((_, i) => ({
          id: `contact-${segmentId}-${i + 1}`,
          name: `User ${i + 1} in ${foundSegment.name.substring(0,10)}`,
          email: `user${i+1}.${segmentId.replace('-', '')}@example.com`,
          company: `MockCompany ${String.fromCharCode(65 + i)} Inc.`,
          dateAddedToSegment: `2023-1${Math.floor(Math.random()*2)}${Math.floor(Math.random()*9)}-${String(Math.floor(Math.random()*20)+1).padStart(2,'0')}`,
        }));
        setMockContacts(generatedContacts);
      } else {
        setMockContacts([]);
      }
    }
  }, [segmentId]);

  if (segment === undefined) {
    return (
      <MainLayout pageTitle="Loading Segment Contacts...">
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (segment === null) {
    return (
      <MainLayout pageTitle="Segment Not Found">
        <Card className="max-w-lg mx-auto mt-10">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
                <AlertTriangle className="mr-2 h-6 w-6"/> Segment Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>The segment with ID "{segmentId}" could not be found.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/email-marketing/segments">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Segments
              </Link>
            </Button>
          </CardContent>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle={`Contacts in Segment: ${segment.name}`}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <Button variant="outline" size="sm" asChild className="mb-2 sm:mb-0">
              <Link href="/email-marketing/segments">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Segments
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight mt-1">
              Contacts in Segment: <span className="text-primary">{segment.name}</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Criteria: {segment.criteria}
            </p>
          </div>
          <Button variant="outline" disabled>
            <Download className="mr-2 h-4 w-4" /> Export Contacts (Coming Soon)
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact List ({mockContacts.length} contacts)</CardTitle>
            <CardDescription>
              Showing contacts that match the criteria for this segment (mock data).
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockContacts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Date Added to Segment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>{contact.dateAddedToSegment}</TableCell>
                        <TableCell>
                          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                            <Link href={`/email-marketing/contacts/${contact.id.split('-')[0]}`}>View Contact</Link> 
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No contacts found in this segment.</h3>
                <p className="mt-1 text-sm text-muted-foreground">This segment currently has no matching contacts (or data is mocked as empty).</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
