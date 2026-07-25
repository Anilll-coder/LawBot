"use client";

import Link from "next/link";
import { Info, ShieldCheck, Zap, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Hero Banner */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Info className="w-4 h-4 text-blue-600" />
            <span>About LawBot Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Democratizing legal support with speed, clarity & security.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            LawBot was built on a simple belief: legal information shouldn't be expensive, intimidating, or locked behind jargon. We bridge the gap between everyday individuals and complex legal systems.
          </p>
        </section>

        {/* Core Pillars Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Instant AI Assistance</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Get immediate answers to contract terms, tenant disputes, consumer rights, and statutory compliance 24 hours a day.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Lawyers Network</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Connect directly with vetted legal professionals when your situation demands formal representation or specialized consultation.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Encryption</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Your conversations are private and end-to-end protected. We respect your confidentiality and never share your legal inquiries.
            </p>
          </div>
        </section>

        {/* Detailed Story & Capability Section */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                <span>Our Mission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Empowering individuals and professionals alike
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Navigating legal challenges can often feel overwhelming. LawBot simplifies legal terminology into plain, actionable language while giving legal practitioners a streamlined platform to assist clients efficiently.
              </p>

              <div className="space-y-2.5 pt-1">
                {[
                  "Natural Language Processing trained on legal concepts",
                  "Direct 1-on-1 messaging with verified bar-certified lawyers",
                  "Zero subscription barriers to start asking questions",
                  "Strict data protection & encrypted communication"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-gray-700 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">What Can You Do with LawBot?</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">1</span>
                  <div>
                    <strong className="text-gray-900">Interactive AI Consultation:</strong> Ask queries regarding employment contracts, tenant rights, or consumer protection.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">2</span>
                  <div>
                    <strong className="text-gray-900">Request Lawyer Consultations:</strong> Submit direct consultation requests to registered lawyers on the platform.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">3</span>
                  <div>
                    <strong className="text-gray-900">Lawyer Registration Portal:</strong> Attorneys can register their profile to reach individuals seeking expert assistance.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gray-900 rounded-2xl p-8 sm:p-10 text-white text-center shadow-sm">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to explore your legal options?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Start chatting with our AI assistant right now or browse verified lawyers in your area.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/chat-bot"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                Start AI Chat
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/lawyer/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm border border-gray-700 transition-colors"
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

