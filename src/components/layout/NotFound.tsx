'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function Page404() {
  const router = useRouter();
  const t = useTranslations('notFound');

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0524] to-[#251240] p-4 text-white">
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-8 md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <motion.h1
            className="mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-8xl font-bold text-transparent md:text-9xl"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            404
          </motion.h1>

          <h2 className="mb-4 text-3xl font-semibold text-purple-100">{t('title')}</h2>

          <p className="mb-8 max-w-md text-lg text-purple-200">{t('description')}</p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Button
              onClick={() => router.push('/')}
              className="transform cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-600"
            >
              {t('go-home')}
            </Button>

            <Button
              onClick={() => router.back()}
              className="transform cursor-pointer bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-700"
            >
              {t('go-back')}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="group relative"
        >
          <div className="relative overflow-hidden rounded-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <Image
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3BjbGx0dGZncDJnMmRkbGRyNTI2a3pmOXExN3ozdDU1Nm5ia2wzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BBNYBoYa5VwtO/giphy.gif"
              alt="Confused cat meme"
              width={300}
              height={300}
              className="object-cover"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-2 text-sm text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {t('error')}
      </motion.div>
    </div>
  );
}
