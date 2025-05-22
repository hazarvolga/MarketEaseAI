
"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MailPlus } from 'lucide-react';

export default function DirectEmailSendPage() {
  const { toast } = useToast();
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSendEmail = () => {
    if (!toEmail.trim() || !subject.trim() || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in To, Subject, and Content fields.",
        variant: "destructive",
      });
      return;
    }
    // Simulate sending email
    console.log("Sending email to:", toEmail, "Subject:", subject, "Content:", content);
    toast({
      title: "Email Sent (Simulation)",
      description: `Email to ${toEmail} has been 'sent'.`,
    });
    setToEmail('');
    setSubject('');
    setContent('');
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
              Send one-off emails quickly without creating a full campaign. Ideal for targeted communications or quick announcements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="toEmail">To (Recipient Email Address)</Label>
              <Input 
                id="toEmail" 
                type="email" 
                placeholder="recipient@example.com" 
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />
            </div>
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
