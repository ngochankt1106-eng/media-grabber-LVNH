'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  type: 'star' | 'circle' | 'cross';
  rotation: number;
  rotSpeed: number;
}

export default function SparkleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#ff2d75', // Hot Pink
      '#ff659b', // Soft Pink
      '#fcd34d', // Glitter Gold
      '#ffffff', // Diamond White
      '#e0aaff', // Pastel Violet
      '#ffd1dc', // Blush Pink
    ];

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

    const createParticle = (x?: number, y?: number): Particle => {
      return {
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        size: Math.random() * 3 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.45 - 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        opacitySpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        type: Math.random() > 0.4 ? 'star' : Math.random() > 0.5 ? 'cross' : 'circle',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // Interactive mouse / touch glitter trail
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (Math.random() < 0.6) {
        particles.push({
          ...createParticle(clientX + (Math.random() - 0.5) * 16, clientY + (Math.random() - 0.5) * 16),
          size: Math.random() * 3.5 + 2,
          speedY: (Math.random() - 0.5) * 0.8,
          speedX: (Math.random() - 0.5) * 0.8,
        });
        if (particles.length > particleCount + 25) {
          particles.shift();
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Draw diamond 4-pointed star
    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.opacity += p.opacitySpeed;

        if (p.opacity > 1) {
          p.opacity = 1;
          p.opacitySpeed = -Math.abs(p.opacitySpeed);
        } else if (p.opacity < 0.15) {
          p.opacity = 0.15;
          p.opacitySpeed = Math.abs(p.opacitySpeed);
        }

        // Wrap edges
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2.5;

        if (p.type === 'star') {
          drawStar(0, 0, 4, p.size * 2, p.size * 0.6);
        } else if (p.type === 'cross') {
          drawStar(0, 0, 4, p.size * 1.6, p.size * 0.3);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
