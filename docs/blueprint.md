# English
# MarketMaestro: AI-Powered Marketing Platform - Project Blueprint

## 1. Core Vision

MarketMaestro is a modern web application designed to enable brands to centralize their digital marketing efforts, streamline content planning across social media and email, manage brand identity, and generate smart, AI-driven content suggestions aligned with the company's tone, goals, and target audience.

## 2. Core Modules & Key Features

### 2.1. Unified Dashboard (`/`)
*   **Purpose:** Serves as the main entry point to the application. Offers a high-level overview with quick links to specialized dashboards for social media and email marketing.
*   **Key Components:**
    *   **Performance Summary Cards:**
        *   **Social Media Performance:**
            *   Single-select autocomplete filter to choose one of the connected social media channels (selected from system configuration).
            *   Filter for the selected time range (Last 7/30/90 days).
            *   Displays 10 key metrics that update based on the filtered platform (Follower Growth, Avg. Engagement Rate, Posts Published, Reach, Impressions, Click-Through Rate, Story/Post Views, Profile Visits, Audience Growth Rate, Top Performing Post - with mock data).
            *   Multi-select dropdown to choose metrics to plot on the chart.
            *   A line chart (Recharts with mock data) dynamically updating based on selected metrics and platform.
            *   Link to the relevant social media dashboard.
        *   **Email Marketing Insights:**
            *   Filter for the selected time range (Last 7/30/90 days).
            *   Key metrics (Avg. Open Rate, Avg. Click Rate, Estimated Bounce Rate, New Subscribers - with mock data).
            *   A bar chart (Recharts with mock data) displaying these metrics.
            *   A list of recent campaigns (mock).
            *   Link to the relevant email marketing dashboard.
    *   **Upcoming Publications Card:**
        *   A list of scheduled publications for social media posts and email campaigns (mock data, with platform/type icon, title, time).
        *   Link to the full calendar.
    *   **Quick Actions Card:**
        *   Quick links to "Create New Social Media Post," "Create New Email Campaign," and "AI Assistant."
    *   **Channel Specific Engagement:**
        *   Individual engagement cards for "connected" social media channels selected in System Configuration and stored in `localStorage` (icon, platform name, mock engagement rate and progress bar, mock follower change).
    *   **AI Smart Suggestions (Placeholder):** Static text beneath each main widget card.

### 2.2. AI Content Assistant (`/ai-assistant`)
*   **Strategic Content Generation:** AI-powered content suggestions (e.g., email subjects, social media post ideas, blog outlines) based on a comprehensive brand profile and specific user requests.
    *   Input form for detailed strategic brand briefing (core purpose, value proposition, focused product/service, priority platforms, campaign periods, FAQs, desired user emotion, competitor inspirations, brand keywords, USPs, things to avoid).
    *   Utilizes Genkit flows (`generate-marketing-content.ts`).
*   **Hashtag Suggestions:** AI-powered hashtag recommendations based on post content.
    *   Integrated into the "Create Post" page.
    *   Utilizes Genkit flows (`suggest-hashtags-flow.ts`).

### 2.3. Social Media Management Module
*   Designed for a single brand and its internal team.
*   **Social Media Dashboard (`/social-media/dashboard`)**:
    *   Overview of connected social media accounts (mock).
    *   Key engagement metrics (likes, comments, shares, follower growth, posts published) and time range toggles (daily, weekly, monthly - with mock data).
    *   Performance trends chart (mock data with Recharts).
    *   Preview of upcoming scheduled posts (mock).
    *   Placeholders for team activity and smart alerts.
    *   Quick links to "Create Post" and "Asset Library."
*   **Create Post (`/social-media/create-post`)**:
    *   Compose text content for multiple platforms.
    *   Platform selection (Facebook, Instagram, X/Twitter, LinkedIn).
    *   Integrated AI modal for content generation based on brand profile (mocked) and user brief.
    *   Integrated AI for hashtag suggestions.
    *   AI Image Generation (prototype UI: prompt input, placeholder image display, add to post).
    *   Media upload from device (prototype, with client-side preview for images).
    *   Platform-specific preview cards (currently show the same content, with a "Adjust for platform" placeholder button).
    *   Scheduling options (date and time pickers).
    *   Placeholders for team collaboration (post status display, "Send for Approval" button, comments/feedback section).
*   **Calendar (`/calendar`)** (Replaced "Scheduled Posts" page, more comprehensive):
    *   Modern interface similar to Google Calendar.
    *   Left sidebar: "Create" button, mini calendar, mock "My Calendars," and "Platform Filters" (with social media platform icons and checkboxes, filters mock events on the calendar).
    *   Main calendar area: "Today," previous/next navigation, Day/Week/Month view toggles.
    *   Weekly view (default): Time slots and day columns. Mock social media posts shown as colored, timed blocks based on their platform. Clicking events opens a `Popover` with details. Clicking empty time slots opens a "Quick Add Post" modal (with AI content generation support).
    *   Basic structures and mock event display for Daily and Monthly views.
*   **Asset Library (`/social-media/asset-library`)**:
    *   Grid view of brand assets (images, videos, documents - mock).
    *   Mock file upload functionality (adds to local state, previews images using `URL.createObjectURL`).
    *   Filtering by asset type.
    *   Search functionality (filters local mock data).
    *   Modal preview for selected assets (larger image preview, details).
*   **Sentiment Analysis (`/social-media/sentiment-analysis`)**:
    *   Dashboard with mock data and charts (Recharts) for:
        *   Overall Sentiment Score.
        *   Sentiment Trend Over Time (Line Chart).
        *   Sentiment by Platform (Bar Chart).
        *   Key Themes & Topics (Badges).
        *   Recent Mentions (Scrollable list).
    *   Filters for date range and platform.

### 2.4. Email Marketing Module
*   **Email Marketing Dashboard (`/email-marketing/dashboard`)**:
    *   Key metrics (total contacts, campaigns sent, avg. open/click rates - with mock data).
    *   List of recent campaigns (mock).
    *   Subscriber growth chart (mock data with Recharts).
    *   Quick links to "Create New Campaign" and "Import Contacts."
*   **Campaigns (`/email-marketing/campaigns`)**:
    *   List page for email campaigns (mock data).
    *   "Create New Campaign" button.
    *   Placeholders for search and filtering.
*   **Create Campaign (`/email-marketing/campaigns/create`)**:
    *   Tabbed interface for campaign setup: Details, Sender, Content, Audience, Tracking.
    *   **Details Tab**: Campaign Name, Campaign Type (Standard, Automation, A/B Test, RSS - selection only), Subject Line (with A/B test option for Subject B), Preview Text.
    *   **Sender Tab**: Sender Name, Sender Email, Reply-To Email.
    *   **Content Tab**: Template selection (dialog with searchable mock templates, pre-fills subject/body with mock content), email content textarea (with conceptual mobile/desktop preview toggle), placeholder buttons for personalization and advanced editors.
    *   **Audience Tab**: Selection for Include/Exclude lists and segments (mock data, with type and count display). Placeholder for advanced segmentation. Search placeholder. Estimated reach display.
    *   **Tracking Tab**: Checkboxes for Open/Click tracking, Google Analytics integration (with placeholder UTM inputs).
    *   Right sidebar: Scheduling (immediate/later, date/time, timezone option, recurring placeholder), Advanced A/B Test setup placeholder, and Actions (Save Draft, Preview & Test modal, Send/Schedule).
*   **Send Email (`/email-marketing/send-email`)**:
    *   Simple page for sending direct, non-campaign emails.
    *   Fields for Recipient, Subject, Content.
*   **Templates (`/email-marketing/templates`)**:
    *   Grid display of mock email templates (various categories: Welcome, Promotion, Newsletter, Transactional, etc.).
    *   Each template card has "Preview" and "Use Template" buttons.
    *   "Use Template" button opens a dialog to enter a new campaign name or apply to an existing one (autocomplete for existing campaigns).
*   **Template Preview (`/email-marketing/templates/[templateId]/preview`)**:
    *   Dedicated page showing template metadata (name, description, category, thumbnail).
    *   **Note:** Awaiting implementation of a custom email rendering solution; currently displays basic info. (`react-email` integration was temporarily removed due to setup issues).
*   **Lists (`/email-marketing/lists`)**: Basic list page placeholder.
*   **Segments (`/email-marketing/segments`)**: Basic list page placeholder.
*   **Reports (`/email-marketing/reports`)**: Basic placeholder page.

### 2.5. Audience Management (Sidebar Group - "Audience")
*   **Contacts (`/email-marketing/contacts`)**: List page for contacts (mock data).
*   **Add New Contact (`/email-marketing/contacts/add`)**: Form page for name, email, phone, company (autocomplete), job title, notes.
*   **Companies (`/email-marketing/companies`)**: List page for companies (mock data).
*   **Add New Company (`/email-marketing/companies/add`)**: Form page for name, industry (dropdown), website, phone, address, notes.
*   **Manage Segments (`/email-marketing/segments`)**: Moved here from "Email Marketing."

### 2.6. Brand Profile (`/brand-profile`)
*   Comprehensive, tabbed interface for managing brand identity and strategy to inform AI.
*   **Tabs**:
    1.  Basic Info (Name, Company Name, Tagline, Business Category (combobox), Target Audience, Description, Mission, Vision, Core Values, Company Phone, Email, Physical Address).
    2.  Visual Identity (Logo uploads, Brand Colors, Typography, Imagery Style, Graphic Elements - UI placeholders).
    3.  Tone of Voice & Language (Brand Voice, Writing Style, Messaging Pillars, Example Phrases).
    4.  Social & Digital Presence (Website, Social Handles, Hashtags, Bio Templates, CTA Examples).
    5.  Product/Service Details (Key Products, Descriptions, Pricing, Target Markets, USP).
    6.  AI-Specific Preferences (Preferred Content Types, Custom Prompts, Personas, Prohibited Content, Jargon).
    7.  Legal & Compliance (Trademarks, Copyright, Disclosures, Data Handling - UI placeholders).
    8.  File Attachments (Brand Guidelines PDF, Marketing Kits - UI placeholders).
*   "Save Brand Profile Changes" button (simulated save with toast).

### 2.7. System Configuration (`/admin/settings`)
*   Tabbed interface for system-wide settings.
*   **Tabs**:
    *   "AI Settings": UI for selecting AI provider (Gemini/OpenRouter) and inputting API keys/model names. Saving process advises user to update `.env` and restart server. (Dynamic Genkit configuration via `.env` is set up in `src/ai/genkit.ts`).
    *   "SMTP Settings": Dynamic forms for configuring different email service providers (SMTP, Gmail, SES, API-based). Saving is simulated.
    *   "Social Media Account Connections": UI for selecting which "connected" social media accounts appear on the main dashboard (preferences saved to `localStorage`). More comprehensive UI for adding platforms via autocomplete, status indicators, "Connect/Disconnect/Manage" buttons, and an inline detail panel.
    *   "User Management": Mock user list and "Invite New User" dialog. Role editing simulated.
    *   "Notification Settings": Placeholder UI.

### 2.8. Team Management (`/admin/team-management`)
*   Dedicated page for managing team members.
*   Mock user list with avatar, name, email, role (Badge).
*   "Invite New Member" dialog (input email, select role).
*   "Edit Role" functionality for users (dialog to change role, simulated save via server action).
*   "Remove User" button (prototype).

## 3. General UI/UX Principles & Style Guidelines

*   **Primary Color**: Vibrant blue (`#29ABE2`).
*   **Background Color**: Light grey (`#F0F0F0`).
*   **Accent Color**: Warm orange (`#FF8C00`).
*   **Interface Style**: Clean, minimalist, modern, with strategic use of whitespace.
*   **Visual Hierarchy**: Clear typographic scale, consistent color usage, shadows, borders for interactivity.
*   **Responsiveness**: Adapts to various screen sizes (desktop, tablet, mobile).
*   **Dark and Light Mode Support**: Fully functional theme switcher implemented. UI elements optimized for both modes.
*   **Interactivity & Feedback**: Subtle animations/transitions, clear feedback on actions (loading states, toasts, active button states).
*   **Accessibility**: Adherence to WCAG guidelines (color contrast, keyboard navigation, semantic HTML, ARIA attributes).
*   **Modularity**: Reusable UI components (primarily via ShadCN UI).
*   **Performance**:
    *   Lightweight UI.
    *   Image optimization and lazy loading via `next/image`.
    *   Code splitting for heavier components like charts using `next/dynamic`.

This project blueprint should reflect the current state and future goals of your project comprehensively.



# Turkish
# MarketMaestro: AI Destekli Pazarlama Platformu - Proje Özeti (Blueprint)

## 1. Temel Vizyon

MarketMaestro, markaların dijital pazarlama çabalarını merkezileştirmelerine, sosyal medya ve e-posta genelinde içerik planlamasını kolaylaştırmalarına, marka kimliğini yönetmelerine ve şirketin tonuna, hedeflerine ve hedef kitlesine uygun akıllı, yapay zeka odaklı içerik önerileri üretmelerine olanak tanıyan modern bir web uygulamasıdır.

## 2. Ana Modüller ve Temel Özellikler

### 2.1. Birleşik Dashboard (`/`)
*   **Amaç:** Uygulamaya ana giriş noktası olarak hizmet eder. Sosyal medya ve e-posta pazarlaması için özel panolara hızlı bağlantılarla birlikte üst düzey bir genel bakış sunar.
*   **Temel Bileşenler:**
    *   **Performans Özeti Kartları:**
        *   **Sosyal Medya Performansı:**
            *   Bağlı sosyal medya kanallarından (sistem yapılandırmasından seçilen) birini seçmek için tekli seçimli otomatik tamamlama filtresi.
            *   Seçilen zaman aralığı için (Son 7/30/90 gün) filtre.
            *   Filtrelenmiş platforma göre güncellenen 10 temel metrik göstergesi (Takipçi Büyümesi, Ort. Etkileşim Oranı, Yayınlanan Gönderi Sayısı, Erişim, Gösterimler, Tıklama Oranı, Hikaye/Gönderi Görüntülemeleri, Profil Ziyaretleri, Kitle Büyüme Oranı, En İyi Performans Gösteren Gönderi - sahte verilerle).
            *   Grafikte çizilecek metrikleri seçmek için çoklu seçimli bir açılır menü.
            *   Seçilen metriklere ve platforma göre dinamik olarak güncellenen bir çizgi grafik (Recharts ile, sahte veriler).
            *   İlgili sosyal medya panosuna bağlantı.
        *   **E-posta Pazarlama İstatistikleri:**
            *   Seçilen zaman aralığı için (Son 7/30/90 gün) filtre.
            *   Temel metrikler (Ort. Açılma Oranı, Ort. Tıklama Oranı, Tahmini Hemen Çıkma Oranı, Yeni Aboneler - sahte verilerle).
            *   Bu metrikleri gösteren bir çubuk grafik (Recharts ile, sahte veriler).
            *   Son kampanyaların bir listesi (sahte).
            *   İlgili e-posta pazarlama panosuna bağlantı.
    *   **Yaklaşan Yayınlar Kartı:**
        *   Sosyal medya gönderileri ve e-posta kampanyaları için planlanmış yayınların bir listesi (sahte verilerle, platform/tip ikonu, başlık, zaman).
        *   Tam takvime bağlantı.
    *   **Hızlı Eylemler Kartı:**
        *   "Yeni Sosyal Medya Gönderisi Oluştur", "Yeni E-posta Kampanyası Oluştur" ve "AI Asistanı"na hızlı bağlantılar.
    *   **Kanal Özel Etkileşimi (Channel Specific Engagement):**
        *   Sistem Yapılandırması'nda seçilen ve `localStorage`'da saklanan "bağlı" sosyal medya kanalları için ayrı ayrı etkileşim kartları (ikon, platform adı, sahte etkileşim oranı ve ilerleme çubuğu, sahte takipçi değişimi).
    *   **AI Akıllı Öneriler (Yer Tutucu):** Her ana widget kartının altında statik metinle.

### 2.2. AI İçerik Asistanı (`/ai-assistant`)
*   **Stratejik İçerik Üretimi:** Kapsamlı bir marka profiline ve belirli kullanıcı isteklerine dayalı olarak AI destekli içerik önerileri (örn: e-posta konuları, sosyal medya gönderi fikirleri, blog taslakları).
    *   Detaylı stratejik marka bilgilendirmesi için giriş formu (temel amaç, değer önerisi, hedef ürün, öncelikli platformlar, kampanya dönemleri, SSS, istenen duygu, rakip ilhamı, anahtar kelimeler, USP'ler, kaçınılması gerekenler).
    *   Genkit akışlarını kullanır (`generate-marketing-content.ts`).
*   **Hashtag Önerileri:** Gönderi içeriğine göre AI destekli hashtag önerileri.
    *   "Gönderi Oluştur" sayfasına entegre.
    *   Genkit akışlarını kullanır (`suggest-hashtags-flow.ts`).

### 2.3. Sosyal Medya Yönetim Modülü
*   Tek bir marka ve dahili ekibi için tasarlanmıştır.
*   **Sosyal Medya Panosu (`/social-media/dashboard`)**:
    *   Bağlı sosyal medya hesaplarına genel bakış (sahte).
    *   Temel etkileşim metrikleri (beğeni, yorum, paylaşım, takipçi büyümesi, yayınlanan gönderi sayısı) ve zaman aralığı değiştiricileri (günlük, haftalık, aylık - sahte verilerle).
    *   Performans trendleri grafiği (Recharts ile sahte veriler).
    *   Yaklaşan zamanlanmış gönderilerin önizlemesi (sahte).
    *   Ekip etkinliği ve akıllı uyarılar için yer tutucular.
    *   "Gönderi Oluştur" ve "Varlık Kütüphanesi"ne hızlı bağlantılar.
*   **Gönderi Oluştur (`/social-media/create-post`)**:
    *   Birden fazla platform için metin içeriği oluşturma.
    *   Platform seçimi (Facebook, Instagram, X/Twitter, LinkedIn).
    *   Marka profiline (sahte) ve kullanıcı brief'ine dayalı içerik üretimi için entegre AI modalı.
    *   Hashtag önerileri için entegre AI.
    *   AI Resim Üretimi (prototip UI: istem girişi, yer tutucu resim gösterimi, gönderiye ekleme).
    *   Cihazdan medya yükleme (prototip, resimler için istemci tarafı önizleme ile).
    *   Platforma özel önizleme kartları (şimdilik aynı içeriği gösterir, "Platform için ayarla" yer tutucu butonu ile).
    *   Zamanlama seçenekleri (tarih ve saat seçiciler).
    *   Ekip işbirliği için yer tutucular (gönderi durumu göstergesi, "Onaya Gönder" butonu, yorumlar/geri bildirim bölümü).
*   **Takvim (Calendar) (`/calendar`)** (Eski "Scheduled Posts" sayfasının yerini aldı ve daha kapsamlı hale geldi):
    *   Google Takvim'e benzer modern arayüz.
    *   Sol kenar çubuğu: "Oluştur" butonu, mini takvim, sahte "Takvimlerim" ve "Platform Filtreleri" (sosyal medya platform ikonları ve checkbox'ları ile, takvimdeki sahte etkinlikleri filtreler).
    *   Ana takvim alanı: "Bugün", önceki/sonraki navigasyon, Gün/Hafta/Ay görünüm değiştiricileri.
    *   Haftalık görünüm (varsayılan): Saat dilimleri ve gün sütunları. Sahte sosyal medya gönderileri, platformlarına göre renklendirilmiş ve zamanlanmış bloklar olarak gösterilir. Etkinliklere tıklandığında detayları içeren bir `Popover` açılır. Boş zaman dilimlerine tıklandığında "Hızlı Gönderi Ekle" modalı açılır (AI içerik üretme desteği ile).
    *   Günlük ve Aylık görünümler için temel yapılar ve sahte etkinlik gösterimi.
*   **Varlık Kütüphanesi (`/social-media/asset-library`)**:
    *   Marka varlıklarının (resimler, videolar, belgeler - sahte) ızgara görünümü.
    *   Sahte dosya yükleme işlevi (yerel state'e ekler, resimler için `URL.createObjectURL` ile önizleme).
    *   Varlık türüne göre filtreleme.
    *   Arama işlevi (yerel sahte verileri filtreler).
    *   Seçilen varlıklar için modal önizleme (daha büyük resim önizlemesi, detaylar).
*   **Duygu Analizi (`/social-media/sentiment-analysis`)**:
    *   Sahte veriler ve grafiklerle (Recharts) pano:
        *   Genel Duygu Puanı.
        *   Zaman İçindeki Duygu Eğilimi (Çizgi Grafik).
        *   Platforma Göre Duygu (Çubuk Grafik).
        *   Anahtar Temalar ve Konular (Badge'ler).
        *   Son Bahsetmeler (Kaydırılabilir liste).
    *   Tarih aralığı ve platform için filtreler.

### 2.4. E-posta Pazarlama Modülü
*   **E-posta Pazarlama Panosu (`/email-marketing/dashboard`)**:
    *   Temel metrikler (toplam kişi, gönderilen kampanya, ort. açılma/tıklama oranları - sahte verilerle).
    *   Son kampanyaların listesi (sahte).
    *   Abone büyüme grafiği (Recharts ile sahte veriler).
    *   "Yeni Kampanya Oluştur" ve "Kişileri İçe Aktar" hızlı bağlantıları.
*   **Kampanyalar (`/email-marketing/campaigns`)**:
    *   E-posta kampanyalarının listelendiği sayfa (sahte verilerle).
    *   "Yeni Kampanya Oluştur" butonu.
    *   Arama ve filtreleme için yer tutucular.
*   **Kampanya Oluştur (`/email-marketing/campaigns/create`)**:
    *   Kampanya kurulumu için sekmeli arayüz: Detaylar, Gönderen, İçerik, Kitle, İzleme.
    *   **Detaylar Sekmesi**: Kampanya Adı, Kampanya Türü (Standart, Otomasyon, A/B Testi, RSS - sadece seçim), Konu Satırı (Konu B için A/B testi seçeneği ile), Önizleme Metni.
    *   **Gönderen Sekmesi**: Gönderen Adı, Gönderen E-postası, Yanıt Adresi.
    *   **İçerik Sekmesi**: Şablon seçimi (mevcut sahte şablonları arayabilen/listeleyen bir dialog ile, seçildiğinde konu/gövdeyi sahte içerikle doldurur), e-posta içerik metin alanı (kavramsal mobil/masaüstü önizleme değiştiricisi ile), kişiselleştirme ve gelişmiş editörler için yer tutucu butonlar.
    *   **Kitle Sekmesi**: Dahil edilecek/hariç tutulacak listeler ve segmentler için seçim (sahte verilerle, tür ve sayı gösterimi ile). Gelişmiş segmentasyon için yer tutucu. Arama yer tutucusu. Tahmini erişim göstergesi.
    *   **İzleme Sekmesi**: Açılma/Tıklama takibi, Google Analytics entegrasyonu (yer tutucu UTM girişleriyle) için checkbox'lar.
    *   Sağ kenar çubuğu: Zamanlama (hemen/sonra, tarih/saat, saat dilimi seçeneği, yinelenen yer tutucu), Gelişmiş A/B Testi kurulum yer tutucusu ve Eylemler (Taslak Kaydet, Önizle ve Test Et modalı, Gönder/Zamanla).
*   **E-posta Gönder (`/email-marketing/send-email`)**:
    *   Doğrudan, kampanyadan bağımsız e-postalar göndermek için basit sayfa.
    *   Alıcı, Konu, İçerik alanları.
*   **Şablonlar (`/email-marketing/templates`)**:
    *   Sahte e-posta şablonlarının (Hoş Geldin, Promosyon, Bülten, İşlemsel vb. çeşitli kategorilerde) ızgara gösterimi.
    *   Her şablon kartında "Önizle" ve "Şablonu Kullan" butonları.
    *   "Şablonu Kullan" butonu, yeni bir kampanya adı girmek veya mevcut bir kampanyaya uygulamak için (mevcut kampanyalar için otomatik tamamlama) bir dialog açar.
*   **Şablon Önizleme (`/email-marketing/templates/[templateId]/preview`)**:
    *   Şablon meta verilerini (isim, açıklama, kategori, thumbnail) gösteren özel sayfa.
    *   **Not:** Özel e-posta render sistemi bekleniyor; şu anda temel bilgileri gösteriyor. (`react-email` entegrasyonu kurulum sorunları nedeniyle geçici olarak kaldırıldı).
*   **Listeler (`/email-marketing/lists`)**: Temel liste sayfası yer tutucusu.
*   **Segmentler (`/email-marketing/segments`)**: Temel liste sayfası yer tutucusu.
*   **Raporlar (`/email-marketing/reports`)**: Temel yer tutucu sayfa.

### 2.5. Kitle Yönetimi (Yan Menü Grubu - "Audience")
*   **Kişiler (`/email-marketing/contacts`)**: Kişilerin listelendiği sayfa (sahte verilerle).
*   **Yeni Kişi Ekle (`/email-marketing/contacts/add`)**: İsim, e-posta, telefon, şirket (otomatik tamamlama), iş unvanı, notlar için form sayfası.
*   **Şirketler (`/email-marketing/companies`)**: Şirketlerin listelendiği sayfa (sahte verilerle).
*   **Yeni Şirket Ekle (`/email-marketing/companies/add`)**: İsim, sektör (açılır liste), web sitesi, telefon, adres, notlar için form sayfası.
*   **Segmentleri Yönet (`/email-marketing/segments`)**: "Email Marketing" altından buraya taşındı.

### 2.6. Marka Profili (`/brand-profile`)
*   AI'ı bilgilendirmek için marka kimliğini ve stratejisini yönetmeye yönelik kapsamlı, sekmeli arayüz.
*   **Sekmeler**:
    1.  Temel Bilgiler (İsim, Şirket Adı, Slogan, İş Kategorisi (combobox), Hedef Kitle, Açıklama, Misyon, Vizyon, Temel Değerler, Şirket Telefonu, E-postası, Fiziksel Adresi).
    2.  Görsel Kimlik (Logo yüklemeleri, Marka Renkleri, Tipografi, İmaj Stili, Grafik Öğeleri - UI yer tutucuları).
    3.  Ses Tonu ve Dil (Marka Sesi, Yazım Stili, Mesajlaşma Direkleri, Örnek İfadeler).
    4.  Sosyal ve Dijital Varlık (Web Sitesi, Sosyal Medya Hesapları, Hashtag'ler, Bio Şablonları, CTA Örnekleri).
    5.  Ürün/Hizmet Detayları (Anahtar Ürünler, Açıklamalar, Fiyatlandırma, Hedef Pazarlar, USP).
    6.  AI Özel Tercihleri (Tercih Edilen İçerik Türleri, Özel İstemler, Personalar, Yasaklı İçerik, Jargon).
    7.  Yasal ve Uyumluluk (Ticari Markalar, Telif Hakkı, Açıklamalar, Veri İşleme - UI yer tutucuları).
    8.  Dosya Ekleri (Marka Yönergeleri PDF, Pazarlama Kitleri - UI yer tutucuları).
*   "Marka Profili Değişikliklerini Kaydet" butonu (toast ile simüle edilmiş kaydetme).

### 2.7. Sistem Konfigürasyonu (`/admin/settings`)
*   Sistem genelindeki ayarlar için sekmeli arayüz.
*   **Sekmeler**:
    *   "AI Ayarları": AI sağlayıcısını (Gemini/OpenRouter) seçme ve API anahtarlarını/model adlarını girme UI'ı. Kaydetme işlemi, kullanıcıyı `.env` dosyasını güncellemesi ve sunucuyu yeniden başlatması konusunda uyarır. (Genkit'in `.env` üzerinden dinamik yapılandırması `src/ai/genkit.ts` içinde ayarlandı).
    *   "SMTP Ayarları": Farklı e-posta servis sağlayıcılarını (SMTP, Gmail, SES, API tabanlı) yapılandırmak için dinamik formlar. Kaydetme simüle edilir.
    *   "Sosyal Medya Hesap Bağlantıları": Hangi "bağlı" sosyal medya hesaplarının ana panoda gösterileceğini seçmek için checkbox listesi (tercihler `localStorage`'a kaydedilir). Gerçek hesap bağlama/yönetme için daha kapsamlı bir UI (autocomplete ile platform ekleme, durum göstergeleri, "Bağlan/Bağlantıyı Kes/Yönet" butonları ve satır içi detay paneli ile).
    *   "Kullanıcı Yönetimi": Sahte kullanıcı listesi ve "Yeni Kullanıcı Davet Et" dialogu. Rol düzenleme simülasyonu.
    *   "Bildirim Ayarları": Yer tutucu UI.

### 2.8. Takım Yönetimi (`/admin/team-management`)
*   Ekip üyelerini yönetmek için özel sayfa.
*   Avatar, isim, e-posta, rol (Badge) içeren sahte kullanıcı listesi.
*   "Yeni Üye Davet Et" dialogu (e-posta gir, rol seç).
*   Kullanıcılar için "Rolü Düzenle" işlevi (rol değiştirmek için dialog, sunucu eylemiyle simüle edilmiş kaydetme).
*   "Kullanıcıyı Kaldır" butonu (prototip).

## 3. Genel UI/UX Prensipleri ve Stil Yönergeleri

*   **Birincil Renk**: Canlı mavi (`#29ABE2`).
*   **Arka Plan Rengi**: Açık gri (`#F0F0F0`).
*   **Vurgu Rengi**: Sıcak turuncu (`#FF8C00`).
*   **Arayüz Stili**: Temiz, minimalist, modern, beyaz alanların stratejik kullanımıyla.
*   **Görsel Hiyerarşi**: Net tipografik ölçek, tutarlı renk kullanımı, etkileşim için gölgeler, kenarlıklar.
*   **Duyarlılık**: Çeşitli ekran boyutlarına uyum (masaüstü, tablet, mobil).
*   **Karanlık ve Aydınlık Mod Desteği**: Tam işlevsel tema değiştirici uygulandı. UI öğeleri her iki mod için de optimize edildi.
*   **Etkileşim ve Geri Bildirim**: İnce animasyonlar/geçişler, eylemler üzerine net geri bildirim (yükleme durumları, toast'lar, aktif buton durumları).
*   **Erişilebilirlik**: WCAG yönergelerine uyum (renk kontrastı, klavye navigasyonu, semantik HTML, ARIA).
*   **Modülerlik**: Yeniden kullanılabilir UI bileşenleri (öncelikle ShadCN UI aracılığıyla).
*   **Performans**:
    *   Hafif UI.
    *   `next/image` ile resim optimizasyonu ve lazy loading.
    *   `next/dynamic` ile grafikler gibi daha ağır bileşenler için kod bölme.

Bu proje özeti, projenizin mevcut durumunu ve gelecekteki hedeflerini kapsamlı bir şekilde yansıtmalıdır.