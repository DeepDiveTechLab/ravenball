"use client";
import { motion } from "framer-motion";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { fadeUp } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { COLLECTION, PRODUCTS } from "@/lib/content";
import { useCart } from "@/components/providers/cart-provider";

export function Collection() {
  const { addItem } = useCart();
  return (
    <section id="coleccion" className="bg-[var(--color-raven-800)] py-24 md:py-32">
      <div className="container-xp">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-4">{COLLECTION.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              NUESTRA <span className="text-gradient">COLECCIÓN</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-white/60">{COLLECTION.body}</p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <motion.article
              key={product.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-[var(--radius-lg)] border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-5 flex aspect-square items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-white/10 to-black/40">
                <svg className="h-16 w-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white">{product.name}</h3>
              <p className="mt-1 text-sm text-white/50">{product.variant}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-white">
                  ${product.price} <span className="text-xs font-normal text-white/50">MXN</span>
                </span>
              </div>
              <Button onClick={() => addItem(product.id)} className="mt-4 w-full" variant="ghost">
                Agregar al carrito
              </Button>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
