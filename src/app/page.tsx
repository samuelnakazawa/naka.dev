import { BackgroundBeamsWithCollision, SkillCard } from '../components/ui';
import { Footer, Header, HeroSection } from '@/components';
import { skills } from '@/components/constants';

export default function Home() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="w-full grid grid-rows-[auto_1fr_auto] bg-transparent">
        <Header />
        <main className="flex flex-col">
          {/* Hero Section - Tons mais escuros e profundos */}
          <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 bg-gradient-to-b from-[#050209] via-[#0a0512] to-[#120a1f]">
            <HeroSection />
          </section>

          {/* Divisor - Transição para tons roxos */}
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120a1f] to-[#1a0a2a]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#c95bf5]/15 via-[#c95bf5]/10 to-[#c95bf5]/05"></div>
            <div className="absolute bottom-0 h-20 w-full bg-gradient-to-t from-[#1a0a2a] to-transparent"></div>
          </div>

          {/* Skills Section - Tons médios com mais presença roxa */}
          <section className="min-h-screen py-20 px-4 sm:px-8 bg-gradient-to-b from-[#1a0a2a] via-[#1f0e35] to-[#251240]">
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
