import React, { useEffect, useRef } from 'react';

const MatrixBackground = ({ speed = 1.0, enabled = true }) => {
  const canvasRef = useRef(null);
  const speedRef = useRef(speed);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters from matrix rain (Katakana + Numbers + Alpha)
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ*#$@&%';
    const charArray = chars.split('');

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Array to track the y-coordinate of the rain drops
    let drops = Array(columns).fill(1);

    // Track mouse coordinates
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const draw = () => {
      if (!enabledRef.current) {
        ctx.fillStyle = '#030806';
        ctx.fillRect(0, 0, width, height);
        return;
      }

      // Semi-transparent black background to create tailing effect
      ctx.fillStyle = 'rgba(3, 8, 6, 0.06)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Drop x coordinate
        const x = i * fontSize;
        // Drop y coordinate
        const y = drops[i] * fontSize;

        // Choose random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];

        // Calculate distance from mouse
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction effect: Mouse scatters/lights up the matrix code
        if (dist < 80) {
          ctx.fillStyle = '#ffffff'; // mouse interaction makes character glow white
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00ff66';
        } else if (drops[i] === 1) {
          ctx.fillStyle = '#ffffff'; // top of stream is bright white
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = '#00ff66'; // standard matrix green
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        // Reset drop to top if it reaches bottom of screen, with random offset
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Drop speed modifier near mouse using the speed reference
        if (dist < 80) {
          drops[i] += 1.5 * speedRef.current; // fall faster when mouse is near
        } else {
          drops[i] += 0.75 * speedRef.current; // normal speed
        }
      }
    };

    const fps = 30;
    const interval = 1000 / fps;
    let then = Date.now();

    const loop = () => {
      animationId = requestAnimationFrame(loop);

      const now = Date.now();
      const delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        draw();
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MatrixBackground;
