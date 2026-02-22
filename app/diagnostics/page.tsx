"use client";
import { useEffect, useState } from "react";

export default function DiagnosticsPage() {
  const [status, setStatus] = useState<any>(null);
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

  if (loading) return <div className="p-10 text-center">Loading diagnostics...</div>;

  const isConfigured = status?.NEXT_PUBLIC_SUPABASE_URL && status?.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24 font-sans">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">System Diagnostics</h1>
        
        <div className={`mb-6 rounded-lg p-4 ${isConfigured ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          <h2 className="font-semibold text-lg">
            Status: {isConfigured ? "✅ Configured Correctly" : "❌ Configuration Missing"}
          </h2>
          {!isConfigured && (
            <p className="mt-2 text-sm">
              Your Vercel environment variables are missing. The app is falling back to a read-only file system, which causes data loss.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-700">Environment Variables Check:</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between border-b pb-2">
              <span>NEXT_PUBLIC_SUPABASE_URL</span>
              <span className={status?.NEXT_PUBLIC_SUPABASE_URL ? "text-green-600 font-mono" : "text-red-600 font-mono"}>
                {status?.NEXT_PUBLIC_SUPABASE_URL ? "Present" : "MISSING"}
              </span>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              <span className={status?.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "text-green-600 font-mono" : "text-red-600 font-mono"}>
                {status?.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Present" : "MISSING"}
              </span>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span>NODE_ENV</span>
              <span className="font-mono text-slate-600">{status?.NODE_ENV}</span>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span>Running on Vercel</span>
              <span className="font-mono text-slate-600">{status?.VERCEL}</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="mb-2 font-semibold text-slate-700">How to Fix:</h3>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Go to <a href="https://vercel.com/dashboard" target="_blank" className="text-blue-600 hover:underline">Vercel Dashboard</a>.</li>
            <li>Select your project and go to <strong>Settings</strong> {">"} <strong>Environment Variables</strong>.</li>
            <li>Add the missing keys (URL and ANON_KEY).</li>
            <li>Go to <strong>Deployments</strong> tab and click <strong>Redeploy</strong> on the latest commit.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
