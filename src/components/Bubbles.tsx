"use client";

import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Bubbles({ count = 12 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const b: Bubble[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 14 + 4,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.15 + 0.05,
    }));
    setBubbles(b);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 rounded-full border border-water-400/20 animate-float-up"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            backgroundColor: `rgba(96, 174, 248, ${bubble.opacity})`,
          }}
        />
      ))}
    </div>
  );
}
