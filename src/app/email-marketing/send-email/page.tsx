
"use client";

import React, { useState, useTransition } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MailPlus, ListChecks, Sparkles, Loader2, Copy, AlertCircle } from 'lucide-react';
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
import { handleSuggestSubjectLinesAction } from './actions'; 
import type { SuggestSubjectLinesOutput } from '@/ai/flows/suggest-subject-lines-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


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

  const [isSubjectAiModalOpen, setIsSubjectAiModalOpen] = useState(false);
  const [subjectAiBrief, setSubjectAiBrief] = useState('');
  const [subjectAiSuggestions, setSubjectAiSuggestions] = useState<string[] | null>(null);
  const [isSubjectAiLoading, setIsSubjectAiLoading] = useState(false);
  const [subjectAiError, setSubjectAiError] = useState<string | null>(null);
  const [isAiTransitionPending, startAiTransition] = useTransition();


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

    startAiTransition(async () => {
      const result = await handleSuggestSubjectLinesAction({ 
        subjectBrief: subjectAiBrief,
        emailContext: content.substring(0, 300) // İlk 300 karakteri bağlam olarak gönder
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
  
  const handleCopySubjectSuggestion = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Panoya kopyalandı!",
        description: "Konu önerisi başarıyla kopyalandı.",
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
                      {isSubjectAiLoading || isAiTransitionPending ? (
                        <div className="flex items-center justify-center py-2">
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          <span className="ml-2 text-sm">Öneriler getiriliyor...</span>
                        </div>
                      ) : subjectAiSuggestions && subjectAiSuggestions.length > 0 && (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          <p className="text-xs text-muted-foreground">Öneriler:</p>
                          {subjectAiSuggestions.map((suggestion, index) => (
                            <Card key={index} className="bg-muted/50 p-2 text-xs hover:bg-muted cursor-pointer" onClick={() => handleUseSubjectSuggestion(suggestion)}>
                              <div className="flex justify-between items-center">
                                <p className="flex-1">{suggestion}</p>
                                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={(e) => { e.stopPropagation(); handleCopySubjectSuggestion(suggestion);}} title="Kopyala">
                                  <Copy className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                    <DialogFooter className="sm:justify-between">
                      <DialogClose asChild><Button variant="outline">İptal</Button></DialogClose>
                      <Button onClick={handleAiSubjectGenerate} disabled={isSubjectAiLoading || isAiTransitionPending || subjectAiBrief.length < 5}>
                        {isSubjectAiLoading || isAiTransitionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
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
              <Label htmlFor="content">İçerik</Label>
              <Textarea 
                id="content" 
                placeholder="E-postanızı buraya yazın..." 
                rows={10} 
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
             <p className="text-xs text-muted-foreground">
              Not: Bu basitleştirilmiş bir gönderim arayüzüdür. Şablonlar, kişiselleştirme ve izleme gibi gelişmiş özellikler tam kampanya oluşturucuda mevcuttur.
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
