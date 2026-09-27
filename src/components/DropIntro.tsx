import Image from "next/image";

const WAVE =
  "M0,60 C240,20 480,20 720,60 C960,100 1200,100 1440,60 C1680,20 1920,20 2160,60 C2400,100 2640,100 2880,60 L2880,100 L0,100 Z";

// Splash droplets thrown off on impact: horizontal / vertical travel in px.
const SPLASH = [
  [-46, -38],
  [-22, -58],
  [24, -54],
  [50, -32],
];

/**
 * Opening scene: a blue drop falls, splashes and ripples, and the logo grows
 * out of the impact point; then a wave-edged blue panel sweeps up and uncovers
 * the page. Pure CSS (see globals.css), so it starts with the first paint,
 * needs no hydration and finishes on its own even without JS.
 */
export default function DropIntro() {
  return (
    <div aria-hidden="true" className="drop-intro">
      <div className="drop-intro__stage">
        <span className="drop-intro__ring" />
        <span className="drop-intro__ring" />
        <span className="drop-intro__ring" />

        <Image
          src="/images/logo.png"
          alt=""
          width={280}
          height={280}
          sizes="(max-width: 640px) 60vw, 280px"
          priority
          className="drop-intro__logo"
        />

        {SPLASH.map(([dx, dy], i) => (
          <span
            key={i}
            className="drop-intro__splash"
            style={{ "--dx": `${dx}px`, "--dy": `${dy}px` } as React.CSSProperties}
          />
        ))}

        <svg className="drop-intro__drop" viewBox="0 0 30 42">
          <defs>
            <linearGradient id="drop-fill" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0" stopColor="#93cbfc" />
              <stop offset="0.55" stopColor="#3b8ff4" />
              <stop offset="1" stopColor="#1d5bd6" />
            </linearGradient>
          </defs>
          <path d="M15 1C10 9.5 3 17.5 3 26.5a12 12 0 0024 0C27 17.5 20 9.5 15 1z" fill="url(#drop-fill)" />
          <ellipse cx="10.5" cy="25" rx="2.4" ry="4.2" fill="#fff" opacity="0.55" transform="rotate(18 10.5 25)" />
        </svg>
      </div>

      <div className="drop-intro__panel">
        <svg className="drop-intro__edge drop-intro__edge--top" viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path fill="currentColor" d={WAVE} />
        </svg>
        <svg className="drop-intro__edge drop-intro__edge--bottom" viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path fill="currentColor" d={WAVE} />
        </svg>
      </div>
    </div>
  );
}
