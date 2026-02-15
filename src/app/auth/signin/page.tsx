'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { Suspense, useEffect, useState } from 'react';

const Logo = () => {
  return (
    <svg
      width={512}
      height={512}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="bgGrad"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(256 220) rotate(90) scale(260)"
        >
          <stop offset="0" stopColor="#515151" />
          <stop offset="0.55" stopColor="#363636" />
          <stop offset="1" stopColor="#252525" />
        </radialGradient>
        <radialGradient
          id="vinylGlow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8 12) rotate(90) scale(96)"
        >
          <stop offset="0" stopColor="#222" />
          <stop offset="1" stopColor="#111" />
        </radialGradient>
        <linearGradient
          id="frontCardGrad"
          x1="-104"
          y1="-100"
          x2="88"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5A5D5B" />
          <stop offset="1" stopColor="#4A4D4B" />
        </linearGradient>
      </defs>

      <circle cx="256" cy="256" r="248" fill="url(#bgGrad)" />

      <g transform="translate(252,256)">
        <g transform="translate(92,8)">
          <circle cx="0" cy="0" r="84" fill="url(#vinylGlow)" />
          {[73, 63, 53, 43, 33].map((r) => (
            <circle
              key={r}
              cx="0"
              cy="0"
              r={r}
              fill="none"
              stroke="#4E5150"
              strokeWidth="2"
              opacity="0.82"
            />
          ))}
          <circle cx="0" cy="0" r="20" fill="#8A8D8B" opacity="0.55" />
          <circle cx="0" cy="0" r="9" fill="#262827" />
        </g>

        <rect
          x="-146"
          y="-106"
          width="204"
          height="212"
          rx="10"
          fill="#171A19"
          opacity="0.82"
          transform="rotate(-6, -146, 0)"
        />
        <rect
          x="-129"
          y="-106"
          width="204"
          height="212"
          rx="10"
          fill="#262927"
          opacity="0.88"
          transform="rotate(-3, -129, 0)"
        />

        <rect
          x="-112"
          y="-106"
          width="204"
          height="212"
          rx="12"
          fill="url(#frontCardGrad)"
        />

        <g transform="translate(-12,-4)">
          <path
            d="M-54 50 H -30 C -14 50 -6 30 4 18 C 14 6 24 -14 42 -14 H 66"
            stroke="#77DE82"
            strokeWidth="19"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M-54 -14 H -30 C -14 -14 -6 6 4 18 C 14 30 24 50 42 50 H 66"
            stroke="#77DE82"
            strokeWidth="19"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M45 -35 L 76 -14 L 45 7"
            stroke="#77DE82"
            strokeWidth="19"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M45 29 L 76 50 L 45 71"
            stroke="#77DE82"
            strokeWidth="19"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
};

// SearchParamsコンポーネントを分離
function SearchParamsWrapper({
  children,
}: {
  children: (callbackUrl: string) => React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  // セッションがある場合はダッシュボードにリダイレクト
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent>{children}</SearchParamsComponent>
    </Suspense>
  );
}

function SearchParamsComponent({
  children,
}: {
  children: (callbackUrl: string) => React.ReactNode;
}) {
  const [callbackUrl, setCallbackUrl] = useState('/dashboard');

  useEffect(() => {
    // クライアントサイドでのみURLSearchParamsを使用
    const searchParams = new URLSearchParams(globalThis.location.search);
    const url = searchParams.get('callbackUrl');
    if (url) {
      setCallbackUrl(url);
    }
  }, []);

  return <>{children(callbackUrl)}</>;
}

export default function SignIn() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Head>
        <title>アルバム指向ランダムプレイ - Spotifyログイン</title>
      </Head>

      <SearchParamsWrapper>
        {(callbackUrl) => (
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
                  void signIn('spotify', { callbackUrl });
                }}
                className="rounded-full bg-[var(--spotify-green)] px-12 py-4 text-lg font-semibold tracking-wide text-[var(--spotify-black)] transition-all hover:scale-105 hover:bg-[var(--spotify-green-hover)]"
              >
                Spotifyでログイン
              </button>
            </div>
          </div>
        )}
      </SearchParamsWrapper>
    </div>
  );
}
