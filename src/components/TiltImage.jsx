import React, { useState, useRef } from 'react';

const TiltImage = ({ src, alt }) => {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = containerRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Mouse position relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Center coordinates
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Difference from center
    const dx = x - cx;
    const dy = y - cy;

    // Maximum tilt angles (degrees)
    const maxTilt = 18;
    
    // Calculate rotation based on cursor offset
    const rx = -(dy / cy) * maxTilt;
    const ry = (dx / cx) * maxTilt;

    setCoords({ rx, ry });

    // Glare position in percentages
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    setGlare({ x: px, y: py });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ rx: 0, ry: 0 });
    setGlare({ x: 50, y: 50 });
  };

  // Outer framing corners style
  const cornersStyle = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderColor: 'var(--accent-blue)',
    borderStyle: 'solid',
    zIndex: 15,
    pointerEvents: 'none',
    boxShadow: '0 0 8px var(--neon-green-glow)'
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '380px',
        perspective: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
      }}
    >
      {/* HUD Outer Bracket Framing */}
      <div style={{ ...cornersStyle, top: 0, left: 0, borderWidth: '2px 0 0 2px' }} />
      <div style={{ ...cornersStyle, top: 0, right: 0, borderWidth: '2px 2px 0 0' }} />
      <div style={{ ...cornersStyle, bottom: 0, left: 0, borderWidth: '0 0 2px 2px' }} />
      <div style={{ ...cornersStyle, bottom: 0, right: 0, borderWidth: '0 2px 2px 0' }} />

      {/* Main card body that tilts */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${coords.rx}deg) rotateY(${coords.ry}deg) scale3d(${isHovered ? 1.05 : 1.0}, ${isHovered ? 1.05 : 1.0}, 1.0)`,
          transition: isHovered ? 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease',
          cursor: 'pointer',
          borderRadius: '4px',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 255, 102, 0.15), 0 0 25px var(--neon-green-glow)' 
            : '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 255, 102, 0.1)',
          border: isHovered ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          overflow: 'hidden',
          position: 'relative',
          animation: isHovered ? 'none' : 'floatCard 4s ease-in-out infinite'
        }}
      >
        {/* Floating Scanlines Overlay inside card */}
        <div 
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(rgba(0, 255, 102, 0) 50%, rgba(0, 255, 102, 0.04) 50%)',
            backgroundSize: '100% 4px',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />

        {/* Glitch sweep bar animation */}
        {isHovered && (
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '3px',
              background: 'var(--accent-blue)',
              boxShadow: '0 0 10px var(--accent-blue)',
              zIndex: 6,
              opacity: 0.7,
              animation: 'sweep 1.8s linear infinite'
            }}
          />
        )}

        {/* Holographic light reflection glare overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0, 255, 102, 0.22) 0%, transparent 60%)`,
            zIndex: 4,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* Base Image with visual enhancements */}
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: isHovered 
              ? 'brightness(1.05) contrast(1.15) saturate(1.1) drop-shadow(0 0 5px rgba(0,255,102,0.2))' 
              : 'brightness(0.9) contrast(1.05) saturate(0.95)',
            transition: 'filter 0.3s ease',
            zIndex: 1,
            display: 'block'
          }}
        />


      </div>

      {/* Styled animation components */}
      <style>{`
        @keyframes floatCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes sweep {
          0% { top: -5%; }
          100% { top: 105%; }
        }
      `}</style>
    </div>
  );
};

export default TiltImage;
