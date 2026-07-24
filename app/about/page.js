"use client";

import Link from "next/link";
import { Info, ShieldCheck, MessageCircle, Gavel, Users, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50/50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-100/50 rounded-full blur-[130px] opacity-70"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-50/60 rounded-full blur-[110px] opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10 space-y-20">
        {/* Hero Banner */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm"
          >
            <Info className="w-4 h-4 text-blue-600" />
            <span>About LawBot Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]"
          >
            Democratizing legal support with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              speed, clarity & security.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            LawBot was built on a simple belief: legal information shouldn't be expensive, intimidating, or locked behind jargon. We bridge the gap between everyday individuals and complex legal systems.
          </motion.p>
        </section>

        {/* Core Pillars Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant AI Assistance</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Get immediate answers to contract terms, tenant disputes, consumer rights, and statutory compliance 24 hours a day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Lawyers Network</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Connect directly with vetted legal professionals when your situation demands formal representation or specialized consultation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy & Encryption</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Your conversations are private and end-to-end protected. We respect your confidentiality and never share your legal inquiries.
            </p>
          </motion.div>
        </section>

        {/* Detailed Story & Capability Section */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 lg:p-12 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                Empowering individuals and professionals alike
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Navigating legal challenges can often feel overwhelming. LawBot simplifies legal terminology into plain, actionable language while giving legal practitioners a streamlined platform to assist clients efficiently.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Natural Language Processing trained on legal concepts",
                  "Direct 1-on-1 messaging with verified bar-certified lawyers",
                  "Zero subscription barriers to start asking questions",
                  "Strict data protection & encrypted communication"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-gray-700 font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 rounded-2xl border border-blue-100 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">What Can You Do with LawBot?</h3>
              <ul className="space-y-4 text-gray-600 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <div>
                    <strong className="text-gray-900">Interactive AI Consultation:</strong> Ask queries regarding employment contracts, tenant rights, consumer protection, or general statutes.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <div>
                    <strong className="text-gray-900">Request Lawyer Consultations:</strong> Submit direct consultation requests to registered lawyers on the platform.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <div>
                    <strong className="text-gray-900">Lawyer Registration Portal:</strong> Attorneys can register their profile to reach individuals seeking expert assistance.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 lg:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to explore your legal options?
            </h2>
            <p className="text-blue-100 text-lg">
              Start chatting with our AI assistant right now or browse verified lawyers in your area.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/chat-bot"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all hover:-translate-y-0.5"
              >
                Start AI Chat
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/lawyer/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-700/60 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl border border-blue-400/40 transition-all"
              >
                Browse Lawyers
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
