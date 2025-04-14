import { CarouselWords } from '@/components/ui';
import { useLanguageStore } from '@/stores/language';
export const HeroSection = () => {
  const { t } = useLanguageStore();
  return (
    <section className="w-full h-screen flex items-center justify-center py-12 md:py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-4 w-full">
        <div className="flex-1 text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-7xl font-bold text-white pb-4">
            {t.hero.h1} <span className="inline-block animate-bounce">🐱</span>
          </h1>
          <h2 className="text-2xl md:text-5xl text-white mt-4 mb-6 md:mb-8">
            {t.hero.h2} <span className="text-[#c95bf5] font-bold">Samuel Nakazawa,</span>
          </h2>
          <div className="h-14 md:h-16 mb-6 md:mb-0 text-2xl md:text-4xl text-white font-bold mt-4 mb-6 md:mb-4">
            {t.hero.h3}
          </div>
          <div className="h-14 md:h-16 mb-6 md:mb-0">
            <CarouselWords />
          </div>
        </div>
      </div>
    </section>
  );
};
