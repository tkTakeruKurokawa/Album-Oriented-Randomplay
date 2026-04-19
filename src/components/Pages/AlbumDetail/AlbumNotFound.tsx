import { ErrorMessage } from '@/components/ui';

export const AlbumNotFound = () => {
  return (
    <ErrorMessage
      title="アルバムが見つかりません"
      linkHref="/dashboard"
      linkLabel="ダッシュボードに戻る"
    />
  );
};
