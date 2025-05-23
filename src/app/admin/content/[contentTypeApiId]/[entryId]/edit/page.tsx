
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Save, Send, AlertTriangle, Edit3, Loader2 } from 'lucide-react';
import type { ContentTypeMock, ContentTypeFieldMock } from '@/lib/content-type-data';
import { initialContentTypes } from '@/lib/content-type-data';

const LOCAL_STORAGE_ENTRIES_KEY = 'marketMaestroCmsEntries';

interface ContentEntry {
  id: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  [key: string]: any; // For dynamic fields
}

export default function EditContentEntryPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const contentTypeApiId = params.contentTypeApiId as string;
  const entryId = params.entryId as string;

  const [contentType, setContentType] = useState<ContentTypeMock | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [entryNotFound, setEntryNotFound] = useState(false);

  useEffect(() => {
    if (contentTypeApiId && entryId) {
      const foundType = initialContentTypes.find(ct => ct.apiIdentifier === contentTypeApiId);
      setContentType(foundType || null);

      if (foundType) {
        try {
          const allEntriesString = localStorage.getItem(LOCAL_STORAGE_ENTRIES_KEY);
          const allEntries = allEntriesString ? JSON.parse(allEntriesString) : {};
          const entriesForThisType: ContentEntry[] = allEntries[contentTypeApiId] || [];
          const entryToEdit = entriesForThisType.find(entry => entry.id === entryId);

          if (entryToEdit) {
            setFormData(entryToEdit);
          } else {
            setEntryNotFound(true);
            toast({
              title: "Entry Not Found",
              description: `The entry with ID "${entryId}" could not be found for this content type.`,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error loading entry from localStorage:", error);
          toast({
            title: "Load Error",
            description: "Could not load the entry. Please check console for details.",
            variant: "destructive",
          });
          setEntryNotFound(true);
        }
      } else {
        setEntryNotFound(true); // Content type not found
      }
      setIsLoading(false);
    }
  }, [contentTypeApiId, entryId, toast]);

  const handleInputChange = (fieldApiId: string, value: any, type: ContentTypeFieldMock['type']) => {
    setFormData(prev => ({
      ...prev,
      [fieldApiId]: type === 'Boolean' ? (value as unknown as React.ChangeEvent<HTMLInputElement>).target.checked : value,
    }));
  };

  const handleUpdateEntry = (newStatus?: 'draft' | 'published') => {
    if (!contentType || !formData) return;

    for (const field of contentType.fields) {
      if (field.isRequired && !formData[field.apiIdentifier]) {
        toast({
          title: "Missing Required Field",
          description: `Please fill in the "${field.name}" field.`,
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const allEntriesString = localStorage.getItem(LOCAL_STORAGE_ENTRIES_KEY);
      const allEntries = allEntriesString ? JSON.parse(allEntriesString) : {};
      let entriesForThisType: ContentEntry[] = allEntries[contentTypeApiId] || [];
      
      const entryIndex = entriesForThisType.findIndex(entry => entry.id === entryId);
      if (entryIndex === -1) {
        toast({ title: "Update Error", description: "Entry not found for update.", variant: "destructive" });
        return;
      }

      const updatedEntry = {
        ...formData,
        status: newStatus || formData.status, // Use new status if provided, else keep existing
        updatedAt: new Date().toISOString(),
      };

      entriesForThisType[entryIndex] = updatedEntry;
      allEntries[contentTypeApiId] = entriesForThisType;
      
      localStorage.setItem(LOCAL_STORAGE_ENTRIES_KEY, JSON.stringify(allEntries));

      toast({
        title: "Entry Updated",
        description: `Your entry has been successfully updated. ${newStatus ? `Status changed to ${newStatus}.` : ''}`,
      });
      router.push(`/admin/content/${contentTypeApiId}`);
    } catch (error) {
      console.error("Error updating entry in localStorage:", error);
      toast({
        title: "Update Error",
        description: "Could not update the entry. Please check console for details.",
        variant: "destructive",
      });
    }
  };
  
  const entryTitle = formData[contentType?.fields.find(f => ['Title', 'Name', 'Headline'].includes(f.name) && f.type === 'Text')?.apiIdentifier || 'id'] || entryId;


  if (isLoading) {
    return (
      <MainLayout pageTitle="Loading Entry...">
        <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin mr-2"/> Loading entry details...</div>
      </MainLayout>
    );
  }

  if (entryNotFound || !contentType) {
    return (
      <MainLayout pageTitle="Error">
        <Card className="max-w-lg mx-auto mt-10">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="mr-2 h-6 w-6" />
              {contentType ? "Entry Not Found" : "Content Type Not Found"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {contentType 
                ? `The entry with ID "${entryId}" for content type "${contentTypeApiId}" could not be found.`
                : `The content type with API ID "${contentTypeApiId}" could not be found.`}
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link href={contentType ? `/admin/content/${contentTypeApiId}` : "/admin/content-types"}>
                <ArrowLeft className="mr-2 h-4 w-4" /> 
                Back to {contentType ? `${contentType.name} Entries` : "Content Types"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle={`Edit Entry: ${entryTitle}`}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/content/${contentTypeApiId}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to {contentType.name} Entries</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center">
            <Edit3 className="mr-3 h-6 w-6 text-primary"/>
            Edit: <span className="ml-1 font-normal italic truncate max-w-xs" title={entryTitle.toString()}>{entryTitle}</span> (for {contentType.name})
          </h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Edit Entry Details</CardTitle>
            <CardDescription>Modify the fields for this {contentType.name} entry.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {contentType.fields.map(field => (
              <div key={field.apiIdentifier} className="space-y-2">
                <Label htmlFor={field.apiIdentifier}>
                  {field.name} {field.isRequired && <span className="text-destructive">*</span>}
                </Label>
                {field.type === 'Text' && (
                  <Input
                    id={field.apiIdentifier}
                    value={formData[field.apiIdentifier] || ''}
                    onChange={(e) => handleInputChange(field.apiIdentifier, e.target.value, field.type)}
                    placeholder={`Enter ${field.name.toLowerCase()}`}
                    required={field.isRequired}
                  />
                )}
                {field.type === 'RichText' && (
                  <Textarea
                    id={field.apiIdentifier}
                    value={formData[field.apiIdentifier] || ''}
                    onChange={(e) => handleInputChange(field.apiIdentifier, e.target.value, field.type)}
                    placeholder={`Enter ${field.name.toLowerCase()} (Markdown supported placeholder)`}
                    rows={5}
                    required={field.isRequired}
                  />
                )}
                {field.type === 'Number' && (
                  <Input
                    id={field.apiIdentifier}
                    type="number"
                    value={formData[field.apiIdentifier] || ''}
                    onChange={(e) => handleInputChange(field.apiIdentifier, e.target.value, field.type)}
                    placeholder={`Enter ${field.name.toLowerCase()}`}
                    required={field.isRequired}
                  />
                )}
                {field.type === 'Boolean' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.apiIdentifier}
                      checked={!!formData[field.apiIdentifier]}
                      onCheckedChange={(checked) => handleInputChange(field.apiIdentifier, { target: { checked } } as any, field.type)}
                    />
                    <Label htmlFor={field.apiIdentifier} className="font-normal">
                      {field.name}
                    </Label>
                  </div>
                )}
                {field.type === 'Date' && (
                  <Input
                    id={field.apiIdentifier}
                    type="date"
                    value={formData[field.apiIdentifier] || ''}
                    onChange={(e) => handleInputChange(field.apiIdentifier, e.target.value, field.type)}
                    required={field.isRequired}
                  />
                )}
                {(field.type === 'Media' || field.type === 'Relation' || field.type === 'JSON') && (
                   <div className="p-3 border rounded-md bg-muted/30">
                    <p className="text-sm text-muted-foreground">
                      {field.type} field type (for "{field.name}") UI not fully implemented yet for editing.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => router.push(`/admin/content/${contentTypeApiId}`)}>
              Cancel
            </Button>
            {formData.status === 'published' ? (
                <Button type="button" variant="secondary" onClick={() => handleUpdateEntry('draft')}>
                    <Save className="mr-2 h-4 w-4" /> Unpublish & Save as Draft
                </Button>
            ) : (
                 <Button type="button" variant="secondary" onClick={() => handleUpdateEntry('draft')}>
                    <Save className="mr-2 h-4 w-4" /> Save Draft
                </Button>
            )}
             <Button type="button" onClick={() => handleUpdateEntry('published')}>
              <Send className="mr-2 h-4 w-4" /> {formData.status === 'published' ? 'Update Published Entry' : 'Save & Publish'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
