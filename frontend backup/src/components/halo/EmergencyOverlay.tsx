import { useEffect, useState } from "react";
import { useHalo } from "@/lib/halo-state";
import { Phone, ShieldAlert, X, MapPin } from "lucide-react";

export function EmergencyOverlay() {
  const { emergency, cancelEmergency, contacts } = useHalo();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!emergency) { setElapsed(0); return; }
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [emergency]);

  if (!emergency) return null;

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto animate-fade-in" style={{ background: "var(--gradient-emergency)" }}>
      <div className="mx-auto flex min-h-full max-w-md flex-col px-5 pt-[max(env(safe-area-inset-top),24px)] pb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse-soft" />
            Emergency Active
          </div>
          <button onClick={cancelEmergency} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <div className="relative grid h-28 w-28 place-items-center rounded-full bg-white/10">
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" style={{ animationDelay: "1s" }} />
            <ShieldAlert className="relative h-12 w-12 text-white" strokeWidth={1.8} />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-white">Help is on the way</h1>
          <p className="mt-2 text-sm text-white/75">
            Contacts notified · Location streaming · Audio recording
          </p>
          <p className="mt-4 font-mono text-3xl tracking-wider text-white">{mm}:{ss}</p>
        </div>

        <div className="mt-8 glass-strong rounded-2xl p-4">
          <div className="flex items-center gap-3 text-white/90">
            <MapPin className="h-4 w-4 text-white" />
            <div className="flex-1">
              <p className="text-sm font-medium">Live location</p>
              <p className="text-[11px] text-white/60">2451 Mission St · ±4m accuracy</p>
            </div>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white">Streaming</span>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">Notified contacts</p>
          <div className="space-y-2">
            {contacts.map((c) => (
              <div key={c.id} className="glass flex items-center gap-3 rounded-2xl p-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-sm font-semibold text-white">
                  {c.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-[11px] text-white/60">{c.relation} · notified</p>
                </div>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-white text-emergency">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={cancelEmergency}
          className="mt-8 w-full rounded-2xl border border-white/30 bg-white/10 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        >
          I'm safe — cancel emergency
        </button>
      </div>
    </div>
  );
}