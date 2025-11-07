import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { PWARegister } from '@/components/pwa-register';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import { ErrorBoundary } from '@/components/error-boundary';
import { SentryInit } from '@/components/sentry-init';
import Script from 'next/script';
import { FingerprintProvider } from '@/components/fingerprint-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'AI Content Verification Platform',
  description: 'Verify text, images, and videos for AI generation.',
  openGraph: {
    title: 'AI Content Verification Platform',
    description: 'Verify text, images, and videos for AI generation.',
    url: 'https://aiverify.example.com',
    siteName: 'AI Verify',
    images: [{ url: '/icons/icon-512.svg', width: 512, height: 512 }],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Content Verification Platform',
    description: 'Verify text, images, and videos for AI generation.',
    images: ['/icons/icon-512.svg']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0f0f10" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <ThemeProvider>
          <FingerprintProvider>
            <PWARegister />
            <Header />
            <PWAInstallPrompt />
            <SentryInit />
            <main className="mx-auto max-w-6xl px-4 py-8">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            <Footer />
          </FingerprintProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


