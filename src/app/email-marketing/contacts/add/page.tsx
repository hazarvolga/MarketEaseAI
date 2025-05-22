
"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronsUpDown } from 'lucide-react';
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

// Mock data for lists - in a real app, this would come from a data source
const mockEmailLists = [
  { id: 'list1', name: 'Newsletter Subscribers' },
  { id: 'list2', name: 'Product Updates' },
  { id: 'list3', name: 'Beta Testers' },
];

const mockExistingCompanies = [
  { value: 'innovatech', label: 'Innovatech Solutions Inc.' },
  { value: 'archstruct', label: 'ArchStruct Inc.' },
  { value: 'designpro', label: 'DesignPro Ltd.' },
  { value: 'buildwell', label: 'BuildWell Group' },
  { value: 'techenterprises', label: 'Tech Enterprises Co.' },
];


export default function AddNewContactPage() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [openCompanyCombobox, setOpenCompanyCombobox] = useState(false);
  // const [selectedLists, setSelectedLists] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic validation (email is required)
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Email address is required.",
        variant: "destructive",
      });
      return;
    }
    // Simulate saving data
    console.log({
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      notes,
      // selectedLists
    });
    toast({
      title: "Contact Saved (Simulation)",
      description: `Contact ${firstName} ${lastName} has been saved.`,
    });
    // Optionally, reset form or redirect
    // setFirstName(''); setLastName(''); setEmail(''); ...
  };

  return (
    <MainLayout pageTitle="Add New Contact">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/email-marketing/contacts">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Contacts</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Add New Contact</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Enter the details for the new contact.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 234 567 8900" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyCombobox">Company (Optional)</Label>
                  <Popover open={openCompanyCombobox} onOpenChange={setOpenCompanyCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        id="companyCombobox"
                        aria-expanded={openCompanyCombobox}
                        className="w-full justify-between"
                      >
                        {company
                          ? mockExistingCompanies.find((c) => c.label.toLowerCase() === company.toLowerCase())?.label || company
                          : "Select or type company..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput 
                          placeholder="Search or type new company..." 
                          value={company}
                          onValueChange={(searchValue) => setCompany(searchValue)}
                        />
                        <CommandEmpty>No company found. Type to create new.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {mockExistingCompanies.map((c) => (
                              <CommandItem
                                key={c.value}
                                value={c.label}
                                onSelect={(currentValue) => {
                                  setCompany(currentValue === company.toLowerCase() ? "" : currentValue);
                                  setOpenCompanyCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    (company.toLowerCase() === c.label.toLowerCase()) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {c.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                <Input 
                  id="jobTitle" 
                  placeholder="Marketing Manager" 
                  value={jobTitle} 
                  onChange={(e) => setJobTitle(e.target.value)} 
                />
              </div>
              
              {/* Placeholder for list selection - to be enhanced later */}
              <div className="space-y-2">
                <Label>Add to Lists (Optional)</Label>
                <div className="p-3 border rounded-md bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    List selection functionality (e.g., checkboxes or multi-select) will be added here.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any additional notes about this contact..." 
                  rows={4} 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" asChild>
                <Link href="/email-marketing/contacts">Cancel</Link>
              </Button>
              <Button type="submit">Save Contact</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
