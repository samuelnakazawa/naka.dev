// components/SectionDivider.tsx
import { motion } from 'framer-motion';

export const SectionDivider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="my-24 h-16 w-full relative"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[40%] h-px bg-gradient-to-r from-transparent via-[#c95bf5] to-transparent"></div>
      </div>

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 rotate-45 bg-[#c95bf5]"></div>
      </div>
    </motion.div>
  );
};
