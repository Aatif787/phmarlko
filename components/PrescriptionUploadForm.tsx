"use client";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import type { FormEvent } from "react";

type Step = "form" | "uploading" | "success";

export function PrescriptionUploadForm() {
  const [step, setStep] = useState<Step>("form");
  const [orderId, setOrderId] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="upload-heading"
      className="scroll-section bg-med-bg/60 py-10 sm:py-12"
    >
      <ScrollReveal animation="fade-up" duration={0.8}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="glass-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-med-gradient opacity-70" />
          <div className="relative z-10 grid gap-8 p-6 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-med-primary">
                Upload prescription
              </p>
              <h1
                id="upload-heading"
                className="mt-2 font-heading text-2xl font-semibold text-slate-900 sm:text-3xl"
              >
                Share your prescription securely
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Upload a clear photo or PDF of your prescription. Our team will verify it with
                a licensed pharmacist before processing your order.
              </p>
              <form
                className="mt-5 space-y-4 text-sm"
                onSubmit={async (event: FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  setStep("uploading");

                  const form = event.currentTarget;
                  const formData = new FormData(form);

                  const response = await fetch("/api/prescriptions", {
                    method: "POST",
                    body: formData
                  });

                  if (!response.ok) {
                    throw new Error("Server responded with error");
                  }

                  const data = (await response.json()) as { orderId?: string };
                  setOrderId(data.orderId ?? null);
                  setStep("success");
                  
                  // Optional: Auto-redirect or just show the button
                  if (data.orderId) {
                    // We don't auto-open WhatsApp here to let the user see the success message first
                    // and then click the button deliberately.
                  }
                } catch (error) {
                  console.error("Upload failed", error);
                  alert("Something went wrong. Please try again or contact us on WhatsApp.");
                  setStep("form");
                }
                }}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2"
                    >
                      Full name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-med-primary focus:ring-2 focus:ring-med-primary/40 transition-all"
                      placeholder="Enter patient full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2"
                    >
                      Mobile number
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-med-primary focus:ring-2 focus:ring-med-primary/40 transition-all"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2"
                  >
                    Full address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-med-primary focus:ring-2 focus:ring-med-primary/40 transition-all"
                    placeholder="House number, street, village, pin code"
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2">
                      Prescription upload
                    </span>
                    <label
                      htmlFor="prescription"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-med-primary/30 bg-med-primarySoft/30 px-4 py-8 text-center text-xs text-slate-600 shadow-sm transition-all hover:border-med-primary hover:bg-med-primarySoft/50 hover:scale-[1.02]"
                    >
                      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md text-2xl">
                        ⬆
                      </span>
                      <span className="font-bold text-slate-800">
                        Click to Upload
                      </span>
                      <span className="mt-1 text-[10px] text-slate-500 font-medium">
                        Photo or PDF (Max 10MB)
                      </span>
                      <input id="prescription" name="prescription" type="file" accept="image/*,application/pdf" className="sr-only" required />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2"
                    >
                      Optional notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-med-primary focus:ring-2 focus:ring-med-primary/40 transition-all"
                      placeholder="Alternative brands, allergies, etc."
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="deliveryTime"
                      className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2"
                    >
                      Preferred delivery time
                    </label>
                    <select
                      id="deliveryTime"
                      name="deliveryTime"
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-0 focus:border-med-primary focus:ring-2 focus:ring-med-primary/40 transition-all appearance-none"
                    >
                      <option>Anytime tomorrow</option>
                      <option>8 AM – 12 PM</option>
                      <option>12 PM – 4 PM</option>
                      <option>4 PM – 8 PM</option>
                    </select>
                  </div>
                  <div className="mt-7 text-xs text-slate-500 bg-amber-50 p-3 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-700">Note:</span> Our team will confirm the order via call/WhatsApp.
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-200/60">
                  {step === "success" ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-3">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Order Received!</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Please verify your prescription on WhatsApp to confirm the order.
                        </p>
                      </div>
                      
                      <a
                        href={`https://wa.me/918601439557?text=${encodeURIComponent(`Hi MedExpress, I placed order ${orderId}. Please check my prescription availability.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-primary w-full text-center flex items-center justify-center gap-2 animate-bounce-slow"
                      >
                        <span>Confirm on WhatsApp</span>
                        <span className="bg-white/20 rounded-full px-2 py-0.5 text-[10px]">{orderId}</span>
                      </a>
                      
                      <p className="text-[10px] text-center text-slate-400">
                        If the upload failed, you can send the photo directly in the chat.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="button-primary w-full shadow-lg shadow-med-primary/20"
                      disabled={step === "uploading"}
                    >
                      {step === "uploading" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Uploading...
                        </span>
                      ) : (
                        "Submit Prescription"
                      )}
                    </button>
                  )}
                  
                  <p className="mt-4 text-[10px] text-center text-slate-400">
                    By submitting, you agree to our <a href="/privacy-policy" className="underline hover:text-med-primary">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            </div>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="glass-soft p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  WhatsApp forwarding preview
                </p>
                <div className="mt-3 rounded-2xl bg-slate-900/95 p-4 text-slate-50 shadow-soft">
                  <p className="text-[11px] text-emerald-300">To: MedExpress Domariyaganj</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-100">
                    Patient: [Your name]
                    <br />
                    Address: [Your full address]
                    <br />
                    Delivery slot: [Preferred time]
                    <br />
                    Notes: [Allergies / instructions]
                  </p>
                  <p className="mt-2 text-[11px] text-slate-300">+ Prescription photo attached</p>
                </div>
              </div>
              <div className="glass-soft p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Important
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  <li>Upload a clear, readable prescription with doctor details visible.</li>
                  <li>We may request an updated prescription if the current one is expired.</li>
                  <li>Restricted or narcotic medicines will not be delivered without extra checks.</li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
