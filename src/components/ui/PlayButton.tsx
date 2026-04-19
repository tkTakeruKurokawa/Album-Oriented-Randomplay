import { Play } from 'lucide-react';

import { IconButton } from './IconButton';

import type { ComponentProps } from 'react';

type PlayButtonSize = ComponentProps<typeof IconButton>['size'];

interface PlayButtonProps {
  size?: PlayButtonSize;
  onClick?: () => void;
}

export const PlayButton = ({ size = 'lg', onClick }: PlayButtonProps) => {
  return (
    <IconButton size={size} onClick={onClick} aria-label="再生">
      <Play size={24} className="ml-1 text-black" fill="black" />
    </IconButton>
  );
};
