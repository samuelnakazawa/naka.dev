'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguageStore } from '@/stores/language';

export const HomeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const kanjiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguageStore();

  const typeText = `${t.home.text}`;

  useEffect(() => {
    setIsClient(true);

    const textToType = typeText;
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
    if (!isClient) return;

    let animationFrameId: number;
    const smoothingFactor = 0.15;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      targetRotateX = ((e.clientY - centerY) / centerY) * 8;
      targetRotateY = ((centerX - e.clientX) / centerX) * 8;
    };

    const updateAnimations = () => {
      currentRotateX += (targetRotateX - currentRotateX) * smoothingFactor;
      currentRotateY += (targetRotateY - currentRotateY) * smoothingFactor;

      kanjiRefs.current.forEach((el, index) => {
        if (!el) return;

        const layerDepth = index * 0.1;
        const translateX = currentRotateY * 8 * (1 + layerDepth);
        const translateY = currentRotateX * 8 * (1 + layerDepth);

        const glowIntensity = index === 0 ? 0.8 : 0.5 - index * 0.1;

        el.style.transform = `
          perspective(1500px)
          rotateX(${currentRotateX}deg)
          rotateY(${currentRotateY}deg)
          translateX(${translateX}px)
          translateY(${translateY}px)
          translateZ(${index * 40}px)
        `;
        el.style.opacity = `${1 - index * 0.08}`;
        el.style.filter = `
          blur(${index * 0.2}px) 
          drop-shadow(0 0 10px rgba(201, 91, 245, ${glowIntensity}))
          drop-shadow(0 0 20px rgba(201, 91, 245, ${glowIntensity * 0.5}))
        `;
        el.style.transition = `transform 1s cubic-bezier(0.03, 0.68, 0.25, 0.99), opacity 0.6s ease`;
      });

      animationFrameId = requestAnimationFrame(updateAnimations);
    };

    window.addEventListener('mousemove', handleMouseMove);
    updateAnimations();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center "
    >
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full">
          {isClient &&
            [...Array(4)].map((_, layer) => (
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
                <svg
                  width="300"
                  height="200"
                  viewBox="0 0 100 100"
                  className="text-[#c95bf5]"
                  style={{
                    filter: layer === 0 ? 'url(#glow)' : 'none',
                  }}
                >
                  {layer === 0 && (
                    <>
                      <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
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
                    </>
                  )}
                </svg>
              </div>
            ))}

          {isClient && showText && (
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
          {t.home.button}
        </a>
      </div>
    </div>
  );
};
