
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Eye, Edit, Image as ImageIcon, Check, ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Corrected: next/image instead of lucide-react's Image
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data'; // Corrected import path

// Mock data for existing campaigns (value can be campaign ID)
const existingCampaignsForReference = [
  { value: 'camp_123_q4_product', label: 'Q4 Product Showcase Webinar Series' },
  { value: 'camp_456_summer_sale', label: 'Summer Sale 2024 - Early Bird' },
  { value: 'camp_789_monthly_oct', label: 'Monthly Digest - October' },
  { value: 'camp_abc_new_feature_ai', label: 'New Feature Rollout: AI Insights' },
  { value: 'camp_def_holiday_23', label: 'Holiday Greetings 2023' },
];


export default function EmailTemplatesPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [isNamingCampaignModalOpen, setIsNamingCampaignModalOpen] = useState(false);
  const [selectedTemplateForNaming, setSelectedTemplateForNaming] = useState<EmailTemplate | null>(null);
  const [newCampaignName, setNewCampaignName] = useState("");
  const [openCampaignCombobox, setOpenCampaignCombobox] = useState(false);
  const [isApplyingToExistingCampaign, setIsApplyingToExistingCampaign] = useState(false);


  const handleOpenUseTemplateModal = (template: EmailTemplate) => {
    setSelectedTemplateForNaming(template);
    setNewCampaignName(`Campaign using ${template.name}`); 
    setIsApplyingToExistingCampaign(false); 
    setOpenCampaignCombobox(false); 
    setIsNamingCampaignModalOpen(true);
  };

  const handleStartCampaignWithName = () => {
    if (!newCampaignName.trim()) {
      toast({
        title: "Campaign Name Required",
        description: "Please enter or select a name for your campaign.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedTemplateForNaming) return;

    if (isApplyingToExistingCampaign) {
      const existingCampaign = existingCampaignsForReference.find(c => c.label.toLowerCase() === newCampaignName.toLowerCase());
      if (existingCampaign) {
        toast({
          title: `Applying Template to Existing Campaign`,
          description: `Using template: "${selectedTemplateForNaming.name}" for campaign: "${existingCampaign.label}". Redirecting to edit... (Simulation)`,
          duration: 5000,
        });
        // Navigate to an edit page for the existing campaign, passing templateId
        router.push(`/email-marketing/campaigns/${existingCampaign.value}/edit?templateId=${selectedTemplateForNaming.id}`);
      } else {
         // Should not happen if isApplyingToExistingCampaign is true and selection logic is correct
         toast({
          title: `Error: Existing campaign not found`,
          description: `Could not find campaign: ${newCampaignName}. Please try again.`,
          variant: "destructive"
        });
      }
    } else { 
      toast({
        title: `Starting New Campaign: ${newCampaignName}`,
        description: `Using template: "${selectedTemplateForNaming.name}". Redirecting...`,
      });
      router.push(`/email-marketing/campaigns/create?templateId=${selectedTemplateForNaming.id}&campaignName=${encodeURIComponent(newCampaignName)}`);
    }

    setIsNamingCampaignModalOpen(false);
    setSelectedTemplateForNaming(null);
    setNewCampaignName("");
    setIsApplyingToExistingCampaign(false);
  };


  return (
    <MainLayout pageTitle="Email Templates">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Email Template Library</h1>
            <p className="text-sm text-muted-foreground">
              Browse, preview, and manage your email templates.
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/email-marketing/templates/create"> {/* Assuming a create template page might exist */}
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Template
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Templates ({mockTemplates.length})</CardTitle>
            <CardDescription>
              Select a template to preview or use it for a new/existing campaign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTemplates.map((template) => (
                  <Card key={template.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[4/3] w-full bg-muted relative">
                      <Image
                        src={template.thumbnailUrl}
                        alt={`${template.name} thumbnail`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        data-ai-hint={template.dataAiHint}
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">Category: {template.category}</p>
                      <CardDescription className="text-xs h-10 overflow-hidden text-ellipsis line-clamp-2 mt-1">{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-3 flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/email-marketing/templates/${template.id}/preview`}>
                           <Eye className="mr-2 h-4 w-4" /> Preview
                        </Link>
                      </Button>
                      <Button variant="default" size="sm" onClick={() => handleOpenUseTemplateModal(template)}>
                        <Edit className="mr-2 h-4 w-4" /> Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No templates available yet. Create a new template to get started.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedTemplateForNaming && (
        <Dialog open={isNamingCampaignModalOpen} onOpenChange={setIsNamingCampaignModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Use Template For...</DialogTitle>
              <DialogDescription>
                Using template: "{selectedTemplateForNaming.name}".<br/>
                Select an existing campaign to apply this template, or type a new name to create a new campaign.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="campaignNameInput">Campaign Name</Label>
                <Popover open={openCampaignCombobox} onOpenChange={setOpenCampaignCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCampaignCombobox}
                      id="campaignNameTrigger"
                      className="w-full justify-between mt-1"
                    >
                      {newCampaignName || "Select or type campaign name..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput 
                        id="campaignNameInput"
                        placeholder="Search or type new campaign..." 
                        value={newCampaignName}
                        onValueChange={(searchValue) => {
                          setNewCampaignName(searchValue);
                          // If user types, assume it's a new campaign unless they explicitly select an existing one later
                          setIsApplyingToExistingCampaign(false);
                        }}
                      />
                      <CommandEmpty>No campaign found. Type to create new.</CommandEmpty>
                      <CommandList>
                        <CommandGroup heading="Existing Campaigns">
                          {existingCampaignsForReference.map((campaign) => (
                            <CommandItem
                              key={campaign.value}
                              value={campaign.label} // This value is used for filtering and passed to onSelect
                              onSelect={(currentValue) => {
                                // currentValue is campaign.label from the 'value' prop of CommandItem
                                setNewCampaignName(currentValue);
                                setIsApplyingToExistingCampaign(true); // Explicitly set when an item is selected
                                setOpenCampaignCombobox(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  // Highlight if newCampaignName matches this item AND we are in 'apply to existing' mode
                                  newCampaignName.toLowerCase() === campaign.label.toLowerCase() && isApplyingToExistingCampaign 
                                    ? "opacity-100" 
                                    : "opacity-0"
                                )}
                              />
                              {campaign.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter className="sm:justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleStartCampaignWithName}>
                {isApplyingToExistingCampaign ? "Apply Template & Edit Campaign" : "Start New Campaign"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
}

