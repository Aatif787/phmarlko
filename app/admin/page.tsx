"use client";
import { useCallback, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Status } from "@/components/OrderTrackingTimeline";
import { statuses } from "@/components/OrderTrackingTimeline";

interface AdminOrder {
  orderId: string;
  fullName: string;
  mobile: string;
  address: string;
  deliveryTime: string;
  notes?: string;
  status: Status;
  createdAt: string;
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/orders", {
      headers: adminKey ? { "x-admin-key": adminKey } : {}
    });
    if (!response.ok) {
      setOrders([]);
      setLoading(false);
      return;
    }
    const data = (await response.json()) as AdminOrder[];
    setOrders(data);
    setLoading(false);
  }, [adminKey]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function handleUpdateStatus(orderId: string, status: Status) {
    const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(adminKey ? { "x-admin-key": adminKey } : {})
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      return;
    }
    await fetchOrders();
  }

  return (
    <main className="scroll-section bg-med-bg/60 py-10">
      <ScrollReveal animation="fade-up" duration={0.8}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
          Admin dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          View prescriptions submitted through the site and update their delivery status.
        </p>
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">Admin key</p>
            <p>
              If an admin key is configured on the server, it must be provided for listing and
              updating orders.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              placeholder="Optional admin key"
              className="w-48 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-med-primary focus:ring-2 focus:ring-med-primary/40"
            />
            <button
              type="button"
              className="button-secondary text-xs"
              onClick={fetchOrders}
              disabled={loading}
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>
        </div>
      </ScrollReveal>
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 space-y-3">
        {orders.length === 0 && (
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="text-sm text-slate-500">
              No orders found yet. New prescriptions submitted by users will appear here.
            </p>
          </ScrollReveal>
        )}
        {orders.map((order, index) => (
          <ScrollReveal key={order.orderId} animation="fade-left" delay={index * 0.1}>
            <div
              className="glass-soft flex flex-col gap-3 p-4 text-xs text-slate-700 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">
                  {order.fullName} <span className="text-slate-400">({order.orderId})</span>
                </p>
                <p>{order.address}</p>
                <p className="text-slate-500">
                  Mobile: {order.mobile} • Preferred: {order.deliveryTime}
                </p>
                {order.notes && <p className="text-slate-500">Notes: {order.notes}</p>}
                <p className="text-slate-400">
                  Created at: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((candidate) => (
                    <button
                      key={candidate}
                      type="button"
                      onClick={() => handleUpdateStatus(order.orderId, candidate as Status)}
                      className={`rounded-full px-3 py-1 text-[11px] font-medium shadow-sm ${
                        candidate === order.status
                          ? "bg-med-primary text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {candidate}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
