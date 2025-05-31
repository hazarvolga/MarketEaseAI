
import { NextRequest, NextResponse } from 'next/server';
// import { render } from 'react-email'; // REMOVED
// import { GenericBrandEmail, type BrandData, type EmailContent } from '@/emails/GenericBrandEmail'; // REMOVED
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data';

// Simplified mock data and functions, no longer relying on types from GenericBrandEmail
const simplifiedMockBrand = {
  companyName: 'MarketMaestro Demo',
  websiteUrl: 'https://marketmaestro.example.com',
};

function generateSimpleMockContent(templateCategory?: string, brand?: { companyName: string }): { subject: string; body: string } {
  const brandName = brand?.companyName || 'Our Brand';
  let subject = `A Special Update from ${brandName}`;
  let body = `We're excited to share some news with you.\n\nVisit our website to learn more.`;

  switch (templateCategory?.toLowerCase()) {
    case 'welcome':
      subject = `Welcome to ${brandName}!`;
      body = `Thanks for joining our community! We're excited to have you on board.`;
      break;
    case 'promotion':
      subject = `Exclusive Offer Inside!`;
      body = `Check out our latest promotion. This is a limited-time offer!`;
      break;
    case 'newsletter':
      subject = `${brandName} Monthly News`;
      body = `Here's your monthly update with the latest articles, tips, and news.`;
      break;
    default:
      break;
  }
  return { subject, body };
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

  const simpleContent = generateSimpleMockContent(template.category, simplifiedMockBrand);
  
  try {
    // Return a very basic HTML placeholder
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
            <p><strong>Subject (mock):</strong> ${simpleContent.subject}</p>
            <p><strong>Body (mock excerpt):</strong> ${simpleContent.body.substring(0,100)}...</p>
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
    const errorHtml = `<html><body><h1>Error</h1><p>${errorMessage}</p></body></html>`;
    return new NextResponse(errorHtml, { status: 500, headers: { 'Content-Type': 'text/html' } });
  }
}
