'use client'
import Link from 'next/link'
import { ShieldCheck, Gavel, MessageCircle, Briefcase, ChevronDown, ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <main className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1 mb-6 text-xs font-semibold text-blue-700">
            <span>AI-Powered Legal Companion</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Legal knowledge, simplified for you.
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get instant legal insights, decode complex jargon, and find answers to your questions with our AI-powered assistant.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/chat-bot"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-colors group text-sm"
            >
              Start AI Chat Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            {!session && (
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Conditional Lawyer Section */}
          {role !== "lawyer" ? (
            <div className="mt-14 bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center">
              <Briefcase size={28} className="mx-auto mb-3 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Are you a legal professional?</h3>
              <p className="text-sm text-gray-600 mb-5">Join the LawBot network and connect with clients seeking expert legal advice.</p>
              <Link
                href="/lawyer/signup"
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Create Lawyer Profile
              </Link>
            </div>
          ) : (
            <div className="mt-14 bg-green-50/60 border border-green-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center">
              <Briefcase size={28} className="mx-auto mb-3 text-green-700" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome back, Counselor</h3>
              <p className="text-sm text-gray-600 mb-5">Access your dashboard to manage client queries and appointments.</p>
              <Link
                href="/dashboard/lawyer"
                className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">Why choose LawBot?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-12 text-sm sm:text-base">Reliable AI assistance designed for clear, accessible legal guidance.</p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                 <Gavel size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900">Decode Jargon</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Break down complicated legal documents and terminology into simple, plain English everyone can understand.</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                 <ShieldCheck size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900">Total Privacy</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Your privacy is guaranteed. All chats are strictly confidential, encrypted, and never permanently stored.</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                 <MessageCircle size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900">24/7 Availability</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Legal emergencies don't wait for business hours. Get instant answers anytime, anywhere, on any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Lawyer CTA Section */}
      {role !== "lawyer" && (
        <section className="py-16 bg-white border-t border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              Need personalized legal counsel?
            </h2>
            <p className="text-base text-gray-600 mb-8 max-w-xl mx-auto">
              {session
                ? "Connect directly with verified, specialized lawyers through our secure platform."
                : "Sign in to connect directly with verified, specialized lawyers for professional support."}
            </p>

            <Link
              href={session ? "/lawyer/contact" : "/login"}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-colors shadow-sm"
            >
              {session ? "Browse Lawyers Now" : "Sign in to Connect"}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-600">Everything you need to know about LawBot.</p>
          </div>
          
          <div className="space-y-3">
            {[
              {
                question: "Is LawBot a replacement for a human lawyer?",
                answer: "No. LawBot is an AI assistant designed to help you understand legal concepts and provide general information. For specific legal advice, document review, or representation, always consult a licensed attorney."
              },
              {
                question: "How secure is my data on LawBot?",
                answer: "Security is our top priority. We use end-to-end encryption for all communications. Your queries are anonymized and we do not store chat histories longer than necessary for the session."
              },
              {
                question: "Can I hire a real lawyer through this platform?",
                answer: "Yes! Once registered, you can access our directory of verified legal professionals, filter by specialty, and initiate a secure consultation directly."
              },
              {
                question: "What types of legal questions can the AI answer?",
                answer: "LawBot is trained on a wide array of topics including contracts, employment law, family law, property disputes, and corporate compliance."
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <summary className="flex justify-between items-center text-base font-semibold text-gray-900 cursor-pointer p-5 list-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

