import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RONIN — Intelligence Before The Crowd',
  description: 'Real-time on-chain intelligence, evidence and accountable predictions.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
