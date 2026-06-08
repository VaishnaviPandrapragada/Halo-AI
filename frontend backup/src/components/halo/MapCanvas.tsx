export function MapCanvas({ emergency = false }: { emergency?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] map-grid">
      {/* Roads */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="road" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.5 0.02 250)" stopOpacity="0.5" />
            <stop offset="1" stopColor="oklch(0.5 0.02 250)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0" stopColor={emergency ? "oklch(0.7 0.22 24)" : "oklch(0.78 0.09 190)"} />
            <stop offset="1" stopColor={emergency ? "oklch(0.62 0.22 24)" : "oklch(0.74 0.07 295)"} />
          </linearGradient>
        </defs>
        <path d="M -20 480 C 80 460, 140 420, 200 360 S 340 220, 440 180" stroke="url(#road)" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M -20 480 C 80 460, 140 420, 200 360 S 340 220, 440 180" stroke="url(#route)" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="2 8" />
        <path d="M 30 60 L 380 120" stroke="oklch(0.45 0.02 250)" strokeOpacity="0.35" strokeWidth="14" strokeLinecap="round" />
        <path d="M 60 580 L 360 540" stroke="oklch(0.45 0.02 250)" strokeOpacity="0.3" strokeWidth="10" strokeLinecap="round" />
      </svg>

      {/* Destination pin */}
      <div className="absolute" style={{ left: "78%", top: "28%" }}>
        <div className="h-3 w-3 rounded-full bg-lavender ring-4 ring-lavender/30" />
      </div>

      {/* Current location */}
      <div className="absolute" style={{ left: "44%", top: "58%" }}>
        <div className="relative">
          <div className={`absolute inset-0 rounded-full ${emergency ? "bg-emergency/50" : "bg-teal/50"} animate-pulse-ring`} />
          <div className={`absolute inset-0 rounded-full ${emergency ? "bg-emergency/50" : "bg-teal/50"} animate-pulse-ring`} style={{ animationDelay: "0.8s" }} />
          <div className={`relative h-4 w-4 rounded-full ${emergency ? "bg-emergency" : "bg-teal"} ring-4 ring-background`} />
        </div>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.5)" }} />
    </div>
  );
}