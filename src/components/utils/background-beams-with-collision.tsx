'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 15,
      repeatDelay: 5,
      delay: 2,
      className: 'from-[#6b21a8] via-[#7e22ce] to-transparent',
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 8,
      repeatDelay: 5,
      delay: 4,
      className: 'from-[#581c87] via-[#9333ea] to-transparent',
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 10,
      repeatDelay: 8,
      className: 'h-6 from-[#4c1d95] via-[#7e22ce] to-transparent',
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 10,
      repeatDelay: 14,
      delay: 4,
      className: 'from-[#3b0764] via-[#6b21a8] to-transparent',
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 20,
      repeatDelay: 5,
      className: 'h-20 from-[#581c87] via-[#9333ea] to-transparent',
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 16,
      repeatDelay: 8,
      className: 'h-12 from-[#3b0764] via-[#7e22ce] to-transparent',
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 14,
      repeatDelay: 7,
      delay: 2,
      className: 'h-6 from-[#4c1d95] via-[#9333ea] to-transparent',
    },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        'relative flex w-full justify-center overflow-hidden',
        isHomePage ? 'bg-[#0d0d0d]' : 'bg-gradient-to-b from-[#0f0524] via-[#1a0a2a] to-[#251240]',
        className
      )}
    >
      {!isHomePage &&
        beams.map((beam) => (
          <CollisionMechanism
            key={beam.initialX + 'beam-idx'}
            beamOptions={beam}
            containerRef={containerRef}
            parentRef={parentRef}
            isHomePage={isHomePage}
          />
        ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-black w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    isHomePage?: boolean;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {}, isHomePage }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (parentRef.current) {
      const updateHeight = () => {
        setContainerHeight(parentRef.current?.scrollHeight || 0);
      };

      updateHeight();

      const resizeObserver = new ResizeObserver(updateHeight);
      if (parentRef.current) {
        resizeObserver.observe(parentRef.current);
      }

      return () => resizeObserver.disconnect();
    }
  }, [parentRef]);

  useEffect(() => {
    const checkCollision = () => {
      if (beamRef.current && containerRef.current && parentRef.current && !cycleCollisionDetected) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || '-200px',
          translateX: beamOptions.initialX || '0px',
          rotate: beamOptions.rotate || 0,
          opacity: 0.7,
        }}
        variants={{
          animate: {
            translateY: `${containerHeight + 200}px`,
            translateX: beamOptions.translateX || '0px',
            rotate: beamOptions.rotate || 0,
            opacity: 0.7,
          },
        }}
        transition={{
          duration: beamOptions.duration || 16,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 5,
        }}
        className={cn(
          'absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t',
          isHomePage
            ? 'bg-[#0d0d0d]'
            : beamOptions.className || 'from-[#6b21a8] via-[#9333ea] to-transparent'
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = 'CollisionMechanism';

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 40 - 20),
    directionY: Math.floor(Math.random() * -25 - 5),
  }));

  return (
    <div {...props} className={cn('absolute z-50 h-2 w-2', props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 0.7 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 2 + 1, ease: 'easeOut' }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
