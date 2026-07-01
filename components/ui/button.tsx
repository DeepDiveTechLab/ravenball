"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonHover, buttonTap } from "@/lib/motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-sm font-bold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]",
        ghost:
          "bg-white/5 text-white border border-white/10 hover:border-[var(--color-accent)]/60",
        outline:
          "bg-transparent text-white border border-white/20 hover:bg-white/10",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={buttonHover}
      whileTap={buttonTap}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
