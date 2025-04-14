'use client';
import { useEffect, useRef, useState } from 'react';

export const HomeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const kanjiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const textToType = "Hello! I'm Samuel Nakazawa and this is my website :)";
    const cycleDuration = 10000;
    const kanjiDisplayTime = 4000;
    const typingTime = 3000;

    const cycleAnimation = () => {
      setShowText(false);

      setTimeout(() => {
        setShowText(true);
        let currentIndex = 0;

        const type = () => {
          setTypedText(textToType.substring(0, currentIndex));
          currentIndex++;

          if (currentIndex <= textToType.length) {
            setTimeout(type, typingTime / textToType.length);
          }
        };

        type();
      }, kanjiDisplayTime);
    };

    cycleAnimation();

    const interval = setInterval(cycleAnimation, cycleDuration);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const centerX = width / 2;
      const centerY = height / 2;

      const rotateX = ((y - centerY) / centerY) * 15;
      const rotateY = ((centerX - x) / centerX) * 15;
      const translateX = (x - centerX) / 15;
      const translateY = (y - centerY) / 15;

      kanjiRefs.current.forEach((el, index) => {
        if (!el) return;

        const layerDepth = index * 0.2;
        const scale = 1 - Math.abs(rotateY) * 0.01;
        const opacity = 1 - index * 0.15;

        el.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateX(${translateX * (1 + layerDepth)}px)
          translateY(${translateY * (1 + layerDepth)}px)
          translateZ(${index * 20}px)
          scale(${scale})
        `;
        el.style.opacity = `${opacity}`;
        el.style.filter = `blur(${index * 0.5}px) drop-shadow(0 0 5px rgba(201, 91, 245, ${0.7 - index * 0.1}))`;
        el.style.transition = `transform 0.6s cubic-bezier(0.17, 0.67, 0.21, 0.99), opacity 0.4s ease`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full">
          {[...Array(4)].map((_, layer) => (
            <div
              key={layer}
              ref={(el) => (kanjiRefs.current[layer] = el)}
              className="absolute"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                display: showText ? 'none' : 'block',
              }}
            >
              <svg width="300" height="200" viewBox="0 0 100 100" className="text-[#c95bf5]">
                {layer === 0 && (
                  <text
                    x="50%"
                    y="50%"
                    dy="0.35em"
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="60"
                    fontFamily="sans-serif"
                  >
                    中澤
                  </text>
                )}
              </svg>
            </div>
          ))}

          {showText && (
            <div className="text-[#c95bf5] text-4xl md:text-5xl font-mono tracking-wider text-center max-w-2xl px-4">
              {typedText}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center pb-20">
        <a
          href="/about"
          className="
            inline-block px-8 py-3 border-2 border-[#c95bf5] text-[#c95bf5]
            rounded-lg hover:bg-[#c95bf5] hover:text-[#0d0d0d] transition-all
            duration-300 transform hover:scale-105 focus:outline-none
            focus:ring-2 focus:ring-[#e384ff] focus:ring-opacity-50
          "
          style={{
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 15px rgba(201, 91, 245, 0.3)',
          }}
        >
          Discover My Journey
        </a>
      </div>
    </div>
  );
};
