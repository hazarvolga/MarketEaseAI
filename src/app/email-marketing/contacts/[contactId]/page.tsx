
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, User, Mail, Building, Briefcase, CalendarDays, ListChecks, Edit, AlertTriangle, Loader2, FileText } from 'lucide-react';
import { contactsMock, type Contact } from '@/lib/contact-data'; // Import from new location
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ContactDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const contactId = params.contactId as string;

  const [contact, setContact] = useState<Contact | null | undefined>(undefined); // undefined for loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (contactId) {
      const foundContact = contactsMock.find(c => c.id === contactId);
      setContact(foundContact || null);
    } else {
      setContact(null);
    }
    setIsLoading(false);
  }, [contactId]);

  if (isLoading || contact === undefined) {
    return (
      <MainLayout pageTitle="Kişi Detayları Yükleniyor...">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Kişi bilgileri getiriliyor...</p>
        </div>
      </MainLayout>
    );
  }

  if (contact === null) {
    return (
      <MainLayout pageTitle="Kişi Bulunamadı">
        <Card className="max-w-lg mx-auto mt-10">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
                <AlertTriangle className="mr-2 h-6 w-6"/> Kişi Bulunamadı
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contactId === 'contact' ? (
                <p>Bu genel bir kişi görüntüleme yoludur. Belirli bir kişi seçilmedi. Segmentteki bir kişi için bu linke geldiyseniz, segmentteki kişilerin henüz ana kişi listesiyle tam olarak eşleştirilmediği anlamına gelebilir.</p>
            ) : (
                <p>"{contactId}" ID'li kişi bulunamadı. Lütfen ID'yi kontrol edin veya kişi listesine geri dönün.</p>
            )}
            <Button asChild variant="outline" className="mt-4">
              <Link href="/email-marketing/contacts">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kişilere Geri Dön
              </Link>
            </Button>
          </CardContent>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle={`Kişi Detayları: ${contact.name}`}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/email-marketing/contacts">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Kişilere Geri Dön</span>
                </Link>
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight flex items-center">
                <User className="mr-3 h-7 w-7 text-primary" /> {contact.name}
            </h1>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Kişi Bilgileri</CardTitle>
                <Button variant="outline" size="sm" onClick={() => alert("Düzenleme özelliği bu prototipte aktif değil.")}>
                    <Edit className="mr-2 h-4 w-4" /> Düzenle (Prototip)
                </Button>
            </div>
            <CardDescription>Kişinin kayıtlı detayları ve üyelikleri.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <Label className="text-xs text-muted-foreground flex items-center"><User className="mr-1.5 h-3.5 w-3.5"/>Tam Adı</Label>
                <p className="font-medium">{contact.name}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground flex items-center"><Mail className="mr-1.5 h-3.5 w-3.5"/>E-posta Adresi</Label>
                <p className="font-medium">{contact.email}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground flex items-center"><Building className="mr-1.5 h-3.5 w-3.5"/>Şirket</Label>
                <p className="font-medium">{contact.company || <span className="text-muted-foreground italic">Belirtilmemiş</span>}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground flex items-center"><Briefcase className="mr-1.5 h-3.5 w-3.5"/>Pozisyon</Label>
                <p className="font-medium">{contact.jobTitle || <span className="text-muted-foreground italic">Belirtilmemiş</span>}</p>
              </div>
               <div>
                <Label className="text-xs text-muted-foreground flex items-center"><CalendarDays className="mr-1.5 h-3.5 w-3.5"/>Eklenme Tarihi</Label>
                <p className="font-medium">{contact.dateAdded}</p>
              </div>
            </div>
            
            <Separator />

            <div>
                <Label className="text-base font-medium text-muted-foreground flex items-center mb-2"><ListChecks className="mr-2 h-4 w-4"/>Üye Olduğu Listeler</Label>
                {contact.lists && contact.lists.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                    {contact.lists.map(list => (
                        <Badge key={list} variant="secondary">{list}</Badge>
                    ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground italic">Bu kişi henüz bir listeye eklenmemiş.</p>
                )}
            </div>

            {contact.notes && (
                <>
                    <Separator />
                    <div>
                        <Label className="text-base font-medium text-muted-foreground flex items-center mb-2"><FileText className="mr-2 h-4 w-4"/>Notlar</Label>
                        <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{contact.notes}</p>
                    </div>
                </>
            )}

          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.back()}>Geri</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
