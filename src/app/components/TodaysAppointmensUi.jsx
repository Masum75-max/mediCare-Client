"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaStethoscope,
  FaFileMedical,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMoneyBillWave
} from "react-icons/fa";
import { createPrescription } from "@/lib/post-apis";

export default function TodaysAppointmentsUI({ doctor, appointments: initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments || []);
  const [selectedApp, setSelectedApp] = useState(null);
  const [prescriptionText, setPrescriptionText] = useState("");
  const [loading, setLoading] = useState(false);

  // ভেরিফিকেশন চেক
  const isVerified =
    doctor?.verificationStatus === "true" || doctor?.verificationStatus === true;

  if (!isVerified) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8 space-y-4 text-amber-400">
          <FaExclamationTriangle className="text-4xl mx-auto text-amber-400" />
          <h2 className="text-2xl font-bold text-black">Admin Verification Needed</h2>
          <p className="text-sm text-black">
            Your doctor profile is currently pending verification. You can view and manage todays appointments once an admin verifies your account.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white text-xs font-semibold rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-all mt-2"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleOpenPrescribeModal = (app) => {
    setSelectedApp(app);
    setPrescriptionText("");
  };

  const handleSavePrescription = async () => {
    if (!prescriptionText.trim()) {
      toast.error("Please enter prescription text.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        appointmentId: selectedApp._id,
        doctorId: doctor._id,
        userId: selectedApp.userId,
        prescriptionText,
      };

      await createPrescription(payload);

      // UI-তে ইনস্ট্যান্ট স্টেটাস পরিবর্তন
      setAppointments((prev) =>
        prev.map((item) =>
          item._id === selectedApp._id ? { ...item, status: "completed" } : item
        )
      );

      toast.success("Prescription saved and appointment completed!");
      setSelectedApp(null);
      setPrescriptionText("");
    } catch (error) {
      toast.error("Failed to save prescription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-white">
      <Toaster position="top-right" />

      {/* Top Header */}
      <div className="flex flex-col gap-4 border-b border-zinc-800 pb-5">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold rounded-xl border border-zinc-800 transition-all"
          >
            <FaArrowLeft className="text-blue-400" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
            Todays Appointments
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Review todays schedule and issue prescriptions for your patients.
          </p>
        </div>
      </div>

      {/* Table & Responsive Cards */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
        {appointments.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No appointments scheduled for today.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-gray-300">
                <thead className="bg-zinc-950/80 text-gray-400 uppercase text-[11px] tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">Patient ID</th>
                    <th className="px-6 py-4">Time Slot</th>
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

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-200">
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
                            item.status === "completed"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {item.status === "completed" ? (
                            <>
                              <FaCheckCircle /> Completed
                            </>
                          ) : (
                            <>
                              <FaClock /> {item.status}
                            </>
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {item.status !== "completed" ? (
                          <button
                            onClick={() => handleOpenPrescribeModal(item)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md"
                          >
                            <FaFileMedical /> Prescribe
                          </button>
                        ) : (
                          <span className="text-xs text-gray-500 font-medium italic">
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
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
                        item.status === "completed"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 pt-1">
                    <div className="space-y-1">
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Time</p>
                      <div className="flex items-center gap-1">
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
                    {item.status !== "completed" ? (
                      <button
                        onClick={() => handleOpenPrescribeModal(item)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md"
                      >
                        <FaFileMedical /> Prescribe
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500 font-medium italic">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Prescription Modal Component */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <FaFileMedical className="text-blue-400" /> Write Prescription
            </h2>

            <div className="space-y-2 text-xs text-gray-400">
              <p><strong className="text-gray-200">Patient ID:</strong> {selectedApp.userId}</p>
              <p><strong className="text-gray-200">Symptoms:</strong> {selectedApp.symptoms}</p>
            </div>

            <textarea
              rows={5}
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              placeholder="Write medicines, tests, and instructions here..."
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />

            <div className="flex justify-end gap-3 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setSelectedApp(null)}
                disabled={loading}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-semibold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrescription}
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save & Complete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}