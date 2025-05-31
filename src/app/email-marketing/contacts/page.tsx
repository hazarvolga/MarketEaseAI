
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, UploadCloud, ListFilter, Search, Users, MailCheck } from 'lucide-react'; 
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast"; 
import React from 'react'; 
import { contactsMock } from '@/lib/contact-data'; // Import from new location

export default function ContactsPage() {
  const { toast } = useToast();
  const [isTestingSpam, setIsTestingSpam] = React.useState<Record<string, boolean>>({});

  const handleSpamTest = async (contactId: string, contactEmail: string, contactName: string) => {
    setIsTestingSpam(prev => ({ ...prev, [contactId]: true }));
    const { id: toastId } = toast({
      title: "Spam Testi Devam Ediyor",
      description: `${contactName} (${contactEmail}) için spam kontrolü yapılıyor...`,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    const randomResult = Math.random();
    let resultTitle = "";
    let resultDescription = "";
    let variant: "default" | "destructive" = "default";

    if (randomResult < 0.7) { // 70% chance of passing
      resultTitle = "Spam Testi Başarılı";
      resultDescription = `${contactName} (${contactEmail}) için e-posta Düşük Riskli olarak değerlendirildi.`;
      variant = "default"; 
    } else if (randomResult < 0.9) { // 20% chance of medium risk
      const issues = Math.floor(Math.random() * 3) + 1;
      resultTitle = "Spam Testi: Kontrol Önerilir";
      resultDescription = `${contactName} (${contactEmail}) için e-posta Orta Riskli, ${issues} potansiyel sorun bulundu. (Sahte Veri)`;
      variant = "default";
    } else { // 10% chance of high risk
      const issues = Math.floor(Math.random() * 2) + 4;
      resultTitle = "Spam Testi Başarısız";
      resultDescription = `${contactName} (${contactEmail}) için e-posta Yüksek Riskli, ${issues} potansiyel sorun bulundu. (Sahte Veri)`;
      variant = "destructive";
    }

    toast({
      id: toastId,
      title: resultTitle,
      description: resultDescription,
      variant: variant,
      duration: 7000,
    });
    setIsTestingSpam(prev => ({ ...prev, [contactId]: false }));
  };

  return (
    <MainLayout pageTitle="Contacts">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Kişi Yönetimi</h1>
            <p className="text-sm text-muted-foreground">
              E-posta listenizdeki kişileri görüntüleyin, yönetin ve segmentlere ayırın.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" asChild>
                <Link href="/email-marketing/contacts/import">
                    <UploadCloud className="mr-2 h-4 w-4" /> Kişileri İçe Aktar
                </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/email-marketing/contacts/add">
                    <PlusCircle className="mr-2 h-5 w-5" /> Yeni Kişi Ekle
                </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tüm Kişiler ({contactsMock.length})</CardTitle>
             <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Kişi ara (isim, e-posta, şirket...)" className="pl-8 w-full" />
              </div>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" /> Filtrele/Segmentle
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {contactsMock.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th scope="col" className="px-1 py-3 text-left">
                        <Checkbox aria-label="Select all" />
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">İsim</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">E-posta</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Şirket</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Listeler</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Eklenme Tarihi</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[200px]">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {contactsMock.map((contact) => (
                      <tr key={contact.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-1 py-3 whitespace-nowrap">
                           <Checkbox aria-label={`Select contact: ${contact.name}`} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{contact.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{contact.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{contact.company || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                          {contact.lists.map(list => (
                            <span key={list} className="mr-1 mb-1 inline-block px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">{list}</span>
                          ))}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{contact.dateAdded}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                            <Link href={`/email-marketing/contacts/${contact.id}`}>Düzenle</Link>
                          </Button>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 h-auto ml-2 text-blue-600 hover:text-blue-500" 
                            onClick={() => handleSpamTest(contact.id, contact.email, contact.name)}
                            disabled={isTestingSpam[contact.id]}
                          >
                            <MailCheck className="h-3.5 w-3.5 mr-1" /> 
                            {isTestingSpam[contact.id] ? "Test Ediliyor..." : "Spam Testi"}
                          </Button>
                           <Button variant="link" size="sm" className="p-0 h-auto ml-2 text-destructive hover:text-destructive/80" onClick={() => alert('Silme işlemi bu prototipte uygulanmamıştır.')}>
                            Sil
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">Kişi bulunamadı</h3>
                <p className="mt-1 text-sm text-muted-foreground">Başlamak için yeni bir kişi ekleyin veya mevcut kişileri içe aktarın.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
