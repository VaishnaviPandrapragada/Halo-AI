import { useState, useRef } from "react";
import { useHalo } from "@/lib/halo-state";
import { ShieldAlert } from "lucide-react";

export function SosButton() {
  const { triggerEmergency, emergency } = useHalo();
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number>(0);

  if (emergency) return null;

  const activateSOS = async () => {
    try {
      const response = await fetch("http://localhost:5000/sos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: "Current Location",
        }),
      });

      const data = await response.json();

      console.log("SOS Response:", data);

      alert(
        `🚨 SOS Activated\n\nEmergency contacts notified: ${data.contacts?.length || 0}`
      );

      triggerEmergency();
    } catch (error) {
      console.error(error);
      alert("Unable to contact HALO server.");
    }
  };

  const begin = () => {
    start.current = performance.now();

    const tick = (t: number) => {
      const p = Math.min(1, (t - start.current) / 900);

      setProgress(p);

      if (p >= 1) {
        activateSOS();
        setProgress(0);
        return;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
  };

  const end = () => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
    }

    setProgress(0);
  };

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 92px)" }}
    >
      <button
        onMouseDown={begin}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={begin}
        onTouchEnd={end}
        onClick={activateSOS}
        aria-label="Activate SOS emergency"
        className="pointer-events-auto relative grid h-16 w-16 place-items-center rounded-full bg-emergency text-white shadow-[var(--glow-emergency)] transition-transform active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-emergency animate-pulse-ring opacity-60" />
        <span
          className="absolute inset-0 rounded-full bg-emergency animate-pulse-ring opacity-40"
          style={{ animationDelay: "0.9s" }}
        />

        <ShieldAlert className="relative h-6 w-6" strokeWidth={2.4} />

        <span className="absolute -bottom-5 text-[10px] font-semibold uppercase tracking-widest text-emergency">
          SOS
        </span>

        {progress > 0 && (
          <svg className="absolute -inset-1.5" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="oklch(0.62 0.22 24 / 0.3)"
              strokeWidth="3"
            />

            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="oklch(0.78 0.09 190)"
              strokeWidth="3"
              strokeDasharray={`${progress * 301.6} 301.6`}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}