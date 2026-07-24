"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Send, Loader2, MessageSquare, ShieldCheck, User, RefreshCw } from "lucide-react";

export default function ChatComponent({ chatId, userType }) {
  const { data: session } = useSession();
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!chatId || !session?.user?.email) return;
    fetchChat();
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, [chatId, session?.user?.email]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  const fetchChat = async () => {
    try {
      const res = await axios.get(`/api/chat/${chatId}`);
      setChat(res.data);
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;

    const messageText = newMessage.trim();
    setIsSending(true);
    setNewMessage("");

    try {
      await axios.post(`/api/chat/${chatId}`, {
        sender: session.user.email,
        message: messageText,
      });
      fetchChat();
    } catch (error) {
      console.error("Failed to send message:", error);
      setNewMessage(messageText);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50/50 relative flex flex-col justify-center py-6 px-4 sm:px-6">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[130px] opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col h-[82vh] bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Header Bar */}
        <header className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                {userType === "lawyer" ? "Direct Client Consultation" : "Attorney Consultation"}
              </h2>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{chat?.messages?.length || 0} messages exchanged</span>
              </p>
            </div>
          </div>

          <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Encrypted Session
          </span>
        </header>

        {/* Message Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50">
          {!chat?.messages || chat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-3 py-12">
              <div className="w-14 h-14 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-gray-700">No Messages Yet</h4>
              <p className="text-xs text-gray-400 max-w-xs">
                Start the direct consultation by typing your message below.
              </p>
            </div>
          ) : (
            chat?.messages?.map((msg) => {
              const isOwn = msg.sender === session?.user?.email;
              return (
                <div
                  key={msg._id || msg.timestamp}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        isOwn
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs"
                          : "bg-white border border-gray-200/80 text-gray-800 rounded-bl-xs"
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isSending}
            className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm placeholder:text-gray-400 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            className="h-11 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
