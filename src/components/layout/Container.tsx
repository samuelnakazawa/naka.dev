'use client';

import { usePathname } from 'next/navigation';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  return (
    <div
      className={
        isHomePage
          ? 'max-w-6xl mx-auto px-6 lg:px-8 '
          : 'max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-16'
      }
    >
      {children}
    </div>
  );
};
