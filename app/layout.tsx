import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'YouApp - Profile',
  description: 'Mobile Web App for YouApp Test',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        inter.className,
        "bg-[#09141A] text-white min-h-screen antialiased"
      )}>
        {/* We wrap everything in a max-width container to mimic a mobile screen on desktop */}
        <div className="max-w-md mx-auto min-h-screen bg-gradient-to-tr from-[#09141A] via-[#0D1D23] to-[#09141A] shadow-2xl overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}