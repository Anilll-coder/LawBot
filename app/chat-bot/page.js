"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Send, Bot, User, MessageSquare, AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";

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
    <main className="flex-1 font-sans text-gray-900 bg-gray-50 flex flex-col justify-center py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col h-[82vh] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header Bar */}
        <header className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">LawBot AI Assistant</h1>
              <p className="text-xs text-gray-500">24/7 AI Legal Companion</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <span className="bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Confidential & Encrypted
            </span>
          </div>
        </header>

        {/* Chat Body */}
        <main className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-10 space-y-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                <Bot className="w-6 h-6" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  How can LawBot help you today?
                </h3>
                <p className="text-gray-500 text-sm">
                  Ask any legal question in plain English. Select a suggestion below or type your inquiry.
                </p>
              </div>

              {/* Quick Prompts */}
              <div className="grid sm:grid-cols-2 gap-3 max-w-2xl w-full pt-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(prompt)}
                    className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-500 text-left text-xs font-medium text-gray-700 transition-colors flex items-start space-x-2.5 group"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
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
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`flex flex-col max-w-[80%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono mt-1 px-1">
                    {formatTime(msg.time)}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
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
                className="flex items-center space-x-2 text-gray-600 text-xs bg-white border border-gray-200 px-3.5 py-2 rounded-xl w-fit shadow-sm"
              >
                <Bot className="w-4 h-4 text-blue-600" />
                <span>LawBot AI is typing...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!isLoggedIn && chatLimitReached && (
            <div className="flex items-center justify-between gap-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>You have reached the 5-message free trial limit. Please sign in to continue chatting.</span>
              </div>
              <Link href="/login" className="bg-amber-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-amber-700 transition-colors flex-shrink-0">
                Sign In Now
              </Link>
            </div>
          )}

          <div ref={messagesEndRef} />
        </main>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white flex items-center gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your legal question here..."
            disabled={loading || chatLimitReached}
            className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-400 disabled:opacity-50"
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
            className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
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

