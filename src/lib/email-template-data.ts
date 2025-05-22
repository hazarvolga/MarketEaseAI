
export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  dataAiHint: string;
}

export const mockTemplates: EmailTemplate[] = [
  {
    id: 'welcome-email',
    name: 'Welcome Email',
    description: 'A warm welcome for new subscribers, guiding them to key actions and introducing your brand.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Welcome',
    dataAiHint: 'welcome message email'
  },
  {
    id: 'product-promo-launch',
    name: 'Product Promotion / Launch Email',
    description: 'Announce new products or features with impact, highlighting benefits and clear calls to action.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Promotion',
    dataAiHint: 'product launch promo'
  },
  {
    id: 'newsletter-email',
    name: 'Newsletter Email',
    description: 'Share regular updates, blog content, and community news with a digestible, skimmable design.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Newsletter',
    dataAiHint: 'company newsletter'
  },
  {
    id: 'promotional-offer',
    name: 'Promotional / Offer Email',
    description: 'Drive sales with compelling offers, discounts, and limited-time deals, optimized for conversion.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Promotion',
    dataAiHint: 'sale discount offer'
  },
   {
    id: 'abandoned-cart',
    name: 'Abandoned Cart Email',
    description: 'Encourage customers to complete their purchase with a friendly reminder and an easy path back to their cart.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Transactional',
    dataAiHint: 'cart reminder'
  },
  {
    id: 'special-occasion',
    name: 'Special Occasion / Celebration Email',
    description: 'Engage users with personalized messages for birthdays, anniversaries, or holidays.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Celebration',
    dataAiHint: 'celebration greeting'
  },
  {
    id: 'event-announcement',
    name: 'Event / Announcement Email',
    description: 'Invite users to webinars, product launches, or live events with clear details and RSVP calls to action.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Announcement',
    dataAiHint: 'event invitation'
  },
  {
    id: 'feedback-survey',
    name: 'Feedback / Survey Email',
    description: 'Gather valuable insights by requesting feedback, product reviews, or survey participation.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Feedback',
    dataAiHint: 'survey request'
  },
  {
    id: 're-engagement-email',
    name: 'Re-engagement Email',
    description: 'Win back inactive users with personalized messaging and a compelling reason to return.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Engagement',
    dataAiHint: 'user reactivation'
  },
  {
    id: 'general-transactional',
    name: 'Transactional Email (General)',
    description: 'For general transactional updates like account changes or important notices. Focus on clarity.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Transactional',
    dataAiHint: 'system notification'
  },
  {
    id: 'onboarding-email',
    name: 'Onboarding Email',
    description: 'Guide new users through their first steps, highlighting key features and product value.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Onboarding',
    dataAiHint: 'new user guide'
  },
  {
    id: 'lead-magnet-delivery',
    name: 'Lead Magnet Delivery Email',
    description: 'Deliver requested resources (e.g., ebooks, guides) and nurture new leads.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Lead Gen',
    dataAiHint: 'resource delivery'
  },
  {
    id: 'order-confirmation',
    name: 'Order Confirmation Email',
    description: 'Confirm customer orders with all necessary details, building trust and excitement.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Transactional',
    dataAiHint: 'purchase receipt'
  },
  {
    id: 'shipping-notification',
    name: 'Shipping Notification Email',
    description: 'Keep customers informed about their order shipment status and tracking information.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Transactional',
    dataAiHint: 'delivery update'
  },
  {
    id: 'review-request',
    name: 'Review Request Email',
    description: 'Politely ask satisfied customers to leave a review for your product or service.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Feedback',
    dataAiHint: 'customer review'
  },
  {
    id: 'win-back-email',
    name: 'Win-Back Email',
    description: 'A targeted email to re-engage customers who haven\'t purchased in a while, often with a special offer.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Engagement',
    dataAiHint: 'customer retention'
  },
  {
    id: 'subscription-reminder',
    name: 'Membership / Subscription Reminder Email',
    description: 'Remind users about upcoming subscription renewals or membership expirations.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Reminder',
    dataAiHint: 'renewal notice'
  },
  {
    id: 'thank-you-email',
    name: 'Thank You Email',
    description: 'Express gratitude for a purchase, signup, or other positive interaction to build customer loyalty.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Engagement',
    dataAiHint: 'appreciation message'
  },
  {
    id: 'upsell-cross-sell',
    name: 'Upsell / Cross-sell Email',
    description: 'Suggest complementary products or upgrades to existing customers based on their purchase history or interests.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Sales',
    dataAiHint: 'product recommendation'
  },
  {
    id: 'waitlist-backinstock',
    name: 'Waitlist / Back-in-Stock Email',
    description: 'Notify users when a previously unavailable item they showed interest in is back in stock or available for pre-order.',
    thumbnailUrl: 'https://placehold.co/400x300.png',
    category: 'Notification',
    dataAiHint: 'stock alert'
  }
];
