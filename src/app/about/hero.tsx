import { motion } from 'framer-motion';
import { SocialIcons } from '@/components/ui';

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-24 max-w-6xl justify-between z-10 mx-auto pt-12 md:pt-20"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2d9f3]">Hello, I'm Samuel</h2>

          <div className="space-y-4 text-[#d8c7ff] leading-relaxed">
            <p>
              I'm a <span className="text-[#c95bf5]">Frontend Engineer</span> passionate about
              teaching and learning about Web Development
            </p>

            <p>
              Currently at <span className="text-[#c95bf5]">Globo</span>.
            </p>
            <p>
              Let's talk about{' '}
              <span className="text-[#c95bf5]">
                Web Development, Acessibility, User Experience and Web Performance
              </span>
            </p>

            <div className="pt-4 border-t border-[#2d1b4a] ">
              <p className="text-[#b8a2e0]">
                Outside of work, you'll find me exploring new web technologies, experimenting with
                machine learning, or just petting cats around the neighborhood.
              </p>
            </div>
            <div className="md:mt-8">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="hidden md:block relative w-48 h-48">
          <img
            src="/images/samuelnakazawa.jpeg"
            alt="Samuel Nakazawa"
            className=" w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-[#c95bf5]/30"
          />
        </div>
      </div>
    </motion.section>
  );
}
