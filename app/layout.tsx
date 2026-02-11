import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'YouApp | Profile & Social',
  description: 'A mobile-first web application test.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className={cn(
          inter.className, 
          "bg-[#09141A] text-white min-h-screen antialiased selection:bg-brand-gold/30"
        )}
      >
        <div className="relative max-w-md mx-auto min-h-screen shadow-2xl overflow-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}