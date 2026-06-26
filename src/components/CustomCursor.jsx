import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRefPos = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const requestRef = useRef(null);
  const isMovingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect mobile / touch devices
    const detectTouch = () => {
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return coarsePointer || hasTouch;
    };

    if (detectTouch()) {
      setIsTouchDevice(true);
      return;
    }

    // Set cursor active class on body
    document.documentElement.classList.add('custom-cursor-active');

    // Canvas setup
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking and actions
    const onMouseMove = (e) => {
      setIsHidden(false);
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Spawn particles when mouse moves
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only spawn if moving significantly
      if (distance > 2) {
        isMovingRef.current = true;
        
        // Spawn 1-2 particles per move event for subtle aesthetic effect
        const count = Math.min(Math.floor(distance / 5), 3) || 1;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() * 6 - 3),
            y: e.clientY + (Math.random() * 6 - 3),
            // Floating upward (antigravity)
            vx: (Math.random() - 0.5) * 0.8,
            vy: -Math.random() * 1.5 - 0.4,
            size: Math.random() * 1.8 + 0.8,
            life: 1.0,
            decay: Math.random() * 0.015 + 0.01,
          });
        }
      }
      
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    // Event delegation for hovers on interactive items
    const onMouseOver = (e) => {
      // Find closest interactive element
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.network-card') ||
        target.closest('.service-card') ||
        target.closest('.portal-item') ||
        target.closest('.interactive-element');

      if (isInteractive) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const relatedTarget = e.relatedTarget;
      
      // If we exit an interactive element and don't enter another interactive one, clear hover
      const isExitingInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.network-card') ||
        target.closest('.service-card') ||
        target.closest('.portal-item') ||
        target.closest('.interactive-element');

      if (isExitingInteractive) {
        // Verify where mouse went
        if (!relatedTarget || (!relatedTarget.closest('a') && 
                               !relatedTarget.closest('button') && 
                               !relatedTarget.closest('[role="button"]') &&
                               !relatedTarget.closest('.network-card') &&
                               !relatedTarget.closest('.service-card') &&
                               !relatedTarget.closest('.portal-item') &&
                               !relatedTarget.closest('.interactive-element'))) {
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    // Delegation hover listeners
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Animation Loop
    const animate = () => {
      // 1. Lerp follower ring
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      
      ringRefPos.current.x += (targetX - ringRefPos.current.x) * 0.16;
      ringRefPos.current.y += (targetY - ringRefPos.current.y) * 0.16;

      if (ringRef.current && dotRef.current) {
        ringRef.current.style.transform = `translate3d(${ringRefPos.current.x}px, ${ringRefPos.current.y}px, 0)`;
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      // 2. Update and draw canvas particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle (grayscale silver-white)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.35})`;
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(requestRef.current);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isHidden ? 'hidden' : ''}`} 
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHidden ? 'hidden' : ''} ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`} 
      />
      <canvas 
        ref={canvasRef} 
        className="custom-cursor-canvas" 
      />
    </>
  );
}
