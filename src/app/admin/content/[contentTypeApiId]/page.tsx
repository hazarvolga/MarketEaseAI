
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ListFilter, Search, AlertTriangle } from 'lucide-react';
import type { ContentTypeMock } from '@/lib/content-type-data';
import { initialContentTypes } from '@/lib/content-type-data';
import { Input } from '@/components/ui/input'; // Added Input import

const LOCAL_STORAGE_ENTRIES_KEY = 'marketMaestroCmsEntries';

export default function ContentEntriesPage() {
  const params = useParams();
  const router = useRouter();
  const contentTypeApiId = params.contentTypeApiId as string;

  const [contentType, setContentType] = useState<ContentTypeMock | null | undefined>(undefined);
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (contentTypeApiId) {
      const foundType = initialContentTypes.find(ct => ct.apiIdentifier === contentTypeApiId);
      setContentType(foundType || null);
      
      if (foundType) {
        try {
          const allEntriesString = localStorage.getItem(LOCAL_STORAGE_ENTRIES_KEY);
          const allEntries = allEntriesString ? JSON.parse(allEntriesString) : {};
          const entriesForThisType = allEntries[contentTypeApiId] || [];
          setEntries(entriesForThisType);
        } catch (error) {
          console.error("Error loading entries from localStorage:", error);
          setEntries([]);
        }
      } else {
        setEntries([]);
      }
      setIsLoading(false);
    }
  }, [contentTypeApiId]);

  const displayFields = useMemo(() => {
    if (!contentType) return [{ apiIdentifier: 'id', name: 'ID' }, { apiIdentifier: 'status', name: 'Status' }];
    const textFields = contentType.fields.filter(f => f.type === 'Text' || f.type === 'String'); // Assuming String might be used
    if (textFields.length > 0) {
      return [
        { apiIdentifier: textFields[0].apiIdentifier, name: textFields[0].name },
        ...(textFields.length > 1 ? [{ apiIdentifier: textFields[1].apiIdentifier, name: textFields[1].name }] : [{ apiIdentifier: 'status', name: 'Status' }]),
        { apiIdentifier: 'updatedAt', name: 'Last Updated'}
      ];
    }
    return [{ apiIdentifier: 'id', name: 'ID' }, { apiIdentifier: 'status', name: 'Status' }, { apiIdentifier: 'updatedAt', name: 'Last Updated'}];
  }, [contentType]);


  const handleDeleteEntry = (entryId: string) => {
    // This is a mock delete, would involve confirmation and API call in real app
    if (confirm("Are you sure you want to delete this entry? (Simulation)")) {
        try {
            const allEntriesString = localStorage.getItem(LOCAL_STORAGE_ENTRIES_KEY);
            const allEntries = allEntriesString ? JSON.parse(allEntriesString) : {};
            let entriesForThisType = allEntries[contentTypeApiId] || [];
            
            entriesForThisType = entriesForThisType.filter((entry: any) => entry.id !== entryId);
            
            allEntries[contentTypeApiId] = entriesForThisType;
            localStorage.setItem(LOCAL_STORAGE_ENTRIES_KEY, JSON.stringify(allEntries));
            
            setEntries(entriesForThisType); // Update local state to re-render
            
            // toast({ title: "Entry Deleted", description: `Entry ${entryId} has been deleted (simulation).` });
        } catch (error) {
            console.error("Error deleting entry from localStorage:", error);
            // toast({ title: "Delete Error", description: "Could not delete the entry.", variant: "destructive" });
        }
    }
  };


  if (isLoading) {
    return (
      <MainLayout pageTitle="Loading Entries...">
        <div className="flex justify-center items-center h-64">Loading content entries...</div>
      </MainLayout>
    );
  }

  if (!contentType) {
    return (
      <MainLayout pageTitle="Content Type Not Found">
        <Card className="max-w-lg mx-auto mt-10">
            <CardHeader>
                <CardTitle className="flex items-center text-destructive">
                    <AlertTriangle className="mr-2 h-6 w-6"/> Content Type Not Found
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>The content type with API ID "{contentTypeApiId}" could not be found.</p>
                <Button asChild variant="outline" className="mt-4">
                    <Link href="/admin/content-types">Back to Content Types</Link>
                </Button>
            </CardContent>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle={`Entries for: ${contentType.name}`}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Entries for: {contentType.name}</h1>
            <p className="text-sm text-muted-foreground">
              View, create, and manage entries for the "{contentType.name}" content type.
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={`/admin/content/${contentTypeApiId}/new`}>
              <PlusCircle className="mr-2 h-5 w-5" /> Create New {contentType.name} Entry
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Entries ({entries.length})</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search entries..." className="pl-8 w-full" disabled />
              </div>
              <Button variant="outline" disabled>
                <ListFilter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {entries.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {displayFields.map(field => (
                        <TableHead key={field.apiIdentifier}>{field.name}</TableHead>
                      ))}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id}>
                        {displayFields.map(field => (
                          <TableCell key={`${entry.id}-${field.apiIdentifier}`}>
                            {field.apiIdentifier === 'updatedAt' && entry[field.apiIdentifier] 
                              ? new Date(entry[field.apiIdentifier]).toLocaleDateString()
                              : entry[field.apiIdentifier]?.toString() || '-'}
                          </TableCell>
                        ))}
                        <TableCell>
                          <Button variant="link" size="sm" className="p-0 h-auto" disabled>
                            Edit
                          </Button>
                          <Button variant="link" size="sm" className="p-0 h-auto ml-2 text-destructive hover:text-destructive/80" onClick={() => handleDeleteEntry(entry.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No entries found for this content type. 
                <Link href={`/admin/content/${contentTypeApiId}/new`} className="text-primary hover:underline ml-1">Create one now!</Link>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
