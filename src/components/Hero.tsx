import { CarouselWords } from './ui';
import { carouselText } from './constants';
export const HeroSection = () => {
  return (
    <section className="w-full  flex justify-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between px-4">
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-white pb-[15px]">
            Hey Ya <span className="inline-block animate-bounce">🐱</span>
          </h1>
          <h2 className="text-2xl md:text-4xl text-white mt-2 mb-[50px]">
            I'm <span className="text-[#c95bf5] font-bold">Samuel Nakazawa</span>
          </h2>
          <CarouselWords words={carouselText ? carouselText : ''} />
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="/images/samuelnakazawa.jpeg"
            alt="Samuel Nakazawa"
            className="rounded-full w-64 h-64 md:w-64 md:h-64 object-cover image-effect"
          />
        </div>
      </div>
    </section>
  );
};
