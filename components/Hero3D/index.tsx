"use client";

import dynamic from "next/dynamic";
import Overlay from "./Overlay";

const Scene = dynamic(() => import("./Scene"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20" />
});

export default function Hero3D() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20">
      <Scene />
      <Overlay />
    </section>
  );
}
