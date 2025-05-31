
"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MailPlus, ListChecks } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for email lists (ideally this would come from a shared lib file)
const mockEmailLists = [
  { id: 'list1', name: 'Newsletter Subscribers (850)' },
  { id: 'list2', name: 'Potential Leads - Webinar (120)' },
  { id: 'list3', name: 'VIP Clients (75)' },
  { id: 'list4', name: 'Event Attendees - Q3 (210)' },
];

type SendType = 'single' | 'list';

export default function DirectEmailSendPage() {
  const { toast } = useToast();
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sendType, setSendType] = useState<SendType>('single');
  const [selectedListId, setSelectedListId] = useState<string | undefined>(undefined);

  const handleSendEmail = () => {
    if (sendType === 'single') {
      if (!toEmail.trim() || !/^\S+@\S+\.\S+$/.test(toEmail.trim())) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid recipient email address.",
          variant: "destructive",
        });
        return;
      }
    } else if (sendType === 'list') {
      if (!selectedListId) {
        toast({
          title: "No List Selected",
          description: "Please select an email list to send to.",
          variant: "destructive",
        });
        return;
      }
    }

    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in Subject and Content fields.",
        variant: "destructive",
      });
      return;
    }

    let recipientInfo = "";
    if (sendType === 'single') {
      recipientInfo = `to ${toEmail}`;
      console.log("Sending email to:", toEmail, "Subject:", subject, "Content:", content);
    } else if (sendType === 'list') {
      const selectedList = mockEmailLists.find(list => list.id === selectedListId);
      recipientInfo = `to list: ${selectedList?.name || 'Unknown List'}`;
      console.log("Sending email to list:", selectedList?.name, "Subject:", subject, "Content:", content);
    }
    
    toast({
      title: "Email Sent (Simulation)",
      description: `Email ${recipientInfo} has been 'sent'.`,
    });

    // Reset fields
    setToEmail('');
    setSubject('');
    setContent('');
    setSelectedListId(undefined);
    // setSendType('single'); // Optionally reset send type
  };

  return (
    <MainLayout pageTitle="Direct Email Send">
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <MailPlus className="mr-3 h-6 w-6 text-primary" />
              Send a Direct Email
            </CardTitle>
            <CardDescription>
              Send one-off emails quickly. Choose to send to a single recipient or an entire list.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={sendType} onValueChange={(value) => setSendType(value as SendType)} className="space-y-3">
              <div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="sendTypeSingle" />
                  <Label htmlFor="sendTypeSingle" className="font-medium">Send to Single Recipient</Label>
                </div>
                {sendType === 'single' && (
                  <div className="pl-6 mt-2 space-y-2 animate-in fade-in-50">
                    <Label htmlFor="toEmail">To (Recipient Email Address)</Label>
                    <Input 
                      id="toEmail" 
                      type="email" 
                      placeholder="recipient@example.com" 
                      value={toEmail}
                      onChange={(e) => setToEmail(e.target.value)}
                      disabled={sendType !== 'single'}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="list" id="sendTypeList" />
                  <Label htmlFor="sendTypeList" className="font-medium">Send to Email List</Label>
                </div>
                {sendType === 'list' && (
                  <div className="pl-6 mt-2 space-y-2 animate-in fade-in-50">
                    <Label htmlFor="emailList">Select List</Label>
                    <Select 
                      value={selectedListId} 
                      onValueChange={setSelectedListId}
                      disabled={sendType !== 'list'}
                    >
                      <SelectTrigger id="emailList" className="w-full">
                        <SelectValue placeholder="Select an email list" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockEmailLists.map(list => (
                          <SelectItem key={list.id} value={list.id}>
                            {list.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                placeholder="Your email subject line" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                placeholder="Compose your email here..." 
                rows={10} 
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
             <p className="text-xs text-muted-foreground">
              Note: This is a simplified sending interface. Advanced features like templates, personalization, and tracking are available in the full campaign builder.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSendEmail} className="ml-auto">Send Email</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
