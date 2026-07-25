"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Check, X, Loader2, Shield, Briefcase, Calendar, Mail, Award, Clock, MapPin, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("requests");
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [approvedLawyers, setApprovedLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch("/api/lawyer?status=pending"),
        fetch("/api/lawyer?status=approved"),
      ]);

      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();

      setPendingLawyers(pendingData || []);
      setApprovedLawyers(approvedData || []);
    } catch (error) {
      toast.error("Failed to fetch lawyer data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/approve-lawyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Lawyer approved successfully");
        fetchLawyers();
      } else {
        toast.error(data.message || "Approval failed");
      }
    } catch (error) {
      toast.error("Approval failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/reject-lawyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Lawyer registration rejected");
        fetchLawyers();
      } else {
        toast.error(data.message || "Rejection failed");
      }
    } catch (error) {
      toast.error("Rejection failed");
    } finally {
      setActionLoading(null);
    }
  };

  const renderLawyerCard = (lawyer, showActions = false) => (
    <div
      key={lawyer._id}
      className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 space-y-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
            {lawyer.name?.charAt(0).toUpperCase() || "A"}
          </div>
          {showActions ? (
            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">
              Pending Review
            </span>
          ) : (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Approved
            </span>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">{lawyer.name}</h3>
          <p className="text-xs text-gray-500">{lawyer.email}</p>
        </div>

        <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
          <p className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-800">Specialization:</span> {lawyer.specialization}
          </p>
          <p className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-gray-800">Bar ID:</span> {lawyer.barId}
          </p>
          <p className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-gray-800">Experience:</span> {lawyer.experience} years
          </p>
          {lawyer.availability && (
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-800">Availability:</span> {lawyer.availability}
            </p>
          )}
          {lawyer.bio && (
            <p className="text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100 line-clamp-2 mt-2">
              "{lawyer.bio}"
            </p>
          )}
        </div>
      </div>

      {showActions && (
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleApprove(lawyer._id)}
            disabled={actionLoading === lawyer._id}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md disabled:opacity-50 transition"
          >
            {actionLoading === lawyer._id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>Approve</span>
          </button>

          <button
            onClick={() => handleReject(lawyer._id)}
            disabled={actionLoading === lawyer._id}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-semibold disabled:opacity-50 transition"
          >
            {actionLoading === lawyer._id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
            <span>Reject</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50/50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-100/50 rounded-full blur-[130px] opacity-70"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 relative z-10 space-y-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-xl p-8 lg:p-10 relative overflow-hidden text-center space-y-3">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Admin Control Panel</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Lawyer Verification &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Platform Administration
            </span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Review attorney bar credentials, approve new lawyer accounts, and audit active advocates.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-amber-500">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{pendingLawyers.length}</p>
              <p className="text-xs font-medium text-gray-500">Pending Lawyer Approvals</p>
            </div>

          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-emerald-500">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{approvedLawyers.length}</p>
              <p className="text-xs font-medium text-gray-500">Approved Active Lawyers</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setTab("requests")}
            className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
              tab === "requests"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/80 shadow-sm"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Pending Approvals ({pendingLawyers.length})</span>
          </button>
          <button
            onClick={() => setTab("approved")}
            className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
              tab === "approved"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200/80 shadow-sm"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Approved Lawyers ({approvedLawyers.length})</span>
          </button>
        </div>

        {/* Grid Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
            <p className="text-gray-500 text-sm font-medium">Loading lawyer applications...</p>
          </div>
        ) : tab === "requests" ? (
          pendingLawyers.length === 0 ? (
            <div className="text-center py-16 bg-white/80 rounded-3xl border border-gray-100 shadow-sm">
              <Calendar className="w-14 h-14 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">No Pending Requests</h3>
              <p className="text-gray-500 text-xs">All lawyer applications have been reviewed.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {pendingLawyers.map((lawyer) => renderLawyerCard(lawyer, true))}
            </div>
          )
        ) : approvedLawyers.length === 0 ? (
          <div className="text-center py-16 bg-white/80 rounded-3xl border border-gray-100 shadow-sm">
            <Shield className="w-14 h-14 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-bold text-gray-800">No Approved Lawyers</h3>
            <p className="text-gray-500 text-xs">Approved attorneys will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {approvedLawyers.map((lawyer) => renderLawyerCard(lawyer))}
          </div>
        )}
      </div>
    </main>
  );
}
