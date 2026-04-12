import type { Metadata } from 'next';

import { SignInPage } from '@/components/Pages/SignIn/SignIn';

export const metadata: Metadata = {
  title: 'ログイン | アルバム指向ランダムプレイ',
  description:
    'Spotifyアカウントでログインして、アルバム単位のランダム再生を始めましょう。',
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return <SignInPage />;
};

export default Page;
