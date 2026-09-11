import React from 'react';
import Link from 'next/link';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-zinc-900 border border-zinc-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
        <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto text-4xl shadow-lg">
          <FaExclamationTriangle />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">404</h1>
          <h2 className="text-xl font-semibold text-gray-200">Page Not Found</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            <FaHome /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}