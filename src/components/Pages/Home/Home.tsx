import Link from 'next/link';

import { Logo } from '@/components/ui';

export const HomePage = () => {
  return (
    <main className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#7c2d12] to-[#4c1d95]">
      <div className="px-8 text-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#505050] p-3 shadow-2xl">
            <Logo />
          </div>
        </div>

        <h1 className="mb-4">Album Oriented Random-play</h1>

        <p className="mx-auto mb-8 max-w-md text-[var(--spotify-white)]">
          アルバム単位でお気に入りの音楽をランダム再生。
          <br />
          アルバムに込められた世界観をそのままに。
        </p>

        <Link
          href="/auth/signin"
          className="inline-block rounded-full bg-[var(--spotify-green)] px-12 py-4 font-bold tracking-wide transition-all hover:scale-105 hover:bg-[var(--spotify-green-hover)]"
        >
          Spotifyでログイン
        </Link>
      </div>
    </main>
  );
};
