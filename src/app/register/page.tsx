"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Mail, User, ArrowRight } from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Girum Endalkachew");
  const [email, setEmail] = useState("girum@projectpulse.dev");
  const [password, setPassword] = useState("������������");
  const [loading, setLoading] = useState(false);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email);
      router.push("/app/dashboard");
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex items-center justify-center p-6 relative selection:bg-indigo-500 selection:text-white">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="glass-panel-3 w-full max-w-md rounded-3xl p-8 border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            <Terminal className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Create Account</h1>
          <p className="text-xs text-gray-400 mt-1">Start monitoring your software ecosystem</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-3 rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.35)] border border-purple-400/30 transition-all mt-6"
          >
            {loading ? "Creating Account..." : "Create Account & Launch"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}