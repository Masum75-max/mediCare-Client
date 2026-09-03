"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // session data can be null/undefined while loading — always guard it
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

 

  const handleLogout = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
    router.push("/signin");
  };

  // Navigation Links array
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Appointments", href: "/appointments" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    // Only show Dashboard link when logged in
    ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];
   
  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-default-300 bg-background/90 backdrop-blur-xl shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden p-2 rounded-xl text-foreground-800 hover:text-blue-700 hover:bg-default-200/80 transition-colors focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo with Deeper Accent Color */}
          <Link href="/" className="group font-bold text-xl flex items-center gap-2.5 transition-transform active:scale-95">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-900/30 group-hover:scale-105 transition-transform">
              <span className="text-xl leading-none">✚</span>
            </div>
            <span className="tracking-tight text-foreground-900 font-black">
              MediCare <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">Connect</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden sm:flex items-center gap-1 bg-default-200/60 p-1.5 rounded-full border border-default-300/80">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-blue-700 bg-background shadow-sm"
                    : "text-foreground-700 hover:text-blue-700 hover:bg-background/60"
                }`}
              >
                {item.name}
                {/* Active Underline Glow Indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-blue-700 rounded-full shadow-[0_0_10px_rgba(29,78,216,0.9)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Auth Section (Hidden on Mobile) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {isPending ? (
            // Simple skeleton while session is loading
            <div className="w-24 h-9 rounded-xl bg-default-200 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-default-200/70 transition-colors"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border border-default-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-900 flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="text-sm font-semibold text-foreground-800 max-w-[120px] truncate">
                  {user.name}
                </span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl shadow-md shadow-red-900/25 transition-all active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 py-2 text-sm font-bold text-foreground-800 hover:text-blue-700 border border-default-300 hover:border-blue-700 hover:bg-blue-50/50 rounded-xl transition-all active:scale-95"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 rounded-xl shadow-md shadow-blue-900/25 transition-all active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-default-300 bg-background/98 backdrop-blur-2xl px-4 pt-4 pb-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-full text-base py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-blue-700/15 text-blue-700 font-bold border border-blue-700/30"
                      : "text-foreground-800 hover:bg-default-200/70"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-2.5 h-2.5 rounded-full bg-blue-700"></span>}
                </Link>
              );
            })}
            
            {/* Mobile Only Auth Section inside Menu Drawer */}
            <div className="pt-4 mt-3 border-t border-default-300 flex flex-col gap-2.5">
              {isPending ? (
                <div className="w-full h-10 rounded-xl bg-default-200 animate-pulse" />
              ) : user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border border-default-300"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-900 flex items-center justify-center text-white text-sm font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="text-sm font-semibold text-foreground-900 truncate">
                      {user.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-center py-2.5 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-md shadow-red-900/25 transition-all active:scale-98"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="w-full text-center py-2.5 text-sm font-bold text-foreground-900 bg-default-200/80 hover:bg-default-300 border border-default-300 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full text-center py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-900 rounded-xl shadow-md shadow-blue-900/30 transition-all active:scale-98"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
