import Link from 'next/link';

import { Logo } from '@/components/ui';

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 h-[var(--app-header-height)] w-full bg-black px-4 py-[15px]">
      <nav aria-label="メインナビゲーション">
        <Link href="/dashboard" className="flex w-fit items-center gap-2">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#282828] p-1">
            <Logo />
          </div>
          <span className="tracking-tight">Album Random Play</span>
        </Link>
      </nav>
    </header>
  );
};
