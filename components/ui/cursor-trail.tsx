'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export interface CursorTrailProps {
  /**
   * Whether the cursor trail should be active
   * @default true
   */
  enabled?: boolean;
}

export const CursorTrail: React.FC<CursorTrailProps> = ({ enabled = true }) => {
  const [isInteractive, setIsInteractive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if we're over an interactive element
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button' ||
        target.style.cursor === 'pointer';

      setIsInteractive(interactive);
    };

    const handleMouseLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      setIsInteractive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor trail - only shows on interactive elements */}
      {isInteractive && (
        <motion.div
          className="pointer-events-none fixed z-50 mix-blend-screen"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          {/* Brush stroke effect */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M5 20 Q 10 10, 20 15 T 35 20 Q 30 30, 20 25 T 5 20"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.3 }}
            />
            <defs>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f0d677" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}

      {/* Secondary glow - always present but subtle */}
      <motion.div
        className="pointer-events-none fixed z-40 rounded-full bg-museum-gold opacity-10 blur-xl"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: isInteractive ? '60px' : '30px',
          height: isInteractive ? '60px' : '30px',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};
