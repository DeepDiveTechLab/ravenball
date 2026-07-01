"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function Reveal({
  children,
  as = "div",
  variants = fadeUp,
  className,
  delay = 0,
  once = true,
  viewportAmount = 0.4,
}: {
  children: React.ReactNode;
  as?: keyof typeof motion;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
  viewportAmount?: number;
}) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: viewportAmount }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}
