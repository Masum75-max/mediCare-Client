"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaStar, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { updateReview } from "@/lib/edit-apis";
import { deleteReview } from "@/lib/delete-apis";

export default function UserReviewsUI({ initialReviews }) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews || []);
  const [loading, setLoading] = useState(false);
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const openEditModal = (review) => {
    setSelectedReview(review);
    setRating(review.rating || 5);
    setReviewText(review.reviewText || "");
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateReview(selectedReview._id, { rating, reviewText });
      
      // Update local state for immediate UI feedback
      setReviews((prev) =>
        prev.map((r) => (r._id === selectedReview._id ? { ...r, rating, reviewText } : r))
      );
      
      toast.success("Review updated successfully!");
      setIsEditModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      await deleteReview(reviewId);
      // Remove from UI immediately
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success("Review deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm max-w-2xl mx-auto my-8">
        <p className="text-gray-600 text-base font-medium">You haven't posted any reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Toaster position="top-right" />
      
      {reviews.map((review) => (
        <div key={review._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900 text-lg">
                {review.doctorName || "Doctor"}
              </h3>
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? "text-amber-500" : "text-gray-300"} />
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              "{review.reviewText}"
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => openEditModal(review)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => handleDelete(review._id)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaEdit className="text-blue-600" /> Edit Review
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                <div className="flex gap-2 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={star <= rating ? "text-amber-400" : "text-gray-300"}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded-xl disabled:opacity-50"
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