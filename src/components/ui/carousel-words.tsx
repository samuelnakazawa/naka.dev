'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export const CarouselWords = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations('about');
  const words = t.raw('hero.carousel') as string[];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="h-15 relative overflow-hidden">
      {words.map((word, index) => (
        <div
          key={word}
          aria-label={word}
          className={`items-left absolute left-0 top-0 flex h-full w-full justify-start text-2xl font-bold text-[#c95bf5] transition-transform duration-500 ease-in-out md:text-3xl ${
            index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          {word}
        </div>
      ))}
    </div>
  );
};
