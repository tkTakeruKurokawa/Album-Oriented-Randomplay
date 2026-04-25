import { ErrorMessage } from '@/components/ui';

export const ArtistNotFound = () => {
  return (
    <ErrorMessage
      title="アーティストが見つかりません"
      linkHref="/dashboard"
      linkLabel="ダッシュボードに戻る"
    />
  );
};
