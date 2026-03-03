"use client";
import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle2, ShieldCheck, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Need prescription?",
    a: "Yes. Valid doctor prescription only."
  },
  {
    q: "Service area?",
    a: "Domariyaganj and nearby. WhatsApp us."
  },
  {
    q: "Payment?",
    a: "Cash or UPI on delivery."
  }
];

export function TrustSafety() {
  return (
    <section
      id="trust"
      className="scroll-section border-t border-emerald-400/10 bg-gradient-to-b from-[#064e3b] to-[#05140b] py-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
          <ScrollReveal animation="fade-right" duration={0.8}>
            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-med-primary">
                  Safety First
                </p>
                <h2
                  id="trust-heading"
                  className="mt-3 sm:mt-4 font-heading text-4xl font-black text-white sm:text-5xl lg:text-7xl tracking-tighter drop-shadow-xl"
                >
                  Uncompromising Trust
                </h2>
                <p className="mt-4 text-lg sm:text-xl text-emerald-200/90 font-bold leading-relaxed italic">
                  Sourcing only from authorized pharmaceutical distributors. We never compromise on quality.
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <motion.div
                  className="bg-slate-900/80 backdrop-blur-xl p-6 group border border-white/10 rounded-3xl"
                  whileHover={{ y: -4, borderColor: "rgba(56, 189, 248, 0.4)" }}
                >
                  <motion.div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-black text-xl text-white tracking-tight">Verified Sourcing</h3>
                  <p className="mt-2 text-base text-slate-300 font-bold opacity-80">Directly procured from Lucknow’s most elite pharmaceutical hubs.</p>
                </motion.div>
                <motion.div
                  className="bg-slate-900/80 backdrop-blur-xl p-6 group border border-white/10 rounded-3xl"
                  whileHover={{ y: -4, borderColor: "rgba(56, 189, 248, 0.4)" }}
                >
                  <motion.div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-lg shadow-sky-500/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ShieldCheck size={32} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-black text-xl text-white tracking-tight">Golden Standard</h3>
                  <p className="mt-2 text-base text-slate-300 font-bold opacity-80">Absolute integrity. Zero compromises. Pure medicine.</p>
                </motion.div>
              </div>

              <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-emerald-500/20 blur-xl transition-all group-hover:bg-emerald-500/30" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <HeartPulse size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                      Our Promise
                    </p>
                    <p className="mt-3 text-xl font-medium leading-relaxed">
                      &quot;Genuine Medicines or money back. We resolve any quality issues directly with our pharmacy partners.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={0.2} duration={0.8}>
            <div className="space-y-8">
              <div className="rounded-[2.5rem] bg-white p-8 shadow-xl border border-slate-100 relative">
                <div className="absolute -top-6 -right-6 text-9xl text-slate-50 opacity-50 font-serif">”</div>
                <div className="flex gap-6 relative z-10">
                  <div className="h-14 w-14 flex-none rounded-full bg-gradient-to-br from-slate-200 to-slate-300 shadow-inner" />
                  <div>
                    <p className="text-lg italic text-slate-700 leading-relaxed">
                      “My parents get medicines at home in their village now. No need to travel to the city. MedExpress has been a lifesaver for our family in Domariyaganj.”
                    </p>
                    <p className="mt-4 text-sm font-bold text-slate-900 uppercase tracking-wide">
                      – Ankit, Lucknow
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] bg-white/60 p-8 backdrop-blur-md border border-white/50">
                <h4 className="font-heading text-xl font-bold text-slate-900 mb-6">Quick FAQ</h4>
                <div className="space-y-4">
                  {faqs.map((item) => (
                    <details
                      key={item.q}
                      className="group border-b border-slate-200/60 pb-4 last:border-0"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-slate-800 transition-colors hover:text-med-primary">
                        {item.q}
                        <span className="text-slate-400 transition-transform duration-300 group-open:rotate-90">›</span>
                      </summary>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed pl-2 border-l-2 border-med-primary/30">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
