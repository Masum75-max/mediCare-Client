"use client";

import React from "react";
import Link from "next/link";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaUserMd, FaArrowLeft, FaStethoscope } from "react-icons/fa";

export default function AppointmentTable({ initialAppointments }) {
  const appointments = initialAppointments || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" /> Appointments List
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            View all scheduled patient appointments and their details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl border border-zinc-700/60 transition-all duration-200 shadow-sm active:scale-95"
          >
            <FaArrowLeft className="text-xs" />
            Back to Dashboard
          </Link>

          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-xl">
            Total: {appointments.length}
          </span>
        </div>
      </div>

      {appointments.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-zinc-950/80 text-xs uppercase text-gray-400 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">Doctor</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Symptoms</th>
                    <th className="px-6 py-4">Fee</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {appointments.map((item, idx) => {
                    const appId = item._id || item.id;
                    const statusLower = item?.status?.toLowerCase() || "pending";

                    return (
                      <tr key={appId || idx} className="hover:bg-zinc-800/40 transition-colors">
                        {/* Doctor Name */}
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                            <FaUserMd />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{item?.doctorName || "N/A"}</p>
                            <p className="text-[11px] text-gray-500">Doc ID: {item?.doctorId ? `${item.doctorId.slice(0, 8)}...` : "N/A"}</p>
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="px-6 py-4 text-xs text-gray-300">
                          <p className="flex items-center gap-1.5 font-semibold text-gray-200">
                            <FaCalendarAlt className="text-blue-400 text-xs" />
                            {item?.date || "N/A"}
                          </p>
                          <p className="flex items-center gap-1.5 text-gray-400 text-[11px] mt-1">
                            <FaClock className="text-gray-500 text-xs" />
                            {item?.time || "N/A"}
                          </p>
                        </td>

                        {/* Symptoms */}
                        <td className="px-6 py-4 text-xs text-gray-300 max-w-xs">
                          <p className="flex items-center gap-1 text-amber-300 font-medium capitalize">
                            <FaStethoscope className="text-amber-400 text-xs" />
                            {item?.symptoms || "None"}
                          </p>
                        </td>

                        {/* Fee */}
                        <td className="px-6 py-4 text-xs font-semibold text-emerald-400">
                          <span className="flex items-center gap-1">
                            <FaMoneyBillWave className="text-xs" />
                            ৳{item?.fee || "0"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                              statusLower === "approved" || statusLower === "confirmed"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : statusLower === "cancelled" || statusLower === "rejected"
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {item?.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {appointments.map((item, idx) => {
              const appId = item._id || item.id;
              const statusLower = item?.status?.toLowerCase() || "pending";

              return (
                <div
                  key={appId || idx}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                        <FaUserMd />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{item?.doctorName || "N/A"}</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <FaCalendarAlt className="text-blue-400 text-[10px]" /> {item?.date} | {item?.time}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0 capitalize ${
                        statusLower === "approved" || statusLower === "confirmed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : statusLower === "cancelled" || statusLower === "rejected"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {item?.status || "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50">
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Symptoms</p>
                      <p className="text-amber-300 font-medium capitalize mt-0.5 truncate">{item?.symptoms || "N/A"}</p>
                    </div>

                    <div className="bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/50">
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Fee</p>
                      <p className="text-emerald-400 font-semibold mt-0.5">৳{item?.fee || "0"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="py-12 bg-zinc-900 border border-zinc-800 rounded-2xl text-center text-gray-400">
          <p className="text-sm font-medium">No appointments found.</p>
        </div>
      )}
    </div>
  );
}