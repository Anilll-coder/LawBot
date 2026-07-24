"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, User, Mail, Lock, ShieldCheck, MapPin, Clock, Award, FileText, ArrowRight, Loader2 } from "lucide-react";

export default function LawyerSignupForm() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", specialization: "",
    experience: "", state: "", availability: "", bio: "", barId: ""
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name || form.name.trim().length < 2) newErrors.name = "Enter a valid full name";
    if (!form.email || !emailRegex.test(form.email)) newErrors.email = "Enter a valid email address";
    if (!form.password || form.password.length < 6) newErrors.password = "Min 6 characters required";
    if (!form.barId || form.barId.length < 5) newErrors.barId = "Valid Bar License ID required";
    if (!form.specialization || form.specialization.trim().length < 3) newErrors.specialization = "Enter legal specialization";
    if (!form.experience || isNaN(form.experience) || Number(form.experience) < 0) newErrors.experience = "Valid years of experience required";
    if (!form.state || form.state.trim().length < 2) newErrors.state = "Enter location / state";
    if (!form.availability || form.availability.trim().length < 2) newErrors.availability = "Specify availability";
    if (!form.bio || form.bio.trim().length < 10) newErrors.bio = "Bio must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lawyer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Registration failed: " + (data.message || "Something went wrong"));
      } else {
        toast.success(data.message || "Application submitted for admin review!");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 font-sans text-gray-900 bg-gray-50/50 py-12 px-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-100/50 rounded-full blur-[130px] opacity-70"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>Attorney Partner Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Join the LawBot{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Verified Legal Network
            </span>
          </h1>
          <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
            Expand your practice, connect with clients seeking consultations, and manage inquiries seamlessly.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Account Info */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                1. Account Credentials
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Adv. Sarah Jenkins"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="sarah@lawfirm.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    />
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Bar & Professional Credentials */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                2. Professional Credentials
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Bar License ID / Registration</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="barId"
                      placeholder="BAR/2023/12345"
                      value={form.barId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    />
                  </div>
                  {errors.barId && <p className="text-xs text-red-500 mt-1">{errors.barId}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Specialization</label>
                  <div className="relative">
                    <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="specialization"
                      placeholder="Corporate Law, Family Law, etc."
                      value={form.specialization}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    />
                  </div>
                  {errors.specialization && <p className="text-xs text-red-500 mt-1">{errors.specialization}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Years of Experience</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="experience"
                      placeholder="8"
                      value={form.experience}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    />
                  </div>
                  {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">State / Jurisdiction</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="state"
                      placeholder="California, USA"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    />
                  </div>
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Availability & Bio */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                3. Practice & Bio
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Availability Schedule</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="availability"
                      placeholder="Mon - Fri, 10 AM - 5 PM EST"
                      value={form.availability}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                    />
                  </div>
                  {errors.availability && <p className="text-xs text-red-500 mt-1">{errors.availability}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Professional Bio</label>
                  <textarea
                    name="bio"
                    rows={3}
                    placeholder="Briefly describe your legal background, key practice areas, and consultation approach..."
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm resize-none"
                  ></textarea>
                  {errors.bio && <p className="text-xs text-red-500 mt-1">{errors.bio}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Lawyer Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Already registered?{" "}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">
              Sign in to your Lawyer Dashboard
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
