
import { NextRequest, NextResponse } from 'next/server';
import { mockTemplates, type EmailTemplate } from '@/lib/email-template-data';

// Simplified mock data generation - in a real app, this might be more dynamic
const simplifiedMockBrand = {
  companyName: 'MarketMaestro Demo',
  websiteUrl: 'https://marketmaestro.example.com',
  primaryColor: '#29ABE2', // Vibrant Blue
  accentColor: '#FF8C00', // Warm Orange
  textColor: '#333333',
};

function generateSimpleMockContent(templateCategory?: string, brand?: { companyName: string, primaryColor: string, accentColor: string, textColor: string }): { subject: string; preheader: string; body: string; cta: string } {
  const brandName = brand?.companyName || 'Our Brand';
  let subject = `A Special Update from ${brandName}`;
  let preheader = `Don't miss out on this!`;
  let body = `
    <p>Dear Valued Customer,</p>
    <p>We're excited to share some news with you regarding our latest developments. Our team has been working hard to bring you new features and improvements.</p>
    <p>Visit our website to learn more and see what's new!</p>
    <p>Thank you for being a part of the ${brandName} community.</p>
    <br/>
    <p>Sincerely,</p>
    <p>The ${brandName} Team</p>
  `;
  let cta = 'Learn More';

  switch (templateCategory?.toLowerCase()) {
    case 'welcome':
      subject = `Welcome to ${brandName}!`;
      preheader = `Let's get you started.`;
      body = `<p>Hi there,</p><p>Thanks for joining ${brandName}! We're thrilled to have you on board. Here are some quick links to get you started:</p><ul><li>Link 1</li><li>Link 2</li></ul>`;
      cta = 'Explore Features';
      break;
    case 'promotion':
      subject = `Exclusive Offer Inside from ${brandName}!`;
      preheader = `Limited time deal just for you.`;
      body = `<p>Hello,</p><p>Check out our latest promotion on selected products. This is a limited-time offer you won't want to miss!</p>`;
      cta = 'Shop Now';
      break;
    case 'newsletter':
      subject = `${brandName} Monthly News & Updates`;
      preheader = `Catch up on what's new.`;
      body = `<p>Greetings,</p><p>Here's your monthly update with the latest articles, tips, and news from ${brandName}.</p><p><b>Featured Article:</b> The Future of Marketing Automation.</p>`;
      cta = 'Read Full Newsletter';
      break;
    default:
      break;
  }
  return { subject, preheader, body, cta };
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

  const { subject, preheader, body, cta } = generateSimpleMockContent(template.category, simplifiedMockBrand);
  
  // Construct a basic HTML structure
  // Styling is inline and very basic for demonstration
  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-f">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Preview: ${template.name}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; margin: 0; padding: 0; background-color: #f0f2f5; }
        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
        .email-header { background-color: ${simplifiedMockBrand.primaryColor}; color: ${simplifiedMockBrand.textColor === '#ffffff' ? '#000000' : '#ffffff'}; padding: 20px; text-align: center; }
        .email-header h1 { margin: 0; font-size: 24px; }
        .email-content { padding: 20px 30px; color: ${simplifiedMockBrand.textColor}; font-size: 16px; line-height: 1.6; }
        .email-content h2 { color: ${simplifiedMockBrand.primaryColor}; font-size: 20px; margin-top:0;}
        .email-content p { margin: 0 0 1em 0; }
        .email-content ul { padding-left: 20px; }
        .email-cta { text-align: center; margin: 20px 0; }
        .email-cta a { background-color: ${simplifiedMockBrand.accentColor}; color: ${simplifiedMockBrand.textColor === '#ffffff' ? '#000000' : '#ffffff'}; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; }
        .email-footer { padding: 20px 30px; text-align: center; font-size: 12px; color: #777777; border-top: 1px solid #e0e0e0; }
        .email-footer a { color: #29ABE2; text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>${template.name}</h1>
        </div>
        <div class="email-content">
          <h2>${subject}</h2>
          <p style="font-size:0.9em; color:#555;"><em>Preheader: ${preheader}</em></p>
          <hr style="border:0; border-top:1px solid #eee; margin: 15px 0;"/>
          ${body}
          ${cta ? `<div class="email-cta"><a href="${simplifiedMockBrand.websiteUrl}">${cta}</a></div>` : ''}
        </div>
        <div class="email-footer">
          <p>&copy; ${new Date().getFullYear()} ${simplifiedMockBrand.companyName}. All rights reserved.</p>
          <p><a href="${simplifiedMockBrand.websiteUrl}/unsubscribe">Unsubscribe</a> | <a href="${simplifiedMockBrand.websiteUrl}/preferences">Manage Preferences</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(emailHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
