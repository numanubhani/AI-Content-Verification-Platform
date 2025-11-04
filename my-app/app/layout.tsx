import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { PWARegister } from '@/components/pwa-register';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import { FingerprintProvider } from '@/components/fingerprint-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'AI Content Verification Platform',
  description: 'Verify text, images, and videos for AI generation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0f0f10" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <FingerprintProvider>
            <PWARegister />
            <Header />
            <PWAInstallPrompt />
            <main className="mx-auto max-w-6xl px-4 py-8">
              {children}
            </main>
            <Footer />
          </FingerprintProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


