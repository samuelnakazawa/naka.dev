import { BackgroundBeamsWithCollision, SkillCard } from '../components/ui';
import { Footer, Header, HeroSection } from '@/components';
import { skills } from '@/components/constants';

export default function Home() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="w-full grid grid-rows-[auto_1fr_auto] bg-transparent">
        <Header />
        <main className="flex flex-col">
          <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-neutral-900/70 via-black/70 to-black/70">
            <HeroSection />
          </section>

          <section className="min-h-screen py-20 px-4 sm:px-8 bg-gradient-to-b from-black via-black to-neutral-900">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#c95bf5]">
                Professional Skillset
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </BackgroundBeamsWithCollision>
  );
}
