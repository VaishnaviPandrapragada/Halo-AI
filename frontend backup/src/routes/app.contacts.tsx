import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useHalo } from "@/lib/halo-state";
import { Plus, Phone, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/app/contacts")({
  head: () => ({ meta: [{ title: "Emergency Contacts · HALO" }] }),
  component: Contacts,
});

function Contacts() {
  const { contacts, addContact, removeContact } = useHalo();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    relation: "",
    phone: "",
  });

  const saveContact = async () => {
    if (!form.name || !form.phone) return;

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
        }),
      });

      const data = await response.json();

      console.log("Contact Saved:", data);

      addContact(form);

      setForm({
        name: "",
        relation: "",
        phone: "",
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Unable to save contact.");
    }
  };

  return (
    <div className="px-5 pt-[max(env(safe-area-inset-top),24px)]">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Trusted circle
          </p>

          <h1 className="mt-1 text-2xl font-semibold">
            Emergency Contacts
          </h1>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-full bg-teal text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
      </header>

      <p className="mt-3 text-sm text-muted-foreground">
        These people are auto-notified when you trigger SOS or fall off-route.
      </p>

      <ul className="mt-6 space-y-3">
        {contacts.map((c, i) => (
          <li
            key={c.id}
            className="glass flex items-center gap-3 rounded-2xl p-4 animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-teal/30 to-lavender/30 text-sm font-semibold">
              {c.initials}
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold">
                {c.name}
              </p>

              <p className="truncate text-[11px] text-muted-foreground">
                {c.relation} · {c.phone}
              </p>
            </div>

            <button className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-teal">
              <Phone className="h-4 w-4" />
            </button>

            <button
              onClick={() => removeContact(c.id)}
              className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-muted-foreground hover:text-emergency"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md glass-strong rounded-t-3xl p-6 pb-[max(env(safe-area-inset-bottom),24px)] animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15" />

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Add contact
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveContact();
              }}
              className="mt-4 space-y-3"
            >
              <input
                placeholder="Full name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-border bg-surface-1 px-4 py-3.5 text-sm outline-none"
              />

              <input
                placeholder="Relation (e.g. Mom)"
                value={form.relation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    relation: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-border bg-surface-1 px-4 py-3.5 text-sm outline-none"
              />

              <input
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-border bg-surface-1 px-4 py-3.5 text-sm outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-teal py-3.5 text-sm font-semibold text-primary-foreground"
              >
                Save contact
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}