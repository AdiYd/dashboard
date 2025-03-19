import type { Metadata } from 'next';

import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { Inter, Roboto_Mono, Playfair_Display, Open_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const seoData = {
  title: 'Webly - AI powered websites',
  description: 'Boost your online presence with AI powered websites from Webly.',
  keywords: 'Webly, AI powered websites, SEO, website builder',
};

export const metadata: Metadata = {
  title: 'Professional Dashboard',
  description: 'A professional dashboard template with Next.js, Tailwind CSS, and Shadcn UI',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Generic SEO */}
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />

        {/* Additional preconnects or external Google font links if desired */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
