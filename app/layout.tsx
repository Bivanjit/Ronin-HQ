import type { Metadata } from 'next';
import { ToastProvider } from '@/lib/toast';
import SiteHeader from '@/components/shell/SiteHeader';
import SiteFooter from '@/components/shell/SiteFooter';
import DisclosureBand from '@/components/shell/DisclosureBand';
import CookiePreferences from '@/components/consent/CookiePreferences';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'RONIN HQ — Predictive On-Chain Intelligence',
  description:
    'Predictive on-chain intelligence. Illustrative research interface for demonstration purposes only.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>

          <DisclosureBand />
          <SiteHeader />

          <main id="main" className="page-content">
            {children}
          </main>

          <SiteFooter />
        </ToastProvider>

        <CookiePreferences />
      </body>
    </html>
  );
}
