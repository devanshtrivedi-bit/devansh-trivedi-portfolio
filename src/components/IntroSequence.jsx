import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Glassmorphic background floating bubbles configuration
const bgBubbles = [
  { size: 120, left: '10%', top: '20%', delay: 0, duration: 12 },
  { size: 80, left: '85%', top: '15%', delay: 1, duration: 15 },
  { size: 160, left: '75%', top: '65%', delay: 0.5, duration: 18 },
  { size: 100, left: '5%', top: '70%', delay: 2, duration: 14 },
  { size: 70, left: '20%', top: '45%', delay: 1.5, duration: 16 },
  { size: 140, left: '50%', top: '10%', delay: 3, duration: 20 },
];

// Glassmorphic transition sweep bubbles configuration
const sweepBubbles = Array.from({ length: 22 }).map((_, i) => ({
  id: i,
  size: Math.random() * 110 + 50, // 50px to 160px
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 0.7, // staggered delays
  duration: Math.random() * 1.2 + 1.2, // rise speed
  xOffset: Math.random() * 100 - 50 // sway
}));

const IntroSequence = ({ onComplete, soundEnabled, setSoundEnabled }) => {
  const [phase, setPhase] = useState('welcome'); // welcome, fadeOut, complete
  const [progress, setProgress] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) return;

    // Elegant intro timing
    const t1 = setTimeout(() => setPhase('fadeOut'), 4000);
    const t2 = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 5500);

    // Smooth progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, [onComplete, isStarted]);

  const handleStart = () => {
    setSoundEnabled(true);
    setIsStarted(true);
  };

  if (phase === 'complete') return null;

  return (
    <AnimatePresence>
      {phase !== 'fadeOut' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0a0a0f', // Very dark but soft background
            color: '#ffffff',
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            overflow: 'hidden'
          }}
        >
          {/* Soft ambient light orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '50vw',
              height: '50vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(60px)',
              top: '-10%',
              left: '-10%',
              zIndex: 0
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '60vw',
              height: '60vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(80px)',
              bottom: '-20%',
              right: '-10%',
              zIndex: 0
            }}
          />

          {/* Background Glass Bubbles */}
          {bgBubbles.map((bubble, idx) => (
            <motion.div
              key={`bg-b-${idx}`}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bubble.delay
              }}
              style={{
                position: 'absolute',
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                top: bubble.top,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                boxShadow: 'inset 0 4px 8px rgba(255, 255, 255, 0.08), 0 10px 30px rgba(0,0,0,0.1)',
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />
          ))}

          {/* Active Sweep Glass Bubbles (Waves of rising bubbles at the transition window) */}
          {isStarted && sweepBubbles.map((bubble) => (
            <motion.div
              key={`sweep-b-${bubble.id}`}
              initial={{ y: '110vh', x: 0, opacity: 0 }}
              animate={{
                y: '-20vh',
                x: bubble.xOffset,
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{
                duration: bubble.duration,
                delay: bubble.delay + 2.8, // Rise rapidly at the transition edge (2.8 seconds in)
                ease: [0.25, 1, 0.5, 1]
              }}
              style={{
                position: 'absolute',
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(5px)',
                boxShadow: 'inset 0 4px 10px rgba(255, 255, 255, 0.12), 0 15px 35px rgba(0,0,0,0.2)',
                zIndex: 20, // Sweep over all elements
                pointerEvents: 'none'
              }}
            />
          ))}

          {/* Glassmorphic Card */}
          <motion.div
            initial={{ y: 50, opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ y: 0, opacity: 1, backdropFilter: 'blur(20px)' }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '4rem 5vw',
              borderRadius: '30px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              minWidth: '300px'
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: '300',
                letterSpacing: '0.05em',
                margin: '0 0 1rem 0',
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Devansh Trivedi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              style={{
                fontSize: '1rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                fontWeight: '400',
                margin: 0
              }}
            >
              AI & Robotics Developer
            </motion.p>

            {!isStarted ? (
              <motion.button
                onClick={handleStart}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="game-button"
                style={{
                  marginTop: '2.5rem',
                  padding: '12px 35px',
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderRadius: '50px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  color: '#fff',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
              >
                ENTER PORTFOLIO
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{
                  marginTop: '3rem',
                  width: '200px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.0) 100%)',
                    width: '50%',
                    borderRadius: '4px'
                  }}
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear"
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSequence;
