"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaUserMd, FaHospital } from "react-icons/fa";
import { deleteDoctorById } from "@/lib/delete-apis";
import { updateDoctorVerification } from "@/lib/edit-apis";

export default function DoctorTable({ initialDoctors }) {
  const [doctors, setDoctors] = useState(initialDoctors || []);
  const [loadingId, setLoadingId] = useState(null);

  // Toggle Verification Status ("true" <-> "false")
  const handleToggleVerify = async (id, currentStatus) => {
    const newStatus = currentStatus === "true" ? "false" : "true";
    try {
      setLoadingId(id);
      await updateDoctorVerification(id, newStatus);

      setDoctors((prev) =>
        prev.map((doc) =>
          (doc._id || doc.id) === id ? { ...doc, verificationStatus: newStatus } : doc
        )
      );

      toast.success(
        newStatus === "true"
          ? "Doctor verified successfully!"
          : "Doctor unverified successfully!"
      );
    } catch (err) {
      toast.error("Failed to update status.");
    } finally {
      setLoadingId(null);
    }
  };

  // Handle Delete
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Dr. ${name || "this doctor"}?`
    );
    if (!confirmDelete) return;

    try {
      setLoadingId(id);
      await deleteDoctorById(id);
      setDoctors((prev) => prev.filter((doc) => (doc._id || doc.id) !== id));
      toast.success("Doctor deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete doctor.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Toaster position="top-right" />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FaUserMd className="text-blue-500" /> Manage Doctors
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Verify doctor credentials or remove doctor accounts.
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
            Total Doctors: {doctors.length}
          </span>
        </div>
      </div>

      {doctors.length > 0 ? (
        <>
          {/* Desktop View */}
          <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-zinc-950/80 text-xs uppercase text-gray-400 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">Doctor Info</th>
                    <th className="px-6 py-4">Specialization & Qualifications</th>
                    <th className="px-6 py-4">Hospital & Fee</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {doctors.map((doctor, idx) => {
                    const docId = doctor._id || doctor.id;
                    const isVerified = doctor.verificationStatus === "true";

                    return (
                      <tr key={docId || idx} className="hover:bg-zinc-800/40 transition-colors">
                        {/* Doctor Name & Image */}
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                          {doctor?.profileImage ? (
                            <img
                              src={doctor.profileImage}
                              alt={doctor?.doctorName || "Doctor"}
                              className="w-10 h-10 rounded-full object-cover border border-blue-500/30 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                              {doctor?.doctorName ? doctor.doctorName[0].toUpperCase() : "D"}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-white text-sm">
                              {doctor?.doctorName || "N/A"}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              Exp: {doctor?.experience || "N/A"}
                            </p>
                          </div>
                        </td>

                        {/* Specialization & Qualifications */}
                        <td className="px-6 py-4 text-xs text-gray-300">
                          <p className="font-semibold text-blue-400">{doctor?.specialization || "N/A"}</p>
                          <p className="text-gray-400 text-[11px]">{doctor?.qualifications || "N/A"}</p>
                        </td>

                        {/* Hospital & Fee */}
                        <td className="px-6 py-4 text-xs text-gray-300">
                          <p className="flex items-center gap-1">
                            <FaHospital className="text-gray-500 text-xs" />
                            {doctor?.hospitalName || "N/A"}
                          </p>
                          <p className="text-emerald-400 font-semibold text-[11px] mt-0.5">
                            ৳{doctor?.consultationFee || 0} Fee
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              isVerified
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {isVerified ? "Verified" : "Pending"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleToggleVerify(docId, doctor.verificationStatus)}
                              disabled={loadingId === docId}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors disabled:opacity-50 ${
                                isVerified
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                              }`}
                            >
                              {isVerified ? <FaTimesCircle /> : <FaCheckCircle />}
                              {isVerified ? "Unverify" : "Verify"}
                            </button>

                            <button
                              onClick={() => handleDelete(docId, doctor?.doctorName)}
                              disabled={loadingId === docId}
                              title="Delete Doctor"
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/30 disabled:opacity-50"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {doctors.map((doctor, idx) => {
              const docId = doctor._id || doctor.id;
              const isVerified = doctor.verificationStatus === "true";

              return (
                <div
                  key={docId || idx}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4 shadow-md"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {doctor?.profileImage ? (
                        <img
                          src={doctor.profileImage}
                          alt={doctor?.doctorName || "Doctor"}
                          className="w-10 h-10 rounded-full object-cover border border-blue-500/30 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                          {doctor?.doctorName ? doctor.doctorName[0].toUpperCase() : "D"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">
                          {doctor?.doctorName || "N/A"}
                        </h3>
                        <p className="text-xs text-blue-400 truncate">{doctor?.specialization}</p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0 ${
                        isVerified
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {isVerified ? "Verified" : "Pending"}
                    </span>
                  </div>

                  <div className="text-xs text-gray-400 space-y-1">
                    <p><span className="text-gray-500">Qualification:</span> {doctor?.qualifications}</p>
                    <p><span className="text-gray-500">Hospital:</span> {doctor?.hospitalName}</p>
                    <p><span className="text-gray-500">Fee:</span> <span className="text-emerald-400 font-semibold">৳{doctor?.consultationFee}</span></p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-zinc-800/50">
                    <button
                      onClick={() => handleToggleVerify(docId, doctor.verificationStatus)}
                      disabled={loadingId === docId}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-colors disabled:opacity-50 ${
                        isVerified
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                      }`}
                    >
                      {isVerified ? <FaTimesCircle /> : <FaCheckCircle />}
                      {isVerified ? "Unverify" : "Verify"}
                    </button>

                    <button
                      onClick={() => handleDelete(docId, doctor?.doctorName)}
                      disabled={loadingId === docId}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold border border-red-500/30 transition-colors disabled:opacity-50"
                    >
                      <FaTrash size={12} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="py-12 bg-zinc-900 border border-zinc-800 rounded-2xl text-center text-gray-400">
          <p className="text-sm font-medium">No doctors found.</p>
        </div>
      )}
    </div>
  );
}