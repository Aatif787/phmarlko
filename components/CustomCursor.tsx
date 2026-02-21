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
          width: 20,
          height: 10,
          border: "1.5px solid rgba(0, 0, 0, 0.8)",
          backgroundColor: "transparent",
        }}
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 5,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 210, damping: 15, mass: 0.12 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          width: 32,
          height: 16,
          border: "1px solid rgba(15, 23, 42, 0.18)",
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.22 : 1,
          opacity: isHovering ? 0.75 : 0.5
        }}
        transition={{ type: "spring", stiffness: 130, damping: 20, mass: 0.2 }}
      />
    </>
  );
}
