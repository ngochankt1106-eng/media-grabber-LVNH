import confetti from 'canvas-confetti';

export function triggerPinkSparkleConfetti() {
  const count = 40;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#ff2d75', '#ff659b', '#fcd34d', '#ffffff', '#e0aaff'],
    shapes: ['star', 'circle'] as ('star' | 'circle')[],
    ticks: 200,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.6),
    spread: 60,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.4),
    spread: 100,
    scalar: 1.2,
    shapes: ['star'],
  });
}
