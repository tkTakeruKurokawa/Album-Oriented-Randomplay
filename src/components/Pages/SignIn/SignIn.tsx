'use client';

import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

import { Button, Logo } from '@/components/ui';

export const SignInPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#7c2d12] to-[#4c1d95]">
      <section className="px-8 text-center">
        <header className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-23 w-23 items-center justify-center rounded-full">
            <Logo />
          </div>
        </header>

        <h1 className="mb-4 text-4xl font-bold text-[var(--spotify-white)]">
          Album Oriented Random-play
        </h1>

        <p className="mx-auto mb-8 max-w-md text-lg text-[var(--spotify-light-gray)]">
          アルバム単位でお気に入りの音楽をランダム再生。
          <br />
          アルバムに込められた世界観をそのままに。
        </p>

        <Button
          size="lg"
          onClick={() => {
            void signIn('spotify', { callbackUrl: '/dashboard' });
          }}
        >
          Spotifyでログイン
        </Button>
      </section>
    </main>
  );
};
