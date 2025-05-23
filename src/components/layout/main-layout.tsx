
"use client";

import type { ReactNode } from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Lightbulb, PanelLeft, UserCircle, Briefcase, Users, ChevronDown, Cog, 
  Share2, Mail, Send as SendIcon, Users2 as Users2Icon, Building, ListChecks, 
  Spline, BarChartBig, LayoutTemplate as TemplateIcon, Edit3,
  ImageIcon as ImageIconLucide, LayoutDashboard, SlidersHorizontal, UserPlus, PlusCircle, MailPlus, CalendarDays, Smile,
  ListPlus, // Added for Content Types
  Eye, // Ensured Eye is imported
  ThumbsUp, // Ensured ThumbsUp is imported
  UsersRound, // Ensured UsersRound is imported
  Facebook,
  Instagram,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIconLucide,
  Youtube,
  HardDrive, // Added for Storage Settings
  Mailbox, // Added for SMTP Settings
  Cpu, // Added for AI Settings
  FileCog, // Added for Content Types under Admin
  KeyRound,
  ServerCog, // Added for SMTP Generic
  Database, // Added for SES, Firebase Storage, etc.
  Cloud,    // Added for Google Drive, OneDrive
  BoxIcon as Box, // Added for Dropbox, Box
  Server, // Added for Backblaze B2
  RefreshCw, // Added for Manage Connection
  ExternalLink, // Added for View on Platform
  Filter as FilterIcon, // Added for Dashboard Filters
  ListChecks as ListChecksIcon, // Added for Email Lists
} from 'lucide-react'; 
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarMenuButton,
  sidebarMenuButtonVariants,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ThemeToggleButton } from '@/components/common/theme-toggle-button';

interface NavSubSubItem {
  href: string;
  label: string;
  icon?: ReactNode;
}

interface NavSubItem {
  href?: string;
  label: string;
  icon?: ReactNode;
  isSubGroupHeader?: boolean;
  subSubItems?: NavSubSubItem[];
}

interface NavItemConfig {
  href?: string;
  label: string;
  icon: ReactNode;
  subItems?: NavSubItem[];
  isGroup?: boolean;
}

export function MainLayout({ children, pageTitle }: { children: ReactNode; pageTitle: string }) {
  const pathname = usePathname();
  const { state: sidebarState, isMobile, setOpenMobile } = useSidebar();

  const initialNavItems: NavItemConfig[] = useMemo(() => [
    { href: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    {
      label: 'Social Media',
      icon: <Share2 className="h-5 w-5" />,
      isGroup: true,
      subItems: [
        { href: '/social-media/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
        { href: '/social-media/create-post', label: 'Create Post', icon: <Edit3 className="h-4 w-4" /> },
        // { href: '/social-media/scheduled-posts', label: 'Scheduled Posts', icon: <CalendarDays className="h-4 w-4" /> }, // Replaced by /calendar
        { href: '/social-media/asset-library', label: 'Asset Library', icon: <ImageIconLucide className="h-4 w-4" /> },
        { href: '/calendar', label: 'Calendar', icon: <CalendarDays className="h-4 w-4" /> },
        { href: '/social-media/sentiment-analysis', label: 'Sentiment Analysis', icon: <Smile className="h-4 w-4" /> },
      ]
    },
    {
      label: 'Email Marketing',
      icon: <Mail className="h-5 w-5" />,
      isGroup: true,
      subItems: [
        { href: '/email-marketing/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
        { href: '/email-marketing/campaigns', label: 'Campaigns', icon: <SendIcon className="h-4 w-4" /> },
        { href: '/email-marketing/send-email', label: 'Send Email', icon: <MailPlus className="h-4 w-4" /> },
        { href: '/email-marketing/templates', label: 'Templates', icon: <TemplateIcon className="h-4 w-4" /> },
        { href: '/email-marketing/lists', label: 'Lists', icon: <ListChecksIcon className="h-4 w-4" /> },
        { href: '/email-marketing/reports', label: 'Reports', icon: <BarChartBig className="h-4 w-4" /> },
      ]
    },
    {
      label: 'Audience',
      icon: <Users className="h-5 w-5" />,
      isGroup: true,
      subItems: [
        {
          label: 'Contacts',
          icon: <Users2Icon className="h-4 w-4" />,
          isSubGroupHeader: true,
          subSubItems: [
            { href: '/email-marketing/contacts', label: 'All Contacts', icon: <Users2Icon className="h-4 w-4" /> },
            { href: '/email-marketing/contacts/add', label: 'Add New Contact', icon: <UserPlus className="h-4 w-4" /> },
          ]
        },
        {
          label: 'Companies',
          icon: <Building className="h-4 w-4" />,
          isSubGroupHeader: true,
          subSubItems: [
            { href: '/email-marketing/companies', label: 'All Companies', icon: <ListChecks className="h-4 w-4" /> },
            { href: '/email-marketing/companies/add', label: 'Add New Company', icon: <PlusCircle className="h-4 w-4" /> },
          ]
        },
        { href: '/email-marketing/segments', label: 'Manage Segments', icon: <Spline className="h-4 w-4" /> },
      ],
    },
    { href: '/ai-assistant', label: 'AI Assistant', icon: <Lightbulb className="h-5 w-5" /> },
    { href: '/brand-profile', label: 'Brand Profile', icon: <Briefcase className="h-5 w-5" /> },
    {
      label: 'Administration',
      icon: <Cog className="h-5 w-5" />,
      isGroup: true,
      subItems: [
        { href: '/admin/settings', label: 'System Configuration', icon: <SlidersHorizontal className="h-4 w-4" /> },
        { href: '/admin/team-management', label: 'Team Management', icon: <Users className="h-4 w-4" /> },
        { href: '/admin/content-types', label: 'Content Types', icon: <FileCog className="h-4 w-4" /> }, // New Link
      ]
    },
  ], []);

  const [openTopLevelGroups, setOpenTopLevelGroups] = React.useState<Record<string, boolean>>({});
  const [openSecondLevelGroups, setOpenSecondLevelGroups] = React.useState<Record<string, boolean>>({});

  const toggleTopLevelGroup = (label: string) => {
    setOpenTopLevelGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSecondLevelGroup = (topLevelLabel: string, secondLevelLabel: string) => {
    const key = `${topLevelLabel}-${secondLevelLabel}`;
    setOpenSecondLevelGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  useEffect(() => {
    const newOpenTopLevelGroups: Record<string, boolean> = {};
    const newOpenSecondLevelGroups: Record<string, boolean> = {};
  
    initialNavItems.forEach(item => {
      if (item.isGroup && item.subItems) {
        let isTopLevelActive = false;
        item.subItems.forEach(subItem => {
          if (subItem.isSubGroupHeader && subItem.subSubItems) {
            const isSecondLevelActive = subItem.subSubItems.some(
              subSub => subSub.href && pathname === subSub.href // Exact match for sub-sub-items
            );
            if (isSecondLevelActive) {
              isTopLevelActive = true;
              newOpenSecondLevelGroups[`${item.label}-${subItem.label}`] = true;
            }
          } else if (subItem.href && pathname === subItem.href) { // Exact match for direct sub-items
            isTopLevelActive = true;
          } else if (subItem.href && pathname.startsWith(subItem.href + '/') && subItem.href !== '/') { // StartsWith for parent paths
             isTopLevelActive = true;
          }
        });
        
        // If not already opened by a direct child match, check if current path starts with any sub-sub-item href
        if (!isTopLevelActive) {
          item.subItems.forEach(subItem => {
            if (subItem.isSubGroupHeader && subItem.subSubItems) {
              const isSecondLevelParentActive = subItem.subSubItems.some(
                subSub => subSub.href && pathname.startsWith(subSub.href + '/') && subSub.href !== '/'
              );
              if (isSecondLevelParentActive) {
                isTopLevelActive = true;
                newOpenSecondLevelGroups[`${item.label}-${subItem.label}`] = true;
              }
            }
          });
        }

        if (isTopLevelActive) {
          newOpenTopLevelGroups[item.label] = true;
        }
      }
    });
  
    setOpenTopLevelGroups(prev => ({ ...prev, ...newOpenTopLevelGroups }));
    setOpenSecondLevelGroups(prev => ({ ...prev, ...newOpenSecondLevelGroups }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, initialNavItems]);


  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar
        className="border-r bg-sidebar text-sidebar-foreground shadow-lg"
        collapsible="icon"
      >
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Logo textClassName="text-sidebar-foreground" />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {initialNavItems.map((item) => {
              const isTopLevelLinkActive = item.href && pathname === item.href;

              if (item.isGroup && item.subItems) {
                const isCurrentItemGroupOpen = !!openTopLevelGroups[item.label];
                // Check if any child (direct, or sub-sub) is active or if the path starts with a child's href
                const isGroupActiveBasedOnChildren = item.subItems.some(sub => {
                  if (sub.isSubGroupHeader && sub.subSubItems) {
                    return sub.subSubItems.some(subSub => 
                      (subSub.href && pathname === subSub.href) || 
                      (subSub.href && subSub.href !== '/' && pathname.startsWith(subSub.href + '/'))
                    );
                  }
                  return (sub.href && pathname === sub.href) || (sub.href && sub.href !== '/' && pathname.startsWith(sub.href + '/'));
                });

                return (
                  <SidebarMenuItem key={item.label} className="relative">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "w-full justify-between",
                            (isGroupActiveBasedOnChildren && !isCurrentItemGroupOpen) && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                            isCurrentItemGroupOpen && isGroupActiveBasedOnChildren && "bg-sidebar-accent text-sidebar-accent-foreground",
                            isCurrentItemGroupOpen && !isGroupActiveBasedOnChildren && "bg-sidebar-accent/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            !isCurrentItemGroupOpen && !isGroupActiveBasedOnChildren && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                          onClick={() => toggleTopLevelGroup(item.label)}
                          aria-expanded={isCurrentItemGroupOpen}
                          aria-current={(isGroupActiveBasedOnChildren && !isCurrentItemGroupOpen) ? "page" : undefined}
                        >
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-3">
                              {item.icon}
                              <span className="truncate group-data-[collapsible=icon]:hidden">{item.label}</span>
                            </div>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 shrink-0 transition-transform duration-200 group-data-[collapsible=icon]:hidden",
                                isCurrentItemGroupOpen ? "rotate-180" : ""
                              )}
                            />
                          </div>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center" className="ml-2" hidden={sidebarState !== "collapsed" || isMobile}>
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                    {isCurrentItemGroupOpen && sidebarState !== "collapsed" && (
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => {
                          if (subItem.isSubGroupHeader && subItem.subSubItems) {
                            const secondLevelKey = `${item.label}-${subItem.label}`;
                            const isCurrentSecondLevelGroupOpen = !!openSecondLevelGroups[secondLevelKey];
                            const isSecondLevelGroupActiveBasedOnChildren = subItem.subSubItems.some(subSub => 
                              (subSub.href && pathname === subSub.href) ||
                              (subSub.href && subSub.href !== '/' && pathname.startsWith(subSub.href + '/'))
                            );
                            
                            return (
                              <SidebarMenuSubItem key={subItem.label} className="flex flex-col !pl-0">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <SidebarMenuButton
                                      variant="default" 
                                      size="sm" 
                                      className={cn(
                                        "w-full justify-between !px-2 !py-1.5",
                                        (isSecondLevelGroupActiveBasedOnChildren && !isCurrentSecondLevelGroupOpen) && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                                        isCurrentSecondLevelGroupOpen && isSecondLevelGroupActiveBasedOnChildren && "bg-sidebar-accent text-sidebar-accent-foreground",
                                        isCurrentSecondLevelGroupOpen && !isSecondLevelGroupActiveBasedOnChildren && "bg-sidebar-accent/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                        !isCurrentSecondLevelGroupOpen && !isSecondLevelGroupActiveBasedOnChildren && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                      )}
                                      onClick={() => toggleSecondLevelGroup(item.label, subItem.label)}
                                      aria-expanded={isCurrentSecondLevelGroupOpen}
                                    >
                                      <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          {subItem.icon}
                                          <span className="truncate">{subItem.label}</span>
                                        </div>
                                        <ChevronDown
                                          className={cn(
                                            "h-3 w-3 shrink-0 transition-transform duration-200",
                                            isCurrentSecondLevelGroupOpen ? "rotate-180" : ""
                                          )}
                                        />
                                      </div>
                                    </SidebarMenuButton>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" align="center" className="ml-2" hidden={sidebarState !== "collapsed" || isMobile || isCurrentItemGroupOpen}>
                                    {subItem.label}
                                  </TooltipContent>
                                </Tooltip>

                                {isCurrentSecondLevelGroupOpen && (
                                  <SidebarMenuSub className="!ml-2 !pl-2 !border-l-2 !border-sidebar-border/50"> 
                                    {subItem.subSubItems.map((subSubItem) => {
                                      const isSubSubItemActive = (subSubItem.href && pathname === subSubItem.href) || (subSubItem.href && subSubItem.href !== '/' && pathname.startsWith(subSubItem.href + '/'));
                                      return (
                                        <SidebarMenuSubItem key={subSubItem.href || subSubItem.label}>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Link href={subSubItem.href!} passHref legacyBehavior>
                                                <SidebarMenuSubButton
                                                  size="sm"
                                                  aria-current={pathname === subSubItem.href ? "page" : undefined} // Exact match for aria-current
                                                  className={cn(isSubSubItemActive && ! (pathname === subSubItem.href) && "bg-sidebar-accent/70")} // Background for parent paths
                                                  onClick={() => { if (isMobile) setOpenMobile(false); }}
                                                >
                                                  <div className="flex items-center gap-2">
                                                    {subSubItem.icon}
                                                    <span>{subSubItem.label}</span>
                                                  </div>
                                                </SidebarMenuSubButton>
                                              </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" align="center" className="ml-2" hidden={sidebarState !== "collapsed" || isMobile || isCurrentSecondLevelGroupOpen}>
                                              {subSubItem.label}
                                            </TooltipContent>
                                          </Tooltip>
                                        </SidebarMenuSubItem>
                                      );
                                    })}
                                  </SidebarMenuSub>
                                )}
                              </SidebarMenuSubItem>
                            );
                          }
                          const isSubItemActive = (subItem.href && pathname === subItem.href) || (subItem.href && subItem.href !== '/' && pathname.startsWith(subItem.href + '/'));
                          return (
                            <SidebarMenuSubItem key={subItem.href || subItem.label}>
                               <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link href={subItem.href!} passHref legacyBehavior>
                                    <SidebarMenuSubButton
                                      aria-current={pathname === subItem.href ? "page" : undefined} // Exact match for aria-current
                                      className={cn(isSubItemActive && !(pathname === subItem.href) && "bg-sidebar-accent/70")} // Background for parent paths
                                      onClick={() => { if (isMobile) setOpenMobile(false); }}
                                    >
                                      <div className="flex items-center gap-2 pl-1">
                                        {subItem.icon}
                                        <span>{subItem.label}</span>
                                      </div>
                                    </SidebarMenuSubButton>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" align="center" className="ml-2" hidden={sidebarState !== "collapsed" || isMobile || isCurrentItemGroupOpen}>
                                  {subItem.label}
                                </TooltipContent>
                              </Tooltip>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              }

              // Top-level link items (not groups)
              const isActiveTopLevelLink = (item.href && pathname === item.href) || (item.href && item.href !== '/' && pathname.startsWith(item.href + '/'));
              return (
                <SidebarMenuItem key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                       <Link 
                          href={item.href!}
                          className={cn(
                            sidebarMenuButtonVariants({ variant: 'default', size: 'default' }),
                            "w-full justify-start gap-3",
                            isActiveTopLevelLink && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                          )}
                          aria-current={pathname === item.href ? "page" : undefined} // Exact match for aria-current
                          onClick={() => { 
                            if (isMobile) {
                              setOpenMobile(false); 
                            }
                          }}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="truncate group-data-[collapsible=icon]:hidden">{item.label}</span>
                          </div>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center" className="ml-2" hidden={sidebarState !== "collapsed" || isMobile}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
         <SidebarMenu className="p-2 border-t border-sidebar-border">
            <SidebarMenuItem>
                 <ThemeToggleButton />
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start gap-3 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <Avatar className="h-7 w-7 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5">
                                        <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user profile" />
                                        <AvatarFallback>
                                        <UserCircle className="h-full w-full text-sidebar-foreground" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="truncate group-data-[collapsible=icon]:hidden">User Profile</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start" className="group-data-[collapsible=icon]:hidden ml-1">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center" className="ml-2" hidden={sidebarState !== "collapsed" || isMobile}>
                        User Profile
                    </TooltipContent>
                </Tooltip>
            </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
          <div className="flex items-center gap-2">
             <SidebarTrigger 
                variant="outline" 
                size="icon" 
                className="md:hidden h-8 w-8"
                aria-label="Toggle sidebar"
              >
                <PanelLeft className="h-5 w-5" />
            </SidebarTrigger>
            <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggleButton />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user profile" />
                    <AvatarFallback>
                      <UserCircle className="h-6 w-6 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
