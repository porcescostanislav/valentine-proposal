import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

// Falling Hearts Component
const FallingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 6 + Math.random() * 4,
        size: 20 + Math.random() * 40,
        opacity: 0.3 + Math.random() * 0.7,
        color: ['#ff1744', '#ff5252', '#ff6e40', '#ff8a65', '#ffab91'].sort(
          () => Math.random() - 0.5
        )[0],
      };
      return newHeart;
    };

    setHearts(Array.from({ length: 15 }, createHeart));

    const interval = setInterval(() => {
      setHearts((prev) => [...prev.slice(1), createHeart()]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: -50, opacity: heart.opacity, rotate: 0 }}
            animate={{
              y: window.innerHeight + 100,
              opacity: 0,
              rotate: 360,
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: 'linear',
            }}
            className="absolute"
            style={{
              left: `${heart.left}%`,
              width: heart.size,
              height: heart.size,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: heart.color, width: '100%', height: '100%' }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Evasive "NO" Button Component
const EvaciveNoButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    // Move button by 60px in random direction within the box
    const offsetX = (Math.random() - 0.5) * 120;
    const offsetY = (Math.random() - 0.5) * 120;

    setPosition({ x: offsetX, y: offsetY });
  };

  return (
    <motion.button
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
      }}
      onMouseEnter={handleMouseEnter}
      className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-full transition-colors"
      onTouchStart={handleMouseEnter}
    >
      NU
    </motion.button>
  );
};

// Main App Component
export default function App() {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleYesClick = () => {
    setHasAccepted(true);

    // Trigger confetti explosion
    const end = Date.now() + 3 * 1000;
    const colors = ['#ff1744', '#ff5252', '#ffb3ba', '#ffc0d9', '#ffe5ec'];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: Math.random() * 360,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      <FallingHearts />

      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center z-10"
          >
            {/* Heart Icon */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex justify-center mb-6"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="#ff1744"
                className="drop-shadow-lg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.div>

            {/* Text */}
            <h1
              className="text-4xl md:text-5xl font-pacifico text-pink-600 mb-8 leading-relaxed"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              Olivia, vrei să fii iubita mea de Valentine’s Day?
            </h1>

            {/* Buttons Container */}
            <div className="flex gap-4 justify-center items-center relative h-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow relative z-20"
              >
                DA
              </motion.button>

              <EvaciveNoButton />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center z-10"
          >
            {/* Celebration Heart Icon */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex justify-center mb-6"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="#ff1744"
                className="drop-shadow-lg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.div>

            {/* Success Message */}
            <h2 className="text-4xl md:text-5xl font-pacifico text-pink-600 mb-4">
              Yay!
            </h2>
            <p className="text-xl text-gray-700 font-semibold">
              Abia aștept!
            </p>
            <p className="text-gray-600 mt-4 text-sm">
              M-ai făcut cel mai fericit! ❤️
            </p>

            {/* Restart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="mt-8 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full transition-colors"
            >
              Încearcă din nou
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
