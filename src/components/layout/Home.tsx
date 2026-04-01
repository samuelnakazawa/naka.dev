'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export const HomeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const kanjiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations('home');

  const typeText = t('text');

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
  }, [typeText]);

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

        el.style.transform = `
          perspective(1500px)
          rotateX(${currentRotateX}deg)
          rotateY(${currentRotateY}deg)
          translateX(${translateX}px)
          translateY(${translateY}px)
          translateZ(${index * 40}px)
        `;
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
      className="relative mt-20 flex h-[calc(100dvh-5rem)] w-full flex-col items-center justify-center"
    >
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        <div className="relative flex min-h-[300px] w-full flex-col items-center justify-center">
          {isClient &&
            [...Array(4)].map((_, layer) => {
              const glowIntensity = layer === 0 ? 0.8 : 0.5 - layer * 0.1;
              return (
                <div
                  key={layer}
                  ref={el => {
                    kanjiRefs.current[layer] = el;
                  }}
                  className="absolute"
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    display: showText ? 'none' : 'block',
                    opacity: 1 - layer * 0.08,
                    filter: `blur(${layer * 0.2}px) drop-shadow(0 0 10px rgba(201, 91, 245, ${glowIntensity})) drop-shadow(0 0 20px rgba(201, 91, 245, ${glowIntensity * 0.5}))`,
                    transition: 'transform 1s cubic-bezier(0.03, 0.68, 0.25, 0.99)',
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
                    aria-hidden="true"
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
              );
            })}

          {isClient && showText && (
            <div className="max-w-2xl px-4 text-center font-mono text-4xl tracking-wider text-[#c95bf5] md:text-5xl">
              {typedText}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex w-full justify-center">
        <Link
          href="/about"
          className="
            inline-block whitespace-nowrap rounded-lg border-2 border-[#c95bf5] px-8
            py-3 text-[#c95bf5] transition-all duration-300
            hover:scale-105 hover:bg-[#c95bf5] hover:text-[#0d0d0d] focus:outline-none
            focus:ring-2 focus:ring-[#e384ff] focus:ring-opacity-50
          "
          style={{
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 15px rgba(201, 91, 245, 0.3)',
          }}
        >
          {t('button')}
        </Link>
      </div>
    </div>
  );
};
