
# MarketMaestro: AI-Powered Marketing Platform

MarketMaestro is a modern web application designed to empower a single brand to centralize its digital marketing efforts. It streamlines content planning across social media and email, manages brand identity consistently, and generates intelligent, AI-driven content suggestions tailored to the company’s unique tone, strategic goals, and target audience.

This project is built with Next.js (App Router), React, ShadCN UI components, Tailwind CSS, and Genkit (for AI functionalities) in the Firebase Studio environment.

## 🚀 Key Features

*   **Unified Dashboard (`/`)**:
    *   Central overview of social media and email marketing performance.
    *   Dynamic charts (mock data) for Social Media Performance (follower growth, engagement) and Email Marketing Insights (open rate, CTR).
    *   Channel-specific engagement cards reflecting System Configuration choices.
    *   Preview of upcoming publications and quick action buttons.
*   **AI Content Assistant (`/ai-assistant`)**:
    *   Generates marketing content (social posts, email ideas) based on a detailed strategic brand briefing.
    *   Provides AI-powered hashtag suggestions.
*   **Social Media Management Module**:
    *   **Dashboard (`/social-media/dashboard`)**: Overview of connected accounts (mock), key metrics, performance trends (mock charts), and recent/upcoming posts.
    *   **Create Post (`/social-media/create-post`)**: Compose for multiple platforms, AI content/hashtag suggestions, AI image generation (mock UI), media uploads with previews, platform-specific preview cards, scheduling, and collaboration placeholders.
    *   **Calendar (`/calendar`)**: Google Calendar-like interface for planning and visualizing scheduled social media content (mock events, platform filtering, quick add post dialog with AI).
    *   **Asset Library (`/social-media/asset-library`)**: Manage brand media assets with grid view, filtering, search, and modal previews. Mock upload functionality.
    *   **Sentiment Analysis (`/social-media/sentiment-analysis`)**: Dashboard with mock data and charts for overall sentiment, trends, platform breakdown, key themes, and recent mentions.
*   **Email Marketing Module**:
    *   **Dashboard (`/email-marketing/dashboard`)**: Key metrics (contacts, campaigns, open/click rates), recent campaigns, subscriber growth chart (mock data).
    *   **Campaigns (`/email-marketing/campaigns`)**: List view of email campaigns (mock).
    *   **Create Campaign (`/email-marketing/campaigns/create`)**: Tabbed interface (Details, Sender, Content, Audience, Tracking) for comprehensive campaign setup. Includes template selection (from a mock library, populates form), A/B test for subject lines, scheduling, and mock action buttons.
    *   **Send Email (`/email-marketing/send-email`)**: Simple interface for direct, non-campaign emails.
    *   **Templates (`/email-marketing/templates`)**: Grid display of mock email templates. "Use Template" opens a dialog to name/select a campaign. "Preview" navigates to a dedicated page.
    *   **Template Preview (`/email-marketing/templates/[templateId]/preview`)**: Displays template metadata and thumbnail. (Note: Custom email rendering solution is planned, temporarily showing basic info).
    *   Placeholders for Lists, Segments, and Reports pages.
*   **Audience Management (Sidebar Group)**:
    *   **Contacts (`/email-marketing/contacts` & `/add`)**: List and add new contacts (mock data, autocomplete for company).
    *   **Companies (`/email-marketing/companies` & `/add`)**: List and add new companies (mock data, dropdown for industry).
    *   **Manage Segments (`/email-marketing/segments`)**: Placeholder page.
*   **Brand Profile (`/brand-profile`)**:
    *   Comprehensive, tabbed interface to define brand identity (Basic Info, Visuals, Tone, Digital Presence, Products, AI Preferences, Legal, Attachments) to inform AI. Mock save functionality.
*   **System Configuration (`/admin/settings`)**:
    *   Tabbed interface for AI Provider setup (Gemini/OpenRouter, with `.env` guidance), SMTP settings (dynamic forms for various providers, mock save), Social Media Account dashboard visibility (checkboxes saving to `localStorage`), User Management (mock list & invite dialog), and Notifications placeholder.
*   **Team Management (`/admin/team-management`)**:
    *   Page to manage team members with a mock user list, role display (Badge), "Invite New Member" dialog, and simulated "Edit Role" functionality via server action.

## 🛠️ Technology Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Library**: [React](https://reactjs.org/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI Integration**: [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit)
*   **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (for validation, where implemented)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Charting**: [Recharts](https://recharts.org/) (via ShadCN UI Charts)
*   **State Management**: React Context API & `useState`/`useEffect` hooks.

## 🏁 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  Set up necessary environment variables. Copy `.env.example` (if available) to `.env.local` and fill in your values. This typically includes API keys for services like Google Gemini.
    ```bash
    # .env.local (example)
    GOOGLE_API_KEY=AIzaSy...
    AI_PROVIDER="googleai" # or "openrouter"
    # Other keys as needed for OpenRouter, SMTP, etc.
    ```

### Running the Development Server

To start the application in development mode:
```bash
npm run dev
```
This command should also attempt to start the Genkit development server (if configured in `package.json`). You can also run Genkit flows separately:
```bash
npm run genkit:watch
```
The application will typically be available at `http://localhost:9002` (or the port specified in your `package.json`).

## Scripts

*   `dev`: Starts the Next.js development server and (if configured) the Genkit development server.
*   `genkit:dev`: Starts the Genkit development server.
*   `genkit:watch`: Starts the Genkit development server in watch mode.
*   `build`: Builds the application for production.
*   `start`: Starts the production build.
*   `lint`: Lints the codebase using ESLint.
*   `typecheck`: Runs TypeScript type checking.

## 🌟 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License (or specify your license if different).
```