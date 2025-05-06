/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinifyオプションを削除しました
  // experimental.turboは非推奨になっているため削除
  // Next.js 15以降ではappDirはデフォルトでtrueのため明示的に設定する必要なし
};

export default nextConfig;
