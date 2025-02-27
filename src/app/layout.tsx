import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokemon Explorer',
  description: 'Explore the world of Pokemon with our interactive web app',
  icons: {
    icon: '/public/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}