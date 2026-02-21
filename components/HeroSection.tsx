"use client";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export function HeroSection() {
  return (
    <section className="scroll-section relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Abstract 3D Background Elements */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-med-primary/20 to-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-gradient-to-tr from-sky-400/20 to-indigo-500/20 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 relative z-10">
        <div className="hero-gradient rounded-[1.5rem] sm:rounded-[2.5rem] p-1 shadow-2xl shadow-med-primary/10 backdrop-blur-sm bg-white/30 border border-white/50">
          <div className="hero-layer rounded-[calc(1.5rem-4px)] sm:rounded-[calc(2.5rem-4px)] bg-white/60 backdrop-blur-md px-4 pb-6 pt-6 sm:px-8 sm:pb-10 sm:pt-12 lg:px-16 lg:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
              <ScrollReveal>
                <div className="space-y-6 sm:space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    Live in Domariyaganj
                  </div>
                  
                  <h1
                    id="hero-heading"
                    className="font-heading text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900"
                  >
                    Medicines from Lucknow,
                    <span className="mt-1 sm:mt-2 block bg-gradient-to-r from-med-primary via-emerald-600 to-med-emerald bg-clip-text text-transparent">
                      Delivered Next Day.
                    </span>
                  </h1>
                  
                  <p className="max-w-xl text-lg sm:text-xl leading-relaxed text-slate-600">
                    Authentic medicines sourced directly from Lucknow&apos;s verified distributors. 
                    Upload your prescription and get doorstep delivery in Domariyaganj.
                  </p>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:pt-4">
                    <Link href="/upload-prescription" className="button-primary group relative overflow-hidden text-base px-8 py-4 shadow-xl shadow-med-primary/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-med-primary/30">
                      <span className="relative z-10">Upload Prescription</span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:animate-shimmer" />
                    </Link>
                    <Link href="https://wa.me/918601439557" className="button-secondary group text-base px-8 py-4 backdrop-blur-md transition-all hover:bg-white/80">
                      <span className="mr-2">💬</span> WhatsApp Order
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700">✓</div>
                      100% Genuine
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700">✓</div>
                      Pay on Delivery
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700">✓</div>
                      Easy Returns
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal className="relative perspective-1000">
                <div className="card-3d transform-style-3d rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
                  <div className="card-3d-inner glass-elevated relative overflow-hidden rounded-[2.5rem] border border-white/40 shadow-2xl shadow-indigo-500/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-med-primarySoft/20" />
                    
                    {/* Floating 3D Elements */}
                     {/* Replaced by Scene3D canvas */}
 
                     <div className="relative z-10 space-y-8 p-8 sm:p-10">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Live Order Tracking
                          </p>
                          <p className="mt-1 text-base font-bold text-slate-900">
                            Lucknow <span className="text-slate-400">→</span> Domariyaganj
                          </p>
                        </div>
                        <div className="rounded-xl bg-white/80 px-4 py-2 text-right text-xs shadow-sm backdrop-blur-md">
                          <p className="font-bold text-emerald-600">Arriving Tomorrow</p>
                          <p className="text-slate-500">By 6:00 PM</p>
                        </div>
                      </div>

                      <div className="relative mt-4 grid gap-6 rounded-3xl bg-slate-900/95 p-5 text-slate-50 shadow-2xl sm:grid-cols-[1.2fr_1fr]">
                        <div className="space-y-4">
                          <p className="text-xs font-medium text-slate-400">
                            Delivery Route
                          </p>
                          <div className="relative h-36 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-white/10 overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
                            
                            {/* Animated Route Line */}
                            <div className="absolute left-8 top-8 h-[calc(100%-64px)] w-0.5 bg-slate-700/50">
                              <div className="absolute top-0 w-full bg-gradient-to-b from-emerald-400 via-sky-400 to-emerald-400 animate-scroll-y h-full opacity-50" />
                            </div>

                            {/* Points */}
                            <div className="absolute left-6 top-6 flex items-center gap-3">
                              <div className="h-4 w-4 rounded-full border-2 border-emerald-500 bg-emerald-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                              <span className="text-[10px] font-medium text-emerald-200">Lucknow Hub</span>
                            </div>
                            <div className="absolute left-6 bottom-6 flex items-center gap-3">
                              <div className="h-4 w-4 rounded-full border-2 border-sky-500 bg-sky-900 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                              <span className="text-[10px] font-medium text-sky-200">Domariyaganj</span>
                            </div>

                            {/* Moving Bike */}
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 translate-x-12">
                              <div className="flex h-8 w-14 items-center justify-center rounded-xl bg-white text-base shadow-lg animate-bounce-slow">
                                🛵
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="rounded-2xl bg-white/5 p-3 border border-white/5 backdrop-blur-sm">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                              Prescription
                            </p>
                            <div className="mt-2 space-y-1">
                              <div className="h-2 w-3/4 rounded-full bg-slate-700" />
                              <div className="h-2 w-1/2 rounded-full bg-slate-700" />
                            </div>
                          </div>
                          
                          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-3 border border-emerald-500/20">
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-[10px] text-emerald-200">Total Amount</p>
                                <p className="text-lg font-bold text-white">₹929</p>
                              </div>
                              <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px]">✓</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Tracking
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 shadow-sm">
                          <span className="text-emerald-600">★</span>
                          4.9/5 Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
