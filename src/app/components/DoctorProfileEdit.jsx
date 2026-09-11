"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  FaTimesCircle,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { updateDoctorProfile } from "@/lib/edit-apis";

export default function DoctorProfileEdit({ doctor }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    doctorName: doctor?.doctorName || "",
    specialization: doctor?.specialization || "",
    qualifications: doctor?.qualifications || "",
    experience: doctor?.experience || "",
    consultationFee: doctor?.consultationFee || "",
    hospitalName: doctor?.hospitalName || "",
    profileImage: doctor?.profileImage || "",
    availableDays: doctor?.availableDays || "",
    availableSlots: doctor?.availableSlots || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateDoctorProfile(doctor.userId, formData);
      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const isVerified =
    doctor?.verificationStatus === "true" || doctor?.verificationStatus === true;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      <Toaster position="top-right" />

      {/* Profile Card Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-zinc-700 bg-zinc-800 flex-shrink-0">
            {doctor?.profileImage ? (
              <img
                src={doctor.profileImage}
                alt={doctor.doctorName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-gray-500">
                <FaUserMd />
              </div>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {doctor?.doctorName}
              </h1>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold w-fit mx-auto sm:mx-0 ${
                  isVerified
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {isVerified ? (
                  <>
                    <FaCheckCircle /> Verified Doctor
                  </>
                ) : (
                  <>
                    <FaTimesCircle /> Verification Pending
                  </>
                )}
              </span>
            </div>

            <p className="text-blue-400 text-sm font-semibold">
              {doctor?.specialization}
            </p>
            <p className="text-xs text-gray-400 flex items-center justify-center sm:justify-start gap-1">
              <FaHospital className="text-gray-500" /> {doctor?.hospitalName}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg self-center sm:self-start"
          >
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Professional Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <FaUserMd className="text-blue-400" /> Professional Details
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <FaGraduationCap className="text-gray-500" /> Qualifications
              </span>
              <span className="font-semibold text-gray-200">{doctor?.qualifications}</span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <FaBriefcase className="text-gray-500" /> Experience
              </span>
              <span className="font-semibold text-gray-200">{doctor?.experience}</span>
            </div>

            <div className="flex items-center justify-between pb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <FaMoneyBillWave className="text-gray-500" /> Consultation Fee
              </span>
              <span className="font-semibold text-emerald-400">৳{doctor?.consultationFee}</span>
            </div>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-400" /> Schedule & Availability
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" /> Available Days
              </span>
              <span className="font-semibold text-gray-200">{doctor?.availableDays}</span>
            </div>

            <div className="flex items-center justify-between pb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <FaClock className="text-gray-500" /> Available Slots
              </span>
              <span className="font-semibold text-gray-200">{doctor?.availableSlots}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaEdit className="text-blue-400" /> Edit Doctor Profile
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg transition-all"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Qualifications</label>
                  <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Consultation Fee (৳)</label>
                  <input
                    type="text"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Hospital Name</label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Available Days</label>
                  <input
                    type="text"
                    name="availableDays"
                    value={formData.availableDays}
                    onChange={handleChange}
                    placeholder="e.g. Sun, Mon, Tue"
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Available Slots</label>
                  <input
                    type="text"
                    name="availableSlots"
                    value={formData.availableSlots}
                    onChange={handleChange}
                    placeholder="e.g. 9:00 AM - 2:00 PM"
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Profile Image URL</label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}