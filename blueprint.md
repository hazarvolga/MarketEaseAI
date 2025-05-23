
# MarketMaestro: AI-Powered Marketing Platform - Project Blueprint

## 1. Core Vision

MarketMaestro is a modern web application designed to enable brands to centralize their digital marketing efforts, streamline content planning across social media and email, manage brand identity, and generate smart, AI-driven content suggestions aligned with the company's tone, goals, and target audience.

## 2. Core Modules & Key Features

### 2.1. Unified Dashboard (`/`)
*   **Purpose:** Serves as the main entry point to the application. Offers a high-level overview with quick links to specialized dashboards for social media and email marketing.
*   **Key Components:**
    *   **Performance Summary Cards:**
        *   **Social Media Performance:**
            *   Single-select autocomplete filter to choose one of the connected social media channels (mock data reflects selection).
            *   Filter for the selected time range (Last 7/30/90 days - updates mock data).
            *   Displays 10 key metrics that update based on the filtered platform and time range (Follower Growth, Avg. Engagement Rate, Posts Published, Reach, Impressions, Click-Through Rate, Story/Post Views, Profile Visits, Audience Growth Rate, Top Performing Post - with mock data). Card title dynamically shows selected platform icon and name.
            *   Multi-select dropdown to choose metrics to plot on the chart.
            *   A line chart (Recharts with mock data) dynamically updating based on selected metrics, platform, and time range.
            *   Link to the full Social Media Dashboard.
        *   **Email Marketing Insights:**
            *   Filter for the selected time range (Last 7/30/90 days - updates mock data).
            *   Key metrics (Avg. Open Rate, Avg. Click Rate, Estimated Bounce Rate, New Subscribers - with mock data).
            *   A bar chart (Recharts with mock data) displaying these metrics.
            *   A list of recent campaigns (mock).
            *   Link to the full Email Marketing Dashboard.
    *   **Upcoming Publications Card:**
        *   A list of scheduled publications for social media posts and email campaigns (mock data, with platform/type icon, title, time, edit button).
        *   Link to the full calendar.
    *   **Quick Actions Card:**
        *   Quick links to "Create New Social Media Post," "Create New Email Campaign," and "AI Assistant."
    *   **Channel Specific Engagement:**
        *   Dynamically displays engagement cards for social media channels selected as "connected" in System Configuration (via `localStorage`). Each card shows icon, platform name, mock engagement rate (with progress bar), and mock follower change.
    *   **AI Smart Suggestions (Placeholder):** Static text beneath each main widget card.

### 2.2. AI Content Assistant (`/ai-assistant`)
*   **Content Generation Focus:** Allows users to make specific content requests (e.g., "5 Instagram post ideas about sustainability").
*   **Brand Profile Integration (Conceptual):** A note indicates that the AI will use detailed strategic information from the Brand Profile page for more tailored suggestions.
*   **Input Form**: Simplified to accept only the "Content Request".
*   Utilizes Genkit flow (`generate-marketing-content.ts`) which is designed to accept full brand briefing but now receives most of that as optional/undefined from this page.
*   Displays generated suggestions in a list.

### 2.3. Social Media Management Module
*   Designed for a single brand and its internal team.
*   **Social Media Dashboard (`/social-media/dashboard`)**:
    *   Overview of key engagement metrics (likes, comments, shares, follower growth, posts published - mock data) with time range toggles (daily, weekly, monthly).
    *   Performance trends chart (Recharts with mock data).
    *   Preview of upcoming scheduled posts (mock).
    *   Placeholders for team activity and smart alerts.
    *   Quick links to "Create Post," "Asset Library," and "System Configuration" (for managing accounts).
*   **Create Post (`/social-media/create-post`)**:
    *   Compose text content for multiple platforms.
    *   Platform selection (Facebook, Instagram, X/Twitter, LinkedIn).
    *   Integrated AI modal for content generation (receives user brief and mock brand profile data).
    *   Integrated AI for hashtag suggestions (based on post content).
    *   AI Image Generation (prototype UI: prompt input, placeholder image display, add to post).
    *   Media upload from device (client-side preview for images, removal functionality, max 4 files).
    *   Platform-specific preview cards (show same content, with a "Adjust for platform" placeholder button).
    *   Scheduling options (date and time pickers).
    *   Post status display (`Badge`).
    *   "Save Draft", "Send for Approval" (mock), "Schedule Post" buttons.
    *   Comments/feedback section (mock form and display).
*   **Calendar (`/calendar`)**:
    *   Modern interface similar to Google Calendar.
    *   Left sidebar: "Create" button, mini calendar, mock "My Calendars," and "Platform Filters" (social media platform icons and checkboxes, filters mock events on the calendar).
    *   Main calendar area: "Today," previous/next navigation, Day/Week/Month view toggles.
    *   Weekly view (default): Time slots and day columns. Mock social media posts shown as colored, timed blocks based on their platform. Clicking events opens a `Popover` with details. Clicking empty time slots opens a "Quick Add Post" modal (with AI content generation support).
    *   Functional Day and Month views (displaying mock events).
*   **Asset Library (`/social-media/asset-library`)**:
    *   Grid view of brand assets (images, videos, documents - mock).
    *   File upload functionality (adds to local state, previews images using `URL.createObjectURL`).
    *   Filtering by asset type.
    *   Search functionality (filters local mock data).
    *   Modal preview for selected assets (larger image preview, details).
*   **Sentiment Analysis (`/social-media/sentiment-analysis`)**:
    *   Dashboard with mock data and charts (Recharts) for:
        *   Overall Sentiment Score.
        *   Sentiment Trend Over Time (Line Chart).
        *   Sentiment by Platform (Bar Chart).
        *   Key Themes & Topics (Badges).
        *   Recent Mentions (Scrollable list with avatars).
    *   Filters for date range and platform.

### 2.4. Email Marketing Module
*   **Email Marketing Dashboard (`/email-marketing/dashboard`)**:
    *   Key metrics (total contacts, campaigns sent, avg. open/click rates - mock data).
    *   List of recent campaigns (mock).
    *   Subscriber growth chart (mock data with Recharts).
    *   Quick links to "Create New Campaign" and "Import Contacts."
*   **Campaigns (`/email-marketing/campaigns`)**:
    *   List page for email campaigns (mock data).
    *   "Create New Campaign" button (links to create page).
    *   Placeholders for search and filtering. "Details" link navigates to a placeholder campaign detail page.
*   **Create Campaign (`/email-marketing/campaigns/create`)**:
    *   Tabbed interface: Details, Sender, Content, Audience, Tracking.
    *   **Details Tab**: Campaign Name, Campaign Type (Standard, Automation, A/B Test, RSS), Subject Line (with A/B test option), Preview Text.
    *   **Sender Tab**: Sender Name, Sender Email, Reply-To Email.
    *   **Content Tab**: Template selection (dialog with searchable mock templates, pre-fills subject/body/content), email content textarea (conceptual mobile/desktop preview toggle), placeholder buttons.
    *   **Audience Tab**: Selection for Include/Exclude lists and segments (mock data with type and count, search placeholder, grouped by List/Segment). Estimated reach display.
    *   **Tracking Tab**: Checkboxes for Open/Click tracking, Google Analytics integration (placeholder UTM inputs).
    *   Right sidebar: Scheduling (immediate/later, date/time, timezone option, recurring placeholder), Advanced A/B Test setup placeholder, Actions (Save Draft, Preview & Test modal, Send/Schedule).
*   **Send Email (`/email-marketing/send-email`)**:
    *   Simple page for direct, non-campaign emails (To, Subject, Content fields).
*   **Templates (`/email-marketing/templates`)**:
    *   Grid display of mock email templates (various categories).
    *   "Preview" button navigates to a dedicated preview page. "Use Template" button opens a dialog to name/select a campaign (autocomplete for existing campaigns) and then navigates to campaign creation.
    *   Placeholder "Create New Template" button (links to placeholder page).
*   **Template Preview (`/email-marketing/templates/[templateId]/preview`)**:
    *   Displays template metadata (name, description, category, thumbnail).
    *   **Note:** Shows a message indicating that full HTML email rendering with `react-email` (or custom solution) is pending resolution of dependency/setup issues.
*   **Lists (`/email-marketing/lists`)**: Basic list page placeholder. Links to placeholder "Create New List" page. Table items link to placeholder list detail page.
*   **Segments (`/email-marketing/segments`)**: List page for segments. "AI Suggest Segments" button opens a dialog with mock suggestions, allowing creation. "Create New Segment" button links to placeholder page. Table items link to dynamic segment contacts page.
*   **Segment Contacts Page (`/email-marketing/segments/[segmentId]/contacts/page.tsx`)**: Displays mock contacts for a selected segment.
*   **Reports (`/email-marketing/reports`)**: Basic placeholder page with links to conceptual report types (buttons show toasts).

### 2.5. Audience Management (Sidebar Group - "Audience")
*   **All Contacts (`/email-marketing/contacts`)**: List page for contacts (mock data). Links to placeholder "Import Contacts" and "Add New Contact" pages. Edit link navigates to placeholder contact edit page.
*   **Add New Contact (`/email-marketing/contacts/add`)**: Form page for name, email, phone, company (autocomplete), job title, notes.
*   **All Companies (`/email-marketing/companies`)**: List page for companies (mock data). Links to "Add New Company" page. Details/Edit link navigates to placeholder company detail page.
*   **Add New Company (`/email-marketing/companies/add`)**: Form page for name, industry (dropdown), website, phone, address, notes.
*   **Manage Segments (`/email-marketing/segments`)**: Links to the Segments list page.

### 2.6. Brand Profile (`/brand-profile`)
*   Comprehensive, tabbed interface for managing brand identity and strategy.
*   **Tabs**:
    1.  Basic Info (Name, Company Name, Tagline, Business Category (combobox), Target Audience, Description, Mission, Vision, Core Values, Company Phone, Email, Physical Address).
    2.  AI Strategic Briefing (moved from AI Assistant: Core Purpose, Value Prop, Focused Product, Priority Platforms, Campaign Periods, FAQs, Desired Emotion, Competitor Inspirations, Additional Strategic Info, Brand Keywords, Things to Avoid, USPs).
    3.  Visual Identity (Logo uploads, Brand Colors, Typography, Imagery Style, Graphic Elements - UI placeholders).
    4.  Tone of Voice & Language (Brand Voice, Writing Style, Messaging Pillars, Example Phrases).
    5.  Social & Digital Presence (Website, Social Handles, Hashtags, Bio Templates, CTA Examples).
    6.  Product/Service Details (Key Products, Descriptions, Pricing, Target Markets, USP).
    7.  AI-Specific Preferences (Preferred Content Types, Custom Prompts, Personas, Prohibited Content, Jargon - UI placeholders).
    8.  Legal & Compliance (Trademarks, Copyright, Disclosures, Data Handling - UI placeholders).
    9.  File Attachments (Brand Guidelines PDF, Marketing Kits - UI placeholders).
*   "Save Brand Profile Changes" button (simulated save with toast).

### 2.7. System Configuration (`/admin/settings`)
*   Tabbed interface for system-wide settings.
*   **Overview Card**: Displays icons of (simulated) active/configured services from different tabs.
*   **Tabs**:
    *   "AI Settings": UI for selecting AI provider (Gemini, OpenRouter, OpenAI, Anthropic) and inputting API keys/model names. Saving opens a modal for a mock admin password and then advises user to update `.env` and restart server. (Dynamic Genkit configuration via `.env` is set up in `src/ai/genkit.ts`).
    *   "SMTP Settings": Dynamic forms for configuring different email service providers (SMTP, Gmail, SES, API-based). Saving is simulated.
    *   "Email Configuration": Placeholders for default sender name, email, and global footer.
    *   "Social Media Account Connections": Autocomplete to add platforms to a "configured channels" list. Each channel in the list shows status (Connected, Disconnected, Needs Re-auth) and allows mock connect/disconnect/manage actions. An inline panel shows details for "Connect", "Re-authenticate", or "Manage" actions. "Save Dashboard Preferences" button saves the list of channels (intended for dashboard display) to `localStorage`.
    *   "Storage Settings": Autocomplete to select a storage provider (Firebase, S3, Cloudinary, etc.). Dynamically shows placeholder config fields based on selection. Simulated save.
    *   "Integrations": Placeholder cards for CMS (Strapi, WordPress), CRM (HubSpot), and Analytics (Google Analytics) integrations with mock connect/disconnect buttons and "Sync Content Types (Future)" placeholder.

### 2.8. Team Management (`/admin/team-management`)
*   Dedicated page for managing team members.
*   Mock user list with avatar, name, email, role (Badge).
*   "Invite New Member" dialog (input email, select role).
*   "Edit Role" functionality for users (dialog to change role, simulated save via server action).
*   "Remove User" button (prototype).

### 2.9. Content Management System (CMS) - REMOVED
*   The "Content Type Builder" (`/admin/content-types`) and related content entry pages (`/admin/content/...`) have been **removed** from the project to simplify focus.
*   The "Content" group in the sidebar has been removed.
*   The strategy is to "Keep Integration Potential Open" for external CMS systems via the "Integrations" tab in System Configuration.

## 3. General UI/UX Principles & Style Guidelines

*   **Primary Color**: Vibrant blue (`#29ABE2`).
*   **Background Color**: Light grey (`#F0F0F0`).
*   **Accent Color**: Warm orange (`#FF8C00`).
*   **Interface Style**: Clean, minimalist, modern, with strategic use of whitespace.
*   **Visual Hierarchy**: Clear typographic scale, consistent color usage, shadows, borders for interactivity.
    *   **Tabs Usage**: Implemented in "Brand Profile," "System Configuration," and "Create Campaign" pages to break down complex forms into manageable, themed sections, improving clarity and user focus. Tabs are responsive, adapting their layout (e.g., number of columns in `TabsList`) for different screen sizes.
*   **Responsiveness**: Adapts to various screen sizes (desktop, tablet, mobile). Tables use `overflow-x-auto` for better mobile viewing. Complex layouts like the main Calendar page have mobile-specific considerations (e.g., sidebar toggle, scrollable main grid).
*   **Dark and Light Mode Support**: Fully functional theme switcher implemented. UI elements optimized for both modes.
*   **Interactivity & Feedback**: Subtle animations/transitions (e.g., button active states, card hover effects). Clear feedback on actions (loading states for AI, toasts for save/delete operations).
*   **Accessibility**: Adherence to WCAG guidelines (color contrast improvements made, keyboard navigation via ShadCN defaults, semantic HTML, ARIA attributes like `aria-current="page"` for navigation, labels for form inputs).
*   **Modularity**: Reusable UI components (primarily via ShadCN UI).
*   **Performance**:
    *   Lightweight UI.
    *   Image optimization and lazy loading via `next/image` (default behavior and `priority` prop used for LCP on main dashboard). `sizes` prop used with `fill` images.
    *   Code splitting for heavier components like charts on dashboards using `next/dynamic`.

## 4. Global CSS (`src/app/globals.css`)

*   Uses Tailwind CSS base, components, and utilities.
*   Defines HSL CSS variables for light mode (`:root`) and dark mode (`.dark`) themes, covering:
    *   `--background`, `--foreground`
    *   `--card`, `--card-foreground`
    *   `--popover`, `--popover-foreground`
    *   `--primary`, `--primary-foreground` (adjusted for contrast)
    *   `--secondary`, `--secondary-foreground`
    *   `--muted`, `--muted-foreground` (adjusted for contrast)
    *   `--accent`, `--accent-foreground` (adjusted for contrast)
    *   `--destructive`, `--destructive-foreground` (adjusted for contrast)
    *   `--border`, `--input`, `--ring`
    *   `--radius`
    *   Sidebar-specific colors (`--sidebar-background`, `--sidebar-foreground`, etc.) for both themes.
    *   Chart-specific color variables (`--chart-1` to `--chart-5`).
*   Base styles ensure `border-border` for all elements and apply body background/text colors.

This project blueprint reflects the current state, recent refactoring (CMS removal), and future goals of the MarketMaestro project comprehensively.

    