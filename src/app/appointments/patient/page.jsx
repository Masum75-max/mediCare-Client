"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaSpinner, FaCalendarTimes } from "react-icons/fa";
import PatientAppointmentCard from "../../components/PatientAppointmentCard";
import { getAppointmentsByUserId } from "@/lib/get-apis";

export default function AppointmentSuccessPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getAppointmentsByUserId(userId);

        if (Array.isArray(data)) {
          setAppointments(data);
        } else if (data && typeof data === "object") {
          setAppointments([data]);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl space-y-6">
        
        {/* Header */}
        <div>
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            <FaCheckCircle />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Thanks For using Medicare</h1>
          <p className="text-gray-400 text-xs mt-1">
            Here are your appointments
          </p>
        </div>

        {/* Appointments Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 text-left border-b border-zinc-800 pb-2 flex items-center justify-between">
            <span>Your Appointments</span>
            <span className="text-xs font-normal text-gray-500">
              Total: {appointments.length}
            </span>
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
              <FaSpinner className="animate-spin text-2xl text-blue-500" />
              <p className="text-xs">Fetching Your Appointments...</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {appointments.map((item, index) => (
                <PatientAppointmentCard
                  key={item._id || item.id || index}
                  appointment={item}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 bg-zinc-950/50 rounded-2xl border border-zinc-800/80 flex flex-col items-center justify-center text-center p-4 space-y-2">
              <FaCalendarTimes className="text-3xl text-zinc-600" />
              <p className="text-sm font-semibold text-gray-400">No Appointments Found</p>
              <p className="text-xs text-zinc-500 max-w-xs">
                We couldnt retrieve any appointment records for your account at this moment.
              </p>
            </div>
          )}
        </div>

        {/* Button */}
        <Link
          href="/doctors"
          className="inline-block w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm"
        >
          Back to Doctors
        </Link>
      </div>
    </div>
  );
}