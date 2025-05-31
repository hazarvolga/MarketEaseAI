
import { NextRequest, NextResponse } from 'next/server';
// import { render } from 'react-email';
// import { GenericBrandEmail, type BrandData, type EmailContent } from '@/emails/GenericBrandEmail';
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data';

// Helper to get contrast color (copied from GenericBrandEmail for now, ideally from a shared util)
const getContrastYIQ = (hexcolor: string): 'black' | 'white' => {
  if (!hexcolor || hexcolor.length < 6) return 'black'; 
  const color = hexcolor.charAt(0) === '#' ? hexcolor.substring(1, 7) : hexcolor.substring(0, 6);
  if (color.length < 6) return 'black'; 

  try {
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  } catch (e) {
    return 'black'; 
  }
};


// Mock brand data for the preview - this would typically come from a global state or backend
const mockBrand = {
  companyName: 'MarketMaestro Demo',
  logoPlaceholderText: 'MarketMaestro',
  // logoUrl: '/path/to/your/logo.png', // Optional: Add if you have a logo URL
  address: '123 Digital Lane, Marketing City, MC 45678',
  websiteUrl: 'https://marketmaestro.example.com',
  primaryColor: '#29ABE2', // Vibrant Blue
  textColor: '#333333',    // Dark Grey
  accentColor: '#FF8C00',  // Warm Orange
  footerLinkColor: '#29ABE2',
  socialLinks: {
    facebook: 'https://facebook.com/marketmaestro',
    instagram: 'https://instagram.com/marketmaestro',
    twitter: 'https://twitter.com/marketmaestro',
    linkedin: 'https://linkedin.com/company/marketmaestro',
  },
};

// Function to generate mock email content based on template category
// (Simplified version of the one in create campaign page)
function generateMockEmailPreviewContent(templateCategory: string, brand: typeof mockBrand): any { // Changed EmailContent to any
  const { companyName, websiteUrl } = brand;
  let subject = `A Special Update from ${companyName}`;
  let preheader = `Don't miss out on our latest news!`;
  let greeting = `Hello there,`;
  let body = `We're excited to share some news with you.\n\nVisit our website to learn more.`;
  let ctaText = 'Learn More';
  let offer = '';

  switch (templateCategory?.toLowerCase()) {
    case 'welcome':
      subject = `Welcome to ${companyName}!`;
      preheader = `We're glad to have you.`;
      body = `Thanks for joining our community! We're excited to have you on board. Explore what we have to offer.`;
      ctaText = 'Get Started';
      break;
    case 'promotion':
      subject = `Exclusive Offer Inside!`;
      preheader = `A special discount just for you.`;
      body = `Check out our latest promotion. This is a limited-time offer, so don't miss out!`;
      offer = 'Get 20% OFF your next purchase with code PROMO20!';
      ctaText = 'Shop Now';
      break;
    case 'newsletter':
      subject = `${companyName} Monthly News`;
      preheader = `What's new this month?`;
      body = `Here's your monthly update with the latest articles, tips, and news from ${companyName}. \n\n- Insightful Article 1\n- Quick Tip for Success\n- Upcoming Event Highlight`;
      ctaText = 'Read More';
      break;
    default:
      subject = `Important Update from ${companyName}`;
      preheader = `News you should know.`;
      body = `We have an important update regarding our services. Please read on for more details.`;
      ctaText = 'Discover More';
      break;
  }
  return { subject, preheader, greeting, body, ctaText, offer };
}


export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const templateId = searchParams.get('templateId');

  if (!templateId) {
    return new NextResponse('Missing templateId parameter', { status: 400 });
  }

  const template = mockTemplates.find((t) => t.id === templateId);

  if (!template) {
    return new NextResponse(`Template with ID ${templateId} not found`, { status: 404 });
  }

  // const emailContent = generateMockEmailPreviewContent(template.category, mockBrand);
  
  try {
    // Commented out react-email rendering
    // const emailHtml = render(
    //   GenericBrandEmail({
    //     brandData: mockBrand,
    //     emailContent: emailContent,
    //     templateCategory: template.category,
    //   })
    // );
    const placeholderHtml = `
      <html>
        <head>
          <title>Email Preview: ${template.name}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
            .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 600px; }
            h1 { color: #333; }
            p { color: #555; line-height: 1.6; }
            .note { font-size: 0.9em; color: #777; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;}
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${template.name}</h1>
            <p><strong>Category:</strong> ${template.category}</p>
            <p>${template.description}</p>
            <hr style="margin: 20px 0; border-color: #eee;" />
            <p class="note"><strong>Note:</strong> Full HTML email rendering with react-email is temporarily unavailable due to a module resolution issue. This is a basic metadata preview.</p>
          </div>
        </body>
      </html>
    `;
    return new NextResponse(placeholderHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error in API route (email-preview):', error);
    let errorMessage = 'Failed to process email preview request.';
    if (error instanceof Error) {
        errorMessage += ` Details: ${error.message}`;
    }
    // Ensure this error message is plain text or simple HTML, not the full Next.js error page HTML
    const errorHtml = `<html><body><h1>Error</h1><p>${errorMessage}</p></body></html>`;
    return new NextResponse(errorHtml, { status: 500, headers: { 'Content-Type': 'text/html' } });
  }
}
