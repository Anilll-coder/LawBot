import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <Image src="/balance.gif" alt="LawBot" width={28} height={28} className="w-7 h-7 object-contain" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LawBot
              </span>
              <p className="text-xs text-gray-500 font-medium">AI-Powered Legal Companion</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
            <Link href="/chat-bot" className="hover:text-blue-600 transition-colors">
              AI Assistant
            </Link>
            <Link href="/lawyer/contact" className="hover:text-blue-600 transition-colors">
              Find Lawyers
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} LawBot Inc. All rights reserved. Designed for legal assistance.</p>
          <p className="text-center sm:text-right">
            Disclaimer: LawBot provides AI-generated legal insights for informational purposes only and does not constitute formal legal counsel.
          </p>
        </div>
      </div>
    </footer>
  );
}
