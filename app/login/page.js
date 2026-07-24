"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ShieldCheck, ArrowRight, UserCheck } from "lucide-react";

function LoginContent() {
  const [form, setForm] = useState({ email: "", password: "", isLawyer: false });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorFromUrl = searchParams.get("error");

  React.useEffect(() => {
    if (errorFromUrl) {
      toast.error(errorFromUrl);
    }
  }, [errorFromUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      isLawyer: form.isLawyer ? "true" : "false",
    });

    if (res.ok) {
      toast.success("Login successful");
      router.push(form.isLawyer ? "/dashboard/lawyer" : "/dashboard");
    } else {
      toast.error("Invalid email or password");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading(false);
  };

  return (
    <main className="flex-1 flex items-center justify-center bg-gray-50/50 py-16 px-4 relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/60 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-indigo-100/50 rounded-full blur-[130px] opacity-60"></div>
      </div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl p-8 lg:p-10 relative z-10 overflow-hidden">
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
            <Image src="/balance.gif" alt="LawBot" width={36} height={36} className="w-9 h-9 object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to access your LawBot portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 py-1">
            <input
              type="checkbox"
              id="isLawyer"
              checked={form.isLawyer || false}
              onChange={(e) => setForm({ ...form, isLawyer: e.target.checked })}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 transition-colors cursor-pointer"
            />
            <label
              htmlFor="isLawyer"
              className="text-xs font-semibold text-gray-700 cursor-pointer select-none flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              Sign in as Verified Lawyer
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center space-x-3">
          <span className="border-t border-gray-200 flex-grow"></span>
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">or continue with</span>
          <span className="border-t border-gray-200 flex-grow"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-semibold shadow-sm hover:bg-gray-50 hover:shadow transition-all disabled:opacity-60 flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <div className="mt-8 text-center space-y-2 text-xs">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-bold hover:underline">
              Create Client Account
            </Link>
          </p>
          <p className="text-gray-500">
            Are you a legal professional?{" "}
            <Link href="/lawyer/signup" className="text-indigo-600 font-bold hover:underline">
              Register as Lawyer
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-indigo-600 font-semibold text-lg">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
