'use client';

import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

import { Logo } from './Logo';

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
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#7c2d12] to-[#4c1d95]">
        <div className="px-8 text-center">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-23 w-23 items-center justify-center rounded-full">
              <Logo />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-[var(--spotify-white)]">
            Album Oriented Random-play
          </h1>

          <p className="mx-auto mb-8 max-w-md text-lg text-[var(--spotify-light-gray)]">
            アルバム単位でお気に入りの音楽をランダム再生。
            <br />
            アルバムに込められた世界観をそのままに。
          </p>

          <button
            onClick={() => {
              void signIn('spotify', { callbackUrl: '/dashboard' });
            }}
            className="rounded-full bg-[var(--spotify-green)] px-12 py-4 text-lg font-semibold tracking-wide text-[var(--spotify-black)] transition-all hover:scale-105 hover:bg-[var(--spotify-green-hover)]"
          >
            Spotifyでログイン
          </button>
        </div>
      </div>
    </div>
  );
};
