"use client";

import { useRef, useState, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";

interface WaterCardProps {
  children: ReactNode;
  className?: string;
  disableWave?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function WaterCard({ children, className = "", disableWave = false }: WaterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const rippleId = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1200);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1200);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-2xl cursor-default ${className}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Water glow that follows cursor */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            300px circle at ${glowPos.x}% ${glowPos.y}%,
            rgba(59, 143, 244, 0.15),
            rgba(96, 174, 248, 0.05) 40%,
            transparent 70%
          )`,
        }}
      />

      {/* Animated water caustic lines on hover */}
      {!disableWave && <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{ opacity: isHovered ? 0.12 : 0 }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="water-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,40 Q20,20 40,40 Q60,60 80,40"
                stroke="rgba(96,174,248,0.6)"
                strokeWidth="0.8"
                fill="none"
              >
                <animate
                  attributeName="d"
                  values="M0,40 Q20,20 40,40 Q60,60 80,40;M0,40 Q20,55 40,40 Q60,25 80,40;M0,40 Q20,20 40,40 Q60,60 80,40"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M0,60 Q20,45 40,60 Q60,75 80,60"
                stroke="rgba(96,174,248,0.3)"
                strokeWidth="0.5"
                fill="none"
              >
                <animate
                  attributeName="d"
                  values="M0,60 Q20,45 40,60 Q60,75 80,60;M0,60 Q20,70 40,60 Q60,50 80,60;M0,60 Q20,45 40,60 Q60,75 80,60"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#water-pattern)" />
        </svg>
      </div>}

      {/* Ripple circles */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none z-10"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {[0, 1, 2].map((ring) => (
            <motion.span
              key={ring}
              className="absolute rounded-full border"
              style={{
                borderColor:
                  ring === 0
                    ? "rgba(96,174,248,0.4)"
                    : ring === 1
                      ? "rgba(96,174,248,0.25)"
                      : "rgba(96,174,248,0.1)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              initial={{ width: 0, height: 0, opacity: 0.7 }}
              animate={{
                width: 140 + ring * 50,
                height: 140 + ring * 50,
                opacity: 0,
              }}
              transition={{
                duration: 1.2,
                delay: ring * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </span>
      ))}

      {/* Bottom water wave line on hover */}
      {!disableWave && <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none z-0 transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <svg
          viewBox="0 0 400 50"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path fill="rgba(59,143,244,0.08)">
            <animate
              attributeName="d"
              values="M0,25 Q50,15 100,25 Q150,35 200,25 Q250,15 300,25 Q350,35 400,25 L400,50 L0,50 Z;M0,25 Q50,35 100,25 Q150,15 200,25 Q250,35 300,25 Q350,15 400,25 L400,50 L0,50 Z;M0,25 Q50,15 100,25 Q150,35 200,25 Q250,15 300,25 Q350,35 400,25 L400,50 L0,50 Z"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <path fill="rgba(96,174,248,0.05)">
            <animate
              attributeName="d"
              values="M0,30 Q60,20 120,30 Q180,40 240,30 Q300,20 360,30 Q390,35 400,30 L400,50 L0,50 Z;M0,30 Q60,40 120,30 Q180,20 240,30 Q300,40 360,30 Q390,25 400,30 L400,50 L0,50 Z;M0,30 Q60,20 120,30 Q180,40 240,30 Q300,20 360,30 Q390,35 400,30 L400,50 L0,50 Z"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>}

      {/* Card content */}
      <div className="relative z-20 h-full">{children}</div>
    </motion.div>
  );
}
