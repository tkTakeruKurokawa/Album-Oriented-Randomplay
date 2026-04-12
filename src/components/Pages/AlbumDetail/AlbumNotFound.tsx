import Link from 'next/link';

export const AlbumNotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--spotify-dark)]">
      <div className="text-center">
        <h1 className="mb-4 text-2xl">アルバムが見つかりません</h1>
        <Link
          href="/dashboard"
          className="text-[var(--spotify-green)] hover:underline"
        >
          ダッシュボードに戻る
        </Link>
      </div>
    </main>
  );
};
