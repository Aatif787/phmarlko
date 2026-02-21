"use client";
import { useState } from "react";
import { OrderTrackingTimeline } from "@/components/OrderTrackingTimeline";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Status } from "@/components/OrderTrackingTimeline";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<Status | undefined>(undefined);

  return (
    <section className="scroll-section bg-med-bg/60 py-10 sm:py-12">
      <ScrollReveal animation="fade-up" duration={0.8}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="glass-elevated overflow-hidden">
            <div className="grid gap-8 bg-white/60 p-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:p-8">
              <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-med-primary">
                Track your order
              </p>
              <h1 className="mt-2 font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
                Check your order status
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Enter the Order ID shared after uploading your prescription to see the current
                status.
              </p>
              <form
                className="mt-4 space-y-3 text-sm"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!orderId.trim()) {
                    return;
                  }

                  const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
                  if (!response.ok) {
                    setStatus(undefined);
                    return;
                  }

                  const data = (await response.json()) as { status?: Status };
                  setStatus(data.status);
                }}
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <label
                      htmlFor="orderId"
                      className="block text-xs font-medium uppercase tracking-wide text-slate-700"
                    >
                      Order ID
                    </label>
                    <input
                      id="orderId"
                      name="orderId"
                      value={orderId}
                      onChange={(event) => setOrderId(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-med-primary focus:ring-2 focus:ring-med-primary/40"
                      placeholder="Ex: MEDX-1024"
                    />
                  </div>
                  <button type="submit" className="button-primary mt-1 sm:mt-6 sm:self-end">
                    Check status
                  </button>
                </div>
              </form>
            </div>
              <OrderTrackingTimeline currentStatus={status} />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
