'use client';
import React, { useState, useEffect } from 'react';
import { useLanguageStore } from '@/stores/language';

export const CarouselWords = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguageStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % t.hero.carrousel.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [t.hero.carrousel.length]);

  return (
    <div className="relative h-15 overflow-hidden">
      {t.hero.carrousel.map((word, index) => (
        <div
          key={word}
          aria-label={word}
          className={`absolute top-0 left-0 w-full h-full flex items-left justify-start text-2xl md:text-3xl font-bold text-[#c95bf5] transition-transform duration-500 ease-in-out ${
            index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          {word}
        </div>
      ))}
    </div>
  );
};
