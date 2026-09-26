/**
 * Opening scene: the name fills with water like a glass, then the water level
 * sweeps down and uncovers the page. Pure CSS (see globals.css), so it starts
 * with the first paint, needs no hydration and ends on its own even without JS.
 */
export default function WaterIntro() {
  return (
    <div aria-hidden="true" className="water-intro">
      <svg className="water-intro__edge" viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,60 C240,20 480,20 720,60 C960,100 1200,100 1440,60 C1680,20 1920,20 2160,60 C2400,100 2640,100 2880,60 L2880,100 L0,100 Z"
        />
      </svg>
      <div className="px-6 text-center">
        <p className="water-intro__name font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          Szeder <span className="italic">Coaching</span>
        </p>
        <p className="water-intro__tagline section-subtitle text-water-300 mt-6">
          Schwimmcoaching mit Herz
        </p>
      </div>
    </div>
  );
}
