"use client";
import { useEffect, useState } from "react";

export default function DiagnosticsPage() {
  const [status, setStatus] = useState<{
    NEXT_PUBLIC_SUPABASE_URL: boolean;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: boolean;
    USING_HARDCODED_FALLBACK: boolean;
    NODE_ENV: string;
    VERCEL: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/diagnostics")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-600">Loading diagnostics...</div>;

  const isConfiguredEnv = status?.NEXT_PUBLIC_SUPABASE_URL && status?.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isWorking = isConfiguredEnv || status?.USING_HARDCODED_FALLBACK;

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24 font-sans">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg border border-slate-200">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">System Diagnostics</h1>
        
        <div className={`mb-6 rounded-lg p-4 border ${isWorking ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
          <h2 className="font-bold text-lg flex items-center gap-2">
            {isWorking ? "✅ System Working" : "❌ Configuration Missing"}
          </h2>
          <p className="mt-2 text-sm">
            {isConfiguredEnv 
              ? "Everything is configured via environment variables." 
              : status?.USING_HARDCODED_FALLBACK 
                ? "Using hardcoded fallback keys. The app will work perfectly, but we recommend adding environment variables to Vercel for better security." 
                : "Your Vercel environment variables are missing and no fallback is active."}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-700">Environment Variables Check:</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">NEXT_PUBLIC_SUPABASE_URL</span>
              <span className={status?.NEXT_PUBLIC_SUPABASE_URL ? "text-green-600 font-mono text-xs font-bold" : "text-amber-600 font-mono text-xs font-bold"}>
                {status?.NEXT_PUBLIC_SUPABASE_URL ? "PRESENT" : "MISSING (FALLBACK ACTIVE)"}
              </span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              <span className={status?.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "text-green-600 font-mono text-xs font-bold" : "text-amber-600 font-mono text-xs font-bold"}>
                {status?.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "PRESENT" : "MISSING (FALLBACK ACTIVE)"}
              </span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">NODE_ENV</span>
              <span className="font-mono text-xs text-slate-500 uppercase">{status?.NODE_ENV}</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">Running on Vercel</span>
              <span className="font-mono text-xs text-slate-500 uppercase">{status?.VERCEL === "true" ? "YES" : "NO"}</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <h3 className="mb-3 font-semibold text-slate-700">Next Steps:</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Even though the app is working with hardcoded keys, you should still add them to Vercel for security:
          </p>
          <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-600">
            <li>Go to your <a href="https://vercel.com/dashboard" target="_blank" className="text-emerald-600 font-bold hover:underline decoration-emerald-500/30">Vercel Dashboard</a>.</li>
            <li>Select your project and go to <strong>Settings</strong> {">"} <strong>Environment Variables</strong>.</li>
            <li>Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.</li>
            <li><strong>IMPORTANT</strong>: Go to <strong>Deployments</strong> and click <strong>Redeploy</strong>.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
