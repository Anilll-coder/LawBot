"use client";

import { useState } from "react";
import { Send, CheckCircle, Mail, User, MessageSquare, Clock, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Get in touch with LawBot Team
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Have questions, feedback, or need assistance? Send us a message and our support team will get back to you promptly.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                Contact Details
              </h2>

              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Email Us</h4>
                    <p className="text-sm text-gray-600">lawchatbot17@gmail.com</p>
                    <p className="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Support Hours</h4>
                    <p className="text-sm text-gray-600">Monday – Friday: 9:00 AM – 6:00 PM</p>
                    <p className="text-xs text-gray-400 mt-0.5">AI assistant active 24/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Headquarters</h4>
                    <p className="text-sm text-gray-600">Legal Tech Center, Suite 400</p>
                    <p className="text-xs text-gray-400 mt-0.5">Innovation District</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Note Box */}
            <div className="p-6 bg-gray-900 text-white rounded-2xl shadow-sm space-y-2">
              <h4 className="font-bold text-base flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                Need immediate legal answers?
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                You don't have to wait! Try asking our AI Assistant directly for instant insights on contracts, disputes, and legal terms.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Message Sent!
                  </h2>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Thank you for reaching out. We have received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg text-sm transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Your Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

