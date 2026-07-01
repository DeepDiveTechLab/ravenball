"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { FRAME_COUNT, FRAME_HEIGHT, FRAME_WIDTH, frameUrl } from "@/lib/frame-sequence";
import { HERO } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { fadeUp, fadeUpBig, staggerContainer } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  canvasW: number,
  canvasH: number,
  srcW: number,
  srcH: number
) {
  const scale = Math.max(canvasW / srcW, canvasH / srcH);
  const drawW = srcW * scale;
  const drawH = srcH * scale;
  const dx = (canvasW - drawW) / 2;
  const dy = (canvasH - drawH) / 2;
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

export function VideoScrubHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const reducedMotion = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = () => {
        loadedCount += 1;
        if (!cancelled) setLoaded(loadedCount);
        if (loadedCount === FRAME_COUNT && !cancelled) setReady(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion || !canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      render();
    }

    function render() {
      const img = imagesRef.current[frameRef.current];
      if (!img || !ctx) return;
      drawCover(ctx, img, canvas.width, canvas.height, FRAME_WIDTH, FRAME_HEIGHT);
    }

    resize();
    window.addEventListener("resize", resize);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=220%",
      scrub: 0.4,
      pin: true,
      onUpdate: (self) => {
        const idx = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.round(self.progress * (FRAME_COUNT - 1)))
        );
        frameRef.current = idx;
        render();
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, [ready, reducedMotion]);

  const progressPct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--color-raven-950)]"
    >
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
        />
      )}

      {(reducedMotion || !ready) && (
        <NextImage
          src={frameUrl(1)}
          alt="Jugadora de voleibol Ravenball"
          fill
          priority
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />

      <div className="container-xp relative z-10 flex min-h-screen flex-col justify-end pb-24 pt-32 sm:pb-32">
        <motion.div initial="hidden" animate="show" variants={staggerContainer(0.14, 0.1)}>
          <motion.p variants={fadeUp} className="eyebrow mb-5">
            {HERO.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUpBig}
            className="font-display max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {HERO.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">
            {HERO.body}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <Button onClick={() => document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" })}>
              {HERO.primaryCta}
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("equipos")?.scrollIntoView({ behavior: "smooth" })}
            >
              {HERO.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {!ready && !reducedMotion && (
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest text-white/50">
          Cargando experiencia... {progressPct}%
        </div>
      )}
    </section>
  );
}
