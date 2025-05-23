
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, ListFilter, Search, AlertTriangle, Blocks } from 'lucide-react';
import type { ContentTypeMock } from '@/lib/content-type-data';
import { initialContentTypes } from '@/lib/content-type-data';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_ENTRIES_KEY = 'marketMaestroCmsEntries';

interface ContentEntry {
  id: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  [key: string]: any; // For dynamic fields
}

export default function ContentEntriesPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const contentTypeApiId = params.contentTypeApiId as string;

  const [contentType, setContentType] = useState<ContentTypeMock | null | undefined>(undefined);
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (contentTypeApiId) {
      const foundType = initialContentTypes.find(ct => ct.apiIdentifier === contentTypeApiId);
      setContentType(foundType || null);
      
      if (foundType) {
        try {
          const allEntriesString = localStorage.getItem(LOCAL_STORAGE_ENTRIES_KEY);
          const allEntries = allEntriesString ? JSON.parse(allEntriesString) : {};
          const entriesForThisType: ContentEntry[] = allEntries[contentTypeApiId] || [];
          setEntries(entriesForThisType.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
        } catch (error) {
          console.error("Error loading entries from localStorage:", error);
          setEntries([]);
           toast({
            title: "Error Loading Entries",
            description: "Could not load entries from local storage. See console for details.",
            variant: "destructive",
          });
        }
      } else {
        setEntries([]);
      }
      setIsLoading(false);
    }
  }, [contentTypeApiId, toast]);

  const displayFields = useMemo(() => {
    if (!contentType) return [{ apiIdentifier: 'id', name: 'ID' }, { apiIdentifier: 'status', name: 'Status' }];
    
    const fieldsToShow = contentType.fields
      .filter(f => ['Text', 'String', 'Number', 'Date', 'Boolean'].includes(f.type)) // Show common simple types
      .slice(0, 2) // Limit to first two simple fields for brevity
      .map(f => ({ apiIdentifier: f.apiIdentifier, name: f.name }));

    // Ensure at least one primary field is shown, or default to 'name' or 'title' if common
    if (fieldsToShow.length === 0) {
        const commonNameFields = ['name', 'title', 'headline'];
        const primaryDisplayField = contentType.fields.find(f => commonNameFields.includes(f.apiIdentifier.toLowerCase()) && f.type === 'Text');
        if (primaryDisplayField) {
            fieldsToShow.push({ apiIdentifier: primaryDisplayField.apiIdentifier, name: primaryDisplayField.name});
        } else if (contentType.fields.length > 0 && contentType.fields[0].type === 'Text') {
             fieldsToShow.push({ apiIdentifier: contentType.fields[0].apiIdentifier, name: contentType.fields[0].name});
        }
    }
    
    // Always include ID, Status, and Last Updated
    return [
      ...(fieldsToShow.length > 0 ? fieldsToShow : [{ apiIdentifier: 'id', name: 'ID (Fallback)' }]),
      { apiIdentifier: 'status', name: 'Status' }, 
      { apiIdentifier: 'updatedAt', name: 'Last Updated'}
    ];
  }, [contentType]);


  const handleDeleteEntry = (entryId: string) => {
    if (confirm("Are you sure you want to delete this entry? This action cannot be undone. (Simulation)")) {
        try {
            const allEntriesString = localStorage.getItem(LOCAL_STORAGE_ENTRIES_KEY);
            const allEntries = allEntriesString ? JSON.parse(allEntriesString) : {};
            let entriesForThisType: ContentEntry[] = allEntries[contentTypeApiId] || [];
            
            entriesForThisType = entriesForThisType.filter(entry => entry.id !== entryId);
            
            allEntries[contentTypeApiId] = entriesForThisType;
            localStorage.setItem(LOCAL_STORAGE_ENTRIES_KEY, JSON.stringify(allEntries));
            
            setEntries(entriesForThisType.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
            
            toast({ title: "Entry Deleted", description: `Entry has been deleted successfully.` });
        } catch (error) {
            console.error("Error deleting entry from localStorage:", error);
            toast({ title: "Delete Error", description: "Could not delete the entry. See console for details.", variant: "destructive" });
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
            <h1 className="text-2xl font-semibold tracking-tight flex items-center">
              <Blocks className="mr-3 h-6 w-6 text-primary" />
              Entries for: {contentType.name}
            </h1>
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id}>
                        {displayFields.map(field => (
                          <TableCell key={`${entry.id}-${field.apiIdentifier}`} className="max-w-xs truncate" title={entry[field.apiIdentifier]?.toString()}>
                            {field.apiIdentifier === 'updatedAt' && entry[field.apiIdentifier] 
                              ? new Date(entry[field.apiIdentifier]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                              : field.type === 'Boolean'
                              ? entry[field.apiIdentifier] ? 'Yes' : 'No'
                              : entry[field.apiIdentifier]?.toString() || '-'}
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                           <Button variant="ghost" size="sm" className="mr-1" asChild>
                            <Link href={`/admin/content/${contentTypeApiId}/${entry.id}/edit`}>
                                <Edit className="h-4 w-4 mr-1" /> Edit
                            </Link>
                           </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90" onClick={() => handleDeleteEntry(entry.id)}>
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
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
