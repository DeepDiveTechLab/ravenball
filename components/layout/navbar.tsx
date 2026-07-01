"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container-xp flex items-center justify-between py-4">
        <a href="#inicio" className="flex items-center gap-2" aria-label="Ravenball inicio">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)]">
            <span className="font-display text-sm font-black text-white">R</span>
          </div>
          <span className="font-display text-lg font-black tracking-wider text-white">RAVENBALL</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegacion principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative rounded-full border border-white/15 p-2.5 text-white hover:border-[var(--color-accent)]"
            aria-label="Abrir carrito"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-10 0a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-white">
                {totalCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Abrir menu</span>
            <span className={cn("block h-0.5 w-6 bg-white transition-transform", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-white transition-opacity", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-white transition-transform", open && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-black/90 border-t border-white/10"
        >
          <div className="container-xp flex flex-col gap-4 py-6">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-base font-medium text-white">
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
