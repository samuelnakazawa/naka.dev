import { CarouselWords, SocialIcons } from './ui';
import { carouselText } from './constants';

export const HeroSection = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 w-full">
        <div className="flex-1 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold text-white pb-4">
            Hey Ya <span className="inline-block animate-bounce">🐱</span>
          </h1>
          <h2 className="text-3xl md:text-5xl text-white mt-4 mb-8">
            I'm <span className="text-[#c95bf5] font-bold">Samuel Nakazawa</span>
          </h2>
          <div className="h-16">
            <CarouselWords words={carouselText ? carouselText : ''} />
          </div>
          <SocialIcons />
        </div>
        <div className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0">
          <img
            src="/images/samuelnakazawa.jpeg"
            alt="Samuel Nakazawa"
            className="rounded-full w-72 h-72 md:w-80 md:h-80 object-cover image-effect border-4 border-[#c95bf5]/30"
          />
        </div>
      </div>
    </section>
  );
};
