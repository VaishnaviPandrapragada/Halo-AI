import { createFileRoute } from "@tanstack/react-router";
import { useHalo } from "@/lib/halo-state";
import { MapCanvas } from "@/components/halo/MapCanvas";
import {
  Share2,
  Navigation,
  Clock,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/trip")({
  head: () => ({ meta: [{ title: "Trip · HALO" }] }),
  component: Trip,
});

function Trip() {
  const { trip, startTrip, endTrip } = useHalo();

  const [from, setFrom] = useState(trip.from);
  const [to, setTo] = useState(trip.to);

  return (
    <div className="px-5 pt-[max(env(safe-area-inset-top),24px)]">
      <header>
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Trip monitoring
        </p>

        <h1 className="mt-1 text-2xl font-semibold">
          {trip.active ? "Active journey" : "Plan a trip"}
        </h1>
      </header>

      <div className="mt-5 glass rounded-2xl p-4 space-y-3 animate-fade-in-up">
        <RouteField
          icon={<MapPin className="h-4 w-4 text-teal" />}
          label="From"
          value={from}
          onChange={setFrom}
        />

        <div className="ml-5 h-4 w-px bg-border" />

        <RouteField
          icon={<Navigation className="h-4 w-4 text-lavender" />}
          label="To"
          value={to}
          onChange={setTo}
        />
      </div>

      <div
        className="mt-4 h-[40vh] min-h-[260px] animate-fade-in-up"
        style={{ animationDelay: "80ms" }}
      >
        <div className="relative h-full overflow-hidden rounded-[28px] border border-border">
          <MapCanvas />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat
          icon={<Clock className="h-4 w-4" />}
          label="ETA"
          value={`${trip.etaMinutes}m`}
        />

        <Stat
          icon={<Navigation className="h-4 w-4" />}
          label="Distance"
          value="4.2 km"
        />

        <Stat
          icon={<ShieldCheck className="h-4 w-4" />}
          label="Safety"
          value="92%"
          tint="sage"
        />
      </div>

      <div className="mt-4 glass rounded-2xl p-4 animate-fade-in-up">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Live Monitoring
        </p>

        <p className="mt-2 text-sm font-medium">
          HALO is tracking your route and checking for deviations in real time.
        </p>

        <div className="mt-3 space-y-1">
          <p className="text-xs text-teal">
            ✓ Emergency contacts synced
          </p>

          <p className="text-xs text-teal">
            ✓ GPS monitoring active
          </p>

          <p className="text-xs text-teal">
            ✓ AI safety analysis active
          </p>

          <p className="text-xs text-teal">
            ✓ Route deviation detection enabled
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-surface-1 py-3.5 text-sm font-medium">
          <Share2 className="h-4 w-4" />
          Share trip
        </button>

        {trip.active ? (
          <button
            onClick={endTrip}
            className="flex-1 rounded-2xl border border-border bg-surface-1 py-3.5 text-sm font-medium text-emergency"
          >
            End trip
          </button>
        ) : (
          <button
            onClick={() => startTrip(from, to)}
            className="flex-1 rounded-2xl bg-teal py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--glow-teal)]"
          >
            Start trip
          </button>
        )}
      </div>
    </div>
  );
}

function RouteField({
  icon,
  label,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-surface-2">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm font-medium outline-none"
        />
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tint?: "sage";
}) {
  return (
    <div className="glass rounded-2xl p-3">
      <div
        className={`mb-2 grid h-7 w-7 place-items-center rounded-lg ${
          tint === "sage"
            ? "bg-sage/15 text-sage"
            : "bg-teal/15 text-teal"
        }`}
      >
        {icon}
      </div>

      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}