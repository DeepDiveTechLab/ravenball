"use client";
import { motion } from "framer-motion";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { fadeUp } from "@/lib/motion";
import { TEAMS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Teams() {
  return (
    <section id="equipos" className="py-24 md:py-32">
      <div className="container-xp">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-4">{TEAMS.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              A QUIÉN <span className="text-gradient">EQUIPAMOS</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-white/60">{TEAMS.body}</p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {TEAMS.segments.map((seg) => (
            <motion.div
              key={seg.title}
              variants={fadeUp}
              className={cn(
                "relative rounded-[var(--radius-lg)] border p-8 transition-colors",
                seg.featured
                  ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/5"
                  : "border-white/10 bg-white/5"
              )}
            >
              {seg.featured && (
                <span className="absolute right-0 top-0 rounded-bl-xl bg-[var(--color-accent)] px-3 py-1 text-xs font-bold text-white">
                  POPULAR
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">{seg.title}</h3>
              <p className="mt-3 text-sm text-white/60">
                <strong className="text-white">Necesidad:</strong> {seg.need} {seg.body}
              </p>
              <ul className="mt-5 space-y-2">
                {seg.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-white/70">
                    <span className="text-[var(--color-accent)]">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
