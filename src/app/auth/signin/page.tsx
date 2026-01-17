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
    >
      {/* 背景のダークグレー円 */}
      <circle cx="256" cy="256" r="250" fill="#333330" />

      {/* ロゴユニット全体のバランス調整 */}
      <g transform="translate(250, 256)">
        {/* 1. 右側のレコード盤 (カードの背後に隠れる) */}
        <g transform="translate(100, 0)">
          <circle cx="0" cy="0" r="85" fill="#111" />
          {/* レコードの溝: 明るさを上げ、不透明度を調整して視認性を向上 */}
          {[75, 65, 55, 45, 35].map((r) => (
            <circle
              key={r}
              cx="0"
              cy="0"
              r={r}
              fill="none"
              stroke="#444"
              strokeWidth="1.8"
              opacity="0.8"
            />
          ))}
          {/* 中心部 */}
          <circle cx="0" cy="0" r="15" fill="#333" />
          <circle cx="0" cy="0" r="5" fill="#111" />
        </g>

        {/* 2. 背面のアルバムケース群（色を明るく調整） */}
        {/* 最背面: 色を #1A1A1A から #2A2A28 に明るく変更 */}
        <rect
          x="-135"
          y="-100"
          width="200"
          height="200"
          rx="6"
          fill="#2A2A28"
          transform="rotate(-4, -135, 0)"
        />
        {/* 中間面: 色を #262624 から #363633 に明るく変更 */}
        <rect
          x="-120"
          y="-100"
          width="200"
          height="200"
          rx="6"
          fill="#363633"
          transform="rotate(-2, -120, 0)"
        />

        {/* 3. メインの前面カード */}
        <rect
          x="-105"
          y="-100"
          width="200"
          height="200"
          rx="6"
          fill="#444440"
        />

        {/* 4. シャッフルアイコン (前面カードの中央に配置) */}
        <g transform="translate(-5, 0) scale(0.95)">
          <g transform="translate(-75, -75)">
            {/* 下から上への矢印 */}
            <path
              d="M20 110 C 60 110, 90 40, 130 40"
              stroke="#4ADE80"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />
            {/* 上から下への矢印 */}
            <path
              d="M20 40 C 60 40, 90 110, 130 110"
              stroke="#4ADE80"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />

            {/* 矢arrow先端 (右上) */}
            <path
              d="M108 25 L 135 40 L 108 55"
              stroke="#4ADE80"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* 矢印の先端 (右下) */}
            <path
              d="M108 95 L 135 110 L 108 125"
              stroke="#4ADE80"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
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
    <div className="flex min-h-screen w-full items-center justify-center bg-black p-4">
      <Head>
        <title>アルバム指向ランダムプレイ - Spotifyログイン</title>
      </Head>

      <SearchParamsWrapper>
        {(callbackUrl) => (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#7c2d12] to-[#4c1d95]">
            <div className="px-8 text-center">
              <div className="mb-8 flex items-center justify-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#505050] p-3 shadow-2xl">
                  <Logo />
                </div>
              </div>

              <h1 className="mb-4 text-4xl font-bold text-white">
                Album Oriented Random-play
              </h1>

              <p className="mx-auto mb-8 max-w-md text-lg text-white">
                アルバム単位でお気に入りの音楽をランダム再生。
                <br />
                アルバムに込められた世界観をそのままに。
              </p>

              <button
                onClick={() => {
                  void signIn('spotify', { callbackUrl });
                }}
                className="rounded-full bg-[var(--spotify-green)] px-12 py-4 text-lg font-semibold tracking-wide text-black transition-all hover:scale-105 hover:bg-[var(--spotify-green-hover)]"
              >
                Spotifyでログイン
              </button>

              <p className="mt-6 text-xs text-white opacity-60">
                このデモではモックデータを使用しています
              </p>
            </div>
          </div>
        )}
      </SearchParamsWrapper>
    </div>
  );
}
