
// This file's content is temporarily commented out/removed to resolve 'react-email' module not found issues.
// It will be restored or replaced with a custom email component solution later.

/*
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Font,
} from '@react-email/components';
import * as React from 'react';

// Helper to determine if text on a colored background should be light or dark
const getContrastYIQ = (hexcolor: string): 'black' | 'white' => {
  if (!hexcolor || hexcolor.length < 6) return 'black'; // Default to black for invalid/short hex
  const color = hexcolor.charAt(0) === '#' ? hexcolor.substring(1, 7) : hexcolor.substring(0, 6);
  if (color.length < 6) return 'black'; // Default if hex is too short after stripping #

  try {
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  } catch (e) {
    console.error("Error parsing color for contrast:", hexcolor, e);
    return 'black'; // Default to black on error
  }
};


interface BrandData {
  companyName: string;
  logoPlaceholderText: string; 
  logoUrl?: string; 
  address: string;
  websiteUrl: string;
  primaryColor: string; 
  textColor: string;    
  accentColor: string;  
  footerLinkColor: string; 
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

interface EmailContent {
  subject: string;
  preheader?: string;
  greeting?: string;
  body: string; 
  ctaText?: string;
  offer?: string;
}

interface GenericBrandEmailProps {
  brandData: BrandData;
  emailContent: EmailContent;
  templateCategory?: string;
}

export const GenericBrandEmail: React.FC<Readonly<GenericBrandEmailProps>> = ({
  brandData,
  emailContent,
  templateCategory,
}) => {
  const year = new Date().getFullYear();
  
  const primaryTextColor = getContrastYIQ(brandData.primaryColor);
  const accentTextColor = getContrastYIQ(brandData.accentColor);

  const main = {
    backgroundColor: '#f0f2f5',
    fontFamily: "'Open Sans', 'Roboto', 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  };

  const container = {
    margin: '0 auto',
    padding: '0px',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden' as const,
  };

  const headerSectionStyle = {
    backgroundColor: brandData.primaryColor,
    padding: '24px 30px',
    textAlign: 'center' as const,
  };

  const logoStyle = {
    color: primaryTextColor,
    fontSize: '28px',
    fontWeight: 'bold' as const,
    textDecoration: 'none',
  };

  const contentSectionStyle = {
    padding: '20px 30px 30px 30px',
    color: brandData.textColor,
    fontSize: '16px',
    lineHeight: '1.7',
  };

  const subjectHeadingStyle = {
    color: brandData.primaryColor === '#ffffff' && brandData.textColor === '#ffffff' ? '#111827' : (brandData.primaryColor === '#ffffff' ? brandData.textColor : brandData.primaryColor),
    fontSize: '24px',
    fontWeight: 'bold' as const,
    margin: '0 0 10px 0',
    lineHeight: '1.3',
  };
  
  const preheaderTextStyle = {
    fontSize: '13px',
    color: '#5f5f5f',
    margin: '0 0 20px 0',
    lineHeight: '1.5',
  };

  const textStyle = {
    color: brandData.textColor,
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 15px 0',
  };

  const greetingStyle = {
    ...textStyle,
    fontWeight: 'bold' as const,
    marginBottom: '15px',
  };

  const ctaButtonStyle = {
    backgroundColor: brandData.accentColor,
    color: accentTextColor,
    padding: '12px 25px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold' as const,
    display: 'inline-block',
    textAlign: 'center' as const,
    fontSize: '16px',
    border: 'none',
    lineHeight: '1.5', // Ensure line height is appropriate for button text
  };

  const offerSectionStyle = {
     backgroundColor: `${brandData.primaryColor}20`, // Assuming primaryColor is hex, add alpha
     padding: '15px 20px', 
     borderRadius: '5px', 
     margin: '20px 0', 
     border: `1px dashed ${brandData.primaryColor}`
  };
  
  const offerTextStyle = {
    color: brandData.primaryColor, // Text color that contrasts with the lightened primary
    margin: 0, 
    fontWeight: 'bold' as const,
    fontSize: '16px',
    lineHeight: '1.5',
  };


  const footerSectionStyle = {
    padding: '20px 30px',
    textAlign: 'center' as const,
    fontSize: '12px',
    color: '#777777',
    borderTop: '1px solid #eaeaea',
    marginTop: '20px',
  };

  const footerLinkStyle = {
    color: brandData.footerLinkColor,
    textDecoration: 'underline',
    margin: '0 5px',
  };

  const socialLinkStyle = {
    ...footerLinkStyle,
    margin: '0 8px',
    display: 'inline-block',
  };

  let heroImageSrc: string | null = null;
  let heroAltText = "Relevant hero image";
  const lowerCategory = templateCategory?.toLowerCase();

  if (['promotion', 'sales', 'product launch', 'welcome', 'onboarding', 're-engagement'].includes(lowerCategory || '')) {
    let heroText = "Special Offer!";
    if (lowerCategory === 'welcome' || lowerCategory === 'onboarding') heroText = "Welcome Aboard!";
    if (lowerCategory === 'product launch') heroText = "New Product Launch!";
    if (lowerCategory === 're-engagement') heroText = "We Miss You!";
    
    const accentColorHex = brandData.accentColor.replace('#','');
    const heroTextColor = getContrastYIQ(brandData.accentColor) === 'white' ? 'FFFFFF' : '000000';
    heroImageSrc = `https://placehold.co/540x200/${accentColorHex}/${heroTextColor}?text=${encodeURIComponent(heroText)}`;
    heroAltText = `${heroText} Banner`;
  }


  return (
    <Html lang="en">
      <Head>
        <Font fontFamily="Open Sans" fallbackFontFamily="Arial" webFont={{ url: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2', format: 'woff2' }} fontWeight={400} fontStyle="normal" />
        <Font fontFamily="Roboto" fallbackFontFamily="Arial" webFont={{ url: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2', format: 'woff2' }} fontWeight={400} fontStyle="normal" />
        <Font fontFamily="Lato" fallbackFontFamily="Arial" webFont={{ url: 'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.woff2', format: 'woff2' }} fontWeight={400} fontStyle="normal" />
      </Head>
      {emailContent.preheader && <Preview>{emailContent.preheader}</Preview>}
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSectionStyle}>
            <Link href={brandData.websiteUrl} style={logoStyle}>
              {brandData.logoUrl ? (
                <Img src={brandData.logoUrl} alt={`${brandData.companyName} Logo`} height="40" style={{ margin: '0 auto' }} />
              ) : (
                brandData.logoPlaceholderText || brandData.companyName
              )}
            </Link>
          </Section>

          <Section style={contentSectionStyle}>
            <Heading as="h1" style={subjectHeadingStyle}>{emailContent.subject}</Heading>
            
            {emailContent.preheader && (
                <Text style={preheaderTextStyle}>{emailContent.preheader}</Text>
            )}

            {emailContent.greeting && <Text style={greetingStyle}>{emailContent.greeting}</Text>}
            
            {heroImageSrc && (
                 <Section style={{ textAlign: 'center' as const, margin: '20px 0' }}>
                    <Img src={heroImageSrc} alt={heroAltText} width="100%" style={{ borderRadius: '4px', maxWidth: '100%', height: 'auto' }} />
                </Section>
            )}
            
            {emailContent.body.split('\n\n').map((paragraph, paraIndex) => (
              <Text key={`para-${paraIndex}`} style={textStyle}>
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
              <Section style={offerSectionStyle}>
                <Text style={offerTextStyle}>{emailContent.offer}</Text>
              </Section>
            )}

            {emailContent.ctaText && (
              <Section style={{ textAlign: 'center' as const, margin: '30px 0' }}>
                <Button href={brandData.websiteUrl} style={ctaButtonStyle}>
                  {emailContent.ctaText}
                </Button>
              </Section>
            )}
          </Section>

          <Hr style={{ borderColor: '#eaeaea', margin: '0', borderBottomWidth: '1px' }} />

          <Section style={footerSectionStyle}>
             <Text style={{ margin: '0 0 10px 0' }}>
              &copy; {year} {brandData.companyName}. All rights reserved.
            </Text>
            <Text style={{ margin: '0 0 10px 0' }}>{brandData.address}</Text>
            <Text style={{ margin: '0 0 15px 0', lineHeight: '1.5' }}>
              <Link href={brandData.websiteUrl} style={footerLinkStyle}>
                Visit our website
              </Link>
              {' | '}
              <Link href={`${brandData.websiteUrl}/unsubscribe`} style={footerLinkStyle}>
                Unsubscribe
              </Link>
              {' | '}
              <Link href={`${brandData.websiteUrl}/privacy`} style={footerLinkStyle}>
                Privacy Policy
              </Link>
            </Text>
            {(brandData.socialLinks.facebook || brandData.socialLinks.instagram || brandData.socialLinks.twitter || brandData.socialLinks.linkedin) && (
              <Section style={{ margin: '15px 0 10px' }}>
                {brandData.socialLinks.facebook && <Link href={brandData.socialLinks.facebook} style={socialLinkStyle}>FB</Link>}
                {brandData.socialLinks.instagram && <Link href={brandData.socialLinks.instagram} style={socialLinkStyle}>IG</Link>}
                {brandData.socialLinks.twitter && <Link href={brandData.socialLinks.twitter} style={socialLinkStyle}>X</Link>}
                {brandData.socialLinks.linkedin && <Link href={brandData.socialLinks.linkedin} style={socialLinkStyle}>LI</Link>}
              </Section>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// export default GenericBrandEmail; // Default export might cause issues if not handled correctly by Next.js build for this specific file usage
*/
export {} // Add an empty export to make this a module if all content is commented out

    