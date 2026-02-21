"use client";
import { useMemo } from "react";

export const statuses = [
  "Order Received",
  "Processing",
  "Purchased",
  "Out for Delivery",
  "Delivered"
] as const;

export type Status = (typeof statuses)[number];

function getStatusIndex(status: Status) {
  return statuses.indexOf(status);
}

export function OrderTrackingTimeline(props: { currentStatus?: Status }) {
  const activeStatus = props.currentStatus ?? "Processing";
  const activeIndex = useMemo(() => getStatusIndex(activeStatus), [activeStatus]);

  return (
    <section
      aria-labelledby="tracking-heading"
      className="scroll-section bg-med-bg/60 py-10 sm:py-12"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass-elevated overflow-hidden">
          <div className="grid gap-8 bg-white/60 p-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-med-primary">
                Track your order
              </p>
              <h1
                id="tracking-heading"
                className="mt-2 font-heading text-2xl font-semibold text-slate-900 sm:text-3xl"
              >
                Real‑time visibility from pharmacy to doorstep
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Follow each stage of your medicine journey. Share your order ID on WhatsApp to
                receive live updates.
              </p>
              <form className="mt-4 space-y-3 text-sm">
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
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-med-primary focus:ring-2 focus:ring-med-primary/40"
                      placeholder="Ex: MEDX-1024"
                    />
                  </div>
                  <button type="button" className="button-secondary mt-1 sm:mt-6 sm:self-end">
                    Send to WhatsApp
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Actual live tracking will be shared by our team over WhatsApp once your order
                  is confirmed.
                </p>
              </form>
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Estimated delivery</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
                    Next‑day slot for most orders
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-med-primary to-med-emerald"
                    style={{ width: `${((activeIndex + 1) / statuses.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 text-xs text-slate-600">
              <ol className="space-y-3">
                {statuses.map((status, index) => {
                  const isActive = index === activeIndex;
                  const isCompleted = index < activeIndex;
                  return (
                    <li
                      key={status}
                      className="flex items-start gap-3 rounded-2xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-200/70"
                    >
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-600">
                        {isCompleted ? "✓" : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-slate-900">{status}</p>
                          {isActive && (
                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                              Current
                            </span>
                          )}
                          {isCompleted && !isActive && (
                            <span className="rounded-full bg-sky-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
                              Done
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[11px] text-slate-600">
                          {status === "Order Received" &&
                            "We have received your prescription and basic details."}
                          {status === "Processing" &&
                            "Our team is validating your prescription and checking stock."}
                          {status === "Purchased" &&
                            "Medicines have been purchased from our partner pharmacy in Lucknow."}
                          {status === "Out for Delivery" &&
                            "Your medicines are with a delivery partner on the way to your location."}
                          {status === "Delivered" &&
                            "Order has been delivered. Keep your bill safely for future reference."}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="glass-soft p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Need urgent clarification?
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  Reply to your WhatsApp order thread or call our support number with your
                  Order ID. We will prioritise medical cases for elders and chronic patients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
