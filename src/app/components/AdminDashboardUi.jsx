import React from 'react';
import { auth } from '../../lib/auth';
import { headers } from 'next/headers';
import {
  getAllAppointments,
  getAllDoctors,
  getAllReviews,
  getAllUsers,
} from '@/lib/get-apis';
import AdminSidebar from './AdminSidebar';
import {
  FaUsers,
 
  FaStar,
  FaCalendarCheck,
  FaHandFist,
} from 'react-icons/fa6';

const AdminDashboardUi = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userName = session?.user?.name || session?.user?.userName || "Admin";

  // Data Fetching
  const users = (await getAllUsers()) || [];
  const doctors = (await getAllDoctors()) || [];
  const reviews = (await getAllReviews()) || [];
  const appointments = (await getAllAppointments()) || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col lg:flex-row">
      {/* Dynamic Responsive Sidebar / Drawer */}
      <AdminSidebar user={session?.user} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
        
        {/* Welcome Greeting Banner */}
        <div className="bg-gradient-to-r from-blue-900/40 via-zinc-900 to-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 text-blue-400 text-sm font-semibold mb-2">
            <FaHandFist className="text-amber-400 text-lg animate-bounce" /> Welcome Back!
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hello, <span className="text-blue-500">{userName}</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-2xl">
            Here is a quick overview of system activities today. You currently have{" "}
            <span className="text-white font-semibold">{users.length} users</span>,{" "}
            <span className="text-white font-semibold">{doctors.length} doctors</span>,{" "}
            <span className="text-white font-semibold">{appointments.length} appointments</span>, and{" "}
            <span className="text-white font-semibold">{reviews.length} reviews</span> to manage.
          </p>
        </div>

        {/* Dashboard Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Total Users */}
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-zinc-700 transition-all">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Users</p>
              <h3 className="text-2xl font-black text-white mt-1">{users.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-xl">
              <FaUsers />
            </div>
          </div>

          {/* Total Doctors */}
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-zinc-700 transition-all">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Doctors</p>
              <h3 className="text-2xl font-black text-indigo-400 mt-1">{doctors.length}</h3>
            </div>
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center text-xl">
              <FaUsers />
            </div>
          </div>

          {/* Total Appointments */}
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-zinc-700 transition-all">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Appointments</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{appointments.length}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-xl">
              <FaCalendarCheck />
            </div>
          </div>

          {/* Total Reviews */}
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg hover:border-zinc-700 transition-all">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Reviews</p>
              <h3 className="text-2xl font-black text-amber-400 mt-1">{reviews.length}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center text-xl">
              <FaStar />
            </div>
          </div>

        </div>

        {/* Quick System Activity Overview */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
            Quick Actions
          </h3>
          <p className="text-xs text-gray-400">
            Use the sidebar navigation drawer to inspect details, verify doctor profiles, process refund requests, or adjust role-based authorizations.
          </p>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboardUi;