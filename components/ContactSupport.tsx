"use client";
import { ScrollReveal } from "./ScrollReveal";

export function ContactSupport() {
  return (
    <section
      id="contact"
      className="scroll-section border-t border-slate-200/70 bg-med-bg/80 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:gap-16 md:grid-cols-[1.2fr_1fr]">
          <ScrollReveal animation="fade-right" duration={0.8}>
            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-med-primary">
                  Contact & support
                </p>
                <h2
                  id="contact-heading"
                  className="mt-3 sm:mt-4 font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
                >
                  Always one tap away.
                </h2>
                <p className="mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
                  Reach us on WhatsApp or call for new orders, tracking existing deliveries or any
                  questions about availability and coverage.
                </p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <a href="https://wa.me/918601439557" className="glass-soft p-6 transition-all hover:bg-white hover:shadow-lg group cursor-pointer">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 group-hover:text-emerald-600">
                    WhatsApp
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">+91 86014 39557</p>
                  <p className="mt-2 text-xs text-slate-500">Tap to chat instantly.</p>
                </a>
                <a href="tel:+918601439557" className="glass-soft p-6 transition-all hover:bg-white hover:shadow-lg group cursor-pointer">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 group-hover:text-med-primary">
                    Call support
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">+91 86014 39557</p>
                  <p className="mt-2 text-xs text-slate-500">
                    Available 8 AM - 9 PM.
                  </p>
                </a>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="pill-badge bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Working hours: 8:00 AM – 9:00 PM</span>
                </div>
                <div className="pill-badge bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  <span>Languages: Hindi and English</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
            
          <ScrollReveal animation="zoom-in" delay={0.2} duration={0.8}>
            <div className="glass-elevated relative overflow-hidden rounded-[2.5rem] border border-white/40 shadow-2xl">
              <div className="absolute inset-0 bg-med-gradient opacity-80" />
              <div className="relative z-10 p-8 sm:p-10">
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Service area: Domariyaganj
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  We are gradually expanding coverage. Share your pin code on WhatsApp to confirm
                  availability.
                </p>
                <div className="mt-6 h-56 rounded-3xl bg-slate-900/95 p-6 text-xs text-slate-200 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-10 -mt-10" />
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-slate-100 uppercase tracking-wider">Route Map</p>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                  </div>
                  
                  <div className="relative h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
                    {/* Simplified Map Visualization */}
                    <div className="absolute left-6 top-6 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] text-emerald-300 border border-emerald-500/30">
                      Lucknow
                    </div>
                    <div className="absolute bottom-6 right-6 rounded-full bg-sky-500/20 px-3 py-1 text-[10px] text-sky-300 border border-sky-500/30">
                      Domariyaganj
                    </div>
                    <div className="absolute left-16 top-10 h-[2px] w-24 rotate-12 bg-gradient-to-r from-emerald-500/50 to-sky-500/50" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-full p-2 border border-slate-600 shadow-lg">
                      🛵
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[10px] font-medium text-slate-500 text-center">
                  *MedExpress is a medicine delivery service, not an emergency service.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
