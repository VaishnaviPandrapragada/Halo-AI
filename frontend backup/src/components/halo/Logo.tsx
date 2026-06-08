import logoAsset from "@/assets/halo-logo.png";

export function HaloLogo({ className = "", showTagline = false }: { className?: string; showTagline?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={logoAsset}
        alt="HALO — Your Trip's Companion"
        className="w-auto h-auto select-none"
        draggable={false}
      />
      {showTagline && (
        <p className="mt-3 text-xs uppercase tracking-[0.32em] text-muted-foreground">
          Your Trip's Companion
        </p>
      )}
    </div>
  );
}

export function HaloMark({ size = 28 }: { size?: number }) {
  return (
    <img
      src={logoAsset}
      alt="HALO"
      style={{ height: size, width: "auto" }}
      className="select-none"
      draggable={false}
    />
  );
}