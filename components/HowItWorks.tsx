"use client";
import { ScrollReveal } from "./ScrollReveal";
import { Upload, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload Prescription",
    description: "Upload photo or PDF. Add address.",
    Icon: Upload,
    color: "bg-blue-500",
    duration: "2 min"
  },
  {
    title: "We Verify & Buy",
    description: "Medicines purchased from Lucknow pharmacies.",
    Icon: ShieldCheck,
    color: "bg-emerald-500",
    duration: "1-3 hrs"
  },
  {
    title: "Doorstep Delivery",
    description: "Delivered to your home in Domariyaganj.",
    Icon: Truck,
    color: "bg-indigo-500",
    duration: "Next day"
  }
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-section border-t border-slate-200/70 bg-white"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 sm:mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-med-primary">
              Simple Process
            </p>
            <h2
              id="how-heading"
              className="mt-3 sm:mt-4 font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Prescription to Doorstep
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
              We handle the journey from Lucknow&apos;s best pharmacies to your home in Domariyaganj.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="relative grid gap-8 sm:gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.2} animation="fade-up" duration={0.8}>
              <article className="card-3d group h-full">
                <div className="card-3d-inner glass-soft relative h-full p-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl border border-white/60">
                  {index < steps.length - 1 && (
                    <div className="timeline-connector hidden md:block opacity-50" aria-hidden="true" />
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <motion.div 
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} text-white shadow-lg shadow-med-primary/20`}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                      <step.Icon size={32} strokeWidth={1.5} />
                    </motion.div>
                    <span className="rounded-full bg-slate-900 text-xs font-bold text-slate-100 px-3 py-1.5 tracking-wide">
                      Step 0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">{step.description}</p>
                  <div className="mt-6 flex items-center justify-between text-xs font-medium text-slate-500 border-t border-slate-200/50 pt-4">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                      {step.duration}
                    </span>
                    {index === 0 && (
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                        Mandatory
                      </span>
                    )}
                    {index === 1 && (
                      <span className="rounded-full bg-sky-50 px-2 py-1 text-[10px] font-bold text-sky-700 uppercase tracking-wide">
                        Verified
                      </span>
                    )}
                    {index === 2 && (
                      <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-700 uppercase tracking-wide">
                        Tracking
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
