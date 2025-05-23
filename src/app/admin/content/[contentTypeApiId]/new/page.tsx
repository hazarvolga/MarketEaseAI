
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Save, Send } from 'lucide-react';
import type { ContentTypeMock, ContentTypeFieldMock } from '@/lib/content-type-data';
import { initialContentTypes } from '@/lib/content-type-data'; // Assuming this is your mock data source

const LOCAL_STORAGE_ENTRIES_KEY = 'marketMaestroCmsEntries';

export default function NewContentEntryPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const contentTypeApiId = params.contentTypeApiId as string;

  const [contentType, setContentType] = useState<ContentTypeMock | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (contentTypeApiId) {
      const foundType = initialContentTypes.find(ct => ct.apiIdentifier === contentTypeApiId);
      setContentType(foundType || null);
      if (foundType) {
        // Initialize formData with default values or empty strings
        const initialData: Record<string, any> = {};
        foundType.fields.forEach(field => {
          initialData[field.apiIdentifier] = field.type === 'Boolean' ? false : '';
        });
        setFormData(initialData);
      }
      setIsLoading(false);
    }
  }, [contentTypeApiId]);

  const handleInputChange = (fieldApiId: string, value: any, type: ContentTypeFieldMock['type']) => {
    setFormData(prev => ({
      ...prev,
      [fieldApiId]: type === 'Boolean' ? (value as unknown as React.ChangeEvent<HTMLInputElement>).target.checked : value,
    }));
  };

  const handleSaveEntry = (status: 'draft' | 'published') => {
    if (!contentType) return;

    // Basic validation: check if required fields are filled
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
      
      const entriesForThisType = allEntries[contentTypeApiId] || [];
      
      const newEntry = {
        id: Date.now().toString(), // Simple unique ID
        ...formData,
        status: status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      entriesForThisType.push(newEntry);
      allEntries[contentTypeApiId] = entriesForThisType;
      
      localStorage.setItem(LOCAL_STORAGE_ENTRIES_KEY, JSON.stringify(allEntries));

      toast({
        title: `Entry ${status === 'draft' ? 'Saved as Draft' : 'Published'} (Simulation)`,
        description: `Your entry for "${contentType.name}" has been ${status}.`,
      });
      router.push(`/admin/content/${contentTypeApiId}`);
    } catch (error) {
      console.error("Error saving entry to localStorage:", error);
      toast({
        title: "Save Error",
        description: "Could not save the entry. Please check console for details.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <MainLayout pageTitle="Loading Form...">
        <div className="flex justify-center items-center h-64">Loading content type details...</div>
      </MainLayout>
    );
  }

  if (!contentType) {
    return (
      <MainLayout pageTitle="Content Type Not Found">
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">Content Type Not Found</h2>
          <p className="text-muted-foreground">The content type with API ID "{contentTypeApiId}" could not be found.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/admin/content-types">Back to Content Types</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle={`Create New ${contentType.name} Entry`}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/content/${contentTypeApiId}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to {contentType.name} Entries</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create New {contentType.name} Entry
          </h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Entry Details</CardTitle>
            <CardDescription>Fill in the fields for your new {contentType.name} entry.</CardDescription>
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
                      {field.type} field type (for "{field.name}") UI not fully implemented yet.
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
            <Button type="button" variant="secondary" onClick={() => handleSaveEntry('draft')}>
              <Save className="mr-2 h-4 w-4" /> Save Draft
            </Button>
            <Button type="button" onClick={() => handleSaveEntry('published')}>
              <Send className="mr-2 h-4 w-4" /> Publish
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
