import { ErrorMessage } from '@/components/ui';

export const ArtistNotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--spotify-dark)]">
      <ErrorMessage
        title="アーティストが見つかりません"
        linkHref="/dashboard"
        linkLabel="ダッシュボードに戻る"
      />
    </main>
  );
};
