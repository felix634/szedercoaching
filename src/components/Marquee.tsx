"use client";

const words = [
  "SCHWIMMEN",
  "VERTRAUEN",
  "WASSER",
  "FREIHEIT",
  "MUT",
  "COACHING",
  "STÄRKE",
  "FREUDE",
  "SICHERHEIT",
  "INKLUSION",
];

export default function Marquee() {
  const separator = (
    <svg className="w-4 h-4 text-water-500 mx-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );

  return (
    <div className="relative overflow-hidden py-6 bg-water-900/50 border-y border-water-800/30">
      <div className="animate-marquee flex whitespace-nowrap items-center">
        {[...Array(2)].map((_, setIdx) => (
          <div key={setIdx} className="flex items-center">
            {words.map((word, i) => (
              <span key={`${setIdx}-${i}`} className="flex items-center">
                <span className="text-sm md:text-base font-heading font-medium tracking-[0.2em] text-cream/40">
                  {word}
                </span>
                {separator}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
