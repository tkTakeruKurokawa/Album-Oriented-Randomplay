import { Heart } from 'lucide-react';

import { IconButton } from './IconButton';

interface FavoriteButtonProps {
  isFavorited?: boolean;
  onClick?: () => void;
}

export const FavoriteButton = ({
  isFavorited = false,
  onClick,
}: FavoriteButtonProps) => {
  return (
    <IconButton
      variant="ghost"
      onClick={onClick}
      aria-label={isFavorited ? 'お気に入りから削除' : 'お気に入りに追加'}
    >
      <Heart
        size={32}
        className={
          isFavorited
            ? 'text-[var(--spotify-green)]'
            : 'text-[var(--spotify-light-gray)]'
        }
        fill={isFavorited ? 'currentColor' : 'none'}
      />
    </IconButton>
  );
};
