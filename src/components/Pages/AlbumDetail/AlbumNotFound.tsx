import { ErrorMessage, PageMain } from '@/components/ui';

export const AlbumNotFound = () => {
  return (
    <PageMain className="flex items-center justify-center bg-[var(--spotify-dark)]">
      <ErrorMessage
        title="アルバムが見つかりません"
        linkHref="/dashboard"
        linkLabel="ダッシュボードに戻る"
      />
    </PageMain>
  );
};
