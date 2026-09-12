"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaStethoscope,
  FaArrowLeft,
  FaMoneyBillWave,
} from "react-icons/fa";
import { updateAppointmentStatus } from "@/lib/edit-apis";

export default function DoctorAppointmentsUI({ initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments || []);
  const [loadingId, setLoadingId] = useState(null);

  const handleAccept = async (id) => {
    try {
      setLoadingId(id);
      await updateAppointmentStatus(id, "accepted");

    
      setAppointments((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: "accepted" } : item))
      );
      toast.success("Appointment accepted successfully!");
    } catch (error) {
      toast.error("Failed to accept appointment.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      <Toaster position="top-right" />

      {/* Top Navigation & Header */}
      <div className="flex flex-col gap-4 border-b border-zinc-800 pb-5">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold rounded-xl border border-zinc-800 transition-all shadow-sm"
          >
            <FaArrowLeft className="text-blue-400" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="space-y-1">
          {/* Requested Heading (Dark styled for high contrast) */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
            Patient Appointments
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Manage and review all your patient consultation schedules.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
        {appointments.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No appointments found.
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-gray-300">
                <thead className="bg-zinc-950/80 text-gray-400 uppercase text-[11px] tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">Patient / User ID</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Symptoms</th>
                    <th className="px-6 py-4">Fee</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {appointments.map((item) => (
                    <tr key={item._id} className="hover:bg-zinc-800/30 transition-all">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                        <FaUser className="text-blue-400 flex-shrink-0" />
                        <span className="truncate max-w-[140px] lg:max-w-none">{item.userId}</span>
                      </td>

                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-200">
                          <FaCalendarAlt className="text-gray-500" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <FaClock className="text-gray-500" />
                          <span>{item.time}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-800/80 text-gray-300 rounded-lg text-xs font-medium">
                          <FaStethoscope className="text-gray-400" /> {item.symptoms || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-emerald-400 font-semibold">
                        ৳{item.fee}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.status === "accepted"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {item.status === "accepted" ? (
                            <>
                              <FaCheckCircle /> Accepted
                            </>
                          ) : (
                            <>
                              <FaClock /> Pending
                            </>
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {item.status === "pending" ? (
                          <button
                            onClick={() => handleAccept(item._id)}
                            disabled={loadingId === item._id}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md disabled:opacity-50"
                          >
                            {loadingId === item._id ? "Accepting..." : "Accept"}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-500 font-medium italic">
                            Done
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout (Visible only on mobile screens) */}
            <div className="block md:hidden divide-y divide-zinc-800">
              {appointments.map((item) => (
                <div key={item._id} className="p-4 space-y-3 bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <FaUser className="text-blue-400" />
                      <span className="truncate max-w-[180px]">{item.userId}</span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {item.status === "accepted" ? "Accepted" : "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 pt-1">
                    <div className="space-y-1">
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Schedule</p>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-500 text-[11px]" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <FaClock className="text-gray-500 text-[11px]" />
                        <span>{item.time}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Fee & Symptoms</p>
                      <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <FaMoneyBillWave className="text-[11px]" />
                        <span>৳{item.fee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300 truncate">
                        <FaStethoscope className="text-gray-500 text-[11px]" />
                        <span className="truncate">{item.symptoms || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/60 flex justify-end">
                    {item.status === "pending" ? (
                      <button
                        onClick={() => handleAccept(item._id)}
                        disabled={loadingId === item._id}
                        className="w-full flex items-center justify-center gap-1.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md disabled:opacity-50"
                      >
                        {loadingId === item._id ? "Accepting..." : "Accept"}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500 font-medium italic">
                        Done
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}