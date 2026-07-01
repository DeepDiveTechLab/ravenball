"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { AMBASSADORS } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

export function Ambassadors() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "embajadora" }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="embajadoras" className="bg-[var(--color-raven-800)] py-24 md:py-32">
      <div className="container-xp grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">{AMBASSADORS.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              CONVIÉRTETE EN <span className="text-gradient">EMBAJADORA</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-white/60">{AMBASSADORS.body}</p>
          </Reveal>
          <div className="mt-8 space-y-5">
            {AMBASSADORS.steps.map((s, i) => (
              <div key={s.title} className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/20 font-bold text-[var(--color-accent-light)]">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white">{s.title}</h4>
                  <p className="text-sm text-white/50">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="rounded-[var(--radius-lg)] bg-white/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-white">{AMBASSADORS.ctaTitle}</h3>
            <p className="mt-3 text-sm text-white/60">{AMBASSADORS.ctaBody}</p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="mt-6 w-full rounded-[var(--radius-pill)] border border-white/15 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:border-[var(--color-accent)]"
            />
            <Button type="submit" className="mt-4 w-full" disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Aplicar ahora"}
            </Button>
            {status === "success" && (
              <p className="mt-3 text-sm text-[var(--color-accent-light)]">¡Gracias! Te contactaremos pronto.</p>
            )}
            {status === "error" && <p className="mt-3 text-sm text-red-400">Algo salió mal. Intenta de nuevo.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
