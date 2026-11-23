"use client";

import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <AnimatedPage key={pathname}>{children}</AnimatedPage>;
}

function AnimatedPage({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set({ opacity: 1, y: 0 });
      return;
    }

    controls.set({ opacity: 0, y: 8 });
    void controls.start({ opacity: 1, y: 0 });
  }, [controls, shouldReduceMotion]);

  return (
    <motion.div
      className="min-h-full flex-1"
      animate={controls}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
