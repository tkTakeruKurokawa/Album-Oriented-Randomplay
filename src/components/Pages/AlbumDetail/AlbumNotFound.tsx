import { useRouter } from 'next/navigation';

export const AlbumNotFound = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--spotify-dark)]">
      <div className="text-center">
        <h1 className="mb-4 text-2xl">アルバムが見つかりません</h1>
        <button
          type="button"
          onClick={() => {
            router.push('/dashboard');
          }}
          className="text-[var(--spotify-green)] hover:underline"
        >
          ダッシュボードに戻る
        </button>
      </div>
    </main>
  );
};
