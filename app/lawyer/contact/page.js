"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Scale, Mail, Shield, CheckCircle, Loader2, Search, Briefcase, MapPin, Award, MessageSquare } from "lucide-react";

export default function ContactLawyerPage() {
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [acceptedLawyers, setAcceptedLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!email) return;

    const fetchAcceptedLawyers = async () => {
      try {
        const res = await axios.post("/api/client/responses", { clientEmail: email });
        const accepted = res.data.responses.map((r) => r.lawEmail);
        setAcceptedLawyers(accepted);
      } catch (error) {
        console.error("Failed to fetch accepted responses", error);
      }
    };

    fetchAcceptedLawyers();
  }, [email]);

  useEffect(() => {
    async function fetchLawyers() {
      try {
        const res = await axios.get("/api/lawyer?status=approved");
        setLawyers(res.data || []);
      } catch (error) {
        console.error("Failed to fetch lawyers", error);
        toast.error("Failed to load lawyers");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLawyers();
  }, []);

  function maskBarId(barId) {
    if (!barId) return "N/A";
    const parts = barId.split("/");
    if (parts.length === 3) {
      return `${parts[0]}/****/${parts[2]}`;
    }
    return barId;
  }

  const handleChat = async (lawEmail) => {
    try {
      const res = await axios.post("/api/chat/start", {
        clientEmail: session.user.email,
        lawyerEmail: lawEmail,
      });
      router.push(`/chat/${res.data.chatId}`);
    } catch (error) {
      console.error("Failed to start chat", error);
      toast.error("Failed to start chat session.");
    }
  };

  const handleRequestChat = async (lawyerId) => {
    if (!session) {
      toast.error("Please sign in to request a lawyer consultation.");
      router.push("/login");
      return;
    }
    setLoadingId(lawyerId);
    try {
      await axios.post("/api/chat-requests", { lawyerId, email });
      setSuccessId(lawyerId);
      toast.success("Chat request sent successfully!");
    } catch (error) {
      console.error("Chat request failed", error);
      toast.error("Failed to send chat request.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    const term = searchTerm.toLowerCase();
    return (
      lawyer.name?.toLowerCase().includes(term) ||
      lawyer.specialization?.toLowerCase().includes(term) ||
      lawyer.state?.toLowerCase().includes(term)
    );
  });

  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50/50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-100/50 rounded-full blur-[130px] opacity-70"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Bar Advocates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Consult with Specialized{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Legal Professionals
            </span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Filter our network of verified attorneys, view credentials, and send direct consultation requests.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search lawyers by name, specialization, or state..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white/90 shadow-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Lawyers Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-500 font-medium animate-pulse">Loading verified lawyers...</p>
          </div>
        ) : filteredLawyers.length === 0 ? (
          <div className="text-center py-16 bg-white/80 rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <Scale className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-1">No Lawyers Found</h3>
            <p className="text-gray-500 text-sm">
              {searchTerm ? "No attorney matching your search terms." : "No approved lawyers available right now."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLawyers.map((lawyer) => {
              const isAccepted = acceptedLawyers.includes(lawyer.email);

              return (
                <div
                  key={lawyer._id}
                  className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 flex items-center justify-center font-extrabold text-xl shadow-sm">
                        {lawyer.name?.charAt(0).toUpperCase() || "A"}
                      </div>

                      {isAccepted && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Accepted
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {lawyer.name}
                      </h2>
                      <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                        <Award className="w-3.5 h-3.5 text-blue-600" />
                        <span>{lawyer.specialization || "General Practice"}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-50">
                      <p className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-700">Bar ID:</span> {maskBarId(lawyer.barId)}
                      </p>
                      {lawyer.experience && (
                        <p className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-700">Experience:</span> {lawyer.experience} Years
                        </p>
                      )}
                      {lawyer.state && (
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-700">Location:</span> {lawyer.state}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{lawyer.email}</span>
                      </p>
                    </div>

                    {lawyer.bio && (
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                        "{lawyer.bio}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-6">
                    {isAccepted ? (
                      <button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        onClick={() => handleChat(lawyer.email)}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Start Direct Chat</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRequestChat(lawyer._id)}
                        disabled={loadingId === lawyer._id || successId === lawyer._id}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        {loadingId === lawyer._id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Request...</span>
                          </>
                        ) : successId === lawyer._id ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-white" />
                            <span>Request Sent</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4" />
                            <span>Request Chat Consultation</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
