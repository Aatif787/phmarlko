"use client";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export function HeroSection() {
  return (
    <section className="scroll-section relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Abstract 3D Background Elements */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-med-primary/20 to-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-gradient-to-tr from-sky-400/20 to-indigo-500/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 relative z-10">
        <div className="hero-gradient rounded-[1.5rem] sm:rounded-[3rem] p-1 shadow-[0_0_50px_rgba(14,165,233,0.15)] backdrop-blur-sm bg-white/5 border border-white/10">
          <div className="hero-layer rounded-[calc(1.5rem-4px)] sm:rounded-[calc(3rem-4px)] bg-slate-900/40 backdrop-blur-xl px-4 pb-6 pt-6 sm:px-8 sm:pb-10 sm:pt-12 lg:px-16 lg:pt-16 border border-white/5">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
              <ScrollReveal>
                <div className="space-y-6 sm:space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-black text-emerald-400 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="tracking-[0.2em] uppercase">Premium Link: Lucknow → Domariyaganj</span>
                  </div>

                  <h1
                    id="hero-heading"
                    className="font-heading text-5xl sm:text-7xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-white drop-shadow-2xl"
                  >
                    Superior
                    <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                      Care. Delivered.
                    </span>
                  </h1>

                  <p className="max-w-xl text-lg sm:text-xl leading-relaxed text-slate-300 font-medium opacity-90">
                    Sourcing 100% authentic pharmaceuticals from Lucknow&apos;s elite centers.
                    Real-time quantum tracking. Superior reliability.
                  </p>

                  <div className="flex flex-col gap-5 pt-4 sm:flex-row sm:items-center sm:pt-6">
                    <Link href="/upload-prescription" className="button-primary group relative overflow-hidden text-base px-10 py-5 shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] !bg-gradient-to-r from-emerald-400 to-green-600 text-slate-900 border-none">
                      <span className="relative z-10 font-black tracking-tight uppercase">Upload Prescription Now</span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 transition-transform duration-700 group-hover:animate-shimmer" />
                    </Link>
                    <Link href="https://wa.me/918601439557" className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold transition-all hover:bg-white/10 hover:border-sky-500/50">
                      <span className="text-xl group-hover:animate-bounce-slow">💬</span>
                      <span>Direct Uplink</span>
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-x-10 gap-y-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-3 group transition-colors hover:text-sky-400">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_10px_rgba(14,165,233,0.1)] group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all">✓</div>
                      100% Verified
                    </div>
                    <div className="flex items-center gap-3 group transition-colors hover:text-emerald-400">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">✓</div>
                      Instant Pay
                    </div>
                    <div className="flex items-center gap-3 group transition-colors hover:text-indigo-400">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">✓</div>
                      Secure Return
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal className="relative perspective-1000">
                <div className="card-3d transform-style-3d rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
                  <div className="card-3d-inner glass-elevated relative overflow-hidden rounded-[2.5rem] border border-white/40 shadow-2xl shadow-indigo-500/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-sky-900/20" />

                    {/* Floating 3D Elements */}
                    {/* Replaced by Scene3D canvas */}

                    <div className="relative z-10 space-y-8 p-8 sm:p-10">
                      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">
                            Neural Tracking Active
                          </p>
                          <p className="mt-1 text-base font-black text-white">
                            LKO <span className="text-sky-500 animate-pulse">→</span> DMG
                          </p>
                        </div>
                        <div className="rounded-xl bg-sky-500/10 border border-sky-500/20 px-4 py-2 text-right text-xs shadow-sm backdrop-blur-md">
                          <p className="font-bold text-sky-400">ETA: T-24H</p>
                          <p className="text-slate-400">Standard Uplink</p>
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

                          <div className="rounded-2xl bg-emerald-400/10 p-4 border border-emerald-400/30 backdrop-blur-sm">
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Total Premium Credits</p>
                                <p className="text-xl font-black text-white">₹929.00</p>
                              </div>
                              <div className="h-8 w-8 rounded-lg bg-emerald-400 flex items-center justify-center text-xs text-slate-900 font-bold shadow-[0_0_20px_#10b981]">✓</div>
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
