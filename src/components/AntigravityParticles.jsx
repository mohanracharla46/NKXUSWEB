import React, { useEffect, useRef } from 'react';

export default function AntigravityParticles() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const requestRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    // Set canvas dimensions with high DPR
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const particleCount = 450;
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        // Distribute particles in concentric orbits
        const orbitRadius = Math.random() * (Math.max(rect.width, rect.height) * 0.5 - 40) + 40;
        const angle = Math.random() * Math.PI * 2;
        
        // Closer particles rotate slightly faster
        const baseSpeed = Math.random() * 0.0008 + 0.0003;
        const speedFactor = Math.min(250 / orbitRadius, 2.5);
        const angularSpeed = baseSpeed * speedFactor * (Math.random() > 0.5 ? 1 : -1);

        particles.push({
          orbitRadius,
          angle,
          angularSpeed,
          size: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.65 + 0.25,
          dispX: 0,
          dispY: 0,
        });
      }
      particlesRef.current = particles;
    };

    initParticles();

    // Mouse listeners
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      if (isInside) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        mouseRef.current.active = true;
      } else {
        mouseRef.current.active = false;
      }
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Animation loop
    const animate = () => {
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      
      // Determine if we are in light theme
      const isLightTheme = document.documentElement.classList.contains('light-theme');
      
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Orbital motion updates
        p.angle += p.angularSpeed;

        // Elliptical shape layout matches desktop wide screens
        const targetX = cx + p.orbitRadius * Math.cos(p.angle) * 1.35;
        const targetY = cy + p.orbitRadius * Math.sin(p.angle) * 0.75;

        // 2. Gravitational warp calculations (repell/warp pocket)
        if (mouse.active) {
          const dx = mouse.x - targetX;
          const dy = mouse.y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = 180; // hover force range

          if (dist < threshold) {
            const force = (threshold - dist) / threshold;
            // Push particles away to create the antigravity pocket
            const repelX = -(dx / dist) * force * 55;
            const repelY = -(dy / dist) * force * 55;
            
            // Linear interpolate the position displacement offset
            p.dispX += (repelX - p.dispX) * 0.12;
            p.dispY += (repelY - p.dispY) * 0.12;
          } else {
            // Decay displacement offset back to zero
            p.dispX += (0 - p.dispX) * 0.08;
            p.dispY += (0 - p.dispY) * 0.08;
          }
        } else {
          p.dispX += (0 - p.dispX) * 0.08;
          p.dispY += (0 - p.dispY) * 0.08;
        }

        // 3. Final display position
        const drawX = targetX + p.dispX;
        const drawY = targetY + p.dispY;

        // Render particle
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        
        if (isLightTheme) {
          ctx.fillStyle = `rgba(9, 9, 11, ${p.alpha * 0.4})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.45})`;
        }
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="antigravity-canvas-container" 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Set to none to allow text select and button clicks
        zIndex: 1,
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
