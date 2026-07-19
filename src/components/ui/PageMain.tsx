import type { ComponentPropsWithoutRef } from 'react';

type PageMainProps = ComponentPropsWithoutRef<'main'>;

export const PageMain = ({ className, children, ...props }: PageMainProps) => {
  const baseClassName =
    'page-with-fixed-header h-dvh overflow-y-auto overscroll-y-contain';
  const mergedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <main className={mergedClassName} {...props}>
      {children}
    </main>
  );
};
