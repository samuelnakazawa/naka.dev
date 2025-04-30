'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const RouteChangeHandler = ({
  onRouteChange,
}: {
  onRouteChange: (isLoading: boolean) => void;
}) => {
  const pathname = usePathname();

  useEffect(() => {
    onRouteChange(true);
    const timer = setTimeout(() => onRouteChange(false), 300);

    return () => clearTimeout(timer);
  }, [pathname, onRouteChange]);

  return null;
};
