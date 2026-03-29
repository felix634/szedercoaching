"use client";

import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

export default function Bubbles({ count = 15 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const b: Bubble[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 5,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 10,
    }));
    setBubbles(b);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-white/10 animate-float-up"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
