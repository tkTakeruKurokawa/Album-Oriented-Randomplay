'use client'

import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'

import styles from './Signin.module.css'

// SearchParamsコンポーネントを分離
function SearchParamsWrapper({ children }: { children: (callbackUrl: string) => React.ReactNode }) {
  const router = useRouter()
  const { data: session } = useSession()

  // セッションがある場合はダッシュボードにリダイレクト
  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (session) {
    return null
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent>{children}</SearchParamsComponent>
    </Suspense>
  )
}

function SearchParamsComponent({
  children,
}: {
  children: (callbackUrl: string) => React.ReactNode
}) {
  const [callbackUrl, setCallbackUrl] = useState('/dashboard')

  useEffect(() => {
    // クライアントサイドでのみURLSearchParamsを使用
    const searchParams = new URLSearchParams(globalThis.location.search)
    const url = searchParams.get('callbackUrl')
    if (url) {
      setCallbackUrl(url)
    }
  }, [])

  return <>{children(callbackUrl)}</>
}

export default function SignIn() {
  return (
    <div className={styles.container}>
      <Head>
        <title>アルバム指向ランダムプレイ - Spotifyログイン</title>
      </Head>

      <SearchParamsWrapper>
        {callbackUrl => (
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
                onClick={() => {
                  void signIn('spotify', { callbackUrl })
                }}
                className={styles.loginButton}
              >
                <span>Spotifyでログイン</span>
              </button>
            </div>
          </div>
        )}
      </SearchParamsWrapper>
    </div>
  )
}
