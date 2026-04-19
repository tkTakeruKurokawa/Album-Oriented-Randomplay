import { Shuffle } from 'lucide-react';

import { IconButton } from './IconButton';

import type { ComponentProps } from 'react';

type ShuffleButtonSize = ComponentProps<typeof IconButton>['size'];

interface ShuffleButtonProps {
  size?: ShuffleButtonSize;
  onClick?: () => void;
  className?: string;
}

export const ShuffleButton = ({
  size = 'md',
  onClick,
  className = '',
}: ShuffleButtonProps) => {
  return (
    <IconButton
      size={size}
      onClick={onClick}
      aria-label="シャッフル再生"
      className={className}
    >
      <Shuffle size={24} className="text-black" />
    </IconButton>
  );
};
