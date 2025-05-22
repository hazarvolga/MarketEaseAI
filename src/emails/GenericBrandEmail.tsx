
<<<<<<< HEAD
// This file is temporarily emptied or commented out to resolve 'react-email' module not found issues.
// It will be restored and enhanced once the dependency installation is successful.

/*
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Preview,
  Hr,
  Button as EmailButton, // Renamed to avoid conflict with ShadCN Button if ever used together
  Link as EmailLink,   // Renamed for clarity
  Img,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

// Helper to determine if a color is light or dark for contrast
const getContrastYIQ = (hexcolor: string): 'black' | 'white' => {
  if (!hexcolor || hexcolor.length < 6) return 'black'; // default to black if color is invalid
  const color = hexcolor.charAt(0) === '#' ? hexcolor.substring(1, 7) : hexcolor.substring(0,6);
  if (color.length < 6) return 'black';

  try {
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  } catch (e) {
    return 'black'; // fallback in case of parsing error
  }
};


interface BrandData {
  companyName: string;
  logoPlaceholderText: string;
  address: string;
  websiteUrl: string;
  primaryColor: string;
  textColor: string;
  accentColor: string;
  footerLinkColor: string;
  socialLinks: {
=======
import * as React from 'react';

// These interfaces will be used when we build out the custom components.
// For now, they define the expected props.
interface MockBrandData {
  companyName?: string;
  logoPlaceholderText?: string;
  address?: string;
  websiteUrl?: string;
  primaryColor?: string;
  textColor?: string;
  accentColor?: string;
  footerLinkColor?: string;
  socialLinks?: {
>>>>>>> MeastroMerketReactMailProblem
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

<<<<<<< HEAD
interface EmailContent {
  subject: string;
  preheader?: string;
  greeting?: string;
  body: string; // Should contain \n\n for paragraphs and \n- for list items
=======
interface EmailTextContent {
  subject?: string;
  preheader?: string;
  greeting?: string;
  body?: string;
>>>>>>> MeastroMerketReactMailProblem
  ctaText?: string;
  offer?: string;
}

interface GenericBrandEmailProps {
<<<<<<< HEAD
  brandData: BrandData;
  emailContent: EmailContent;
  templateCategory?: string;
=======
  brandData: MockBrandData;
  emailContent: EmailTextContent;
  templateCategory?: string; 
>>>>>>> MeastroMerketReactMailProblem
}

export const GenericBrandEmail: React.FC<Readonly<GenericBrandEmailProps>> = ({
  brandData,
  emailContent,
<<<<<<< HEAD
  templateCategory
}) => {
  const year = new Date().getFullYear();
  const primaryTextColor = getContrastYIQ(brandData.primaryColor);
  const accentTextColor = getContrastYIQ(brandData.accentColor);

  const mainBackgroundColor = '#f0f2f5'; // Light grey background for the email client window
  const emailBodyBackgroundColor = '#ffffff'; // White background for the email content itself

  const bodyStyles = {
    backgroundColor: mainBackgroundColor,
    margin: '0 auto',
    padding: '0',
    fontFamily: 'Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  const containerStyles = {
    backgroundColor: emailBodyBackgroundColor,
    margin: '0 auto',
    padding: '0', // Will add padding via sections
    maxWidth: '600px',
    border: '1px solid #dddddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    overflow: 'hidden', // To ensure rounded corners contain children
  };
  
  const headerSectionStyles = {
    backgroundColor: brandData.primaryColor,
    padding: '24px 30px',
    textAlign: 'center' as const,
  };

  const logoTextStyles = {
    color: primaryTextColor,
    fontSize: '28px',
    fontWeight: 'bold' as const,
    textDecoration: 'none',
    lineHeight: '1.2',
  };

  const contentSectionStyles = {
    padding: '20px 30px 30px 30px',
    color: brandData.textColor,
    fontSize: '16px',
    lineHeight: '1.7',
  };

  const subjectHeadingStyles = {
    color: brandData.primaryColor === '#ffffff' && brandData.textColor === '#ffffff' ? '#111827' : (brandData.primaryColor === '#ffffff' ? brandData.textColor : brandData.primaryColor),
    fontSize: '24px',
    fontWeight: 'bold' as const,
    margin: '0 0 10px 0',
    lineHeight: '1.3',
  };

  const preheaderTextStyles = {
    fontSize: '13px',
    color: '#555555',
    margin: '0 0 20px 0',
    lineHeight: '1.5',
  };
  
  const greetingTextStyles = {
    margin: '0 0 15px 0',
    color: brandData.textColor,
    fontSize: '16px',
    fontWeight: 'bold' as const,
  };
  
  const bodyParagraphStyles = {
    margin: '0 0 15px 0',
    color: brandData.textColor,
    fontSize: '16px',
    lineHeight: '1.7',
  };

  const heroImageSectionStyles = {
    textAlign: 'center' as const,
    margin: '20px 0',
  };
  
  const heroImageStyles = {
    borderRadius: '4px',
    maxWidth: '100%', // Ensure it's responsive within the container
    height: 'auto',
  };

  const offerSectionStyles = {
    backgroundColor: `${brandData.primaryColor}20`, // Primary color with ~12% opacity
    padding: '15px 20px',
    borderRadius: '5px',
    margin: '20px 0',
    border: `1px dashed ${brandData.primaryColor}`,
  };

  const offerTextStyles = {
    color: brandData.primaryColor, // Or a darker shade if primaryColor is too light
    margin: 0,
    fontWeight: 'bold' as const,
  };

  const ctaButtonSectionStyles = {
    textAlign: 'center' as const,
    margin: '30px 0',
  };

  const ctaButtonStyles = {
    backgroundColor: brandData.accentColor,
    color: accentTextColor,
    padding: '12px 25px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold' as const,
    display: 'inline-block',
    fontSize: '16px',
    border: 'none',
    lineHeight: '1.5',
  };
  
  const footerSectionStyles = {
    padding: '20px 30px',
    textAlign: 'center' as const,
    fontSize: '12px',
    color: '#777777', // A common muted color for footer text
    borderTop: '1px solid #eeeeee',
    marginTop: '20px',
  };

  const footerLinkStyles = {
    color: brandData.footerLinkColor,
    textDecoration: 'underline',
  };

  const socialLinksContainerStyles = {
    margin: '15px 0 10px',
  };

  const socialLinkStyles = {
    color: brandData.footerLinkColor,
    textDecoration: 'none',
    fontSize: '12px',
    margin: '0 5px',
  };

  // Determine hero image based on category
  let heroImageSrc: string | null = null;
  let heroAltText = "Relevant hero image";
  const lowerCategory = templateCategory?.toLowerCase();

  if (lowerCategory?.includes('promotion') || lowerCategory?.includes('sales') || lowerCategory?.includes('launch')) {
    heroImageSrc = `https://placehold.co/540x200/${brandData.accentColor.replace('#','')}/${accentTextColor === 'white' ? 'FFFFFF' : '000000'}?text=Special+Offer!`;
    heroAltText = "Special Offer Banner";
  } else if (lowerCategory?.includes('welcome') || lowerCategory?.includes('onboarding')) {
    heroImageSrc = `https://placehold.co/540x180/${brandData.primaryColor.replace('#','')}/${primaryTextColor === 'white' ? 'FFFFFF' : '000000'}?text=Welcome+Aboard!`;
    heroAltText = "Welcome Banner";
  } else if (lowerCategory?.includes('re-engagement')) {
     heroImageSrc = `https://placehold.co/540x150/${brandData.accentColor.replace('#','')}/${accentTextColor === 'white' ? 'FFFFFF' : '000000'}?text=We+Miss+You!`;
    heroAltText = "We Miss You Banner";
  }


  return (
    <Html lang="en">
      <Head>
        <title>{emailContent.subject}</title>
        {emailContent.preheader && <Preview>{emailContent.preheader}</Preview>}
      </Head>
      <Body style={bodyStyles}>
        <Container style={containerStyles}>
          <Section style={headerSectionStyles}>
            <EmailLink href={brandData.websiteUrl} style={logoTextStyles}>
              {brandData.logoPlaceholderText || brandData.companyName}
            </EmailLink>
          </Section>

          <Section style={contentSectionStyles}>
            <Heading as="h1" style={subjectHeadingStyles}>{emailContent.subject}</Heading>
            
            {emailContent.preheader && (
                <Text style={preheaderTextStyles}>
                    {emailContent.preheader}
                </Text>
            )}

            {emailContent.greeting && <Text style={greetingTextStyles}>{emailContent.greeting}</Text>}

            {heroImageSrc && (
                 <Section style={heroImageSectionStyles}>
                    <Img src={heroImageSrc} alt={heroAltText} width="100%" style={heroImageStyles} />
                </Section>
            )}
            
            {emailContent.body.split('\n\n').map((paragraph, paraIndex) => (
              <Text key={`para-${paraIndex}`} style={bodyParagraphStyles}>
                {paragraph.split('\n- ').map((item, itemIndex) => {
                  if (itemIndex === 0) return item;
                  return (
                    <React.Fragment key={`item-${itemIndex}`}>
                      <br />• {item}
                    </React.Fragment>
                  );
                })}
              </Text>
            ))}

            {emailContent.offer && (
              <Section style={offerSectionStyles}>
                <Text style={offerTextStyles}>{emailContent.offer}</Text>
              </Section>
            )}

            {emailContent.ctaText && (
              <Section style={ctaButtonSectionStyles}>
                <EmailButton href={brandData.websiteUrl} style={ctaButtonStyles}>
                  {emailContent.ctaText}
                </EmailButton>
              </Section>
            )}
          </Section>

          <Hr style={{ borderColor: '#eeeeee', margin: '0' }} />

          <Section style={footerSectionStyles}>
             <Text style={{ margin: '0 0 10px 0' }}>
              © {year} {brandData.companyName}. All rights reserved.
            </Text>
            <Text style={{ margin: '0 0 10px 0' }}>{brandData.address}</Text>
            <Text style={{ margin: '0 0 15px 0', lineHeight: '1.5' }}>
              <EmailLink href={brandData.websiteUrl} style={footerLinkStyles}>
                Visit our website
              </EmailLink>
              {' | '}
              <EmailLink href={`${brandData.websiteUrl}/unsubscribe`} style={footerLinkStyles}>
                Unsubscribe
              </EmailLink>
              {' | '}
              <EmailLink href={`${brandData.websiteUrl}/privacy`} style={footerLinkStyles}>
                Privacy Policy
              </EmailLink>
            </Text>
            {(brandData.socialLinks.facebook || brandData.socialLinks.instagram || brandData.socialLinks.twitter || brandData.socialLinks.linkedin) && (
              <Section style={socialLinksContainerStyles}>
                {brandData.socialLinks.facebook && <EmailLink href={brandData.socialLinks.facebook} style={socialLinkStyles}>FB</EmailLink>}
                {brandData.socialLinks.instagram && <EmailLink href={brandData.socialLinks.instagram} style={socialLinkStyles}>IG</EmailLink>}
                {brandData.socialLinks.twitter && <EmailLink href={brandData.socialLinks.twitter} style={socialLinkStyles}>X</EmailLink>}
                {brandData.socialLinks.linkedin && <EmailLink href={brandData.socialLinks.linkedin} style={socialLinkStyles}>LI</EmailLink>}
              </Section>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
=======
  templateCategory,
}) => {
  // This is a placeholder.
  // It will be replaced with the actual email structure using custom components
  // from src/components/email/ once those are provided.
  return (
    <div>
      <h1>Email Template: {emailContent.subject || 'Generic Email'}</h1>
      <p>Category: {templateCategory || 'N/A'}</p>
      <p>Brand: {brandData.companyName || 'Your Brand'}</p>
      <hr />
      <p>Greeting: {emailContent.greeting || 'Hello,'}</p>
      <p>Body: {emailContent.body || 'This is the email body.'}</p>
      {emailContent.ctaText && <button>{emailContent.ctaText}</button>}
      <hr />
      <p>Footer: © {brandData.companyName || 'Your Brand'}</p>
    </div>
>>>>>>> MeastroMerketReactMailProblem
  );
};

export default GenericBrandEmail;
*/
