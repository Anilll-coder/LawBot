'use client'
import Link from 'next/link'
import { ShieldCheck, Gavel, MessageCircle, Briefcase, ChevronDown, ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <main className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-70"></div>
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-indigo-50 rounded-full blur-[120px] opacity-80"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8 text-sm font-medium text-blue-700 shadow-sm">
            <span className="flex h-2 w-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span>AI Legal Assistant is Live</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] mb-6 text-gray-900 tracking-tight">
            Legal knowledge, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              simplified for you.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get instant legal insights, decode complex jargon, and find answers to your questions with our advanced AI-powered assistant.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/chat-bot"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 group"
            >
              Start Chatting Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {!session && (
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Conditional Lawyer Section */}
          {role !== "lawyer" ? (
            <div className="mt-20 bg-white/60 backdrop-blur-lg border border-white/80 rounded-3xl shadow-xl p-8 md:p-10 max-w-3xl mx-auto text-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 bg-blue-50 w-40 h-40 rounded-full blur-3xl -z-10"></div>
              <Briefcase size={32} className="mx-auto mb-4 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Are you a legal professional?</h3>
              <p className="text-gray-600 mb-6">Join the LawBot network and connect with clients seeking expert legal advice.</p>
              <Link
                href="/lawyer/signup"
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition-all hover:-translate-y-0.5"
              >
                Create Lawyer Profile
              </Link>
            </div>
          ) : (
            <div className="mt-20 bg-white/60 backdrop-blur-lg border border-white/80 rounded-3xl shadow-xl p-8 md:p-10 max-w-3xl mx-auto text-center relative overflow-hidden">
               <div className="absolute -left-10 -bottom-10 bg-green-50 w-40 h-40 rounded-full blur-3xl -z-10"></div>
              <Briefcase size={32} className="mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Counselor</h3>
              <p className="text-gray-600 mb-6">Access your dashboard to manage client queries and appointments.</p>
              <Link
                href="/dashboard/lawyer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition-all hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why choose LawBot?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg">Experience the next generation of legal assistance, combining AI speed with reliable insights.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <Gavel size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Decode Jargon</h4>
              <p className="text-gray-600 leading-relaxed">Break down complicated legal documents and terminology into simple, plain English everyone can understand.</p>
            </div>
            
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                 <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Total Privacy</h4>
              <p className="text-gray-600 leading-relaxed">Your privacy is guaranteed. All chats are strictly confidential, encrypted, and never permanently stored.</p>
            </div>
            
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
               <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                 <MessageCircle size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">24/7 Availability</h4>
              <p className="text-gray-600 leading-relaxed">Legal emergencies don't wait for business hours. Get instant answers anytime, anywhere, on any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Lawyer CTA Section */}
      {role !== "lawyer" && (
        <section className="py-24 bg-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Need personalized counsel?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10">
              {session
                ? "You're logged in. Connect directly with verified, specialized lawyers through our secure messaging platform."
                : "Log in to connect directly with verified, specialized lawyers for professional legal support."}
            </p>

            <Link
              href={session ? "/lawyer/contact" : "/login"}
              className={`inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl ${
                session ? "bg-gradient-to-r from-emerald-500 to-green-600" : "bg-gradient-to-r from-gray-900 to-gray-800"
              }`}
            >
              {session ? "Browse Lawyers Now" : "Sign in to Connect"}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know about LawBot.</p>
          </div>
          
          <div className="space-y-4">
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
              <details key={index} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow">
                <summary className="flex justify-between items-center text-lg font-semibold text-gray-900 cursor-pointer p-6 list-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="ml-6 flex-shrink-0 bg-gray-50 rounded-full p-2 group-open:bg-blue-50 group-open:text-blue-600 transition-colors">
                    <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform duration-300" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed">
                  <div className="pt-2 border-t border-gray-50">
                    {faq.answer}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
