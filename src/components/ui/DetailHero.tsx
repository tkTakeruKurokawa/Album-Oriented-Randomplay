import Image from 'next/image';

import type { ReactNode } from 'react';

type DetailHeroVariant = 'album' | 'artist';

interface DetailHeroProps {
  imageUrl: string;
  imageAlt: string;
  variant?: DetailHeroVariant;
  children: ReactNode;
}

const imageShapeClasses: Record<DetailHeroVariant, string> = {
  album: 'rounded-lg',
  artist: 'rounded-full',
};

export const DetailHero = ({
  imageUrl,
  imageAlt,
  variant = 'album',
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
          className={`h-full w-full object-cover shadow-2xl ${imageShapeClasses[variant]}`}
        />
      </div>

      <div className="flex flex-1 flex-col justify-end">{children}</div>
    </div>
  );
};
