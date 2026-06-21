import { Play } from 'lucide-react';

import { IconButton } from './IconButton';

import type { ComponentProps } from 'react';

type PlayButtonSize = ComponentProps<typeof IconButton>['size'];

interface PlayButtonProps {
  size?: PlayButtonSize;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  iconSize?: number;
}

export const PlayButton = ({
  size = 'lg',
  onClick,
  ariaLabel = '再生',
  className = '',
  iconSize = 24,
}: PlayButtonProps) => {
  return (
    <IconButton
      size={size}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      <Play size={iconSize} className="ml-1 text-black" fill="black" />
    </IconButton>
  );
};
