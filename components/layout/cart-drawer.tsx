"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleReserve(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, items }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[var(--color-raven-800)] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">Tu carrito</h2>
              <button onClick={closeCart} aria-label="Cerrar carrito" className="p-2 text-white/70 hover:text-white">
                ✕
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
              {items.length === 0 && (
                <p className="text-sm text-white/50">Aún no agregas nada. Explora la colección.</p>
              )}
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-white/5 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-white/50">{item.variant}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="rounded-full border border-white/20 px-2"
                        aria-label="Disminuir"
                      >
                        –
                      </button>
                      {item.qty}
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="rounded-full border border-white/20 px-2"
                        aria-label="Aumentar"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">${item.price * item.qty} MXN</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2 text-xs text-white/40 hover:text-[var(--color-accent)]"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between text-white">
                  <span className="text-sm text-white/60">Total</span>
                  <span className="font-display text-xl font-bold">${totalPrice} MXN</span>
                </div>

                <form onSubmit={handleReserve} className="mt-4">
                  <p className="text-xs text-white/50">
                    Aún no procesamos pagos en línea. Deja tu correo y te contactamos para confirmar tu pedido.
                  </p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full rounded-[var(--radius-pill)] border border-white/15 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:border-[var(--color-accent)]"
                    />
                    <Button type="submit" disabled={status === "loading"}>
                      {status === "loading" ? "Enviando..." : "Reservar pedido"}
                    </Button>
                  </div>
                  {status === "success" && (
                    <p className="mt-3 text-sm text-[var(--color-accent-light)]">
                      ¡Listo! Te contactamos para confirmar tu pedido.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="mt-3 text-sm text-red-400">Algo salió mal. Intenta de nuevo.</p>
                  )}
                </form>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
