"use client";
import { useCallback, useState } from "react";
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
  prescriptionPath?: string;
  status: Status;
  createdAt: string;
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        headers: { "x-admin-key": key }
      });
      
      if (response.status === 401 || response.status === 403) {
        setError("Invalid Admin Key");
        setLoading(false);
        return false;
      }
      
      if (!response.ok) {
        setError("Failed to fetch orders");
        setLoading(false);
        return false;
      }

      const data = (await response.json()) as AdminOrder[];
      setOrders(data);
      setLoading(false);
      return true;
    } catch {
      setError("Network error occurred");
      setLoading(false);
      return false;
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) {
      setError("Please enter an admin key");
      return;
    }
    
    const success = await fetchOrders(adminKey);
    if (success) {
      setIsAuthenticated(true);
    }
  };

  async function handleUpdateStatus(orderId: string, status: Status) {
    const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      alert("Failed to update status");
      return;
    }
    await fetchOrders(adminKey);
  }

  async function handleDeleteOrder(orderId: string) {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }

    const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "DELETE",
      headers: {
        "x-admin-key": adminKey
      }
    });

    if (!response.ok) {
      alert("Failed to delete order");
      return;
    }
    // Optimistic update: remove order from UI immediately
    setOrders((prevOrders) => prevOrders.filter((o) => o.orderId !== orderId));
    
    // Fetch latest data in background just in case
    fetchOrders(adminKey);
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-med-bg/60 px-4 py-12">
        <ScrollReveal animation="fade-up" duration={0.6}>
          <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
                Admin Access
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Please enter your admin key to view and manage orders.
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="admin-key" className="sr-only">
                  Admin Key
                </label>
                <input
                  id="admin-key"
                  name="key"
                  type="password"
                  required
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="relative block w-full rounded-xl border-0 py-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-med-primary sm:text-sm sm:leading-6"
                  placeholder="Enter Admin Key"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="button-primary w-full justify-center"
              >
                {loading ? "Verifying..." : "Access Dashboard"}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </main>
    );
  }

  return (
    <main className="scroll-section bg-med-bg/60 py-10 min-h-screen">
      <ScrollReveal animation="fade-up" duration={0.8}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Manage orders and update delivery status.
              </p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="button-secondary text-xs"
            >
              Logout
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">Recent Orders</h2>
          <button
            onClick={() => fetchOrders(adminKey)}
            disabled={loading}
            className="text-xs text-med-primary hover:text-med-primary/80 font-medium"
          >
            {loading ? "Refreshing..." : "Refresh List"}
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white/50 p-12 text-center">
            <p className="text-sm text-slate-500">
              No orders found. New prescriptions will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <ScrollReveal key={order.orderId} animation="fade-up" delay={index * 0.05}>
                <div className="glass-elevated group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-medium text-slate-400">
                          {order.orderId}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${
                          order.status === "Delivered" ? "bg-green-50 text-green-700 ring-green-600/20" :
                          "bg-blue-50 text-blue-700 ring-blue-700/10"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{order.fullName}</h3>
                        <p className="text-sm text-slate-600">{order.mobile}</p>
                      </div>

                      <div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                        <div>
                          <span className="font-medium text-slate-700">Address:</span> {order.address}
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Delivery:</span> {order.deliveryTime}
                        </div>
                        {order.notes && (
                          <div className="sm:col-span-2">
                            <span className="font-medium text-slate-700">Notes:</span> {order.notes}
                          </div>
                        )}
                        {order.prescriptionPath && (
                          <div className="sm:col-span-2 mt-2">
                            <a 
                              href={order.prescriptionPath} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-med-primary hover:underline font-medium"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Prescription
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-[10px] text-slate-400">
                        Submitted: {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:border-0 sm:pt-0 sm:pl-4 sm:border-l">
                      <div className="space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Update Status</p>
                        <div className="flex flex-wrap gap-2">
                          {statuses.map((candidate) => (
                            <button
                              key={candidate}
                              onClick={() => handleUpdateStatus(order.orderId, candidate as Status)}
                              className={`rounded-lg px-2 py-1 text-[10px] font-medium transition-colors ${
                                candidate === order.status
                                  ? "bg-slate-900 text-white shadow-sm"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {candidate}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-slate-100 sm:border-0 sm:pt-0">
                        <button
                          onClick={() => handleDeleteOrder(order.orderId)}
                          className="w-full rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 hover:text-red-700 flex items-center justify-center gap-1.5"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
