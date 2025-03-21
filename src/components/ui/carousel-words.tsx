'use client';
import React, { useState, useEffect } from 'react';

export const CarouselWords = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative h-12 overflow-hidden">
      {words.map((word, index) => (
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
