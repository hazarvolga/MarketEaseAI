
"use client";
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Image as ImageIcon, Video, FileText, Search, Filter, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Asset {
  id: string; // Changed to string for Date.now() + index
  type: 'image' | 'video' | 'document' | 'other';
  name: string;
  url: string; // For images, this will be object URL
  dataAiHint: string;
  size: string;
  date: string;
  file?: File; // Store the actual file for potential future use
}

const sampleAssets: Asset[] = [
  { id: '1', type: 'image', name: 'BrandLogo_Horizontal.png', url: 'https://placehold.co/800x600.png', dataAiHint: 'brand logo', size: '120KB', date: '2023-10-15' },
  { id: '2', type: 'image', name: 'Product_Showcase_1.jpg', url: 'https://placehold.co/800x600.png', dataAiHint: 'product photo', size: '850KB', date: '2023-10-20' },
  { id: '3', type: 'video', name: 'Explainer_Video_Short.mp4', url: 'https://placehold.co/300x200.png', dataAiHint: 'video advertisement', size: '5.2MB', date: '2023-10-22' },
  { id: '4', type: 'image', name: 'Campaign_Banner_Fall.png', url: 'https://placehold.co/800x600.png', dataAiHint: 'seasonal banner', size: '450KB', date: '2023-09-05' },
  { id: '5', type: 'document', name: 'StyleGuide_v2.pdf', url: 'https://placehold.co/300x200.png', dataAiHint: 'style guide document', size: '2.1MB', date: '2023-08-01' },
];


export default function AssetLibraryPage() {
  const [assets, setAssets] = useState<Asset[]>(sampleAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document' | 'other'>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const getFileType = (fileName: string): Asset['type'] => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(extension || '')) return 'video';
    if (['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx', 'xls', 'xlsx'].includes(extension || '')) return 'document';
    return 'other';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAssets: Asset[] = Array.from(files).map((file, index) => {
        const fileType = getFileType(file.name);
        let url = 'https://placehold.co/300x200.png'; // Default placeholder
        if (fileType === 'image') {
          url = URL.createObjectURL(file);
        }
        
        return {
          id: `${Date.now()}-${index}`, // Unique ID
          type: fileType,
          name: file.name,
          url: url,
          dataAiHint: fileType, // Simple hint based on type
          size: formatFileSize(file.size),
          date: new Date().toISOString().split('T')[0], // Today's date
          file: file, // Store the actual file
        };
      });
      setAssets(prevAssets => [...newAssets, ...prevAssets]);
    }
    // Reset file input to allow uploading the same file again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  // Clean up Object URLs when component unmounts or assets change
  React.useEffect(() => {
    return () => {
      assets.forEach(asset => {
        if (asset.file && asset.url.startsWith('blob:')) {
          URL.revokeObjectURL(asset.url);
        }
      });
    };
  }, [assets]);

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || asset.type === filterType)
  );

  const getIconForType = (type: Asset['type']) => {
    if (type === 'image') return <ImageIcon className="h-8 w-8 text-muted-foreground" />;
    if (type === 'video') return <Video className="h-8 w-8 text-muted-foreground" />;
    if (type === 'document') return <FileText className="h-8 w-8 text-muted-foreground" />;
    return <FileText className="h-8 w-8 text-muted-foreground" />; // Default for 'other'
  };


  return (
    <MainLayout pageTitle="Asset Library">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Asset Library</CardTitle>
            <CardDescription>Manage your brand's images, videos, documents, and other media assets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assets..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant={filterType === 'all' ? 'default' : 'outline'} onClick={() => setFilterType('all')} size="sm" aria-label="Filter by all asset types">
                  <Filter className="mr-1 h-4 w-4 sm:hidden"/>All
                </Button>
                <Button variant={filterType === 'image' ? 'default' : 'outline'} onClick={() => setFilterType('image')} size="sm" aria-label="Filter by image assets">
                  <ImageIcon className="mr-1 h-4 w-4 sm:hidden"/>Images
                </Button>
                <Button variant={filterType === 'video' ? 'default' : 'outline'} onClick={() => setFilterType('video')} size="sm" aria-label="Filter by video assets">
                  <Video className="mr-1 h-4 w-4 sm:hidden"/>Videos
                </Button>
                 <Button variant={filterType === 'document' ? 'default' : 'outline'} onClick={() => setFilterType('document')} size="sm" aria-label="Filter by document assets">
                  <FileText className="mr-1 h-4 w-4 sm:hidden"/>Docs
                </Button>
              </div>
              <div>
                <Input 
                    type="file" 
                    id="uploadAsset" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    accept="image/*,video/*,application/pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                />
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <label htmlFor="uploadAsset" className="cursor-pointer">
                    <UploadCloud className="mr-2 h-5 w-5" /> Upload Asset
                  </label>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAssets.map(asset => (
              <Card 
                key={asset.id} 
                className="overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group cursor-pointer flex flex-col"
                onClick={() => handleAssetClick(asset)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => ['Enter', ' '].includes(e.key) && handleAssetClick(asset)}
                aria-label={`View details for ${asset.name}`}
              >
                <CardContent className="p-0 flex-grow flex flex-col">
                  <div className="aspect-square bg-muted flex items-center justify-center relative flex-shrink-0">
                    {(asset.type === 'image' && asset.url) ? (
                      <Image
                        src={asset.url}
                        alt={asset.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        style={{ objectFit: 'cover' }}
                        data-ai-hint={asset.dataAiHint}
                        onError={(e) => {
                            // Fallback for broken images or if Object URL becomes invalid
                            e.currentTarget.src = 'https://placehold.co/300x200.png'; 
                            e.currentTarget.srcset = '';
                        }}
                      />
                    ) : (
                      getIconForType(asset.type)
                    )}
                     <Badge variant="secondary" className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded capitalize border-transparent">{asset.type}</Badge>
                  </div>
                  <div className="p-3 space-y-1 border-t">
                    <h4 className="text-sm font-medium truncate group-hover:text-primary" title={asset.name}>{asset.name}</h4>
                    <p className="text-xs text-muted-foreground">{asset.size} - {asset.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-sm">
            <CardContent className="py-12 flex flex-col items-center justify-center text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-1">No Assets Found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter, or upload new assets.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedAsset && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="truncate">{selectedAsset.name}</DialogTitle>
              <DialogDescription>
                Type: <span className="capitalize font-medium">{selectedAsset.type}</span> | 
                Size: <span className="font-medium">{selectedAsset.size}</span> | 
                Uploaded: <span className="font-medium">{selectedAsset.date}</span>
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="py-4 flex-grow overflow-y-auto">
              {selectedAsset.type === 'image' && selectedAsset.url ? (
                <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] max-h-[calc(80vh-150px)]">
                  <Image
                    src={selectedAsset.url}
                    alt={selectedAsset.name}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
                    style={{ objectFit: 'contain' }}
                    data-ai-hint={selectedAsset.dataAiHint}
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x400.png';
                        e.currentTarget.srcset = '';
                    }}
                  />
                </div>
              ) : selectedAsset.type === 'video' ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-muted rounded-md p-6">
                  <Video className="h-20 w-20 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">Video preview is not implemented in this prototype.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-muted rounded-md p-6">
                  <FileText className="h-20 w-20 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">Document preview is not implemented in this prototype.</p>
                </div>
              )}
            </ScrollArea>
            <DialogFooter className="sm:justify-end pt-4 border-t">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
}
