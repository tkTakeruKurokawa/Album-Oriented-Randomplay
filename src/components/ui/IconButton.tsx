import type { ComponentProps } from 'react';

type IconButtonVariant = 'primary' | 'ghost';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends ComponentProps<'button'> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const variantClasses: Record<IconButtonVariant, string> = {
  primary: 'rounded-full bg-[var(--spotify-green)] shadow-lg hover:scale-105',
  ghost: 'hover:scale-110',
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14',
};

export const IconButton = ({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};
