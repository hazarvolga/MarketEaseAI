
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, ListChecks, Target, PenTool, Users, Palette, ShieldCheck, CheckCircle, BookOpen, AlertTriangle, Code, TestTube2 as TestTubeIcon } from 'lucide-react';

export default function CampaignGuidePage() {
  return (
    <MainLayout pageTitle="Comprehensive Email Campaign Guide">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <BookOpen className="mr-3 h-7 w-7 text-primary" />
              Comprehensive Email Campaign Guide
            </CardTitle>
            <CardDescription>
              Best practices and key considerations for successful email marketing.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />Introduction to Email Marketing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Email marketing is a powerful digital marketing strategy of sending emails to prospects and customers. Effective email marketing converts prospects into customers, and turns one-time buyers into loyal, raving fans.</p>
            <h4 className="font-semibold text-md">Key Benefits:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">High ROI:</span> Often cited as one of the highest ROI marketing channels.</li>
              <li><span className="font-medium">Direct Communication:</span> Speak directly to your audience in their inbox.</li>
              <li><span className="font-medium">Customer Engagement & Loyalty:</span> Build relationships and keep your brand top-of-mind.</li>
              <li><span className="font-medium">Targeted Messaging:</span> Deliver relevant content to specific audience segments.</li>
              <li><span className="font-medium">Measurable Results:</span> Track opens, clicks, conversions, and more.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5 text-blue-500" />Building Your Email List (Legally & Effectively)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="font-semibold">Core Principle: Permission is Key (Opt-In)</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Always get explicit consent before adding someone to your mailing list (e.g., checkbox on signup, dedicated newsletter form).</li>
              <li>Clearly state what subscribers can expect (frequency, content type).</li>
              <li>Double opt-in (confirmation email) is highly recommended to ensure quality subscribers and reduce spam complaints.</li>
            </ul>
            <h4 className="font-semibold text-md mt-3">Effective List Building Strategies:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Lead Magnets:</span> Offer valuable free content (ebook, checklist, webinar) in exchange for an email address.</li>
              <li><span className="font-medium">Website Sign-up Forms:</span> Place clear and accessible signup forms in your website header, footer, sidebar, and blog posts.</li>
              <li><span className="font-medium">Pop-ups/Slide-ins:</span> Use these tastefully (e.g., exit-intent pop-ups) to capture attention.</li>
              <li><span className="font-medium">Social Media Contests/Giveaways:</span> Encourage sign-ups as part of participation.</li>
              <li><span className="font-medium">Offline Events:</span> Collect emails at trade shows or in-store (with clear consent).</li>
            </ul>
            <h4 className="font-semibold text-md mt-3 text-destructive">What NOT to Do:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Never buy or rent email lists.</span> This harms your sender reputation and violates anti-spam laws.</li>
              <li>Do not automatically add people to marketing lists without their explicit consent (e.g., from business cards).</li>
              <li>Avoid pre-checking consent boxes.</li>
            </ul>
            <p className="mt-3"><span className="font-medium">List Hygiene:</span> Regularly clean your list by removing inactive subscribers and invalid email addresses to maintain good deliverability and engagement rates.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Target className="mr-2 h-5 w-5 text-green-500" />Planning Your Email Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <h4 className="font-semibold text-md">1. Define Your Goals & KPIs:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>What do you want to achieve? (e.g., increase sales, drive website traffic, build brand awareness, announce a new product).</li>
              <li>Key Performance Indicators (KPIs): Open rate, Click-Through Rate (CTR), Conversion Rate, Bounce Rate, Unsubscribe Rate.</li>
            </ul>
            <h4 className="font-semibold text-md mt-3">2. Understand Your Audience & Segment:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Who are you talking to? Create buyer personas.</li>
              <li>Segmentation: Divide your list into smaller, targeted groups based on demographics, behavior, interests, or purchase history for more relevant messaging.</li>
            </ul>
            <h4 className="font-semibold text-md mt-3">3. Types of Email Campaigns:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Welcome Emails:</span> For new subscribers.</li>
              <li><span className="font-medium">Newsletters:</span> Regular updates, curated content.</li>
              <li><span className="font-medium">Promotional Emails:</span> Sales, discounts, special offers.</li>
              <li><span className="font-medium">Product Announcement/Launch Emails:</span> Introduce new offerings.</li>
              <li><span className="font-medium">Transactional Emails:</span> Order confirmations, shipping updates, password resets (primarily functional).</li>
              <li><span className="font-medium">Re-engagement Emails:</span> To win back inactive subscribers.</li>
              <li><span className="font-medium">Event Invitations:</span> For webinars, workshops, etc.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><PenTool className="mr-2 h-5 w-5 text-purple-500" />Crafting Compelling Email Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-md">Subject Lines:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Keep it short, clear, and compelling (ideally under 50 characters).</li>
                <li>Create curiosity or urgency (e.g., "Last Chance!", "You're Invited!").</li>
                <li>Use personalization (e.g., <code className="font-mono text-sm bg-muted px-1 py-0.5 rounded">{'{'}{'{firstName}}'}</code>).</li>
                <li>Emojis can increase open rates if used appropriately and relevantly for your brand.</li>
                <li>A/B test different subject lines.</li>
                <li>Avoid spammy words (FREE, SALE, WIN, GUARANTEE in all caps).</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-md">Preheaders:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>The short snippet of text that appears after the subject line in many email clients.</li>
                <li>Use it to expand on the subject line and provide more context or a secondary hook.</li>
                <li>Keep it engaging and relevant.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-md">Email Body & Copywriting:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Start with a clear value proposition or the main message.</li>
                <li>Use storytelling to connect with your audience.</li>
                <li>Keep content scannable: use headings, subheadings, short paragraphs, bullet points, and bold text for key information.</li>
                <li>Maintain your brand's tone of voice.</li>
                <li>Proofread carefully for typos and grammatical errors.</li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold text-md">Call-to-Actions (CTAs):</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use clear, action-oriented language (e.g., "Shop Now," "Learn More," "Download Free Guide," "Register Today").</li>
                <li>Make CTAs visually prominent (e.g., buttons with contrasting colors).</li>
                <li>Ensure only one primary CTA per email, or a clear hierarchy if multiple CTAs are necessary.</li>
                <li>Place CTAs strategically where users are most likely to act.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-md">Visuals (Images, GIFs):</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use high-quality, relevant images that support your message.</li>
                <li>Optimize images for fast loading (compress them).</li>
                <li>Always provide descriptive ALT text for images (for accessibility and if images are blocked).</li>
                <li>Maintain a good balance between text and images to avoid spam filters.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-indigo-500" />Email Design & Deliverability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <h4 className="font-semibold text-md">Design Best Practices:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Responsive Design:</span> Ensure your email looks great and functions well on all devices (desktop, tablet, mobile). Use a single-column layout for mobile.</li>
              <li><span className="font-medium">Branding Consistency:</span> Include your logo, use brand colors, and consistent typography.</li>
              <li><span className="font-medium">Visual Hierarchy:</span> Guide the reader's eye effectively.</li>
              <li><span className="font-medium">Whitespace:</span> Use generously to improve readability and reduce clutter.</li>
              <li><span className="font-medium">Font Choice:</span> Use web-safe fonts or well-supported system fonts (e.g., Arial, Helvetica, Verdana, Georgia, Times New Roman). Aim for 14-16px for body text.</li>
            </ul>
            
            <Separator className="my-4" />
            <h4 className="font-semibold text-md flex items-center"><Code className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400"/>Writing Email-Safe HTML & CSS:</h4>
            <p className="text-sm text-muted-foreground">
              Email clients have varying levels of HTML/CSS support. To maximize compatibility:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Table-Based Layouts:</span> For complex structures, HTML tables (`<table>`, `<tr>`, `<td>`) are often more reliable than modern CSS layouts like Flexbox or Grid.</li>
              <li><span className="font-medium">Inline CSS:</span> Embed most of your CSS styles directly into HTML tags using the `style` attribute (e.g., `<p style="color: #333; font-size: 14px;">`). Avoid relying heavily on `<style>` blocks in the `<head>` or external stylesheets.</li>
              <li><span className="font-medium">Simplify HTML:</span> Use semantic HTML where possible, but prioritize simplicity and broad compatibility. Avoid overly nested elements.</li>
              <li><span className="font-medium">Supported CSS:</span> Stick to CSS properties widely supported by email clients. Resources like "Can I email..." (caniemail.com) can be helpful.</li>
              <li><span className="font-medium">Media Queries for Responsiveness:</span> Use `@media` queries within a `<style>` block in the `<head>` for responsive adjustments (e.g., single-column layout on mobile). Some clients might ignore these, so ensure the base layout is usable.</li>
              <li><span className="font-medium">ALT Text for Images:</span> Always use descriptive `alt` attributes for `<img>` tags.</li>
              <li><span className="font-medium">Avoid JavaScript and Complex Scripts:</span> These are generally not supported and can trigger spam filters.</li>
            </ul>

            <Separator className="my-4" />
            <h4 className="font-semibold text-md">Deliverability & Avoiding Spam Filters:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Sender Authentication:</span> Set up SPF, DKIM, and DMARC records for your sending domain to prove your emails are legitimate.</li>
              <li><span className="font-medium">Content Quality:</span> Avoid spammy phrases, excessive capitalization, too many exclamation points, and misleading subject lines.</li>
              <li><span className="font-medium">Sender Reputation:</span> Maintain a good sender reputation by sending relevant content to an engaged list and minimizing spam complaints.</li>
              <li><span className="font-medium">Clean List:</span> Regularly remove inactive or invalid email addresses.</li>
              <li><span className="font-medium">Clear Unsubscribe:</span> Make it easy for users to unsubscribe (this is a legal requirement).</li>
              <li><span className="font-medium">Company Information:</span> Include your physical address in the footer.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><CheckCircle className="mr-2 h-5 w-5 text-teal-500" />Testing and Optimization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">A/B Testing:</span> Test different subject lines, preheaders, CTAs, content, images, and send times to see what resonates best with your audience.</li>
              <li><span className="font-medium">Preview Across Clients/Devices:</span> Use tools (like Litmus, Email on Acid, or built-in previews in some Email Service Providers) to see how your email renders in major email clients (Gmail, Outlook, Apple Mail) and on different devices.</li>
              <li><span className="font-medium">Send Test Emails:</span> Always send a test email to yourself and colleagues to check for errors, broken links, and rendering issues before sending to your main list.</li>
              <li><span className="font-medium">Link Checking:</span> Ensure all links in your email are correct and working.</li>
              <li><span className="font-medium">Personalization Preview:</span> Test how personalized fields will appear with different subscriber data.</li>
            </ul>
             <p className="mt-3 font-semibold">Recommended Testing Tools:</p>
             <ul className="list-disc pl-5 space-y-1">
                <li>Litmus: Comprehensive email testing and analytics.</li>
                <li>Email on Acid: Another popular platform for testing email rendering.</li>
                <li>Manual Testing: Sending test emails to various free accounts (Gmail, Outlook.com, Yahoo) on different devices.</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-gray-500" />Key Email Marketing Terms (Glossary)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-semibold">Open Rate:</span> Percentage of recipients who opened your email.</p>
            <p><span className="font-semibold">Click-Through Rate (CTR):</span> Percentage of recipients who clicked on one or more links in your email.</p>
            <p><span className="font-semibold">Conversion Rate:</span> Percentage of recipients who completed a desired action (e.g., made a purchase, signed up) after clicking a link in your email.</p>
            <p><span className="font-semibold">Bounce Rate:</span> Percentage of emails that could not be delivered. (Hard bounce: permanent issue, e.g., invalid address. Soft bounce: temporary issue, e.g., full inbox).</p>
            <p><span className="font-semibold">Unsubscribe Rate:</span> Percentage of recipients who opted out of your email list.</p>
            <p><span className="font-semibold">Spam Complaint Rate:</span> Percentage of recipients who marked your email as spam.</p>
            <p><span className="font-semibold">Call to Action (CTA):</span> The part of your email that encourages the reader to take a specific action.</p>
            <p><span className="font-semibold">Segmentation:</span> Dividing your email list into smaller groups based on specific criteria to send more targeted and relevant messages.</p>
            <p><span className="font-semibold">Opt-In:</span> Explicit permission given by an individual to receive emails from you.</p>
            <p><span className="font-semibold">Double Opt-In:</span> A two-step confirmation process where a new subscriber must click a link in a confirmation email to be added to the list.</p>
            <p><span className="font-semibold">Personalization:</span> Tailoring email content to individual recipients using their data (e.g., name, location, past behavior).</p>
             <p><span className="font-semibold">Deliverability:</span> The ability of your emails to reach the recipients' inboxes rather than spam folders or being blocked.</p>
             <p><span className="font-semibold">SPF, DKIM, DMARC:</span> Email authentication methods that help prevent spoofing and improve deliverability.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-red-500" />Legal & Ethical Considerations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Permission is Paramount:</span> Only email people who have explicitly consented to receive messages from you (Opt-in).</li>
              <li><span className="font-medium">Clear Unsubscribe:</span> Provide a clear and easy way for recipients to unsubscribe from every email. Process unsubscribe requests promptly.</li>
              <li><span className="font-medium">Accurate Sender Information:</span> Your "From" name and email address must be accurate and identify who you are.</li>
              <li><span className="font-medium">Physical Address:</span> Include your valid physical postal address in every email.</li>
              <li><span className="font-medium">Truthful Subject Lines:</span> Don't use deceptive subject lines.</li>
              <li><span className="font-medium">Adhere to Regulations:</span> Be aware of and comply with email marketing laws like CAN-SPAM (US), GDPR (Europe), CASL (Canada), and other local regulations applicable to your recipients.</li>
              <li><span className="font-medium">Data Privacy:</span> Handle subscriber data responsibly and transparently, as outlined in your privacy policy.</li>
            </ul>
          </CardContent>
        </Card>
         <Card className="mt-6 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-blue-700 dark:text-blue-300 text-base">Note on Implementation</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                    This guide provides best practices. Actual implementation of features like A/B testing, advanced segmentation, spam checking, and detailed analytics within MarketMaestro will require backend development and integration with email sending services and analytics tools.
                </p>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

    

    