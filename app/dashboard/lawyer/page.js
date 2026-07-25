"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Check, X, Trash2, MessageSquare, Clock, Loader2, Users, Briefcase, ShieldCheck } from "lucide-react";

export default function LawyerDashboard() {
  const [mergedRequests, setMergedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState(null);
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("pending");
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchRequests() {
      try {
        const res = await axios.post("/api/lawyer/requests", {
          lawEmail: session.user.email,
        });
        setMergedRequests(res.data.mergedRequests || []);
      } catch (error) {
        console.error("Failed to fetch chat requests", error);
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [session?.user?.email]);

  const handleResponse = async (requestId, action, Client) => {
    try {
      setRespondingId(requestId);
      await axios.post("/api/lawyer/respond", {
        requestId,
        Client,
        lawEmail: session.user.email,
        action,
      });

      setMergedRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, status: action } : r))
      );
      toast.success(`Request ${action} successfully`);
    } catch (err) {
      console.error("Error responding to request:", err);
      toast.error("Failed to respond to request");
    } finally {
      setRespondingId(null);
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await axios.delete("/api/lawyer/respond", {
        data: { requestId, lawEmail: session?.user?.email },
      });
      setMergedRequests((prev) => prev.filter((r) => r._id !== requestId));
      toast.success("Request deleted");
    } catch (error) {
      console.error("Failed to delete response:", error);
      toast.error("Failed to delete request");
    }
  };

  const pendingRequests = mergedRequests.filter((r) => r.status === "pending");
  const pastResponses = mergedRequests.filter((r) => r.status !== "pending");

  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16 space-y-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-xl p-8 lg:p-10 relative overflow-hidden text-center space-y-3">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>Counselor Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Lawyer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Command Dashboard
            </span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Manage incoming consultation requests from clients and launch direct secure chat sessions.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-amber-500">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{pendingRequests.length}</p>
              <p className="text-xs font-medium text-gray-500">Pending Requests</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-emerald-500">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">
                {pastResponses.filter((r) => r.status === "accepted").length}
              </p>
              <p className="text-xs font-medium text-gray-500">Accepted Clients</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-blue-500">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{mergedRequests.length}</p>
              <p className="text-xs font-medium text-gray-500">Total Consultations</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
              activeTab === "pending"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/80 shadow-sm"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Requests ({pendingRequests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
              activeTab === "past"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/80 shadow-sm"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Past Responses ({pastResponses.length})</span>
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
            <p className="text-gray-500 text-sm font-medium">Fetching client requests...</p>
          </div>
        ) : activeTab === "pending" ? (
          <div>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-16 bg-white/80 rounded-3xl border border-gray-100 shadow-sm">
                <Clock className="w-14 h-14 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-bold text-gray-800">No Pending Requests</h3>
                <p className="text-gray-500 text-xs">Client consultation requests will appear here in real-time.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div
                    key={req._id}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <h4 className="font-bold text-gray-900 text-base">{req.Client}</h4>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          Requested: {req.requestedAt ? new Date(req.requestedAt).toLocaleString() : "Recently"}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          disabled={respondingId === req._id}
                          onClick={() => handleResponse(req._id, "accepted", req.Client)}
                          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition disabled:opacity-60"
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept Request</span>
                        </button>
                        <button
                          disabled={respondingId === req._id}
                          onClick={() => handleResponse(req._id, "rejected", req.Client)}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold text-xs transition disabled:opacity-60"
                        >
                          <X className="w-4 h-4" />
                          <span>Decline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {pastResponses.length === 0 ? (
              <div className="text-center py-16 bg-white/80 rounded-3xl border border-gray-100 shadow-sm">
                <MessageSquare className="w-14 h-14 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-bold text-gray-800">No Past Responses</h3>
                <p className="text-gray-500 text-xs">Past accepted or declined requests will show here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastResponses.map((req) => (
                  <div
                    key={req._id}
                    className={`bg-white/90 backdrop-blur-xl rounded-3xl p-6 border shadow-sm transition space-y-4 ${
                      req.status === "accepted" ? "border-l-4 border-l-emerald-500" : "border-l-4 border-l-red-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">Client: {req.Client}</h4>
                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            req.status === "accepted" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                          }`}
                        >
                          Status: {req.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {req.status === "accepted" && (
                          <button
                            onClick={async () => {
                              try {
                                const res = await axios.post("/api/chat/start", {
                                  clientEmail: req.Client,
                                  lawyerEmail: session.user.email,
                                });
                                router.push(`/chat/${res.data.chatId}`);
                              } catch (error) {
                                toast.error("Unable to start chat session.");
                              }
                            }}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-md transition"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Go to Chat</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition border border-red-100"
                          title="Delete history entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
