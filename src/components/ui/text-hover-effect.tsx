'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const TextHoverEffect = ({ text, duration = 0.3 }: { text: string; duration?: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  };

  return (
    <div className="relative inline-block">
      <svg
        ref={svgRef}
        width="5em"
        height="5em"
        viewBox={'0 0 20 50'}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="select-none"
        style={{ display: 'block', cursor: 'pointer' }}
      >
        <defs>
          <linearGradient id="fullGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c95bf5" />
            <stop offset="100%" stopColor="#9e3fd3" />
          </linearGradient>

          <motion.radialGradient
            id="waveMask"
            gradientUnits="userSpaceOnUse"
            r="50%"
            initial={{ cx: '0%', cy: '50%' }}
            animate={hovered ? { cx: '100%', cy: '50%' } : { cx: '0%', cy: '50%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </motion.radialGradient>
        </defs>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          stroke="black"
          strokeWidth="0.8"
          className="font-[helvetica] text-lg font-bold"
        >
          {text}
        </text>

        {hovered && (
          <>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="transparent"
              stroke="url(#fullGradient)"
              strokeWidth="0.4"
              className="font-[helvetica] text-lg font-bold"
            >
              {text}
            </text>

            {/* Efeito de onda que percorre todo o texto */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="transparent"
              stroke="url(#fullGradient)"
              strokeWidth="0.4"
              strokeOpacity="0.7"
              mask="url(#waveMask)"
              className="font-[helvetica] text-lg font-bold"
            >
              {text}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
