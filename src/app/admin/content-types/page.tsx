
"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ListPlus, Edit, FileText as FileTextIcon, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContentTypeFieldMock {
  id: string;
  name: string;
  type: 'Text' | 'RichText' | 'Media' | 'Relation' | 'Date' | 'Boolean' | 'Number' | 'JSON';
  isRequired: boolean;
}

interface ContentTypeMock {
  id: string;
  name: string;
  description: string;
  apiIdentifier: string;
  fields: ContentTypeFieldMock[];
  lastModified: string;
}

const initialContentTypes: ContentTypeMock[] = [
  { id: 'blog', name: 'Blog Post', description: 'Standard blog articles with rich text and media.', apiIdentifier: 'blog-posts', fields: [{id: 'title', name: 'Title', type: 'Text', isRequired: true}], lastModified: '2024-05-15' },
  { id: 'faq', name: 'FAQ Item', description: 'Frequently asked questions and their answers.', apiIdentifier: 'faq-items', fields: [], lastModified: '2024-04-20' },
  { id: 'product', name: 'Product', description: 'E-commerce product listings with details and pricing.', apiIdentifier: 'products', fields: [], lastModified: '2024-05-01' },
];

export default function ContentTypesPage() {
  const { toast } = useToast();
  const [contentTypes, setContentTypes] = useState<ContentTypeMock[]>(initialContentTypes);
  const [selectedContentType, setSelectedContentType] = useState<ContentTypeMock | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newContentTypeName, setNewContentTypeName] = useState("");
  const [newContentTypeDescription, setNewContentTypeDescription] = useState("");
  const [newContentTypeApiIdentifier, setNewContentTypeApiIdentifier] = useState("");


  const handleCreateNew = () => {
    setSelectedContentType(null);
    setIsCreatingNew(true);
    setNewContentTypeName("");
    setNewContentTypeDescription("");
    setNewContentTypeApiIdentifier("");
    toast({
      title: "Create New Content Type",
      description: "Define the details for your new content type in the panel on the right.",
    });
  };

  const handleSelectContentType = (contentType: ContentTypeMock) => {
    setSelectedContentType(contentType);
    setIsCreatingNew(false);
  };
  
  const handleSaveNewContentType = () => {
    if (!newContentTypeName.trim()) {
      toast({ title: "Error", description: "Content type name cannot be empty.", variant: "destructive" });
      return;
    }
    if (!newContentTypeApiIdentifier.trim()) {
        toast({ title: "Error", description: "API Identifier cannot be empty.", variant: "destructive" });
        return;
    }
    if (contentTypes.some(ct => ct.apiIdentifier === newContentTypeApiIdentifier.trim().toLowerCase().replace(/\s+/g, '-'))) {
        toast({ title: "Error", description: "API Identifier must be unique.", variant: "destructive" });
        return;
    }

    const newType: ContentTypeMock = {
      id: newContentTypeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/gi, ''),
      name: newContentTypeName.trim(),
      description: newContentTypeDescription.trim() || `Content type for ${newContentTypeName.trim()}`,
      apiIdentifier: newContentTypeApiIdentifier.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/gi, ''),
      fields: [],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setContentTypes(prev => [newType, ...prev]);
    setIsCreatingNew(false);
    setNewContentTypeName("");
    setNewContentTypeDescription("");
    setNewContentTypeApiIdentifier("");
    setSelectedContentType(newType);
    toast({ title: "Content Type Created", description: `${newType.name} has been added to the list.` });
  }

  const handleDeleteContentType = (typeId: string) => {
    setContentTypes(prev => prev.filter(ct => ct.id !== typeId));
    if (selectedContentType?.id === typeId) {
      setSelectedContentType(null);
    }
    toast({ title: "Content Type Deleted", description: "The content type has been removed (simulation).", variant: "destructive"});
  };

  const handleApiIdentifierChange = (name: string) => {
    setNewContentTypeName(name);
    setNewContentTypeApiIdentifier(name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/gi, ''));
  };

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
              <ul className="divide-y dark:divide-border">
                {contentTypes.map((type) => (
                  <li key={type.id}>
                    <button
                      onClick={() => handleSelectContentType(type)}
                      className={cn(
                        "w-full text-left p-4 hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none transition-colors",
                        selectedContentType?.id === type.id && "bg-muted dark:bg-muted/30"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{type.name}</span>
                        <div className="flex items-center gap-1">
                            <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive/80 hover:bg-destructive/10" onClick={(e) => e.stopPropagation()}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the
                                    "{type.name}" content type and all its associated content (simulation).
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteContentType(type.id); }}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {type.fields.length} fields - API: /api/{type.apiIdentifier}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-6 text-sm text-muted-foreground text-center">No content types defined yet. Click "Create New" to start.</p>
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
                ? "Define the name, description, API identifier, and fields for your new content type." 
                : selectedContentType 
                ? selectedContentType.description 
                : "Select a content type from the list or create a new one to start."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {isCreatingNew ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="newContentTypeName" className="block text-sm font-medium mb-1">Display Name <span className="text-destructive">*</span></label>
                  <Input 
                    id="newContentTypeName"
                    placeholder="e.g., Blog Post, Product Announcement"
                    value={newContentTypeName}
                    onChange={(e) => handleApiIdentifierChange(e.target.value)}
                  />
                   <p className="text-xs text-muted-foreground mt-1">A human-readable name for the content type.</p>
                </div>
                <div>
                  <label htmlFor="newContentTypeApiIdentifier" className="block text-sm font-medium mb-1">API Identifier <span className="text-destructive">*</span></label>
                  <Input 
                    id="newContentTypeApiIdentifier"
                    placeholder="e.g., blog-post, product-announcement"
                    value={newContentTypeApiIdentifier}
                    onChange={(e) => setNewContentTypeApiIdentifier(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/gi, ''))}
                  />
                   <p className="text-xs text-muted-foreground mt-1">Unique identifier used in API endpoints (e.g., /api/{'{apiIdentifier}'}). Will be auto-generated from Display Name.</p>
                </div>
                 <div>
                  <label htmlFor="newContentTypeDescription" className="block text-sm font-medium mb-1">Description (Optional)</label>
                  <Input 
                    id="newContentTypeDescription"
                    placeholder="A short description of this content type."
                    value={newContentTypeDescription}
                    onChange={(e) => setNewContentTypeDescription(e.target.value)}
                  />
                </div>
                <Separator />
                <div className="text-center py-8 bg-muted/30 dark:bg-muted/20 rounded-md border border-dashed">
                    <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">Field definition UI will be added here.</p>
                    <p className="text-xs text-muted-foreground mt-1">You'll be able to add fields like Text, RichText, Media, Relation, etc.</p>
                </div>
                <Button onClick={handleSaveNewContentType} className="w-full sm:w-auto">Save Content Type</Button>
              </div>
            ) : selectedContentType ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Fields for {selectedContentType.name} ({selectedContentType.fields.length})</h3>
                 <p className="text-sm text-muted-foreground">API Identifier: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{selectedContentType.apiIdentifier}</code></p>
                <div className="text-center py-8 bg-muted/30 dark:bg-muted/20 rounded-md border border-dashed">
                    <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">Fields for this content type would be listed and editable here.</p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => toast({title: "Add New Field (Mock)", description: "Field editor coming soon!"})}>
                      Add New Field (Mock)
                    </Button>
                </div>
                <Separator />
                 <h3 className="text-lg font-semibold">Example API Endpoints</h3>
                 <div className="p-3 bg-muted dark:bg-muted/30 rounded-md text-sm font-mono overflow-x-auto space-y-1">
                    <p><span className="font-bold text-green-600 dark:text-green-400">GET:</span> /api/{selectedContentType.apiIdentifier}</p>
                    <p><span className="font-bold text-green-600 dark:text-green-400">GET:</span> /api/{selectedContentType.apiIdentifier}/:{'{entry_id}'}</p>
                    <p><span className="font-bold text-blue-600 dark:text-blue-400">POST:</span> /api/{selectedContentType.apiIdentifier}</p>
                    <p><span className="font-bold text-orange-600 dark:text-orange-400">PUT:</span> /api/{selectedContentType.apiIdentifier}/:{'{entry_id}'}</p>
                    <p><span className="font-bold text-red-600 dark:text-red-400">DELETE:</span> /api/{selectedContentType.apiIdentifier}/:{'{entry_id}'}</p>
                 </div>
                 <Button variant="secondary" className="w-full sm:w-auto" onClick={() => toast({title: "Save Changes (Mock)", description: "Content type update simulation."})}>Save Changes to "{selectedContentType.name}"</Button>
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


    