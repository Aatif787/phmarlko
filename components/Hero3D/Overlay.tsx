"use client";

import Link from "next/link";
import { Search, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Overlay() {
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(headlineRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    .fromTo(descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(badgesRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );
  }, []);

  return (
    <section className="relative z-10 h-screen w-full overflow-hidden pointer-events-none">
      <div className="container mx-auto grid h-full grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-12 lg:px-20">
        
        {/* Left Column: Content */}
        <div className="flex flex-col justify-center space-y-8 pointer-events-auto pt-20 md:pt-0">
          
          <div className="space-y-4">
            <h1 ref={headlineRef} className="font-heading text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Fast & Safe <br />
              <span className="text-med-primary">Medicine Delivery</span>
            </h1>
            
            <p ref={descRef} className="max-w-lg text-lg text-slate-600 md:text-xl leading-relaxed">
              Order genuine medicines from trusted pharmacies. 
              Licensed pharmacists, secure payments, and doorstep delivery.
            </p>
          </div>

          <div ref={ctaRef} className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-med-primary transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search medicines..." 
                className="w-full rounded-full border border-slate-200 bg-white/60 py-4 pl-12 pr-4 text-slate-900 shadow-sm backdrop-blur-md transition-all focus:border-med-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-med-primary/10"
              />
            </div>
            
            <Link 
              href="/upload-prescription" 
              className="inline-flex items-center justify-center rounded-full bg-med-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-med-primary/30 transition-all hover:scale-105 hover:bg-med-primary/90 hover:shadow-xl"
            >
              Upload Prescription
            </Link>
          </div>

          <div ref={badgesRef} className="flex flex-wrap gap-6 pt-4 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span>100% Genuine</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span>Licensed Pharmacists</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-600">₹</div>
              <span>Secure Payments</span>
            </div>
          </div>

        </div>

        {/* Right Column: Empty for 3D Model */}
        <div className="hidden md:block pointer-events-none">
          {/* The 3D model sits here visually */}
        </div>

      </div>
    </section>
  );
}
