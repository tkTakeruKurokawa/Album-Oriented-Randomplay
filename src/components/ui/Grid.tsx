import { Children, type ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
}

export const Grid = ({ children }: GridProps) => {
  return (
    <ul className="grid list-none grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
      {Children.map(children, (child) =>
        child == null ? null : <li>{child}</li>
      )}
    </ul>
  );
};
