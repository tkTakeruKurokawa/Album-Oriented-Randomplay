import { Shuffle } from 'lucide-react';

import { IconButton } from './IconButton';

import type { ComponentProps } from 'react';

type ShuffleButtonSize = ComponentProps<typeof IconButton>['size'];

interface ShuffleButtonProps {
  size?: ShuffleButtonSize;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
}

export const ShuffleButton = ({
  size = 'md',
  onClick,
  ariaLabel = 'シャッフル再生',
  className = '',
  disabled = false,
}: ShuffleButtonProps) => {
  return (
    <IconButton
      size={size}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      disabled={disabled}
    >
      <Shuffle size={24} className="text-black" />
    </IconButton>
  );
};
