
"use client";

import React, { useState, useTransition } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MailPlus, ListChecks, Sparkles, Loader2, Copy, AlertCircle, FileText } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { handleSuggestSubjectLinesAction, handleGenerateEmailBodyAction } from './actions'; 
import type { SuggestSubjectLinesOutput } from '@/ai/flows/suggest-subject-lines-flow';
import type { GenerateMarketingContentOutput } from '@/ai/flows/generate-marketing-content';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { mockTemplates as allMockTemplates, type EmailTemplate } from '@/lib/email-template-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';


const mockEmailLists = [
  { id: 'list1', name: 'Newsletter Subscribers (850)' },
  { id: 'list2', name: 'Potential Leads - Webinar (120)' },
  { id: 'list3', name: 'VIP Clients (75)' },
  { id: 'list4', name: 'Event Attendees - Q3 (210)' },
];

// Mock brand data, in a real app, this might come from a global store or context
const mockBrand = {
  name: "ArchStruct Design Suite",
  product: "ArchModeler Pro",
  targetAudience: "architects and structural engineers",
  corePurpose: "to empower design and engineering professionals with intuitive, powerful, and integrated software tools",
  supportEmail: "support@archstructsolutions.com",
  websiteUrl: "https://www.archstructsuite.com",
};

type SendType = 'single' | 'list';

interface MockEmailTextContent {
  subject: string;
  preheader?: string;
  greeting?: string;
  body: string;
  ctaText?: string;
}

// Simplified mock content generator (same as in create campaign)
function generateMockEmailContentFromTemplate(templateCategory: string, brand: typeof mockBrand): MockEmailTextContent {
  const { name: brandName, product, targetAudience, corePurpose } = brand;
  let subject = `An Update from ${brandName}`;
  let preheader = `News for ${targetAudience}.`;
  let greeting = `Hi [User Name],`;
  let body = `This is a general update regarding ${product}.\n\nWe aim ${corePurpose}.`;
  let ctaText = 'Learn More';

  switch (templateCategory.toLowerCase()) {
    case 'welcome':
      subject = `Welcome to ${brandName}!`;
      preheader = `Get started with ${product}.`;
      body = `We're thrilled to have you! Explore how ${product} helps ${targetAudience}.`;
      ctaText = 'Get Started';
      break;
    case 'promotion':
      subject = `Special Offer on ${product}!`;
      preheader = `Exclusive discounts for ${targetAudience}.`;
      body = `Don't miss our limited-time offer on ${product}. Enhance your workflow today!`;
      ctaText = 'Claim Discount';
      break;
    case 'newsletter':
      subject = `${brandName} Monthly Insights`;
      preheader = `Latest news and tips.`;
      body = `Here's your monthly update from ${brandName}, covering new features in ${product} and industry news for ${targetAudience}.`;
      ctaText = 'Read Newsletter';
      break;
    default:
      subject = `A Message from ${brandName} about ${product}`;
      preheader = `Updates and information.`;
      body = `Stay informed with the latest from ${brandName}. We are dedicated ${corePurpose}.`;
      ctaText = 'Discover More';
      break;
  }
  return { subject, preheader, greeting, body, ctaText };
}


export default function DirectEmailSendPage() {
  const { toast } = useToast();
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sendType, setSendType] = useState<SendType>('single');
  const [selectedListId, setSelectedListId] = useState<string | undefined>(undefined);

  const [isSubjectAiModalOpen, setIsSubjectAiModalOpen] = useState(false);
  const [subjectAiBrief, setSubjectAiBrief] = useState('');
  const [subjectAiSuggestions, setSubjectAiSuggestions] = useState<string[] | null>(null);
  const [isSubjectAiLoading, setIsSubjectAiLoading] = useState(false);
  const [subjectAiError, setSubjectAiError] = useState<string | null>(null);
  const [isSubjectAiTransitionPending, startSubjectAiTransition] = useTransition();

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [templateSearchTerm, setTemplateSearchTerm] = useState('');

  const [isEmailBodyAiModalOpen, setIsEmailBodyAiModalOpen] = useState(false);
  const [emailBodyAiBrief, setEmailBodyAiBrief] = useState('');
  const [emailBodyAiSuggestions, setEmailBodyAiSuggestions] = useState<string[] | null>(null);
  const [isEmailBodyAiLoading, setIsEmailBodyAiLoading] = useState(false);
  const [emailBodyAiError, setEmailBodyAiError] = useState<string | null>(null);
  const [isEmailBodyAiTransitionPending, startEmailBodyAiTransition] = useTransition();


  const handleSendEmail = () => {
    if (sendType === 'single') {
      if (!toEmail.trim() || !/^\S+@\S+\.\S+$/.test(toEmail.trim())) {
        toast({
          title: "Geçersiz E-posta",
          description: "Lütfen geçerli bir alıcı e-posta adresi girin.",
          variant: "destructive",
        });
        return;
      }
    } else if (sendType === 'list') {
      if (!selectedListId) {
        toast({
          title: "Liste Seçilmedi",
          description: "Lütfen gönderilecek bir e-posta listesi seçin.",
          variant: "destructive",
        });
        return;
      }
    }

    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen Konu ve İçerik alanlarını doldurun.",
        variant: "destructive",
      });
      return;
    }

    let recipientInfo = "";
    if (sendType === 'single') {
      recipientInfo = `${toEmail} adresine`;
      console.log("E-posta gönderiliyor:", toEmail, "Konu:", subject, "İçerik:", content);
    } else if (sendType === 'list') {
      const selectedList = mockEmailLists.find(list => list.id === selectedListId);
      recipientInfo = `${selectedList?.name || 'Bilinmeyen Liste'} listesine`;
      console.log("Listeye e-posta gönderiliyor:", selectedList?.name, "Konu:", subject, "İçerik:", content);
    }
    
    toast({
      title: "E-posta Gönderildi (Simülasyon)",
      description: `E-posta ${recipientInfo} 'gönderildi'.`,
    });

    setToEmail('');
    setSubject('');
    setContent('');
    setSelectedListId(undefined);
  };

  const handleAiSubjectGenerate = () => {
    if (subjectAiBrief.length < 5) {
      setSubjectAiError("Konu özeti en az 5 karakter olmalıdır.");
      return;
    }
    setIsSubjectAiLoading(true);
    setSubjectAiError(null);
    setSubjectAiSuggestions(null);

    startSubjectAiTransition(async () => {
      const result = await handleSuggestSubjectLinesAction({ 
        subjectBrief: subjectAiBrief,
        emailContext: content.substring(0, 300) 
      });
      if (result.success && result.data) {
        setSubjectAiSuggestions(result.data.subjectSuggestions);
      } else {
        if (typeof result.error === 'string') {
          setSubjectAiError(result.error);
        } else if (result.error && 'flatten' in result.error) { 
          const fieldErrors = Object.entries((result.error as any).flatten().fieldErrors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('; ');
          setSubjectAiError(`Doğrulama başarısız. ${fieldErrors || 'Lütfen girdinizi kontrol edin.'}`);
        } else {
          setSubjectAiError("Konu önerileri oluşturulurken bilinmeyen bir hata oluştu.");
        }
      }
      setIsSubjectAiLoading(false);
    });
  };

  const handleUseSubjectSuggestion = (suggestion: string) => {
    setSubject(suggestion);
    setIsSubjectAiModalOpen(false);
    setSubjectAiBrief(""); 
    setSubjectAiSuggestions(null);
    toast({
      title: "Öneri Uygulandı",
      description: "AI önerisi konu satırınıza eklendi.",
    });
  };
  
  const handleCopySuggestion = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Panoya kopyalandı!",
        description: "Öneri başarıyla kopyalandı.",
        duration: 3000,
      });
    }).catch(err => {
      toast({
        title: "Kopyalama başarısız",
        description: "Metin panoya kopyalanamadı.",
        variant: "destructive",
        duration: 3000,
      });
    });
  };

  const handleTemplateSelect = (template: EmailTemplate) => {
    const mockEmail = generateMockEmailContentFromTemplate(template.category, mockBrand);
    if (!subject) setSubject(mockEmail.subject); // Only set subject if it's empty
    setContent(`${mockEmail.greeting ? mockEmail.greeting + '\\n\\n' : ''}${mockEmail.body}\n\n${mockEmail.ctaText ? `CTA: ${mockEmail.ctaText}` : ''}`);
    setIsTemplateModalOpen(false);
    setTemplateSearchTerm('');
    toast({ title: `Şablon Uygulandı: ${template.name}` });
  };

  const filteredTemplates = allMockTemplates.filter(template =>
    template.name.toLowerCase().includes(templateSearchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(templateSearchTerm.toLowerCase())
  );

  const handleAiEmailBodyGenerate = () => {
    if (emailBodyAiBrief.length < 10) {
      setEmailBodyAiError("E-posta özeti en az 10 karakter olmalıdır.");
      return;
    }
    setIsEmailBodyAiLoading(true);
    setEmailBodyAiError(null);
    setEmailBodyAiSuggestions(null);

    startEmailBodyAiTransition(async () => {
      const result = await handleGenerateEmailBodyAction({ 
        emailBodyBrief: emailBodyAiBrief,
        // Pass minimal brand context. In a real app, this would come from a store.
        brandCorePurpose: mockBrand.corePurpose,
        customerValueProposition: `Our product, ${mockBrand.product}, helps ${mockBrand.targetAudience}.`
      });

      if (result.success && result.data) {
        setEmailBodyAiSuggestions(result.data.contentSuggestions);
      } else {
        if (typeof result.error === 'string') {
          setEmailBodyAiError(result.error);
        } else if (result.error && 'flatten' in result.error) { 
          const fieldErrors = Object.entries((result.error as any).flatten().fieldErrors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('; ');
          setEmailBodyAiError(`Doğrulama başarısız. ${fieldErrors || 'Lütfen girdinizi kontrol edin.'}`);
        } else {
          setEmailBodyAiError("E-posta içeriği önerileri oluşturulurken bilinmeyen bir hata oluştu.");
        }
      }
      setIsEmailBodyAiLoading(false);
    });
  };

  const handleUseEmailBodySuggestion = (suggestion: string) => {
    setContent(suggestion);
    setIsEmailBodyAiModalOpen(false);
    setEmailBodyAiBrief("");
    setEmailBodyAiSuggestions(null);
    toast({
      title: "Öneri Uygulandı",
      description: "AI önerisi e-posta içeriğinize eklendi.",
    });
  };


  return (
    <MainLayout pageTitle="Direkt E-posta Gönderimi">
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <MailPlus className="mr-3 h-6 w-6 text-primary" />
              Direkt E-posta Gönder
            </CardTitle>
            <CardDescription>
              Hızlıca tek seferlik e-postalar gönderin. Tek bir alıcıya veya tüm bir listeye göndermeyi seçin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={sendType} onValueChange={(value) => setSendType(value as SendType)} className="space-y-3">
              <div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="sendTypeSingle" />
                  <Label htmlFor="sendTypeSingle" className="font-medium">Tek Alıcıya Gönder</Label>
                </div>
                {sendType === 'single' && (
                  <div className="pl-6 mt-2 space-y-2 animate-in fade-in-50">
                    <Label htmlFor="toEmail">Kime (Alıcı E-posta Adresi)</Label>
                    <Input 
                      id="toEmail" 
                      type="email" 
                      placeholder="alici@example.com" 
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
                  <Label htmlFor="sendTypeList" className="font-medium">E-posta Listesine Gönder</Label>
                </div>
                {sendType === 'list' && (
                  <div className="pl-6 mt-2 space-y-2 animate-in fade-in-50">
                    <Label htmlFor="emailList">Liste Seç</Label>
                    <Select 
                      value={selectedListId} 
                      onValueChange={setSelectedListId}
                      disabled={sendType !== 'list'}
                    >
                      <SelectTrigger id="emailList" className="w-full">
                        <SelectValue placeholder="Bir e-posta listesi seçin" />
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
              <div className="flex justify-between items-center">
                <Label htmlFor="subject">Konu</Label>
                <Dialog open={isSubjectAiModalOpen} onOpenChange={setIsSubjectAiModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" /> AI ile Geliştir
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 text-primary" /> AI Konu Satırı Asistanı
                      </DialogTitle>
                      <DialogDescription>
                        Konu satırınız için ana fikrinizi veya birkaç anahtar kelime yazın. AI, e-posta içeriğinizden de (varsa) faydalanacaktır.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3">
                      <Label htmlFor="subjectAiBrief">Konu Özeti / Anahtar Kelimeler</Label>
                      <Textarea
                        id="subjectAiBrief"
                        placeholder="Örn: 'Yeni özellik duyurusu', 'Haftalık indirimler', 'Etkinlik daveti'..."
                        value={subjectAiBrief}
                        onChange={(e) => setSubjectAiBrief(e.target.value)}
                        rows={2}
                      />
                      {subjectAiError && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Hata</AlertTitle>
                          <AlertDescription>{subjectAiError}</AlertDescription>
                        </Alert>
                      )}
                      {isSubjectAiLoading || isSubjectAiTransitionPending ? (
                        <div className="flex items-center justify-center py-2">
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          <span className="ml-2 text-sm">Öneriler getiriliyor...</span>
                        </div>
                      ) : subjectAiSuggestions && subjectAiSuggestions.length > 0 && (
                        <ScrollArea className="max-h-48 pr-1">
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Öneriler:</p>
                          {subjectAiSuggestions.map((suggestion, index) => (
                            <Card key={index} className="bg-muted/50 p-2 text-xs hover:bg-muted cursor-pointer" onClick={() => handleUseSubjectSuggestion(suggestion)}>
                              <div className="flex justify-between items-center">
                                <p className="flex-1">{suggestion}</p>
                                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={(e) => { e.stopPropagation(); handleCopySuggestion(suggestion);}} title="Kopyala">
                                  <Copy className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                        </ScrollArea>
                      )}
                    </div>
                    <DialogFooter className="sm:justify-between">
                      <DialogClose asChild><Button variant="outline">İptal</Button></DialogClose>
                      <Button onClick={handleAiSubjectGenerate} disabled={isSubjectAiLoading || isSubjectAiTransitionPending || subjectAiBrief.length < 5}>
                        {isSubjectAiLoading || isSubjectAiTransitionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Öneri Getir
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Input 
                id="subject" 
                placeholder="E-posta konu satırınız" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
               <div className="flex justify-between items-center">
                <Label htmlFor="content">İçerik</Label>
                <div className="flex gap-2">
                    <Dialog open={isEmailBodyAiModalOpen} onOpenChange={setIsEmailBodyAiModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                                <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" /> AI ile Geliştir
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle className="flex items-center"><Sparkles className="mr-2 h-5 w-5 text-primary"/> AI E-posta İçeriği Asistanı</DialogTitle>
                                <DialogDescription>E-postanız için ana fikri, amacı veya birkaç anahtar noktayı yazın. AI, ilgi çekici bir içerik önerecektir.</DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-3">
                                <Label htmlFor="emailBodyAiBrief">E-posta Özeti / Ana Fikir</Label>
                                <Textarea id="emailBodyAiBrief" placeholder="Örn: 'Yeni ürün lansmanımız hakkında bir duyuru, X özelliğinin faydalarını vurgula, hedef kitlemiz mühendisler...'" value={emailBodyAiBrief} onChange={(e) => setEmailBodyAiBrief(e.target.value)} rows={3} />
                                {emailBodyAiError && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Hata</AlertTitle><AlertDescription>{emailBodyAiError}</AlertDescription></Alert>}
                                {(isEmailBodyAiLoading || isEmailBodyAiTransitionPending) && <div className="flex items-center justify-center py-2"><Loader2 className="h-5 w-5 animate-spin text-primary" /><span className="ml-2 text-sm">Öneriler getiriliyor...</span></div>}
                                {emailBodyAiSuggestions && emailBodyAiSuggestions.length > 0 && (
                                    <ScrollArea className="max-h-60 pr-1"><div className="space-y-2">
                                        <p className="text-xs text-muted-foreground">Öneriler:</p>
                                        {emailBodyAiSuggestions.map((sugg, i) => (
                                            <Card key={i} className="bg-muted/50 p-3 text-xs hover:bg-muted cursor-pointer" onClick={() => handleUseEmailBodySuggestion(sugg)}>
                                                <div className="flex justify-between items-start"><p className="flex-1 whitespace-pre-wrap">{sugg}</p>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 ml-2" onClick={(e) => { e.stopPropagation(); handleCopySuggestion(sugg);}} title="Kopyala"><Copy className="h-3.5 w-3.5" /></Button></div>
                                            </Card>))}
                                    </div></ScrollArea>)}
                            </div>
                            <DialogFooter className="sm:justify-between">
                                <DialogClose asChild><Button variant="outline">İptal</Button></DialogClose>
                                <Button onClick={handleAiEmailBodyGenerate} disabled={isEmailBodyAiLoading || isEmailBodyAiTransitionPending || emailBodyAiBrief.length < 10}>
                                    {isEmailBodyAiLoading || isEmailBodyAiTransitionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />} İçerik Önerisi Al
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                                <FileText className="mr-1.5 h-3.5 w-3.5" /> Şablon Kullan
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>E-posta Şablonu Seç</DialogTitle>
                                <DialogDescription>E-postanız için bir başlangıç şablonu seçin. İçerik alanınız bu şablonun metin yapısıyla doldurulacaktır.</DialogDescription>
                            </DialogHeader>
                            <Command className="rounded-lg border shadow-md mt-4">
                                <CommandInput placeholder="Şablon ara (isim, kategori...)" value={templateSearchTerm} onValueChange={setTemplateSearchTerm} />
                                <ScrollArea className="h-[40vh]"><CommandList className="max-h-[450px]">
                                <CommandEmpty>Şablon bulunamadı.</CommandEmpty>
                                <CommandGroup heading="Mevcut Şablonlar">
                                    {filteredTemplates.map((template) => (
                                    <CommandItem key={template.id} value={`${template.name} ${template.category}`} onSelect={() => handleTemplateSelect(template)} className="flex justify-between items-center cursor-pointer">
                                        <div><p className="font-medium">{template.name}</p><p className="text-xs text-muted-foreground">{template.category}</p></div>
                                    </CommandItem>))}
                                </CommandGroup>
                                </CommandList></ScrollArea>
                            </Command>
                            <DialogFooter className="mt-4"><DialogClose asChild><Button variant="outline">İptal</Button></DialogClose></DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
              </div>
              <Textarea 
                id="content" 
                placeholder="E-postanızı buraya yazın..." 
                rows={10} 
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
             <p className="text-xs text-muted-foreground">
              Not: Bu basitleştirilmiş bir gönderim arayüzüdür. Kişiselleştirme ve izleme gibi gelişmiş özellikler tam kampanya oluşturucuda mevcuttur.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSendEmail} className="ml-auto">E-postayı Gönder</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}

