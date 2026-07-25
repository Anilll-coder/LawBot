"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";

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
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-blue-600 bg-blue-50 font-semibold"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  const mobileNavLinkClass = (path) =>
    `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
      isActive(path)
        ? "bg-blue-50 text-blue-600 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Image src="/balance.gif" alt="LawBot Logo" className="w-6 h-6 object-contain" width={24} height={24} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            LawBot
          </span>
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
                <div className="flex items-center space-x-1.5 text-xs text-gray-600 font-medium bg-gray-100 px-3 py-1.5 rounded-lg">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span className="max-w-[120px] truncate">{session?.user?.name || session?.user?.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loadingLogout}
                  className="flex items-center gap-1 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium disabled:opacity-50"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {loadingLogout ? "..." : "Logout"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3 pl-2">
              <Link href="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition border border-gray-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-1">
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
              <div className="pt-3 mt-2 border-t border-gray-200 flex flex-col gap-2">
                <div className="flex items-center space-x-2 text-xs text-gray-600 px-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>Logged in as {session?.user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  disabled={loadingLogout}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-red-600 border border-gray-200 px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-50 transition disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {loadingLogout ? "Logging out..." : "Logout"}
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm w-full transition-colors">
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

