import { Grid } from './Grid';
import { MediaCard } from './MediaCard';

type FavoriteMediaVariant = 'album' | 'artist';

interface FavoriteMediaItem {
  id: string;
  name: string;
  imageUrl: string;
  href: string;
  subtitle?: string;
}

interface FavoriteMediaListScreenProps {
  title: string;
  countLabel: string;
  variant: FavoriteMediaVariant;
  items: FavoriteMediaItem[];
}

export const FavoriteMediaListScreen = ({
  title,
  countLabel,
  variant,
  items,
}: FavoriteMediaListScreenProps) => {
  return (
    <main className="flex-1 overflow-auto bg-gradient-to-b from-[#1a1a1a] to-[var(--spotify-dark)]">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="mb-2 text-3xl lg:mb-3 lg:text-5xl">{title}</h1>
          <p className="text-sm text-[var(--spotify-light-gray)] lg:text-base">
            {countLabel}
          </p>
        </div>

        <div className="pb-4">
          <Grid>
            {items.map((item) => (
              <MediaCard
                key={item.id}
                href={item.href}
                imageUrl={item.imageUrl}
                variant={variant}
                title={item.name}
                subtitle={item.subtitle}
              />
            ))}
          </Grid>
        </div>
      </div>
    </main>
  );
};
