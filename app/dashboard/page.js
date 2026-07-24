"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, MessageSquare, User, Shield, ArrowRight, Sparkles, Clock, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-blue-600 font-medium animate-pulse text-sm">Initializing Command Center...</p>
      </div>
    );
  }

  if (!session) return null;

  const userDisplayName = session?.user?.name || session?.user?.email?.split("@")[0] || "User";

  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50/50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-100/50 rounded-full blur-[130px] opacity-70"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 relative z-10 space-y-12">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-xl p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Client Command Center</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{userDisplayName}</span>
              </h1>
              <p className="text-gray-500 text-base max-w-2xl">
                Manage your ongoing legal inquiries, connect with verified attorneys, and track your account activity.
              </p>
            </div>

            <button
              onClick={() => router.push("/chat-bot")}
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 group text-sm flex-shrink-0"
            >
              <MessageSquare className="mr-2 w-4 h-4" />
              New Legal Inquiry
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </header>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            onClick={() => router.push("/chat-bot")}
          >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
              <MessageSquare size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Consultations</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Ask legal questions in plain English and receive instant AI-powered guidance.
            </p>
            <span className="text-indigo-600 font-semibold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
              Launch AI Chat <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            onClick={() => router.push("/lawyer/contact")}
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Find Lawyers</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Browse our directory of verified bar-certified attorneys for direct consultations.
            </p>
            <span className="text-blue-600 font-semibold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
              Browse Directory <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            onClick={() => router.push("/about")}
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
              <User size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Platform Guide</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Learn how LawBot protects your privacy, formats legal insights, and connects users.
            </p>
            <span className="text-emerald-600 font-semibold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
              Read Guide <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Activity Section */}
        <section className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <LayoutDashboard className="mr-3 text-blue-600" />
              Recent Activity & Consultations
            </h2>
            <button onClick={() => router.push("/chat-bot")} className="text-blue-600 font-bold text-sm hover:underline">
              Start New Chat
            </button>
          </div>
          <div className="p-8">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-4 shadow-sm">
                <Clock size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Your activity feed is ready</h4>
              <p className="text-gray-500 text-sm max-w-sm">
                Start asking legal questions to LawBot AI or request consultation sessions with verified lawyers.
              </p>
              <button
                onClick={() => router.push("/chat-bot")}
                className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all text-sm"
              >
                Start AI Assistant
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
