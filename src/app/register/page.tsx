"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, ArrowRight, Mail, Lock, User } from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Girum Endalkachew");
  const [email, setEmail] = useState("girum@projectpulse.dev");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email);
      router.push("/app/dashboard");
    }, 500);
  }

  return (
    <div className="min-h-screen text-zinc-100 flex items-center justify-center px-6">
      <div className="pp-stage" aria-hidden />
      <div className="pp-content w-full max-w-md">
        <div className="glass-workspace rounded-[2rem] p-8 border border-white/10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-light text-white tracking-tight">Start Monitoring</h1>
            <p className="text-xs text-zinc-500 mt-1">Create your ProjectPulse workspace</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/10 pl-10 pr-3 py-2.5 text-xs text-white outline-none focus:border-amber-500/40"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.35)]"
            >
              {loading ? "Creating..." : "Create account"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-xs text-zinc-500 text-center mt-6">
            Already monitoring?{" "}
            <Link href="/login" className="text-amber-300 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
