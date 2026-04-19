import type { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--spotify-green)] text-[var(--spotify-black)] hover:bg-[var(--spotify-green-hover)]',
  ghost: 'bg-transparent hover:bg-white/10',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-6 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-12 py-4 text-lg',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`rounded-full font-semibold tracking-wide transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};
