import { ErrorMessage } from '@/components/ui';

export const AlbumNotFound = () => {
  return (
    <main className="page-with-fixed-header flex items-center justify-center bg-[var(--spotify-dark)]">
      <ErrorMessage
        title="アルバムが見つかりません"
        linkHref="/dashboard"
        linkLabel="ダッシュボードに戻る"
      />
    </main>
  );
};
