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

interface MockBrandData {
  companyName: string;
  logoPlaceholderText: string; // e.g., "ArchStruct"
  logoUrl?: string; // Optional: URL to a real logo image
  address: string;
  websiteUrl: string;
  primaryColor: string; // e.g., "#007BFF"
  textColor: string; // e.g., "#333333"
  accentColor: string; // e.g., "#FF8C00"
  footerLinkColor: string; // e.g., "#0056b3"
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

interface EmailTextContent {
  subject: string;
  preheader?: string;
  greeting?: string;
  body: string; // Should contain \n\n for paragraphs and \n- for list items
  ctaText?: string;
  offer?: string;
}

interface GenericBrandEmailProps {
  brandData: MockBrandData;
  emailContent: EmailTextContent;
  templateCategory?: string;
}

// Helper to determine if text on a colored background should be light or dark
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

export const GenericBrandEmail: React.FC<Readonly<GenericBrandEmailProps>> = ({
  brandData,
  emailContent,
  templateCategory,
}) => {
  const year = new Date().getFullYear();
  const primaryTextColor = getContrastYIQ(brandData.primaryColor);
  const accentTextColor = getContrastYIQ(brandData.accentColor);

  // Define base styles
  const main = {
    backgroundColor: '#f0f2f5', // Light grey background for the email client window
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  };

  const container = {
    margin: '0 auto',
    padding: '0px',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const headerSection = {
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

  const contentSection = {
    padding: '20px 30px 30px 30px',
    color: brandData.textColor,
    fontSize: '16px',
    lineHeight: '1.7',
  };

  const subjectHeading = {
    color: brandData.primaryColor === '#ffffff' && brandData.textColor === '#ffffff' ? '#111827' : (brandData.primaryColor === '#ffffff' ? brandData.textColor : brandData.primaryColor),
    fontSize: '24px',
    fontWeight: 'bold' as const,
    margin: '0 0 10px 0',
  };
  
  const preheaderText = {
    fontSize: '13px',
    color: '#5f5f5f',
    margin: '0 0 20px 0',
    lineHeight: '1.5',
  };

  const buttonStyle = {
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
  };

  const footerSection = {
    padding: '20px 30px',
    textAlign: 'center' as const,
    fontSize: '12px',
    color: '#777777',
    borderTop: '1px solid #eaeaea',
    marginTop: '20px',
  };

  const footerLink = {
    color: brandData.footerLinkColor,
    textDecoration: 'underline',
    margin: '0 5px',
  };

  let heroImageSrc: string | null = null;
  let heroAltText = "Relevant hero image";
  const lowerCategory = templateCategory?.toLowerCase();

  if (['promotion', 'sales', 'product launch', 'welcome', 'onboarding', 're-engagement'].includes(lowerCategory || '')) {
    let heroText = "Special Offer!";
    if (lowerCategory === 'welcome' || lowerCategory === 'onboarding') heroText = "Welcome Aboard!";
    if (lowerCategory === 'product launch') heroText = "New Product Launch!";
    if (lowerCategory === 're-engagement') heroText = "We Miss You!";
    
    heroImageSrc = `https://placehold.co/540x200/${brandData.accentColor.replace('#','')}/${accentTextColor === 'white' ? 'FFFFFF' : '000000'}?text=${encodeURIComponent(heroText)}`;
    heroAltText = `${heroText} Banner`;
  }


  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Open Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/opensans/v27/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      {emailContent.preheader && <Preview>{emailContent.preheader}</Preview>}
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Link href={brandData.websiteUrl} style={logoStyle}>
              {brandData.logoUrl ? (
                <Img src={brandData.logoUrl} alt={`${brandData.companyName} Logo`} height="40" style={{ margin: '0 auto' }} />
              ) : (
                brandData.logoPlaceholderText || brandData.companyName
              )}
            </Link>
          </Section>

          <Section style={contentSection}>
            <Heading as="h1" style={subjectHeading}>{emailContent.subject}</Heading>
            
            {emailContent.preheader && (
                <Text style={preheaderText}>{emailContent.preheader}</Text>
            )}

            {emailContent.greeting && <Text style={{ ...contentSection, fontWeight: 'bold', marginBottom: '15px' }}>{emailContent.greeting}</Text>}
            
            {heroImageSrc && (
                 <Section style={{ textAlign: 'center' as const, margin: '20px 0' }}>
                    <Img src={heroImageSrc} alt={heroAltText} width="100%" style={{ borderRadius: '4px', maxWidth: '100%', height: 'auto' }} />
                </Section>
            )}
            
            {emailContent.body.split('\n\n').map((paragraph, paraIndex) => (
              <Text key={`para-${paraIndex}`} style={{ margin: '0 0 15px 0' }}>
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
              <Section style={{ backgroundColor: `${brandData.primaryColor}20`, padding: '15px 20px', borderRadius: '5px', margin: '20px 0', border: `1px dashed ${brandData.primaryColor}` }}>
                <Text style={{ color: brandData.primaryColor, margin: 0, fontWeight: 'bold' as const }}>{emailContent.offer}</Text>
              </Section>
            )}

            {emailContent.ctaText && (
              <Section style={{ textAlign: 'center' as const, margin: '30px 0' }}>
                <Button href={brandData.websiteUrl} style={buttonStyle}>
                  {emailContent.ctaText}
                </Button>
              </Section>
            )}
          </Section>

          <Hr style={{ borderColor: '#eaeaea', margin: '0' }} />

          <Section style={footerSection}>
             <Text style={{ margin: '0 0 10px 0' }}>
              &copy; {year} {brandData.companyName}. All rights reserved.
            </Text>
            <Text style={{ margin: '0 0 10px 0' }}>{brandData.address}</Text>
            <Text style={{ margin: '0 0 15px 0', lineHeight: '1.5' }}>
              <Link href={brandData.websiteUrl} style={footerLink}>
                Visit our website
              </Link>
              {' | '}
              <Link href={`${brandData.websiteUrl}/unsubscribe`} style={footerLink}>
                Unsubscribe
              </Link>
              {' | '}
              <Link href={`${brandData.websiteUrl}/privacy`} style={footerLink}>
                Privacy Policy
              </Link>
            </Text>
            {(brandData.socialLinks.facebook || brandData.socialLinks.instagram || brandData.socialLinks.twitter || brandData.socialLinks.linkedin) && (
              <Section style={{ margin: '15px 0 10px' }}>
                {brandData.socialLinks.facebook && <Link href={brandData.socialLinks.facebook} style={footerLink}>FB</Link>}
                {brandData.socialLinks.instagram && <Link href={brandData.socialLinks.instagram} style={footerLink}>IG</Link>}
                {brandData.socialLinks.twitter && <Link href={brandData.socialLinks.twitter} style={footerLink}>X</Link>}
                {brandData.socialLinks.linkedin && <Link href={brandData.socialLinks.linkedin} style={footerLink}>LI</Link>}
              </Section>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default GenericBrandEmail;
