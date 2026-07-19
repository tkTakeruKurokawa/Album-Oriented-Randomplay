import { ErrorMessage, PageMain } from '@/components/ui';

export const ArtistNotFound = () => {
  return (
    <PageMain className="flex items-center justify-center bg-[var(--spotify-dark)]">
      <ErrorMessage
        title="アーティストが見つかりません"
        linkHref="/dashboard"
        linkLabel="ダッシュボードに戻る"
      />
    </PageMain>
  );
};
