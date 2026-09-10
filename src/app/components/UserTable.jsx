"use client";

import React, { useState } from "react";
import Link from "next/link";
import { deleteUserById } from "@/lib/delete-apis";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash, FaEye, FaUserCheck, FaUserShield, FaArrowLeft } from "react-icons/fa";

export default function UserTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name || "this user"}?`
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteUserById(id);
      
      setUsers((prevUsers) => prevUsers.filter((user) => (user._id || user.id) !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Toaster position="top-right" />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manage Users
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            View all registered users and manage their authorization.
          </p>
        </div>

        {/* Buttons & Stats */}
        <div className="flex items-center gap-3">
          {/* Back to Dashboard Button */}
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl border border-zinc-700/60 transition-all duration-200 shadow-sm active:scale-95"
          >
            <FaArrowLeft className="text-xs" />
            Back to Dashboard
          </Link>

          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-xl">
            Total: {users.length}
          </span>
        </div>
      </div>

      {/* Content Section */}
      {users.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-zinc-950/80 text-xs uppercase text-gray-400 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {users.map((user, idx) => {
                    const userId = user._id || user.id;
                    return (
                      <tr key={userId || idx} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                            {user?.name ? user.name[0].toUpperCase() : "U"}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-sm truncate">{user?.name || "N/A"}</p>
                            <p className="text-[11px] text-gray-500 truncate">{user?.userName ? `@${user.userName}` : ""}</p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user?.role === "Admin"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : user?.role === "Doctor"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {user?.role === "Admin" ? <FaUserShield /> : <FaUserCheck />}
                            {user?.role || "Patient"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-gray-400 text-xs">{user?.email || "N/A"}</td>

                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              title="View Details"
                              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-lg transition-colors border border-zinc-700/50"
                            >
                              <FaEye size={14} />
                            </button>

                            <button
                              onClick={() => handleDelete(userId, user?.name)}
                              disabled={deletingId === userId}
                              title="Delete User"
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

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {users.map((user, idx) => {
              const userId = user._id || user.id;
              return (
                <div
                  key={userId || idx}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4 shadow-md"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                        {user?.name ? user.name[0].toUpperCase() : "U"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{user?.name || "N/A"}</h3>
                        <p className="text-xs text-gray-500 truncate">{user?.email || "N/A"}</p>
                      </div>
                    </div>
                    
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0 ${
                      user?.role === "Admin"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : user?.role === "Doctor"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {user?.role === "Admin" ? <FaUserShield /> : <FaUserCheck />}
                      {user?.role || "Patient"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      title="View Details"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-lg text-xs font-medium border border-zinc-700/50 transition-colors"
                    >
                      <FaEye size={12} /> View
                    </button>

                    <button
                      onClick={() => handleDelete(userId, user?.name)}
                      disabled={deletingId === userId}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium border border-red-500/30 transition-colors disabled:opacity-50"
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
          <p className="text-sm font-medium">No users found.</p>
        </div>
      )}
    </div>
  );
}