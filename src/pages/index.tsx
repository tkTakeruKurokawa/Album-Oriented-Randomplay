import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
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
      <Head>
        <title>アルバム指向ランダムプレイ</title>
        <meta
          name="description"
          content="Album-Oriented-Randomplay application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>アルバム指向ランダムプレイ</span>
          へようこそ
        </h1>

        {session && (
          <div className={styles.userInfo}>
            <div className={styles.userProfile}>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user?.name || ''}
                  className={styles.userImage}
                />
              )}
              <p className={styles.userName}>
                こんにちは、{session.user?.name || 'ユーザー'}さん
              </p>
            </div>

            <button onClick={() => signOut()} className={styles.logoutButton}>
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
};

export default Home;
