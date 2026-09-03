"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getDoctorById } from "@/lib/get-apis";
import { postAppointment } from "@/lib/post-apis"; // ✅ Import postAppointment
import toast, { Toaster } from "react-hot-toast";
import {
  FaStethoscope,
  FaGraduationCap,
  FaBriefcase,
  FaHospital,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaArrowLeft,
  FaCreditCard,
  FaNotesMedical,
} from "react-icons/fa";

export default function DoctorsDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { data: session, isPending } = authClient.useSession();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Visibility & State
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
  });

  // Doctor Details Fetching
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching doctor details:", err);
        setError("Failed to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Appointment Section Toggle Handler with Role Check
  const handleApplyClick = () => {
    if (session?.user?.role !== "Patient") {
      toast.error("Only patients are allowed to apply for appointments");
      return;
    }
    setShowBookingForm((prev) => !prev);
  };

  // Date Validation Utility (Today or Future Date)
  const isFutureDate = (dateString) => {
    if (!dateString) return false;
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  // Form Submit / Pay Button Handler
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.appointmentDate || !formData.appointmentTime || !formData.symptoms) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isFutureDate(formData.appointmentDate)) {
      toast.error("Appointment date must be in the future.");
      return;
    }

    const appointmentPayload = {
      userId: session?.user?.id,
      doctorId: id,
      doctorName: doctor?.doctorName,
      date: formData.appointmentDate,
      time: formData.appointmentTime,
      symptoms: formData.symptoms,
      fee: doctor?.consultationFee,
      status: "pending",
    };

    try {
      setIsSubmitting(true);
      toast.loading("Processing appointment & initializing payment...");

      // 🔴 ১. সাকসেস পেজে যাওয়ার আগেই ডাটাবেজে অ্যাপয়েন্টমেন্ট সরাসরি সেভ করা
      await postAppointment(appointmentPayload);

      // 🔴 ২. এবার Stripe Checkout Session কল করা
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: id,
          doctorName: doctor?.doctorName,
          consultationFee: doctor?.consultationFee,
          appointmentData: formData,
          applicantId: session?.user?.id,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Stripe Checkout-এ রিডাইরেক্ট
      } else {
        toast.dismiss();
        toast.error(data.error || "Failed to initiate payment gateway.");
      }
    } catch (err) {
      toast.dismiss();
      console.error("Booking Error:", err);
      toast.error("Something went wrong while placing your appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-medium text-sm">Loading details...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="text-center py-12 px-6 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl max-w-md mx-auto my-16 text-white">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-blue-500/20">
          🔒
        </div>
        <h3 className="text-xl font-bold mb-2">Access Restricted</h3>
        <p className="text-gray-400 text-sm mb-6">
          You must be logged in to view complete doctor details and book an appointment.
        </p>
        <Link
          href="/signin"
          className="inline-block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-blue-500/20 text-sm"
        >
          Log In Now
        </Link>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="text-center py-12 bg-red-950/30 text-red-400 rounded-2xl max-w-md mx-auto my-12 p-6 border border-red-900/50">
        <p className="font-medium text-sm">{error || "Doctor details not found."}</p>
        <Link href="/doctors" className="mt-4 inline-block text-sm text-blue-400 hover:underline">
          ← Back to Doctors List
        </Link>
      </div>
    );
  }

  const {
    doctorName,
    specialization,
    qualifications,
    experience,
    consultationFee,
    hospitalName,
    profileImage,
    availableDays,
    availableSlots,
    verificationStatus,
  } = doctor;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Toaster position="top-right" />

      {/* Back Button */}
      <Link
        href="/doctors"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 font-medium transition-colors"
      >
        <FaArrowLeft /> Back to Doctors
      </Link>

      {/* Main Details Card */}
      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden text-white">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-zinc-800 flex-shrink-0">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt={doctorName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold">{doctorName}</h1>
                {verificationStatus === "verified" && (
                  <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                    <FaCheckCircle className="text-xs" /> Verified
                  </span>
                )}
              </div>

              <p className="text-blue-100 font-semibold text-base flex items-center justify-center sm:justify-start gap-2">
                <FaStethoscope /> {specialization}
              </p>

              <p className="text-xs text-blue-100/80 flex items-center justify-center sm:justify-start gap-2">
                <FaGraduationCap className="text-sm" /> {qualifications}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Grid Info */}
        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-800/60 border border-zinc-700/50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-lg border border-blue-500/30">
                <FaBriefcase />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Experience</p>
                <p className="text-sm font-bold text-white">{experience}</p>
              </div>
            </div>

            <div className="bg-zinc-800/60 border border-zinc-700/50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-lg border border-emerald-500/30">
                <FaMoneyBillWave />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Consultation Fee</p>
                <p className="text-sm font-bold text-white">{consultationFee}</p>
              </div>
            </div>

            <div className="bg-zinc-800/60 border border-zinc-700/50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-lg border border-indigo-500/30">
                <FaHospital />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-gray-400 font-medium">Hospital / Clinic</p>
                <p className="text-sm font-bold text-white truncate">{hospitalName}</p>
              </div>
            </div>
          </div>

          {/* Availability Schedule Section */}
          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-lg font-bold text-white mb-4">Availability Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/40 flex items-start gap-3">
                <FaCalendarAlt className="text-blue-500 text-lg mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase">Available Days</h4>
                  <p className="text-sm font-semibold text-gray-200 mt-1">
                    {Array.isArray(availableDays) ? availableDays.join(", ") : availableDays || "N/A"}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/40 flex items-start gap-3">
                <FaClock className="text-blue-500 text-lg mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase">Time Slots</h4>
                  <p className="text-sm font-semibold text-gray-200 mt-1">
                    {Array.isArray(availableSlots) ? availableSlots.join(", ") : availableSlots || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="border-t border-zinc-800 pt-6">
            <button
              onClick={handleApplyClick}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>{showBookingForm ? "Close Appointment Form" : "Apply for Appointment"}</span>
            </button>
          </div>

          {/* Responsive Appointment Form Section */}
          {showBookingForm && (
            <div className="border-t border-zinc-800 pt-8 mt-6 animate-fadeIn">
              <div className="bg-zinc-950/80 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <FaNotesMedical className="text-blue-500" /> Book Your Appointment
                  </h3>
                  <p className="text-xs text-amber-400 mt-1 font-medium">
                    Choose your date and time correctly or your appointment may get cancelled.
                  </p>
                </div>

                <form onSubmit={handlePayment} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Appointment Date */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                        Appointment Date *
                      </label>
                      <input
                        type="date"
                        name="appointmentDate"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Appointment Time Slot */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                        Preferred Time Slot *
                      </label>
                      {Array.isArray(availableSlots) && availableSlots.length > 0 ? (
                        <select
                          name="appointmentTime"
                          value={formData.appointmentTime}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="">Select a time slot</option>
                          {availableSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="appointmentTime"
                          placeholder="e.g. 10:00 AM - 11:00 AM"
                          value={formData.appointmentTime}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      )}
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Symptoms / Reason for Visit *
                    </label>
                    <textarea
                      name="symptoms"
                      rows="3"
                      placeholder="Describe your symptoms or health issues..."
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    <FaCreditCard /> {isSubmitting ? "Processing..." : `Pay (${consultationFee || "N/A"})`}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}