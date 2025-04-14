import { motion, AnimatePresence } from 'framer-motion';

export function Card({ id, role, company, period, description, hoveredCard, setHoveredCard }) {
  return (
    <div
      onMouseEnter={() => setHoveredCard(id)}
      onMouseLeave={() => setHoveredCard(null)}
      className={`relative p-6 rounded-xl transition-all duration-300 h-full ${
        hoveredCard === id
          ? 'bg-gradient-to-br from-[#9a4dff] to-[#c95bf5] text-white shadow-lg'
          : 'bg-[#1a0a2a] border border-[#2d1b4a] hover:border-[#a84ef9]'
      }`}
    >
      <h3 className="text-xl font-bold mb-2">{role}</h3>
      <p className={`mb-3 ${hoveredCard === id ? 'text-white' : 'text-[#c95bf5]'}`}>{company}</p>
      {period && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
            hoveredCard === id ? 'bg-black/20' : 'bg-[#12071f] text-[#e2d9f3]'
          }`}
        >
          {period}
        </span>
      )}

      <AnimatePresence>
        {hoveredCard === id ? (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2 overflow-hidden"
          >
            {description.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                {item}
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[#d8c7ff] text-sm mt-2"
          >
            Hover to view details
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
