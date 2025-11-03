import Link from 'next/link';

import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>アルバム指向ランダムプレイ</span>
          へようこそ
        </h1>

        <p className={styles.description}>
          アルバム単位でランダム再生が可能なSpotifyアプリです。
        </p>

        <div className={styles.linkContainer}>
          <Link href="/auth/signin" className={styles.loginButton}>
            Spotifyでログイン
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Spotify API</p>
      </footer>
    </div>
  );
}
