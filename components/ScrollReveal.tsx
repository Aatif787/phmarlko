"use client";
import { motion, UseInViewOptions, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationType = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "zoom-out" 
  | "flip-up"
  | "slide-up";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  viewport?: UseInViewOptions;
  width?: "fit-content" | "100%";
}

const animations: Record<AnimationType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  "fade-left": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  "fade-right": {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  "zoom-out": {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 }
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 60, transformPerspective: 1000 },
    visible: { opacity: 1, rotateX: 0, transformPerspective: 1000 }
  },
  "slide-up": {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
};

export function ScrollReveal({ 
  children, 
  className = "", 
  animation = "fade-up", 
  delay = 0, 
  duration = 0.6,
  viewport = { once: true, margin: "-10%" },
  width = "100%"
}: ScrollRevealProps) {
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={animations[animation]}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
