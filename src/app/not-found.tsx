'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/stores/language';

export default function NotFound() {
  const router = useRouter();

  const { t } = useLanguageStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0524] to-[#251240] text-white p-4 overflow-hidden relative">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500 opacity-10"
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            animate={{
              scale: [1, 1.02, 1],
              textShadow: [
                '0 0 10px rgba(168, 85, 247, 0.3)',
                '0 0 20px rgba(168, 85, 247, 0.5)',
                '0 0 10px rgba(168, 85, 247, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            404
          </motion.h1>

          <h2 className="text-3xl font-semibold mb-4 text-purple-100">{t.notFound.title}</h2>

          <p className="text-lg text-purple-200 mb-8 max-w-md">{t.notFound.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              {t.notFound['go-home']}
            </Button>

            <Button
              onClick={() => router.back()}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg shadow-purple-500/20 "
            >
              {t.notFound['go-back']}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative group"
        >
          <div className="relative overflow-hidden rounded-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <Image
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3BjbGx0dGZncDJnMmRkbGRyNTI2a3pmOXExN3ozdDU1Nm5ia2wzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BBNYBoYa5VwtO/giphy.gif"
              alt="Gato confuso meme"
              width={300}
              height={300}
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none" />
          </div>

          <div className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-t from-purple-500/10 to-transparent blur-md scale-x-95 group-hover:opacity-80 transition-opacity duration-300" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-2 text-white text-m"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {t.notFound.error} • {t.notFound.title}
      </motion.div>
    </div>
  );
}
