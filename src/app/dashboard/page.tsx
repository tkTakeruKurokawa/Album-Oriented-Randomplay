'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

import styles from '@/styles/Home.module.css';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <p>ロード中...</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>アルバム指向ランダムプレイ</span>
        </h1>

        {session && (
          <div className={styles.userInfo}>
            <div className={styles.userProfile}>
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ''}
                  width={48}
                  height={48}
                  className={styles.userImage}
                />
              )}
              <p className={styles.userName}>
                こんにちは、{session.user?.name ?? 'ユーザー'}さん
              </p>
            </div>

            <button
              onClick={() => {
                void signOut();
              }}
              className={styles.logoutButton}
            >
              ログアウト
            </button>
          </div>
        )}

        <p className={styles.description}>
          アルバム単位でランダム再生が可能なSpotifyアプリです。
        </p>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Spotify API</p>
      </footer>
    </div>
  );
}
