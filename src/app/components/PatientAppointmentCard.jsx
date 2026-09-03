"use client";

import React from "react";
import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaNotesMedical,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function PatientAppointmentCard({ appointment }) {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "cancelled":
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "pending":
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 transition-all rounded-2xl p-5 text-left space-y-3 shadow-md">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
          <FaUserMd className="text-base" />
          <span>Doctor : {appointment.doctorName}</span>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium border capitalize ${getStatusBadge(
            appointment.status
          )}`}
        >
          {appointment.status || "Pending"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 pt-1">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-blue-500 flex-shrink-0" />
          <span>{appointment.time}</span>
        </div>
      </div>

      <div className="text-xs text-gray-300 flex items-start gap-2 pt-1">
        <FaNotesMedical className="text-blue-500 text-sm mt-0.5 flex-shrink-0" />
        <p className="line-clamp-2">
          <span className="text-gray-400 font-medium">Symptoms:</span>{" "}
          {appointment.symptoms}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50 text-xs">
        <span className="text-gray-400">Consultation Fee</span>
        <span className="font-bold text-emerald-400 flex items-center gap-1">
          <FaMoneyBillWave /> {appointment.fee}
        </span>
      </div>
    </div>
  );
}