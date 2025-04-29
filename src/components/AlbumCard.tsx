import React from 'react';
import styles from '@/styles/AlbumCard.module.css';

interface AlbumCardProps {
  title: string;
  artist: string;
  coverUrl?: string;
  year?: number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, coverUrl, year }) => {
  return (
    <div className={styles.card}>
      {coverUrl && (
        <div className={styles.coverImage}>
          <img src={coverUrl} alt={`${title} by ${artist}`} />
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