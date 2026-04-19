import Image from 'next/image';

import type { ReactNode } from 'react';

interface DetailHeroProps {
  imageUrl: string;
  imageAlt: string;
  children: ReactNode;
}

export const DetailHero = ({
  imageUrl,
  imageAlt,
  children,
}: DetailHeroProps) => {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:gap-8">
      <div className="mx-auto w-full max-w-[280px] shrink-0 lg:mx-0 lg:h-64 lg:w-64">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={300}
          height={300}
          className="h-full w-full rounded-lg object-cover shadow-2xl"
        />
      </div>

      <div className="flex flex-1 flex-col justify-end">{children}</div>
    </div>
  );
};
