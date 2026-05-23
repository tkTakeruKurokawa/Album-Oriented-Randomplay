import Link from 'next/link';

import { Logo } from '@/components/ui';

export const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full bg-black p-4">
      <nav aria-label="メインナビゲーション">
        <Link href="/dashboard" className="flex w-fit items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#282828] p-1.5">
            <Logo />
          </div>
          <span className="tracking-tight">Album Random Play</span>
        </Link>
      </nav>
    </header>
  );
};
