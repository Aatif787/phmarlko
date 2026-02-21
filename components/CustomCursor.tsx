"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest("a, button")));
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          width: 42,
          height: 18,
          backgroundImage:
            "radial-gradient(circle at 28% 22%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 55%), radial-gradient(circle at 78% 78%, rgba(2, 6, 23, 0.28), rgba(2, 6, 23, 0) 60%), linear-gradient(140deg, var(--theme-accent) 0%, var(--theme-accent-2) 55%, var(--theme-accent-3) 100%)",
          boxShadow:
            "0 10px 22px rgba(2, 6, 23, 0.28), inset 0 4px 8px rgba(255, 255, 255, 0.55), inset 0 -4px 10px rgba(2, 6, 23, 0.35)"
        }}
        animate={{
          x: mousePosition.x - 21,
          y: mousePosition.y - 9,
          scale: isHovering ? 1.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 210, damping: 15, mass: 0.12 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          width: 26,
          height: 7,
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.05))",
          filter: "blur(0.3px)"
        }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 7,
          scale: isHovering ? 1.35 : 1,
        }}
        transition={{ type: "spring", stiffness: 230, damping: 16, mass: 0.1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          width: 30,
          height: 5,
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))",
          opacity: 0.4
        }}
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 2,
          scale: isHovering ? 1.2 : 1
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          width: 58,
          height: 24,
          border: "1px solid rgba(15, 23, 42, 0.18)",
          boxShadow:
            "0 0 0 1px rgba(255, 255, 255, 0.35) inset, 0 8px 24px rgba(2, 6, 23, 0.12)"
        }}
        animate={{
          x: mousePosition.x - 29,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.22 : 1,
          opacity: isHovering ? 0.75 : 0.5
        }}
        transition={{ type: "spring", stiffness: 130, damping: 20, mass: 0.2 }}
      />
    </>
  );
}
