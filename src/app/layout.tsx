import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthProvider from '@/components/SessionProvider';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'アルバム指向ランダムプレイ',
  description: 'アルバム単位でランダム再生が可能なSpotifyアプリです',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // MSWの初期化（開発環境のみ）
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/mocks/browser')
        .then(({ initMocks }) => {
          initMocks();
        })
        .catch(console.error);
    }
  }, []);

  return (
    <html lang="ja">
      <body className={inter.className}>
        <ErrorBoundary>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
