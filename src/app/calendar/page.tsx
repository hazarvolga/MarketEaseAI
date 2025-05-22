
"use client";

import React, { useState, useMemo, useTransition } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Calendar as ShadcnCalendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CalendarIcon,
  Search,
  Settings2,
  HelpCircle,
  Plus,
  GanttChartSquare,
  ListChecks,
  Users as UsersIcon,
  MoreVertical,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  GripVertical,
  UploadCloud,
  Sparkles,
  Loader2,
  Copy,
  AlertCircle,
} from 'lucide-react';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  getDay,
  addMonths,
  subMonths,
  isToday,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  parse,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { handleGenerateContentAction } from '@/app/ai-assistant/actions';
import type { GenerateMarketingContentInput, GenerateMarketingContentOutput } from '@/ai/flows/generate-marketing-content';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface MockSocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  defaultColor: string; 
}

const mockSocialPlatforms: MockSocialPlatform[] = [
  { id: 'facebook', name: 'Facebook', icon: <Facebook className="h-4 w-4 text-blue-600" />, defaultColor: 'bg-blue-500 dark:bg-blue-700' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram className="h-4 w-4 text-pink-500" />, defaultColor: 'bg-pink-500 dark:bg-pink-700' },
  { id: 'twitter', name: 'X (Twitter)', icon: <Twitter className="h-4 w-4" />, defaultColor: 'bg-gray-700 dark:bg-gray-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className="h-4 w-4 text-sky-700" />, defaultColor: 'bg-sky-600 dark:bg-sky-800' },
  { id: 'tasks', name: 'Tasks', icon: <ListChecks className="h-4 w-4 text-orange-500" />, defaultColor: 'bg-orange-500 dark:bg-orange-700'},
  { id: 'general', name: 'General', icon: <GanttChartSquare className="h-4 w-4 text-purple-500" />, defaultColor: 'bg-purple-500 dark:bg-purple-700' },
];


interface MockEvent {
  id: string;
  title: string;
  startTime: string; 
  endTime: string; 
  dayIndex: number; 
  description?: string;
  platformId: string; 
  status?: "Scheduled" | "Draft" | "Published" | "Failed";
}

const getEventColor = (platformId: string) => {
  const platform = mockSocialPlatforms.find(p => p.id === platformId);
  return platform ? platform.defaultColor : 'bg-gray-400 dark:bg-gray-600'; 
};

const getPlatformIcon = (platformId: string) => {
    const platform = mockSocialPlatforms.find(p => p.id === platformId);
    if (platform && platform.icon) {
        return React.cloneElement(platform.icon as React.ReactElement, { className: "h-3 w-3 mr-1 opacity-70" });
    }
    return <GripVertical className="h-3 w-3 mr-1 opacity-50 cursor-grab" />;
};


const mockEventsThisWeek: MockEvent[] = [
  { id: '1', title: 'FB: New Feature Launch!', startTime: '08:30', endTime: '09:30', dayIndex: 0, platformId: 'facebook', description: "Announcing our latest feature that will revolutionize your workflow. #NewFeature #Innovation", status: "Scheduled" },
  { id: '2', title: 'IG: Behind the Scenes Reel', startTime: '08:45', endTime: '09:15', dayIndex: 0, platformId: 'instagram', description: "A quick look at what we're working on this week! #BTS #CompanyCulture", status: "Scheduled" },
  { id: '3', title: 'Gen: Team Strategy Meeting', startTime: '09:00', endTime: '09:30', dayIndex: 0, platformId: 'general', description: "Discussing Q4 goals and roadmap.", status: "Scheduled" },
  { id: '4', title: 'LI: Article - Future of AI', startTime: '10:00', endTime: '11:00', dayIndex: 1, platformId: 'linkedin', description: "Our CEO shares insights on the evolving role of AI in marketing. #AI #MarketingTrends", status: "Scheduled" },
  { id: '5', title: 'Task: Review Ad Copy', startTime: '08:00', endTime: '09:00', dayIndex: 2, platformId: 'tasks', description: "Final review of the new ad campaign copy before launch.", status: "Draft" },
  { id: '6', title: 'TW: Live Q&A Teaser', startTime: '08:30', endTime: '09:30', dayIndex: 2, platformId: 'twitter', description: "Join us for a live Q&A session this Friday! Ask us anything. #LiveEvent #AskMeAnything", status: "Published" },
  { id: '7', title: 'Task: Design Social Graphics', startTime: '08:15', endTime: '09:45', dayIndex: 3, platformId: 'tasks', description: "Create graphics for next week's social media posts.", status: "Scheduled" },
];


const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

const mockBrandProfileData: Partial<GenerateMarketingContentInput> = {
  brandCorePurpose: "To empower design and engineering professionals with intuitive, powerful, and integrated software tools that enhance creativity, precision, and project efficiency.",
  customerValueProposition: "Our platform offers cutting-edge solutions for architects and civil engineers, streamlining complex design, analysis, and collaboration processes from concept to construction.",
  // Add other relevant fields if your AI prompt uses them, otherwise keep it minimal
};


export default function NewCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'Week' | 'Month' | 'Day'>('Week');
  const [platformFilters, setPlatformFilters] = useState<Record<string, boolean>>(
    mockSocialPlatforms.reduce((acc, platform) => {
      acc[platform.id] = true; 
      return acc;
    }, {} as Record<string, boolean>)
  );
  const { toast } = useToast();

  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [quickAddDateTime, setQuickAddDateTime] = useState<{ date: Date; time: string } | null>(null);
  const [quickAddCaption, setQuickAddCaption] = useState("");
  const [quickAddSelectedPlatforms, setQuickAddSelectedPlatforms] = useState<Record<string, boolean>>(
    mockSocialPlatforms.reduce((acc, p) => ({ ...acc, [p.id]: false }), {})
  );

  const [showQuickAddAiHelper, setShowQuickAddAiHelper] = useState(false);
  const [quickAddAiBrief, setQuickAddAiBrief] = useState("");
  const [quickAddAiSuggestions, setQuickAddAiSuggestions] = useState<string[] | null>(null);
  const [isQuickAddAiLoading, setIsQuickAddAiLoading] = useState(false);
  const [quickAddAiError, setQuickAddAiError] = useState<string | null>(null);
  const [isAiTransitionPending, startAiTransition] = useTransition();


  const weekStartsOn = 0; 

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  
  const currentViewStart = useMemo(() => {
    if (viewMode === 'Week') return startOfWeek(currentDate, { weekStartsOn });
    if (viewMode === 'Day') return currentDate;
    return startOfWeek(firstDayOfMonth, { weekStartsOn }); 
  }, [currentDate, viewMode, weekStartsOn, firstDayOfMonth]);

  const currentViewEnd = useMemo(() => {
    if (viewMode === 'Week') return endOfWeek(currentDate, { weekStartsOn });
    if (viewMode === 'Day') return currentDate;
    return endOfWeek(lastDayOfMonth, { weekStartsOn }); 
  }, [currentDate, viewMode, weekStartsOn, lastDayOfMonth]);

  const daysInView = useMemo(() => {
    if (viewMode === 'Day') return [currentDate];
    return eachDayOfInterval({ start: currentViewStart, end: currentViewEnd });
  }, [currentViewStart, currentViewEnd, viewMode, currentDate]);


  const handlePrev = () => {
    if (viewMode === 'Week') setCurrentDate(prev => subWeeks(prev, 1));
    else if (viewMode === 'Day') setCurrentDate(prev => addDays(prev, -1));
    else if (viewMode === 'Month') setCurrentDate(prev => subMonths(prev, 1));
  };
  const handleNext = () => {
    if (viewMode === 'Week') setCurrentDate(prev => addWeeks(prev, 1));
    else if (viewMode === 'Day') setCurrentDate(prev => addDays(prev, 1));
    else if (viewMode === 'Month') setCurrentDate(prev => addMonths(prev, 1));
  };
  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setCurrentDate(date); 
    }
  };
  
  const handlePlatformFilterChange = (platformId: string) => {
    setPlatformFilters(prev => ({
      ...prev,
      [platformId]: !prev[platformId],
    }));
  };

  const activePlatformIds = useMemo(() => 
    Object.entries(platformFilters)
      .filter(([_, isActive]) => isActive)
      .map(([platformId, _]) => platformId), 
    [platformFilters]
  );
  
  const getFilteredEvents = (events: MockEvent[]) => {
    return events.filter(event => activePlatformIds.includes(event.platformId));
  };

  const filteredEventsForWeekView = useMemo(() => 
    getFilteredEvents(mockEventsThisWeek),
  [activePlatformIds]);

  const filteredEventsForDayView = useMemo(() => 
    getFilteredEvents(mockEventsThisWeek.filter(event => getDay(setHours(setMinutes(currentDate,0),0)) === event.dayIndex)),
  [activePlatformIds, currentDate]);
  
  const eventsForDayInMonth = (day: Date): MockEvent[] => {
     return getFilteredEvents(mockEventsThisWeek.filter(event => event.dayIndex === getDay(day)));
  };

  const getEventTopAndHeight = (startTimeStr: string, endTimeStr: string) => {
    const [startH, startM] = startTimeStr.split(':').map(Number);
    const [endH, endM] = endTimeStr.split(':').map(Number);
    const totalStartMinutes = startH * 60 + startM;
    const totalEndMinutes = endH * 60 + endM;
    
    const pixelsPerHour = 48; 
    const top = (totalStartMinutes / 60) * pixelsPerHour;
    const durationMinutes = totalEndMinutes - totalStartMinutes;
    const height = Math.max((durationMinutes / 60) * pixelsPerHour, 20); 
    return { top, height };
  };

  const handleSlotClick = (day: Date, time: string) => {
    setQuickAddDateTime({ date: day, time });
    setQuickAddCaption("");
    setQuickAddSelectedPlatforms(mockSocialPlatforms.reduce((acc, p) => ({ ...acc, [p.id]: false }), {}));
    setShowQuickAddAiHelper(false);
    setQuickAddAiBrief("");
    setQuickAddAiSuggestions(null);
    setQuickAddAiError(null);
    setIsQuickAddModalOpen(true);
  };

  const handleQuickAddPlatformChange = (platformId: string) => {
    setQuickAddSelectedPlatforms(prev => ({ ...prev, [platformId]: !prev[platformId] }));
  };

  const handleQuickAddSaveDraft = () => {
    toast({ title: "Draft Saved (Simulation)", description: `Post for ${quickAddDateTime && format(quickAddDateTime.date, 'MMM d')} at ${quickAddDateTime?.time} saved as draft.` });
    setIsQuickAddModalOpen(false);
  };

  const handleQuickAddSchedule = () => {
    toast({ title: "Post Scheduled (Simulation)", description: `Post for ${quickAddDateTime && format(quickAddDateTime.date, 'MMM d')} at ${quickAddDateTime?.time} scheduled.` });
    setIsQuickAddModalOpen(false);
  };

  const handleQuickAddAiGenerate = () => {
    if (quickAddAiBrief.length < 10) {
      setQuickAddAiError("Content brief must be at least 10 characters.");
      return;
    }
    setIsQuickAddAiLoading(true);
    setQuickAddAiError(null);
    setQuickAddAiSuggestions(null);

    startAiTransition(async () => {
      const payload: GenerateMarketingContentInput = {
        contentRequest: quickAddAiBrief,
        brandCorePurpose: mockBrandProfileData.brandCorePurpose || "Default brand purpose.",
        customerValueProposition: mockBrandProfileData.customerValueProposition || "Default value proposition.",
      };
      const result = await handleGenerateContentAction(payload);
      if (result.success && result.data) {
        setQuickAddAiSuggestions(result.data.contentSuggestions);
      } else {
        if (typeof result.error === 'string') {
          setQuickAddAiError(result.error);
        } else if (result.error && 'flatten' in result.error) { 
          const fieldErrors = Object.entries((result.error as any).flatten().fieldErrors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('; ');
          setQuickAddAiError(`Validation failed. ${fieldErrors || 'Please check your input.'}`);
        } else {
          setQuickAddAiError("An unknown error occurred while generating suggestions.");
        }
      }
      setIsQuickAddAiLoading(false);
    });
  };

  const handleUseQuickAddAiSuggestion = (suggestion: string) => {
    setQuickAddCaption(suggestion);
    setShowQuickAddAiHelper(false); // Optionally hide AI helper after use
    toast({
      title: "Suggestion Applied",
      description: "AI suggestion has been added to your caption.",
    });
  };

  const handleCopyQuickAddSuggestion = (text: string) => {
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
    });
  };

  return (
    <MainLayout pageTitle="Calendar">
      <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your header */}
        {/* Left Sidebar */}
        <div className="w-64 border-r border-border p-4 space-y-4 overflow-y-auto bg-card text-card-foreground flex-shrink-0">
          <Button className="w-full justify-center" onClick={() => handleSlotClick(new Date(), format(new Date(), "HH:mm"))}>
            <Plus className="mr-2 h-4 w-4" /> Create
          </Button>
          <ShadcnCalendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border shadow-sm"
          />
          <div className="space-y-1 text-sm">
            <p>New York Time <span className="float-right font-medium">{format(new Date(), 'h:mm a')}</span></p>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for people" className="pl-8" />
          </div>
          
          <div>
            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2 mt-3">Filter by Platform</h3>
            <div className="space-y-1">
              {mockSocialPlatforms.map(platform => (
                <div key={platform.id} className="flex items-center">
                  <Checkbox 
                    id={`pf-${platform.id}`} 
                    checked={platformFilters[platform.id]}
                    onCheckedChange={() => handlePlatformFilterChange(platform.id)}
                  />
                  <Label htmlFor={`pf-${platform.id}`} className="ml-2 text-sm font-medium flex items-center cursor-pointer">
                    {platform.icon}
                    <span className="ml-1.5">{platform.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Calendar Header */}
          <header className="flex items-center justify-between p-3 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Calendar</span>
              <Button variant="outline" size="sm" onClick={handleToday}>Today</Button>
              <Button variant="ghost" size="icon" onClick={handlePrev}><ChevronLeft className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" onClick={handleNext}><ChevronRight className="h-5 w-5" /></Button>
              <h2 className="text-lg font-medium ml-2">
                {viewMode === 'Month' && format(currentDate, "MMMM yyyy")}
                {viewMode === 'Week' && `${format(startOfWeek(currentDate, { weekStartsOn }), "MMM d")} - ${format(endOfWeek(currentDate, { weekStartsOn }), "MMM d, yyyy")}`}
                {viewMode === 'Day' && format(currentDate, "MMMM d, yyyy")}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Search className="h-5 w-5 text-muted-foreground" /></Button>
              <Button variant="ghost" size="icon"><HelpCircle className="h-5 w-5 text-muted-foreground" /></Button>
              <Button variant="ghost" size="icon"><Settings2 className="h-5 w-5 text-muted-foreground" /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">{viewMode} <ChevronDown className="ml-1 h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setViewMode('Day')}>Day</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewMode('Week')}>Week</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewMode('Month')}>Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Week View */}
          {viewMode === 'Week' && (
            <div className="flex-1 overflow-auto p-1">
              <div className="grid grid-cols-1 md:grid-cols-[auto_repeat(7,minmax(0,1fr))] min-w-[800px]">
                <div className="text-xs text-muted-foreground text-right pr-2 py-1 sticky top-0 bg-background z-10 border-b md:border-r">GMT-0</div>
                {daysInView.slice(0,7).map((day) => ( 
                  <div key={`header-${day.toString()}`} className="text-center border-b border-l py-1 sticky top-0 bg-background z-10">
                    <div className={cn("text-xs uppercase", isToday(day) && "text-primary")}>
                      {format(day, 'EEE')}
                    </div>
                    <div className={cn(
                      "text-2xl font-medium",
                       isToday(day) && "bg-primary text-primary-foreground rounded-full w-8 h-8 mx-auto flex items-center justify-center"
                    )}>
                      {format(day, 'd')}
                    </div>
                  </div>
                ))}
                
                <div className="row-start-2 text-xs text-muted-foreground text-right pr-1 space-y-0 md:border-r">
                  {timeSlots.slice(1).map(time => (
                    <div key={time} className="h-12 relative -top-2.5">
                      {time.endsWith(':00') && parseInt(time.substring(0,2)) % 2 === 0 && parseInt(time.substring(0,2)) !== 0 ? (
                        <span className="absolute right-1">{format(parse(time, 'HH:mm', new Date()), 'ha')}</span>
                      ) : null}
                    </div>
                  ))}
                </div>

                {daysInView.slice(0,7).map((day, dayIdx) => (
                  <div key={`col-${day.toString()}`} className="row-start-2 relative border-l">
                    {timeSlots.slice(1).map(time => (
                      <div 
                        key={`slot-${day.toString()}-${time}`} 
                        className="h-12 border-b hover:bg-muted/30 cursor-pointer"
                        onClick={() => handleSlotClick(day, time)}
                      ></div>
                    ))}
                    {filteredEventsForWeekView
                      .filter(event => event.dayIndex === getDay(day)) 
                      .map(event => {
                        const { top, height } = getEventTopAndHeight(event.startTime, event.endTime);
                        return (
                          <Popover key={event.id}>
                            <PopoverTrigger asChild>
                              <div
                                className={cn(
                                  "absolute left-1 right-1 p-1 rounded text-xs text-white overflow-hidden cursor-grab hover:opacity-80 z-10",
                                  getEventColor(event.platformId)
                                )}
                                style={{ top: `${top}px`, height: `${Math.max(height - 2, 18)}px` }}
                                title={`${event.title} (${event.startTime} - ${event.endTime})`}
                                onClick={(e) => e.stopPropagation()} 
                              >
                                <div className="font-semibold truncate flex items-center">
                                  <GripVertical className="h-3 w-3 mr-1 opacity-50 cursor-grab" />
                                  {getPlatformIcon(event.platformId)}
                                  {event.title}
                                </div>
                                {(height > 24) && <div className="opacity-80 truncate">{event.startTime} - {event.endTime}</div>}
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-60 p-3 text-sm">
                              <h4 className="font-semibold mb-1">{event.title}</h4>
                              <p className="text-muted-foreground">{format(day, 'eeee, MMMM d')}</p>
                              <p className="text-muted-foreground">{event.startTime} - {event.endTime}</p>
                              {event.description && <p className="mt-2 whitespace-pre-wrap">{event.description}</p>}
                              <Button variant="outline" size="sm" className="w-full mt-3">Edit event (mock)</Button>
                            </PopoverContent>
                          </Popover>
                        );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day View */}
          {viewMode === 'Day' && (
            <div className="flex-1 overflow-auto p-1">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] min-w-[400px]">
                 <div className="text-xs text-muted-foreground text-right pr-2 py-1 sticky top-0 bg-background z-10 border-b md:border-r">GMT-0</div>
                <div className="text-center border-b border-l py-1 sticky top-0 bg-background z-10">
                  <div className={cn("text-xs uppercase", isToday(currentDate) && "text-primary")}>
                    {format(currentDate, 'EEE')}
                  </div>
                  <div className={cn(
                    "text-2xl font-medium",
                    isToday(currentDate) && "bg-primary text-primary-foreground rounded-full w-8 h-8 mx-auto flex items-center justify-center"
                  )}>
                    {format(currentDate, 'd')}
                  </div>
                </div>
                
                <div className="row-start-2 text-xs text-muted-foreground text-right pr-1 space-y-0 md:border-r">
                  {timeSlots.slice(1).map(time => (
                    <div key={time} className="h-12 relative -top-2.5">
                       {time.endsWith(':00') && parseInt(time.substring(0,2)) % 2 === 0 && parseInt(time.substring(0,2)) !== 0 ? (
                        <span className="absolute right-1">{format(parse(time, 'HH:mm', new Date()), 'ha')}</span>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="row-start-2 relative border-l">
                  {timeSlots.slice(1).map(time => (
                     <div 
                        key={`slot-day-${time}`} 
                        className="h-12 border-b hover:bg-muted/30 cursor-pointer"
                        onClick={() => handleSlotClick(currentDate, time)}
                      ></div>
                  ))}
                  {filteredEventsForDayView
                    .map(event => {
                      const { top, height } = getEventTopAndHeight(event.startTime, event.endTime);
                      return (
                        <Popover key={event.id}>
                          <PopoverTrigger asChild>
                            <div
                              className={cn(
                                "absolute left-1 right-1 p-1 rounded text-xs text-white overflow-hidden cursor-grab hover:opacity-80 z-10",
                                getEventColor(event.platformId)
                              )}
                              style={{ top: `${top}px`, height: `${Math.max(height - 2, 18)}px` }}
                              title={`${event.title} (${event.startTime} - ${event.endTime})`}
                              onClick={(e) => e.stopPropagation()} 
                            >
                               <div className="font-semibold truncate flex items-center">
                                  <GripVertical className="h-3 w-3 mr-1 opacity-50 cursor-grab" />
                                  {getPlatformIcon(event.platformId)}
                                  {event.title}
                                </div>
                               {(height > 24) && <div className="opacity-80 truncate">{event.startTime} - {event.endTime}</div>}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-60 p-3 text-sm">
                            <h4 className="font-semibold mb-1">{event.title}</h4>
                            <p className="text-muted-foreground">{format(currentDate, 'eeee, MMMM d')}</p>
                            <p className="text-muted-foreground">{event.startTime} - {event.endTime}</p>
                            {event.description && <p className="mt-2 whitespace-pre-wrap">{event.description}</p>}
                            <Button variant="outline" size="sm" className="w-full mt-3">Edit event (mock)</Button>
                          </PopoverContent>
                        </Popover>
                      );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {/* Month View */}
          {viewMode === 'Month' && (
             <div className="flex-1 overflow-auto p-1">
              <div className="grid grid-cols-7 border-t border-l">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
                  <div key={dayName} className="p-2 text-center text-xs font-medium text-muted-foreground border-b border-r h-10 flex items-center justify-center">
                    {dayName}
                  </div>
                ))}
                {Array.from({ length: getDay(startOfMonth(currentDate)) }).map((_, i) => (
                  <div key={`empty-start-${i}`} className="h-28 border-b border-r bg-muted/30"></div>
                ))}
                {eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) }).map(day => (
                  <div 
                    key={day.toString()} 
                    className={cn(
                      "h-28 p-1.5 border-b border-r relative hover:bg-muted/50 transition-colors text-sm overflow-hidden cursor-pointer",
                      !isSameMonth(day, currentDate) && "bg-muted/30 text-muted-foreground/60"
                    )}
                    onClick={() => { setCurrentDate(day); setSelectedDate(day); setViewMode('Day');}}
                  >
                    <span className={cn(
                      "block text-right mb-1", 
                      isToday(day) && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center ml-auto -mr-0.5 -mt-0.5"
                    )}>
                      {format(day, 'd')}
                    </span>
                    <div className="space-y-0.5">
                      {eventsForDayInMonth(day).slice(0, 2).map(event => ( 
                        <div key={`${day.toString()}-${event.id}`} className={cn("text-xs px-1 py-0.5 rounded truncate text-white", getEventColor(event.platformId))}>
                          {event.title}
                        </div>
                      ))}
                      {eventsForDayInMonth(day).length > 2 && (
                         <div className="text-xs text-muted-foreground text-center mt-1">
                            + {eventsForDayInMonth(day).length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {Array.from({ length: (7 - (getDay(endOfMonth(currentDate)) + 1)) % 7 }).map((_, i) => (
                  <div key={`empty-end-${i}`} className="h-28 border-b border-r bg-muted/30"></div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Quick Add Post Dialog */}
      {quickAddDateTime && (
        <Dialog open={isQuickAddModalOpen} onOpenChange={setIsQuickAddModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Quick Add Post</DialogTitle>
              <DialogDescription>
                For {format(quickAddDateTime.date, "MMMM d, yyyy")} at {format(parse(quickAddDateTime.time, "HH:mm", new Date()), "h:mm a")}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="quickAddCaption">Caption</Label>
                  <Button variant="ghost" size="sm" onClick={() => setShowQuickAddAiHelper(!showQuickAddAiHelper)}>
                    <Sparkles className="mr-2 h-4 w-4 text-primary" /> AI Assist {showQuickAddAiHelper ? '(Hide)' : ''}
                  </Button>
                </div>
                <Textarea
                  id="quickAddCaption"
                  placeholder="Write your post content..."
                  value={quickAddCaption}
                  onChange={(e) => setQuickAddCaption(e.target.value)}
                  rows={4}
                />
              </div>

              {showQuickAddAiHelper && (
                <Card className="p-4 bg-muted/50">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="quickAddAiBrief" className="text-sm font-medium">AI Content Brief</Label>
                      <Textarea
                        id="quickAddAiBrief"
                        placeholder="e.g., 'A short, engaging post about our new feature X...'"
                        value={quickAddAiBrief}
                        onChange={(e) => setQuickAddAiBrief(e.target.value)}
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleQuickAddAiGenerate} disabled={isQuickAddAiLoading || isAiTransitionPending || quickAddAiBrief.length < 10} className="w-full">
                      {isQuickAddAiLoading || isAiTransitionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Get Caption Ideas
                    </Button>
                    {quickAddAiError && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{quickAddAiError}</AlertDescription>
                      </Alert>
                    )}
                    {isQuickAddAiLoading && !quickAddAiSuggestions && (
                      <div className="flex items-center justify-center text-sm text-muted-foreground py-2">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                      </div>
                    )}
                    {quickAddAiSuggestions && quickAddAiSuggestions.length > 0 && (
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        <p className="text-xs text-muted-foreground">Suggestions:</p>
                        {quickAddAiSuggestions.map((suggestion, index) => (
                          <Card key={index} className="bg-background p-2 text-xs">
                            <p className="whitespace-pre-wrap">{suggestion}</p>
                            <div className="flex justify-end gap-1 mt-1">
                              <Button variant="ghost" size="xs" onClick={() => handleCopyQuickAddSuggestion(suggestion)} className="h-6 px-1.5">
                                <Copy className="mr-1 h-3 w-3" /> Copy
                              </Button>
                              <Button variant="secondary" size="xs" onClick={() => handleUseQuickAddAiSuggestion(suggestion)} className="h-6 px-1.5">
                                Use this
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              )}

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload Media (Mock)
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Publish to:</Label>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                  {mockSocialPlatforms.filter(p => p.id !== 'tasks' && p.id !== 'general').map(platform => (
                    <div key={`qa-${platform.id}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`qa-pf-${platform.id}`}
                        checked={quickAddSelectedPlatforms[platform.id]}
                        onCheckedChange={() => handleQuickAddPlatformChange(platform.id)}
                      />
                      <Label htmlFor={`qa-pf-${platform.id}`} className="font-normal flex items-center text-sm">
                        {platform.icon}
                        <span className="ml-1.5">{platform.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" variant="secondary" onClick={handleQuickAddSaveDraft}>Save Draft</Button>
              <Button type="button" onClick={handleQuickAddSchedule}>Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
}


    