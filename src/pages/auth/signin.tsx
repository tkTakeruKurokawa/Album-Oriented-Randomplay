import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type SignInProps = {
  providers: Record<string, Provider>;
};

export default function SignIn({ providers }: SignInProps) {
  const router = useRouter();
  const { callbackUrl = '/' } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <Head>
        <title>アルバム指向ランダムプレイ - Spotifyログイン</title>
      </Head>

      <div className="bg-[#191414] p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1DB954] mb-6">
            アルバム指向ランダムプレイ
          </h1>
          <p className="text-white text-center mb-6">
            アルバム単位でランダム再生が可能なSpotifyアプリです。
            続けるにはSpotifyでログインしてください。
          </p>
        </div>

        {Object.values(providers).map((provider) => (
          <div key={provider.id} className="flex justify-center">
            <button
              onClick={() =>
                signIn(provider.id, { callbackUrl: callbackUrl as string })
              }
              className="bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center w-full"
            >
              <span className="mr-2">Spotifyでログイン</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers: providers ?? {},
    },
  };
};
