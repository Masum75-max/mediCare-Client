import React from 'react';
import { auth } from '../../lib/auth';
import { headers } from 'next/headers';
import { getAppointmentsByUserId } from '../../lib/get-apis';
import DoctorSidebar from './DoctorSidebar';
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaStar,
  FaUserCheck,
  FaClock,
  FaCalendarTimes,
} from 'react-icons/fa';

const DoctorsDashboardUi = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  const appointments = (await getAppointmentsByUserId(userId)) || [];

  // ১. আজকের তারিখ বের করা (YYYY-MM-DD ফরম্যাট)
  const todayStr = new Date().toISOString().split("T")[0];

  // ২. আজকের অ্যাপয়েন্টমেন্ট ফিল্টার করা
  const todaysAppointments = appointments.filter((item) => {
    if (!item?.date) return false;
    const appDate = new Date(item.date).toISOString().split("T")[0];
    return appDate === todayStr;
  });

  // ৩. ডামি রিভিউ ডাটা
  const dummyReviews = [
    {
      id: "rev-1",
      userName: "Rahim Ahmed",
      rating: 5,
      comment: "Very attentive doctor. Listened to my problem carefully and prescribed effective medication.",
      date: "2026-03-01",
    },
    {
      id: "rev-2",
      userName: "Nusrat Jahan",
      rating: 4,
      comment: "Great experience overall. The doctor was polite and explained the prescription thoroughly.",
      date: "2026-02-28",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col lg:flex-row">
      {/* Responsive Sidebar Drawer */}
      <DoctorSidebar user={session?.user} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Appointments</p>
              <h3 className="text-2xl font-black text-white mt-1">{appointments.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-xl">
              <FaCalendarCheck />
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Todays Appointments</p>
              <h3 className="text-2xl font-black text-amber-400 mt-1">{todaysAppointments.length}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center text-xl">
              <FaCalendarDay />
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Average Rating</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">4.5 / 5.0</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-xl">
              <FaStar />
            </div>
          </div>
        </div>

        {/* Section 1: Today's Appointments */}
        <div className="space-y-4">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-wide">Todays Appointments</h2>
            <span className="text-xs text-gray-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              Today: {todaysAppointments.length}
            </span>
          </div>

          {todaysAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaysAppointments.map((item, index) => (
                <div
                  key={item._id || item.id || index}
                  className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-3 shadow-md hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <FaUserCheck className="text-blue-400" />
                      <p className="font-bold text-sm text-white">{item.patientName || item.userName || "Patient"}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium capitalize">
                      {item.status || "confirmed"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <p className="flex items-center gap-1.5">
                      <FaClock className="text-blue-500" /> {item.time || "N/A"}
                    </p>
                    <p className="text-right font-medium text-emerald-400">${item.fee || 0}</p>
                  </div>

                  {item.symptoms && (
                    <p className="text-xs text-gray-300 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60 line-clamp-2">
                      <span className="font-semibold text-gray-400">Symptoms:</span> {item.symptoms}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center flex flex-col items-center justify-center space-y-2">
              <FaCalendarTimes className="text-3xl text-zinc-600" />
              <p className="text-sm font-semibold text-gray-400">No appointments today</p>
              <p className="text-xs text-zinc-500">You dont have any patient bookings scheduled for today.</p>
            </div>
          )}
        </div>

        {/* Section 2: Reviews Received */}
        <div className="space-y-4 pt-4">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-wide">Reviews Received</h2>
            <span className="text-xs text-gray-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              Recent Feedback
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-white">{rev.userName}</p>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <FaStar />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 italic bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/50">
                  `{rev.comment}`
                </p>

                <p className="text-[11px] text-gray-500 text-right">{rev.date}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default DoctorsDashboardUi;