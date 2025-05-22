
"use client";
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as ShadcnCalendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClockIcon, ImageIcon, Send, Info, Sparkles, Loader2, Copy, AlertCircle, Tag, ThumbsUp, FileWarning, MessageSquare, Edit, Trash2, Paperclip, Linkedin, ImagePlus, FileText, Facebook, Twitter } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import React, { useState, useTransition, useEffect, useRef } from 'react';
import Link from 'next/link';
import { handleGenerateContentAction } from '@/app/ai-assistant/actions';
import { handleSuggestHashtagsAction } from './actions';
import type { GenerateMarketingContentOutput, GenerateMarketingContentInput } from '@/ai/flows/generate-marketing-content';
import type { SuggestHashtagsOutput } from '@/ai/flows/suggest-hashtags-flow';
import Image from 'next/image';

import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface PlatformPreview {
  platform: string;
  content: string;
}

type PlatformKey = "facebook" | "instagram" | "twitter" | "linkedin";

const platformDetails: Record<PlatformKey, { name: string; icon?: React.ReactNode }> = { 
  facebook: { name: "Facebook", icon: <Facebook className="h-4 w-4 text-blue-600" /> },
  instagram: { name: "Instagram", icon: <ImageIcon className="h-4 w-4 text-pink-500" /> },
  twitter: { name: "X (Twitter)", icon: <Twitter className="h-4 w-4" /> }, 
  linkedin: { name: "LinkedIn", icon: <Linkedin className="h-4 w-4 text-sky-700" /> },
};

interface MediaFile {
  id: string;
  name: string; 
  file?: File; 
  previewUrl?: string | null; 
  url?: string; 
  type: 'image' | 'video' | 'other'; 
}

const mockBrandProfileData: Partial<GenerateMarketingContentInput> = {
  brandCorePurpose: "To empower architects and civil engineers with cutting-edge software solutions, streamlining complex design, analysis, and collaboration processes from concept to construction.",
  customerValueProposition: "ArchStruct Design Suite provides intuitive, powerful, and integrated software tools that enhance creativity, precision, and project efficiency for design and engineering professionals.",
  focusedProductService: "ArchModeler Pro (BIM & 3D Modeling)",
  priorityPlatforms: { 
    linkedin: true,
    companyBlog: true,
    twitter: false,
  },
  brandKeywords: "BIM Software, Architectural Design, Structural Engineering, AECtech, ConstructionTech, Innovatech",
  uniqueSellingPropositions: "Fully integrated suite reducing data silos; Advanced AI-powered analysis tools; Intuitive UI designed by industry pros.",
  thingsToAvoid: "Overly technical jargon in general marketing content unless specifically for engineers; direct unsubstantiated claims of superiority over specific competitors by name.",
  desiredUserEmotion: "Empowered, Confident, Efficient, Innovative",
};

type PostStatus = "Draft" | "Pending Approval" | "Scheduled" | "Published" | "Error";


export default function CreateSocialPostPage() {
  const [postContent, setPostContent] = React.useState("");
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<Record<PlatformKey, boolean>>({
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
  });
  const [scheduleDate, setScheduleDate] = React.useState<Date | undefined>();
  const [scheduleTime, setScheduleTime] = React.useState<string>("10:00");
  const [platformPreviews, setPlatformPreviews] = React.useState<PlatformPreview[]>([]);

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiBrief, setAiBrief] = useState("");
  const [aiSuggestionsOutput, setAiSuggestionsOutput] = useState<GenerateMarketingContentOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isAiTransitionPending, startAiTransition] = useTransition();
  
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([]);
  const [isHashtagLoading, setIsHashtagLoading] = useState(false);
  const [hashtagError, setHashtagError] = useState<string | null>(null);
  const [isHashtagTransitionPending, startHashtagTransition] = useTransition();

  const [selectedMediaFiles, setSelectedMediaFiles] = useState<MediaFile[]>([]);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  const [isImageGenModalOpen, setIsImageGenModalOpen] = useState(false);
  const [imageGenPrompt, setImageGenPrompt] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isImageGenLoading, setIsImageGenLoading] = useState(false);
  const [imageGenError, setImageGenError] = useState<string | null>(null);

  const [postStatus, setPostStatus] = useState<PostStatus>("Draft");


  const { toast } = useToast();

  const handlePlatformChange = (platformKey: PlatformKey) => {
    const newSelectedPlatforms = { 
      ...selectedPlatforms, 
      [platformKey]: !selectedPlatforms[platformKey] 
    };
    setSelectedPlatforms(newSelectedPlatforms);

    if (newSelectedPlatforms[platformKey]) {
      if (!platformPreviews.some(p => p.platform === platformDetails[platformKey].name)) {
        setPlatformPreviews(prev => [...prev, { platform: platformDetails[platformKey].name, content: postContent }]);
      }
    } else {
      setPlatformPreviews(prev => prev.filter(p => p.platform !== platformDetails[platformKey].name));
    }
  };

  useEffect(() => {
    setPlatformPreviews(prev => 
      prev.map(p => ({ ...p, content: postContent }))
    );
  }, [postContent]);

  const handleAiGenerate = () => {
    if (aiBrief.length < 10) {
      setAiError("Content brief must be at least 10 characters.");
      return;
    }
    setIsAiLoading(true);
    setAiError(null);
    setAiSuggestionsOutput(null);

    startAiTransition(async () => {
      const payload: GenerateMarketingContentInput = {
        contentRequest: aiBrief,
        brandCorePurpose: mockBrandProfileData.brandCorePurpose || "Default brand purpose - please complete your brand profile for better results.",
        customerValueProposition: mockBrandProfileData.customerValueProposition || "Default value proposition - please complete your brand profile for better results.",
        focusedProductService: mockBrandProfileData.focusedProductService || undefined,
        priorityPlatforms: mockBrandProfileData.priorityPlatforms || undefined,
        brandKeywords: mockBrandProfileData.brandKeywords || undefined,
        uniqueSellingPropositions: mockBrandProfileData.uniqueSellingPropositions || undefined,
        thingsToAvoid: mockBrandProfileData.thingsToAvoid || undefined,
        desiredUserEmotion: mockBrandProfileData.desiredUserEmotion || undefined,
        campaignPeriods: mockBrandProfileData.campaignPeriods || undefined,
        frequentlyAskedQuestions: mockBrandProfileData.frequentlyAskedQuestions || undefined,
        competitorInspirations: mockBrandProfileData.competitorInspirations || undefined,
        additionalStrategicInfo: mockBrandProfileData.additionalStrategicInfo || undefined,
      };
      const result = await handleGenerateContentAction(payload);
      if (result.success && result.data) {
        setAiSuggestionsOutput(result.data);
      } else {
        if (typeof result.error === 'string') {
          setAiError(result.error);
        } else if (result.error && 'flatten' in result.error) { 
          const fieldErrors = Object.entries((result.error as any).flatten().fieldErrors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('; ');
          setAiError(`Validation failed. ${fieldErrors || 'Please check your input.'}`);
        } else {
          setAiError("An unknown error occurred while generating suggestions.");
        }
      }
      setIsAiLoading(false);
    });
  };

  const handleUseSuggestion = (suggestion: string) => {
    setPostContent(prevContent => prevContent ? `${prevContent}\n\n${suggestion}` : suggestion);
    setIsAiModalOpen(false);
    setAiBrief(""); 
    setAiSuggestionsOutput(null);
    toast({
      title: "Suggestion Applied",
      description: "AI suggestion has been added to your post content.",
    });
  };

  const handleCopySuggestion = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Content suggestion copied successfully.",
        duration: 3000,
      });
    }).catch(err => {
      toast({
        title: "Copy failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
        duration: 3000,
      });
      console.error('Failed to copy text: ', err);
    });
  };

  const fetchHashtagSuggestions = () => {
    if(postContent.trim().length < 10) {
      setHashtagError("Please write some content (at least 10 characters) before suggesting hashtags.");
      setSuggestedHashtags([]);
      return;
    }
    setIsHashtagLoading(true);
    setHashtagError(null);
    setSuggestedHashtags([]);

    startHashtagTransition(async () => {
      const result = await handleSuggestHashtagsAction({ postContent });
      if (result.success && result.data) {
        setSuggestedHashtags(result.data.hashtags);
      } else {
        if (typeof result.error === 'string') {
          setHashtagError(result.error);
        } else if (result.error && 'flatten' in result.error) { 
           const fieldErrors = Object.entries((result.error as any).flatten().fieldErrors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('; ');
          setHashtagError(`Validation failed. ${fieldErrors || 'Please check your input.'}`);
        } else {
          setHashtagError("Failed to fetch hashtag suggestions.");
        }
      }
      setIsHashtagLoading(false);
    });
  };

  const handleAddHashtag = (hashtag: string) => {
    setPostContent(prev => prev.trim() + ` ${hashtag}`);
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newMedia: MediaFile[] = Array.from(files).map(file => ({
        id: `${file.name}-${Date.now()}`,
        file: file,
        name: file.name,
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        type: file.type.startsWith('image/') ? 'image' : (file.type.startsWith('video/') ? 'video' : 'other'),
      }));
      setSelectedMediaFiles(prev => [...prev, ...newMedia].slice(0, 4)); 
      if (Array.from(files).length + selectedMediaFiles.length > 4) {
        toast({ title: "Media Limit Reached", description: "You can upload a maximum of 4 media files.", variant: "destructive" });
      }
    }
    if (mediaFileInputRef.current) {
      mediaFileInputRef.current.value = ""; 
    }
  };

  const removeMediaFile = (idToRemove: string) => {
    setSelectedMediaFiles(prev => 
      prev.filter(mf => {
        if (mf.id === idToRemove) {
          if (mf.previewUrl && mf.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(mf.previewUrl);
          }
          return false;
        }
        return true;
      })
    );
  };

  useEffect(() => {
    return () => {
      selectedMediaFiles.forEach(mf => {
        if (mf.previewUrl && mf.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(mf.previewUrl);
        }
      });
    };
  }, [selectedMediaFiles]);

  const openImageGenModal = () => {
    setImageGenPrompt(postContent); 
    setGeneratedImageUrl(null);
    setImageGenError(null);
    setIsImageGenModalOpen(true);
  };

  const handleImageGeneration = () => {
    if (imageGenPrompt.trim().length < 5) {
      setImageGenError("Please provide a more descriptive prompt (at least 5 characters).");
      return;
    }
    setIsImageGenLoading(true);
    setGeneratedImageUrl(null);
    setImageGenError(null);
    setTimeout(() => { 
      const mockUrl = `https://placehold.co/512x512.png?text=${encodeURIComponent(imageGenPrompt.substring(0, 20) + '...')}`;
      setGeneratedImageUrl(mockUrl);
      setIsImageGenLoading(false);
      toast({ title: "Image Generated (Mock)", description: "A placeholder image has been generated." });
    }, 2000);
  };

  const addAiImageToPost = () => {
    if (generatedImageUrl) {
      if (selectedMediaFiles.length >= 4) {
        toast({ title: "Media Limit Reached", description: "Cannot add AI image. Maximum of 4 media files allowed.", variant: "destructive" });
        return;
      }
      const newAiMedia: MediaFile = {
        id: `ai-${Date.now()}`,
        name: `AI Generated: ${imageGenPrompt.substring(0, 20)}...`,
        url: generatedImageUrl, 
        type: 'image',
      };
      setSelectedMediaFiles(prev => [...prev, newAiMedia]);
      setIsImageGenModalOpen(false);
      setGeneratedImageUrl(null);
      setImageGenPrompt("");
      toast({ title: "AI Image Added", description: "The generated image has been added to your post." });
    }
  };

  const getStatusColor = (status: PostStatus) => {
    switch (status) {
      case "Draft": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300";
      case "Pending Approval": return "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300";
      case "Scheduled": return "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300";
      case "Published": return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300";
      case "Error": return "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <MainLayout pageTitle="Create Social Post">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Compose Your Post</CardTitle>
                  <Badge className={cn("px-3 py-1 text-sm", getStatusColor(postStatus))}>{postStatus}</Badge>
                </div>
                <CardDescription>Write your content, select platforms, and schedule your post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="postContent">Content</Label>
                    <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Sparkles className="mr-2 h-4 w-4 text-primary" /> Generate with AI
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 text-primary" /> AI Content Assistant
                          </DialogTitle>
                          <DialogDescription>
                            Describe what you want to post about. The AI will use your Brand Profile information for more tailored suggestions.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="aiBrief">Brief / Topic for this specific post</Label>
                            <Textarea
                              id="aiBrief"
                              placeholder="e.g., 'A Facebook post announcing our new software update, focusing on feature X and its benefits for architects...'"
                              value={aiBrief}
                              onChange={(e) => setAiBrief(e.target.value)}
                              rows={3}
                            />
                            <p className="text-xs text-muted-foreground">{aiBrief.length}/500 characters. Min 10 characters.</p>
                          </div>
                          {aiError && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Error</AlertTitle>
                              <AlertDescription>{aiError}</AlertDescription>
                            </Alert>
                          )}
                          {isAiLoading || isAiTransitionPending ? (
                            <div className="flex items-center justify-center h-24">
                              <Loader2 className="h-8 w-8 animate-spin text-primary" />
                              <span className="ml-2">Generating suggestions...</span>
                            </div>
                          ) : aiSuggestionsOutput && aiSuggestionsOutput.contentSuggestions.length > 0 && (
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                              <h4 className="text-sm font-medium text-foreground">Suggestions:</h4>
                              {aiSuggestionsOutput.contentSuggestions.map((suggestion, index) => (
                                <Card key={index} className="bg-muted/50">
                                  <CardContent className="p-3 text-sm">
                                    <p className="whitespace-pre-wrap">{suggestion}</p>
                                    <div className="flex justify-end gap-2 mt-2">
                                      <Button variant="ghost" size="sm" onClick={() => handleCopySuggestion(suggestion)}>
                                        <Copy className="mr-1 h-3 w-3" /> Copy
                                      </Button>
                                      <Button variant="default" size="sm" onClick={() => handleUseSuggestion(suggestion)}>
                                        Use this
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                        <DialogFooter className="sm:justify-between">
                           <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                           </DialogClose>
                          <Button type="button" onClick={handleAiGenerate} disabled={isAiLoading || isAiTransitionPending || aiBrief.length < 10}>
                            {isAiLoading || isAiTransitionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Get Suggestions
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Textarea 
                    id="postContent" 
                    placeholder="What's on your mind? Use @ to mention, # for hashtags." 
                    rows={8} 
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="text-base mt-1"
                  />
                  <p className="text-xs text-muted-foreground">
                    {postContent.length} characters. 
                    <span className="ml-2 text-muted-foreground/80">Emoji selector, URL shortener, and advanced formatting tools coming soon.</span>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex gap-2 items-center flex-wrap">
                    <Button variant="outline" size="sm" onClick={fetchHashtagSuggestions} disabled={isHashtagLoading || isHashtagTransitionPending || postContent.trim().length < 10}>
                       {isHashtagLoading || isHashtagTransitionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Tag className="mr-2 h-4 w-4" />}
                       Suggest Hashtags
                    </Button>
                    <Dialog open={isImageGenModalOpen} onOpenChange={setIsImageGenModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={openImageGenModal}>
                          <ImagePlus className="mr-2 h-4 w-4 text-primary" /> Generate Image with AI
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center"><ImagePlus className="mr-2 h-5 w-5 text-primary" /> AI Image Generation</DialogTitle>
                          <DialogDescription>
                            Enter a prompt for the image. It will be pre-filled from your post content.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-1">
                            <Label htmlFor="imageGenPrompt">Image Prompt</Label>
                            <Textarea 
                              id="imageGenPrompt"
                              value={imageGenPrompt}
                              onChange={(e) => setImageGenPrompt(e.target.value)}
                              placeholder="e.g., A futuristic cityscape with flying cars"
                              rows={3}
                            />
                             <p className="text-xs text-muted-foreground">Describe the image you want to generate. Platform-specific dimensioning is a future feature.</p>
                          </div>
                          {imageGenError && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Error</AlertTitle>
                              <AlertDescription>{imageGenError}</AlertDescription>
                            </Alert>
                          )}
                          {isImageGenLoading && (
                            <div className="flex items-center justify-center py-4">
                              <Loader2 className="h-8 w-8 animate-spin text-primary" />
                              <p className="ml-2">Generating image...</p>
                            </div>
                          )}
                          {generatedImageUrl && !isImageGenLoading && (
                            <div className="space-y-3">
                              <p className="text-sm font-medium">Generated Image (Mock):</p>
                              <Image 
                                src={generatedImageUrl} 
                                alt="AI Generated Image" 
                                width={512} 
                                height={512} 
                                className="rounded-md border object-contain aspect-square mx-auto" 
                              />
                              <Button onClick={addAiImageToPost} className="w-full">
                                <ImagePlus className="mr-2 h-4 w-4" /> Add Image to Post
                              </Button>
                            </div>
                          )}
                        </div>
                        <DialogFooter className="sm:justify-between">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleImageGeneration} disabled={isImageGenLoading || imageGenPrompt.trim().length < 5}>
                            {isImageGenLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Generate Image
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {hashtagError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Hashtag Error</AlertTitle>
                      <AlertDescription>{hashtagError}</AlertDescription>
                    </Alert>
                  )}
                  {suggestedHashtags.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm font-medium">Suggested Hashtags:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedHashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-primary/20" onClick={() => handleAddHashtag(tag)}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>


                <div className="space-y-2">
                  <Label>Publish to</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                    {(Object.keys(platformDetails) as Array<PlatformKey>).map((platformKey) => (
                        <div key={platformKey} className="flex items-center space-x-2">
                          <Checkbox
                            id={platformKey}
                            checked={selectedPlatforms[platformKey]}
                            onCheckedChange={() => handlePlatformChange(platformKey)}
                          />
                          <Label htmlFor={platformKey} className="font-normal capitalize cursor-pointer flex items-center">
                            {platformDetails[platformKey].icon && <span className="mr-1.5">{platformDetails[platformKey].icon}</span>}
                            {platformDetails[platformKey].name}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label 
                    htmlFor="mediaUpload" 
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "cursor-pointer"
                    )}
                    aria-label="Add media to your post"
                  >
                    <Paperclip className="mr-2 h-4 w-4" /> Add Media from Device
                  </Label>
                  <Input 
                    type="file" 
                    id="mediaUpload" 
                    className="hidden" 
                    multiple 
                    accept="image/*,video/*" 
                    onChange={handleMediaUpload}
                    ref={mediaFileInputRef}
                  />
                  {selectedMediaFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Attached Media ({selectedMediaFiles.length}/4):</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {selectedMediaFiles.map((mediaFile) => (
                          <Card key={mediaFile.id} className="relative group overflow-hidden shadow-sm">
                            {mediaFile.previewUrl ? ( 
                              <Image 
                                src={mediaFile.previewUrl} 
                                alt={mediaFile.name} 
                                width={100} 
                                height={100} 
                                className="aspect-square w-full object-cover rounded-md" 
                              />
                            ) : mediaFile.url && mediaFile.type === 'image' ? ( 
                               <Image 
                                src={mediaFile.url} 
                                alt={mediaFile.name} 
                                width={100} 
                                height={100} 
                                className="aspect-square w-full object-cover rounded-md" 
                              />
                            ) : ( 
                              <div className="aspect-square w-full bg-muted rounded-md flex items-center justify-center">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => removeMediaFile(mediaFile.id)}
                                aria-label={`Remove ${mediaFile.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-center p-1 truncate bg-background/80" title={mediaFile.name}>
                              {mediaFile.name}
                            </p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Attach images or videos (max 4 files - prototype limits).</p>
                </div>

              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 justify-end">
                 <Button variant="outline" onClick={() => { setPostStatus("Draft"); toast({ title: "Draft Saved (Simulation)", description: "Your post has been saved as a draft."})}}>
                  Save Draft
                </Button>
                <Button variant="outline" onClick={() => { setPostStatus("Pending Approval"); toast({ title: "Sent for Approval (Simulation)", description: "Your post has been sent for approval."})}}>
                  <FileWarning className="mr-2 h-4 w-4"/>
                  Send for Approval
                </Button>
                <Button onClick={() => { setPostStatus("Scheduled"); toast({ title: "Post Scheduled (Simulation)", description: `Your post is scheduled for ${scheduleDate ? format(scheduleDate, "PPP") : 'a future date'} at ${scheduleTime}.`})}}>
                  <Send className="mr-2 h-4 w-4" /> Schedule Post
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleDatePopover">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        id="scheduleDatePopover"
                        aria-label="Pick a schedule date"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !scheduleDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduleDate ? format(scheduleDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <ShadcnCalendar
                        mode="single"
                        selected={scheduleDate}
                        onSelect={setScheduleDate}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} 
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleTime">Time</Label>
                  <Input 
                    id="scheduleTime" 
                    type="time" 
                    value={scheduleTime} 
                    onChange={(e) => setScheduleTime(e.target.value)} 
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generic Preview</CardTitle>
                <CardDescription>How your post might look (general preview).</CardDescription>
              </CardHeader>
              <CardContent className="border rounded-md p-4 bg-muted/20 min-h-[150px]">
                <p className="text-sm whitespace-pre-wrap">{postContent || "Your content preview will appear here..."}</p>
                 {selectedMediaFiles.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                    {selectedMediaFiles.filter(mf => mf.previewUrl || (mf.url && mf.type === 'image')).slice(0,2).map(mf => ( 
                        <Image key={mf.id} src={(mf.previewUrl || mf.url)!} alt={mf.name} width={100} height={100} className="rounded-md object-cover aspect-square"/>
                    ))}
                    </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary"/>Comments & Feedback</CardTitle>
                <CardDescription>Internal team discussions on this post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea placeholder="Add a comment or feedback..." rows={2} aria-label="Add a comment"/>
                <Button size="sm" variant="outline" onClick={() => toast({title: "Comment Submitted (Simulation)"})}>Submit Comment</Button>
                <div className="text-xs text-muted-foreground p-3 border rounded-md bg-muted/30">
                  <p className="font-semibold">Jane Doe (Marketing Lead):</p>
                  <p>"Looks good, but maybe we can rephrase the CTA for LinkedIn?"</p>
                  <p className="text-muted-foreground/70 mt-0.5">2 hours ago</p>
                </div>
                 <div className="text-xs text-muted-foreground p-3 border rounded-md bg-muted/30">
                  <p className="font-semibold">John Smith (Designer):</p>
                  <p>"Image approved!"</p>
                  <p className="text-muted-foreground/70 mt-0.5">1 hour ago</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
              <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-blue-700 dark:text-blue-300 text-base">AI Assistant Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Need more ideas or a different angle? Use the full <Link href="/ai-assistant" className="underline font-medium hover:text-primary">AI Strategic Briefing</Link> page for more comprehensive content generation!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {platformPreviews.length > 0 && (
          <div className="mt-6 space-y-6">
            <Separator />
            <h2 className="text-xl font-semibold">Platform-Specific Previews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platformPreviews.map((preview) => (
                <Card key={preview.platform}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {platformDetails[preview.platform.toLowerCase().replace(/\s*\(.*?\)\s*/g, '') as PlatformKey]?.icon}
                      <span className="ml-2">{preview.platform} Preview</span>
                    </CardTitle>
                    <CardDescription className="text-xs">AI-powered reformatting for this platform is a TBD feature.</CardDescription>
                  </CardHeader>
                  <CardContent className="border rounded-md p-4 bg-muted/20 min-h-[100px] space-y-2">
                    <p className="text-sm whitespace-pre-wrap">{preview.content || "Content will appear here..."}</p>
                    {selectedMediaFiles.length > 0 && (
                        <div className="mt-2 grid grid-cols-3 gap-1">
                        {selectedMediaFiles.filter(mf => mf.previewUrl || (mf.url && mf.type === 'image')).slice(0,3).map(mf => ( 
                            <Image key={mf.id} src={(mf.previewUrl || mf.url)!} alt={mf.name} width={60} height={60} className="rounded-md object-cover aspect-square"/>
                        ))}
                        </div>
                    )}
                    <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => toast({title: `${preview.platform} specific adjustment`, description:"This feature will allow AI-powered content tailoring (coming soon)." })}>
                        <Edit className="mr-2 h-4 w-4"/> Adjust for {preview.platform}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

    