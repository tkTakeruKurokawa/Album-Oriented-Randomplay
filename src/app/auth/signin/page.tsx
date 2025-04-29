'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import styles from './Signin.module.css';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';

  return (
    <div className={styles.container}>
      <Head>
        <title>アルバム指向ランダムプレイ - Spotifyログイン</title>
      </Head>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>アルバム指向ランダムプレイ</h1>
          <p className={styles.description}>
            アルバム単位でランダム再生が可能なSpotifyアプリです。
            続けるにはSpotifyでログインしてください。
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={() => signIn('spotify', { callbackUrl })}
            className={styles.loginButton}
          >
            <span>Spotifyでログイン</span>
          </button>
        </div>
      </div>
    </div>
  );
}
