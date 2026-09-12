"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaNotesMedical,
  FaMoneyBillWave,
  FaStar,
  FaEdit,
  FaTimes,
  FaCheckCircle,
  FaHourglassHalf,
  FaArrowLeft,
} from "react-icons/fa";
import { createReview } from "@/lib/post-apis";
import { rescheduleAppointment } from "@/lib/edit-apis";

export default function UserAppointmentsUI({ appointments, userId }) {
  const router = useRouter();
  
  // Modals state
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalType, setModalType] = useState(null); // 'review' | 'reschedule'
  const [loading, setLoading] = useState(false);

  // Review Form
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Reschedule Form
  const [rescheduleData, setRescheduleData] = useState({ date: "", time: "" });

  const openReviewModal = (app) => {
    setSelectedApp(app);
    setRating(5);
    setReviewText("");
    setModalType("review");
  };

  const openRescheduleModal = (app) => {
    setSelectedApp(app);
    setRescheduleData({ date: app.date || "", time: app.time || "" });
    setModalType("reschedule");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createReview({
        appointmentId: selectedApp._id,
        doctorId: selectedApp.doctorId,
        userId: userId,
        rating,
        reviewText,
      });
      toast.success("Review submitted successfully!");
      setModalType(null);
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await rescheduleAppointment(selectedApp._id, rescheduleData);
      toast.success("Appointment rescheduled successfully!");
      setModalType(null);
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Failed to reschedule appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <Toaster position="top-right" />

      {/* Header section with Back Button */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs sm:text-sm bg-zinc-800 hover:bg-zinc-700 text-gray-200 px-3 py-2 rounded-xl border border-zinc-700 transition-all"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-black">My Appointments</h1>
        </div>
      </div>

      {!appointments || appointments.length === 0 ? (
        <div className="p-8 text-center text-gray-300 bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl mx-auto my-8">
          No appointments found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((app) => {
            const isCompleted = app.status?.toLowerCase() === "completed";

            return (
              <div
                key={app._id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-400 flex items-center gap-2">
                      <FaUserMd /> {app.doctorName || "Doctor"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {isCompleted ? <FaCheckCircle /> : <FaHourglassHalf />}
                      {app.status || "Pending"}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-gray-200">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" /> Date: <span className="font-semibold text-white">{app.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaClock className="text-gray-400" /> Time: <span className="font-semibold text-white">{app.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaNotesMedical className="text-gray-400" /> Symptoms: <span className="font-semibold text-white">{app.symptoms || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-gray-400" /> Fee: <span className="font-bold text-emerald-400">৳{app.fee}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  {isCompleted ? (
                    <button
                      onClick={() => openReviewModal(app)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <FaStar className="text-amber-300" /> Leave a Review
                    </button>
                  ) : (
                    <button
                      onClick={() => openRescheduleModal(app)}
                      className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-all border border-zinc-700 flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Reschedule / Update Schedule
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leave Review Modal */}
      {modalType === "review" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-white flex items-center gap-2">
                <FaStar className="text-amber-400" /> Leave a Review
              </h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-300 mb-2">Rating</label>
                <div className="flex gap-2 text-xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={star <= rating ? "text-amber-400" : "text-zinc-600"}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Your Feedback</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                  placeholder="Share your experience with the doctor..."
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 bg-zinc-800 text-gray-200 rounded-xl hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {modalType === "reschedule" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-white flex items-center gap-2">
                <FaEdit className="text-blue-400" /> Reschedule Appointment
              </h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-300 mb-1">New Date</label>
                <input
                  type="date"
                  value={rescheduleData.date}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">New Time Slot</label>
                <input
                  type="text"
                  placeholder="e.g. 10:00AM - 11:00AM"
                  value={rescheduleData.time}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 bg-zinc-800 text-gray-200 rounded-xl hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Save Reschedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}