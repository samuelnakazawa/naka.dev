import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useLanguageStore } from '@/stores/language';

export function Card({
  id,
  role,
  company,
  period,
  description,
  hoveredCard,
  setHoveredCard,
  activeCard,
  setActiveCard,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const { t } = useLanguageStore();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleCardInteraction = () => {
    if (isMobile) {
      if (activeCard === id) {
        setActiveCard(null);
      } else {
        setActiveCard(id);

        setTimeout(() => {
          cardRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 100);
      }
    }
  };

  const isActive = isMobile ? activeCard === id : hoveredCard === id;

  const renderDescriptionItem = (item, index) => {
    if (typeof item === 'string') {
      return (
        <li key={index} className="flex items-start">
          <span className="mr-2 mt-1">•</span>
          {item}
        </li>
      );
    }

    if (item.main) {
      return (
        <li key={index} className="mt-2">
          <p className="font-medium">{item.main}</p>
          <ul className="ml-4 mt-1 space-y-1">
            {item.items.map((subitem, subIndex) => {
              if (typeof subitem === 'string') {
                return (
                  <li key={subIndex} className="flex items-start">
                    <span className="mr-2 mt-1">-</span>
                    {subitem}
                  </li>
                );
              }
              if (subitem.text && subitem.subitems) {
                return (
                  <li key={subIndex} className="mt-1">
                    <p>{subitem.text}</p>
                    <ul className="ml-4 mt-1 space-y-1">
                      {subitem.subitems.map((subsubitem, subsubIndex) => (
                        <li key={subsubIndex} className="flex items-start">
                          <span className="mr-2 mt-1">◦</span>
                          {subsubitem}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </li>
      );
    }

    return null;
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={!isMobile ? () => setHoveredCard(id) : undefined}
      onMouseLeave={!isMobile ? () => setHoveredCard(null) : undefined}
      onClick={handleCardInteraction}
      className={`relative p-6 rounded-xl transition-all duration-300 h-full cursor-pointer ${
        isActive
          ? 'bg-gradient-to-br from-[#9a4dff] to-[#c95bf5] text-white shadow-lg'
          : 'bg-[#1a0a2a] border border-[#2d1b4a] hover:border-[#a84ef9]'
      }`}
    >
      <h3 className="text-xl font-bold mb-2">{role}</h3>
      <p className={`mb-3 ${isActive ? 'text-white' : 'text-[#c95bf5]'}`}>{company}</p>
      {period && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
            isActive ? 'bg-black/20' : 'bg-[#47434c] text-[#e2d9f3]'
          }`}
        >
          {period}
        </span>
      )}

      <AnimatePresence>
        {isActive ? (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                opacity: { duration: 0.2, ease: 'easeInOut' },
                height: { duration: 0.3, ease: 'easeInOut' },
              },
            }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2 overflow-hidden"
          >
            {description.map((item, i) => renderDescriptionItem(item, i))}
          </motion.ul>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                opacity: { duration: 0.2, ease: 'easeInOut' },
                height: { duration: 0.3, ease: 'easeInOut' },
              },
            }}
            className="text-[#d8c7ff] text-sm mt-2"
          >
            {isMobile ? `${t.about.card.click}` : `${t.about.card.hover}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
