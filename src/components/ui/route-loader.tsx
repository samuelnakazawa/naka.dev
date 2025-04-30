'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLanguageStore } from '@/stores/language';
import { usePathname } from 'next/navigation';

export const RouteLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguageStore();
  const pathname = usePathname();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0524] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' },
          }}
        >
          <div className="relative z-10 w-full max-w-md px-4">
            <motion.div
              className="mx-auto flex items-center justify-center"
              initial={{ y: 0 }}
              animate={{ y: [-20, 0, -20] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="text-6xl font-bold relative"
                initial={{
                  background: 'linear-gradient(to bottom, #a855f7 0%, #ed5fd8 50%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  opacity: 0.8,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                中澤
                <motion.div
                  className="absolute inset-0  from-purple-500 to-pink-500 opacity-0"
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                {t.loader.loading}
              </h3>
            </motion.div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-indigo-400"
                  initial={{
                    x: Math.random() * dimensions.width,
                    y: Math.random() * dimensions.height,
                    opacity: 0,
                  }}
                  animate={{
                    y: [0, -50, -100],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#251240] to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
