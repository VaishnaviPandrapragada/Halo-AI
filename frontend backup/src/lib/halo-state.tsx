import { createContext, useContext, useState, type ReactNode } from "react";

export type Contact = {
  id: string;
  name: string;
  relation: string;
  phone: string;
  initials: string;
};

type Trip = {
  active: boolean;
  from: string;
  to: string;
  etaMinutes: number;
};

type HaloState = {
  user: { name: string };
  emergency: boolean;
  triggerEmergency: () => void;
  cancelEmergency: () => void;
  contacts: Contact[];
  addContact: (c: Omit<Contact, "id" | "initials">) => void;
  removeContact: (id: string) => void;
  trip: Trip;
  startTrip: (from: string, to: string) => void;
  endTrip: () => void;
};

const Ctx = createContext<HaloState | null>(null);

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function HaloProvider({ children }: { children: ReactNode }) {
  const [emergency, setEmergency] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Monica Geller",
      relation: "Mother",
      phone: "9536515110",
      initials: "MG",
    },
    {
      id: "2",
      name: "Chandler Bing",
      relation: "Father",
      phone: "9864521745",
      initials: "CB",
    },
    {
      id: "3",
      name: "Rachel Green",
      relation: "Best Friend",
      phone: "9635241870",
      initials: "RG",
    },
  ]);

  const [trip, setTrip] = useState<Trip>({
    active: false,
    from: "Central Park",
    to: "Times Square",
    etaMinutes: 28,
  });

  const startTrip = (from: string, to: string) => {
    setTrip({
      active: true,
      from,
      to,
      etaMinutes: 22,
    });

    setTimeout(() => {
      alert(
        "⚠ ROUTE DEVIATION DETECTED\n\nYour vehicle appears to be taking an alternate route.\n\nHALO is monitoring the situation and your emergency contacts are ready to be notified."
      );
    }, 8000);
  };

  return (
    <Ctx.Provider
      value={{
        user: { name: "Joey" },

        emergency,

        triggerEmergency: () => setEmergency(true),

        cancelEmergency: () => setEmergency(false),

        contacts,

        addContact: (c) =>
          setContacts((prev) => [
            ...prev,
            {
              ...c,
              id: crypto.randomUUID(),
              initials: initials(c.name),
            },
          ]),

        removeContact: (id) =>
          setContacts((prev) =>
            prev.filter((c) => c.id !== id)
          ),

        trip,

        startTrip,

        endTrip: () =>
          setTrip((t) => ({
            ...t,
            active: false,
          })),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useHalo() {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error("useHalo must be used inside HaloProvider");
  }

  return ctx;
}