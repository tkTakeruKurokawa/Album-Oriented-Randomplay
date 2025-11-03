import Image from 'next/image';

import styles from '@/styles/AlbumCard.module.css';

interface AlbumCardProps {
  title: string;
  artist: string;
  coverUrl?: string;
  year?: number;
}

const AlbumCard = ({ title, artist, coverUrl, year }: AlbumCardProps) => {
  return (
    <div className={styles.card}>
      {coverUrl && (
        <div className={styles.coverImage}>
          <Image
            src={coverUrl}
            alt={`${title} by ${artist}`}
            width={200}
            height={200}
          />
        </div>
      )}
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artist}>{artist}</p>
        {year && <p className={styles.year}>{year}</p>}
      </div>
    </div>
  );
};

export default AlbumCard;
