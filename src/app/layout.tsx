import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import ErrorBoundary from '@/components/error/ErrorBoundary';
import { AuthProvider } from '@/lib/app-providers';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'アルバム指向ランダムプレイ',
  description: 'アルバム単位でランダム再生が可能なSpotifyアプリです',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
