import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'RONIN — Intelligence Before the Crowd',
  description: 'RONIN is an on-chain intelligence service built around disciplined research, verification, and early opportunity discovery.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
