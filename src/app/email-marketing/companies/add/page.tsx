
"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Building } from 'lucide-react';

// Mock data for industry options - in a real app, this might come from a data source or be more extensive
const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "real_estate", label: "Real Estate" },
  { value: "construction_software", label: "Construction Software" },
  { value: "architectural_design", label: "Architectural Design" },
  { value: "other", label: "Other" },
];

export default function AddNewCompanyPage() {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic validation (company name is required)
    if (!companyName.trim()) {
      toast({
        title: "Error",
        description: "Company name is required.",
        variant: "destructive",
      });
      return;
    }
    // Simulate saving data
    console.log({
      companyName,
      industry,
      website,
      phone,
      address,
      notes,
    });
    toast({
      title: "Company Saved (Simulation)",
      description: `Company ${companyName} has been saved.`,
    });
    // Optionally, reset form or redirect
    // setCompanyName(''); setIndustry(''); ...
  };

  return (
    <MainLayout pageTitle="Add New Company">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/email-marketing/companies">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Companies</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center">
            <Building className="mr-2 h-6 w-6 text-primary" /> Add New Company
          </h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Enter the details for the new company.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="companyName" 
                  placeholder="Innovatech Solutions Inc." 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input 
                    id="website" 
                    type="url" 
                    placeholder="https://example.com" 
                    value={website} 
                    onChange={(e) => setWebsite(e.target.value)} 
                  />
                </div>
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
                  <Label htmlFor="address">Address (Optional)</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Innovation Drive, Tech City" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any additional notes about this company..." 
                  rows={4} 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" asChild>
                <Link href="/email-marketing/companies">Cancel</Link>
              </Button>
              <Button type="submit">Save Company</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
}
