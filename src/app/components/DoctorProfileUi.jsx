"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUserMd,
  FaHospital,
  FaGraduationCap,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEdit,
  FaSave,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { updateDoctorSchedule } from "@/lib/edit-apis";

export default function DoctorProfileUI({ doctor }) {
  const isVerified = doctor?.verificationStatus === "true";

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableDays, setAvailableDays] = useState(doctor?.availableDays || "");
  const [availableSlots, setAvailableSlots] = useState(doctor?.availableSlots || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isVerified) return;

    try {
      setLoading(true);
      await updateDoctorSchedule(doctor.userId, {
        availableDays,
        availableSlots,
      });
      toast.success("Schedule updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update schedule.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-white">
      <Toaster position="top-right" />

      {/* Top Navigation / Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold rounded-xl border border-zinc-800 transition-all shadow-sm"
        >
          <FaArrowLeft className="text-blue-400" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Verification Warning Alert */}
      {!isVerified && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3 text-amber-400">
          <FaExclamationTriangle className="text-xl flex-shrink-0" />
          <p className="text-xs sm:text-sm font-medium">
            You need to get verified first to update your availability and schedule. Please contact support or wait for admin approval.
          </p>
        </div>
      )}

      {/* Profile Card Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={doctor?.profileImage}
          alt={doctor?.doctorName}
          className="w-28 h-28 rounded-2xl object-cover border-2 border-blue-500/30 shadow-md flex-shrink-0"
        />

        <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-bold text-white truncate">
              {doctor?.doctorName || "Dr. N/A"}
            </h1>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold self-center sm:self-auto ${
                isVerified
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {isVerified ? <FaCheckCircle /> : <FaExclamationTriangle />}
              {isVerified ? "Verified Doctor" : "Unverified"}
            </span>
          </div>

          <p className="text-blue-400 font-medium text-sm flex items-center justify-center sm:justify-start gap-1">
            <FaUserMd /> {doctor?.specialization || "N/A"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-400 pt-2 border-t border-zinc-800/80">
            <p className="flex items-center gap-1.5">
              <FaGraduationCap className="text-gray-500" /> {doctor?.qualifications || "N/A"}
            </p>
            <p className="flex items-center gap-1.5">
              <FaBriefcase className="text-gray-500" /> Exp: {doctor?.experience || "N/A"}
            </p>
            <p className="flex items-center gap-1.5">
              <FaHospital className="text-gray-500" /> {doctor?.hospitalName || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Info & Schedule Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Practice Overview */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
            Practice Overview
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-gray-300">
            <div className="flex justify-between py-1 border-b border-zinc-800/50">
              <span className="text-gray-500">Consultation Fee</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <FaMoneyBillWave /> ৳{doctor?.consultationFee || 0}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-zinc-800/50">
              <span className="text-gray-500">Hospital</span>
              <span className="text-gray-200 font-medium">{doctor?.hospitalName}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-zinc-800/50">
              <span className="text-gray-500">Verification Status</span>
              <span className={isVerified ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                {isVerified ? "Approved" : "Pending Verification"}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule & Availability Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-lg font-bold text-white">Availability & Slots</h2>

            {isVerified && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold rounded-xl border border-blue-500/30 transition-all"
              >
                <FaEdit /> Edit Schedule
              </button>
            )}
          </div>

          {!isEditing ? (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/60 space-y-1">
                <p className="text-gray-500 text-xs flex items-center gap-1 font-semibold">
                  <FaCalendarAlt className="text-blue-400" /> Available Days
                </p>
                <p className="text-gray-200 font-medium">{availableDays || "Not Set"}</p>
              </div>

              <div className="bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/60 space-y-1">
                <p className="text-gray-500 text-xs flex items-center gap-1 font-semibold">
                  <FaClock className="text-blue-400" /> Available Slots
                </p>
                <p className="text-gray-200 font-medium">{availableSlots || "Not Set"}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Available Days
                </label>
                <input
                  type="text"
                  value={availableDays}
                  onChange={(e) => setAvailableDays(e.target.value)}
                  placeholder="e.g. Sun, Mon, Wed"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Available Slots
                </label>
                <input
                  type="text"
                  value={availableSlots}
                  onChange={(e) => setAvailableSlots(e.target.value)}
                  placeholder="e.g. 10:00 AM-1:00 PM or 100"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50"
                >
                  <FaSave /> {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-semibold rounded-xl border border-zinc-700 transition-all"
                >
                  <FaTimes />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}