"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaCalendarAlt, FaHistory, FaStar, FaBars, FaTimes, FaUserAlt } from "react-icons/fa";

export default function PatientSidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "My Appointments", href: "/dashboard/patient/appointments", icon: <FaCalendarAlt /> },
    { name: "Payment History", href: "/dashboard/patient/payment-history", icon: <FaHistory /> },
    { name: "My Reviews", href: "/dashboard/patient/reviews", icon: <FaStar /> },
  ];

  return (
    <>
      {/* Mobile Top Bar with Menu Button */}
      <div className="lg:hidden flex items-center justify-between bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-40">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaUserAlt className="text-blue-500" /> Patient Panel
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-300 hover:text-white bg-zinc-800 rounded-lg focus:outline-none"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Dashboard Title & User Info */}
          <div className="border-b border-zinc-800 pb-4">
            <h2 className="text-xl font-extrabold text-white hidden lg:block">
              Medicare <span className="text-blue-500 text-sm font-semibold">Patient</span>
            </h2>
            <div className="mt-3 flex items-center gap-3 bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-700/50">
              <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30">
                {user?.name ? user.name[0].toUpperCase() : "P"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user?.name || "Patient"}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-blue-600/10 hover:border-l-4 hover:border-blue-500 rounded-xl transition-all"
              >
                <span className="text-blue-400 text-base">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer info */}
        <div className="border-t border-zinc-800 pt-4 text-xs text-gray-500 text-center">
          &copy; Medicare Healthcare
        </div>
      </aside>
    </>
  );
}