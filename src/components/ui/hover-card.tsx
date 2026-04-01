'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface DescriptionSubitem {
  text: string;
  subitems: string[];
}

interface DescriptionGroup {
  main: string;
  items: (string | DescriptionSubitem)[];
}

type DescriptionItem = string | DescriptionGroup;

interface CardProps {
  id: number;
  role: string;
  company?: string;
  period?: string;
  description: unknown[];
  hoveredCard: number | null;
  setHoveredCard: (id: number | null) => void;
  activeCard: number | null;
  setActiveCard: (id: number | null) => void;
}

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
}: CardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const t = useTranslations('about');

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const isActive = isMobile ? activeCard === id : hoveredCard === id;

  useEffect(() => {
    if (isActive && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isActive, description]);

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

  const renderDescriptionItem = (item: DescriptionItem, index: number) => {
    if (typeof item === 'string') {
      return (
        <li key={index} className="flex items-start">
          <span className="mr-2 mt-1" aria-hidden="true">
            &bull;
          </span>
          {item}
        </li>
      );
    }

    if ('main' in item && item.main) {
      return (
        <li key={index} className="mt-2">
          <p className="font-medium">{item.main}</p>
          <ul className="ml-4 mt-1 space-y-1">
            {item.items.map((subitem, subIndex) => {
              if (typeof subitem === 'string') {
                return (
                  <li key={subIndex} className="flex items-start">
                    <span className="mr-2 mt-1" aria-hidden="true">
                      -
                    </span>
                    {subitem}
                  </li>
                );
              }
              if ('text' in subitem && subitem.subitems) {
                return (
                  <li key={subIndex} className="mt-1">
                    <p>{subitem.text}</p>
                    <ul className="ml-4 mt-1 space-y-1">
                      {subitem.subitems.map((subsubitem: string, subsubIndex: number) => (
                        <li key={subsubIndex} className="flex items-start">
                          <span className="mr-2 mt-1" aria-hidden="true">
                            &#9702;
                          </span>
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
      className={`relative h-full cursor-pointer rounded-xl p-6 transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-br from-[#9a4dff] to-[#c95bf5] text-white shadow-lg'
          : 'border border-[#2d1b4a] bg-[#1a0a2a] hover:border-[#a84ef9]'
      }`}
    >
      <h3 className="mb-2 text-xl font-bold">{role}</h3>
      {company && <p className={`mb-3 ${isActive ? 'text-white' : 'text-[#c95bf5]'}`}>{company}</p>}
      {period && (
        <span
          className={`mb-4 inline-block rounded-full px-3 py-1 text-sm ${
            isActive ? 'bg-black/20' : 'bg-[#47434c] text-[#e2d9f3]'
          }`}
        >
          {period}
        </span>
      )}

      <div
        className="overflow-hidden transition-[height,opacity] duration-300 ease-in-out"
        style={{ height: isActive ? contentHeight : 0, opacity: isActive ? 1 : 0 }}
      >
        <ul ref={contentRef} className="mt-4 space-y-2">
          {(description as DescriptionItem[]).map((item, i) => renderDescriptionItem(item, i))}
        </ul>
      </div>

      {!isActive && (
        <div className="animate-fade-in mt-2 text-sm text-[#d8c7ff]">
          {isMobile ? t('card.click') : t('card.hover')}
        </div>
      )}
    </div>
  );
}
