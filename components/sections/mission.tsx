"use client";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { fadeUp } from "@/lib/motion";
import { MISSION } from "@/lib/content";

export function Mission() {
  return (
    <section id="nosotras" className="py-24 md:py-32">
      <div className="container-xp grid gap-14 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">{MISSION.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
              POR MUJERES, <span className="text-gradient">PARA MUJERES.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-white/60">{MISSION.body1}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-white/60">{MISSION.body2}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {MISSION.features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="rounded-[var(--radius-lg)] bg-white/5 p-6"
              >
                <h3 className="font-bold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-white/50">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <blockquote className="rounded-[var(--radius-lg)] bg-white/5 p-8">
            <p className="font-display text-xl italic leading-relaxed text-white sm:text-2xl">
              &ldquo;{MISSION.quote}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]/20 font-bold text-[var(--color-accent-light)]">
                R
              </div>
              <div>
                <p className="font-bold text-white">{MISSION.quoteAuthor}</p>
                <p className="text-sm text-white/50">{MISSION.quoteRole}</p>
              </div>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
