"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LogOut, User, MessageCircle, ShieldCheck, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    setLoadingLogout(true);
    await signOut({ redirect: false });
    toast.success("Logged out successfully.");
    setLoadingLogout(false);
    router.push("/");
  };

  const isLawyer = session?.user?.role === "lawyer";
  const isAdmin = session?.user?.role === "admin";

  const isActive = (path) => pathname === path;

  const navLinkClass = (path) =>
    `px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100"
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/80"
    }`;

  const mobileNavLinkClass = (path) =>
    `px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
      isActive(path)
        ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/80 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Image src="/balance.gif" alt="LawBot Logo" className="w-7 h-7 object-contain" width={28} height={28} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              LawBot
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600/70 -mt-1">
              AI Legal Suite
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>

          {session ? (
            <>
              <Link href="/chat-bot" className={navLinkClass("/chat-bot")}>
                AI Chat
              </Link>

              {isLawyer ? (
                <Link href="/dashboard/lawyer" className={navLinkClass("/dashboard/lawyer")}>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/lawyer/contact" className={navLinkClass("/lawyer/contact")}>
                    Find Lawyers
                  </Link>
                  {isAdmin && (
                    <Link href="/dashboard/admin" className={navLinkClass("/dashboard/admin")}>
                      Admin
                    </Link>
                  )}
                  {!isAdmin && (
                    <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                      Dashboard
                    </Link>
                  )}
                </>
              )}

              {/* User badge and logout */}
              <div className="flex items-center space-x-3 pl-3 ml-2 border-l border-gray-200">
                <div className="flex items-center space-x-2 bg-gray-100/80 border border-gray-200/80 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span className="max-w-[120px] truncate">{session?.user?.name || session?.user?.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loadingLogout}
                  className="flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 px-3.5 py-1.5 rounded-xl transition-all text-xs font-semibold disabled:opacity-50"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {loadingLogout ? "..." : "Logout"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3 pl-3">
              <Link href="/login">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-xl transition-all text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition border border-gray-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-xl px-6 py-4 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass("/")}>
            Home
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className={mobileNavLinkClass("/about")}>
            About
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className={mobileNavLinkClass("/contact")}>
            Contact
          </Link>

          {session ? (
            <>
              <Link href="/chat-bot" onClick={() => setIsOpen(false)} className={mobileNavLinkClass("/chat-bot")}>
                AI Chat
              </Link>
              {isLawyer ? (
                <Link href="/dashboard/lawyer" onClick={() => setIsOpen(false)} className={mobileNavLinkClass("/dashboard/lawyer")}>
                  Lawyer Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/lawyer/contact" onClick={() => setIsOpen(false)} className={mobileNavLinkClass("/lawyer/contact")}>
                    Find Lawyers
                  </Link>
                  {isAdmin && (
                    <Link href="/dashboard/admin" onClick={() => setIsOpen(false)} className={mobileNavLinkClass("/dashboard/admin")}>
                      Admin Dashboard
                    </Link>
                  )}
                  {!isAdmin && (
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className={mobileNavLinkClass("/dashboard")}>
                      User Dashboard
                    </Link>
                  )}
                </>
              )}
              <div className="pt-3 mt-3 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 px-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Logged in as {session?.user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  disabled={loadingLogout}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-100 transition disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {loadingLogout ? "Logging out..." : "Logout"}
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl transition-all font-semibold text-sm w-full shadow-md">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
