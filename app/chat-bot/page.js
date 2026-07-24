"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Send, Bot, User, Sparkles, MessageSquare, AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";

function formatTime(date) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const quickPrompts = [
    "What are tenant rights regarding security deposits?",
    "Explain key clauses in a Non-Disclosure Agreement (NDA)",
    "What steps should I take for wrongful employment termination?",
    "How does copyright protection apply to digital content?"
  ];

  async function sendMessage(textToSend) {
    const query = textToSend || input;
    if (!query.trim()) return;

    const chatLimitReached = !isLoggedIn && messages.filter((m) => m.sender === "user").length >= 5;
    if (chatLimitReached) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: query, time: new Date() },
    ]);
    setLoading(true);
    setThinking(true);
    setInput("");

    try {
      const res = await fetch("/api/ask-lawbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.reply, time: new Date() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Error: " + (data.error || "Unknown error"), time: new Date() },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Request failed: " + err.message, time: new Date() },
      ]);
    }

    setLoading(false);
    setThinking(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  const chatLimitReached = !isLoggedIn && messages.filter((m) => m.sender === "user").length >= 5;

  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50/50 relative flex flex-col justify-center py-6 px-4 sm:px-6">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[130px] opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col h-[82vh] bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Header Bar */}
        <header className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">LawBot AI Assistant</h1>
                <span className="flex h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
              </div>
              <p className="text-xs text-gray-500">24/7 AI Legal Knowledge Companion</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Confidential & Encrypted
            </span>
          </div>
        </header>

        {/* Chat Body */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-10 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  How can LawBot help you today?
                </h3>
                <p className="text-gray-500 text-sm">
                  Ask any legal question in plain English. Select a suggestion below or type your inquiry.
                </p>
              </div>

              {/* Quick Prompts */}
              <div className="grid sm:grid-cols-2 gap-3 max-w-2xl w-full pt-4">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(prompt)}
                    className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-blue-300 text-left text-xs font-medium text-gray-700 transition-all flex items-start space-x-2.5 group"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`flex flex-col max-w-[80%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs"
                        : "bg-white border border-gray-200/80 text-gray-800 rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono mt-1 px-1">
                    {formatTime(msg.time)}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-gray-200 text-gray-700 flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3 text-gray-500 text-xs bg-white border border-gray-200/80 px-4 py-2.5 rounded-2xl w-fit shadow-sm animate-pulse"
              >
                <Bot className="w-4 h-4 text-blue-600" />
                <span>LawBot AI is formulating a legal explanation...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!isLoggedIn && chatLimitReached && (
            <div className="flex items-center justify-between gap-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>You have reached the 5-message free trial limit. Please sign in to continue chatting.</span>
              </div>
              <Link href="/login" className="bg-amber-600 text-white px-3 py-1.5 rounded-xl font-semibold hover:bg-amber-700 transition flex-shrink-0">
                Sign In Now
              </Link>
            </div>
          )}

          <div ref={messagesEndRef} />
        </main>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your legal question here..."
            disabled={loading || chatLimitReached}
            className="flex-1 resize-none border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm placeholder:text-gray-400 disabled:opacity-50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || chatLimitReached}
            className="h-11 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Send</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
