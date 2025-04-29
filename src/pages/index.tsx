import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Album-Oriented-Randomplay</title>
        <meta name="description" content="Album-Oriented-Randomplay application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Album-Oriented-Randomplay</span>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>src/pages/index.tsx</code>
        </p>
      </main>

      <footer className={styles.footer}>
        <p>Created with NextJS and TypeScript</p>
      </footer>
    </div>
  );
};

export default Home;