'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useLanguageStore } from '@/stores/language';

export const RouteLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { t } = useLanguageStore();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000] overflow-hidden"
        exit={{
          opacity: 0,
          transition: { duration: 0.5 },
        }}
      >
        <div className="relative z-10 w-full max-w-md px-4">
          <motion.div
            className="mx-auto h-24 w-24 rounded-full border-4 border-transparent p-1"
            initial={{
              rotate: 0,
              background: 'conic-gradient(from 0deg, #a855f7, #ed5fd8, #a855f7)',
            }}
            animate={{
              rotate: 360,
              background: 'conic-gradient(from 360deg, #a855f7, #ed5fd8, #a855f7)',
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="h-full w-full rounded-full bg-[#0f0524] flex items-center justify-center">
              <motion.div
                className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
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
            <motion.p
              className="mt-2 text-indigo-200"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            ></motion.p>
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
    </AnimatePresence>
  );
};
