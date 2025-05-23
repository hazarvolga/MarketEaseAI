
"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ListPlus, Edit, FileText as FileTextIcon } from 'lucide-react'; // Renamed to avoid conflict
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils'; // Added missing import

interface ContentTypeMock {
  id: string;
  name: string;
  description: string;
  fieldCount: number;
  lastModified: string;
}

const initialContentTypes: ContentTypeMock[] = [
  { id: 'blog', name: 'Blog Post', description: 'Standard blog articles with rich text and media.', fieldCount: 8, lastModified: '2024-05-15' },
  { id: 'faq', name: 'FAQ Item', description: 'Frequently asked questions and their answers.', fieldCount: 3, lastModified: '2024-04-20' },
  { id: 'product', name: 'Product', description: 'E-commerce product listings with details and pricing.', fieldCount: 12, lastModified: '2024-05-01' },
];

export default function ContentTypesPage() {
  const { toast } = useToast();
  const [contentTypes, setContentTypes] = useState<ContentTypeMock[]>(initialContentTypes);
  const [selectedContentType, setSelectedContentType] = useState<ContentTypeMock | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newContentTypeName, setNewContentTypeName] = useState("");

  const handleCreateNew = () => {
    // For this prototype, clicking "Create New" will just show a toast.
    // A more complete UI would open a dialog or a form in the right panel.
    // For now, let's just toggle a state that could show a simple input form.
    setSelectedContentType(null); // Deselect any currently selected type
    setIsCreatingNew(true);
    setNewContentTypeName("");
    toast({
      title: "Content Type Creation",
      description: "Define your new content type in the panel on the right (UI for defining fields will be built here).",
    });
  };

  const handleSelectContentType = (contentType: ContentTypeMock) => {
    setSelectedContentType(contentType);
    setIsCreatingNew(false);
    // In a real app, this would load the schema for editing in the right panel.
    toast({
      title: `Selected: ${contentType.name}`,
      description: "Details and field editor for this content type would appear here.",
    });
  };
  
  const handleSaveNewContentType = () => {
    if (!newContentTypeName.trim()) {
      toast({ title: "Error", description: "Content type name cannot be empty.", variant: "destructive" });
      return;
    }
    const newType: ContentTypeMock = {
      id: newContentTypeName.toLowerCase().replace(/\s+/g, '-'),
      name: newContentTypeName,
      description: "Newly created content type.",
      fieldCount: 0,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setContentTypes(prev => [newType, ...prev]);
    setIsCreatingNew(false);
    setNewContentTypeName("");
    setSelectedContentType(newType);
    toast({ title: "Content Type Created (Mock)", description: `${newType.name} added to the list.` });
  }

  return (
    <MainLayout pageTitle="Content Type Builder">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Left Column: List of Content Types */}
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Content Types</CardTitle>
              <Button size="sm" onClick={handleCreateNew}>
                <ListPlus className="mr-2 h-4 w-4" /> Create New
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {contentTypes.length > 0 ? (
              <ul className="divide-y">
                {contentTypes.map((type) => (
                  <li key={type.id}>
                    <button
                      onClick={() => handleSelectContentType(type)}
                      className={cn(
                        "w-full text-left p-4 hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none",
                        selectedContentType?.id === type.id && "bg-muted"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{type.name}</span>
                        <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {type.fieldCount} fields - Last modified: {type.lastModified}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-sm text-muted-foreground text-center">No content types defined yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Editor/Detail View */}
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">
              {isCreatingNew 
                ? "Create New Content Type" 
                : selectedContentType 
                ? `Editing: ${selectedContentType.name}` 
                : "Content Type Details"}
            </CardTitle>
            <CardDescription>
              {isCreatingNew 
                ? "Define the name and fields for your new content type." 
                : selectedContentType 
                ? selectedContentType.description 
                : "Select a content type or create a new one to start."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {isCreatingNew ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="newContentTypeName" className="block text-sm font-medium mb-1">Content Type Name</label>
                  <Input 
                    id="newContentTypeName"
                    placeholder="e.g., Blog Post, Product"
                    value={newContentTypeName}
                    onChange={(e) => setNewContentTypeName(e.target.value)}
                  />
                </div>
                <Separator />
                <div className="text-center py-8 bg-muted/30 rounded-md">
                    <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">Field definition UI will be added here.</p>
                    <p className="text-xs text-muted-foreground mt-1">You'll be able to add fields like Text, RichText, Media, Relation, etc.</p>
                </div>
                <Button onClick={handleSaveNewContentType}>Save Content Type (Mock)</Button>
              </div>
            ) : selectedContentType ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Fields for {selectedContentType.name} ({selectedContentType.fieldCount})</h3>
                <div className="text-center py-8 bg-muted/30 rounded-md">
                    <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">Fields for this content type would be listed and editable here.</p>
                    <Button variant="outline" size="sm" className="mt-4">Add New Field (Mock)</Button>
                </div>
                <Separator />
                 <h3 className="text-lg font-semibold">API Endpoint (Example)</h3>
                 <div className="p-3 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                    <p>GET: /api/{selectedContentType.id.toLowerCase().replace(/\s+/g, '-')}</p>
                    <p>POST: /api/{selectedContentType.id.toLowerCase().replace(/\s+/g, '-')}</p>
                 </div>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <FileTextIcon className="mx-auto h-16 w-16 mb-4 opacity-50" />
                <p>Select a content type from the list to view or edit its details,</p>
                <p>or click "Create New" to define a new content structure.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
