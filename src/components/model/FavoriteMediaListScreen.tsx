import { Grid, MediaCard } from '@/components/ui';

type FavoriteMediaVariant = 'album' | 'artist';
type FavoriteMediaAction = 'play' | 'shuffle';
type FavoriteMediaActionMobileVisibility = 'always' | 'hidden';

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
  cardAction?: FavoriteMediaAction;
  cardActionMobileVisibility?: FavoriteMediaActionMobileVisibility;
}

export const FavoriteMediaListScreen = ({
  title,
  countLabel,
  variant,
  items,
  cardAction,
  cardActionMobileVisibility,
}: FavoriteMediaListScreenProps) => {
  return (
    <section>
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
                action={cardAction}
                actionMobileVisibility={cardActionMobileVisibility}
              />
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
};
