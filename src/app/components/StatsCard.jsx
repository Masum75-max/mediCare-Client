import React from 'react';
import { getAllDoctors, getAllUsers, getAllAppointments, getAllReviews } from '@/lib/get-apis';
import { FaUserMd, FaUsers, FaCalendarCheck, FaStar } from 'react-icons/fa';

const StatsCard = async () => {
  // Parallel fetching for faster performance
  const [doctors, users, appointments, reviews] = await Promise.all([
    getAllDoctors().catch(() => []),
    getAllUsers().catch(() => []),
    getAllAppointments().catch(() => []),
    getAllReviews().catch(() => []),
  ]);

  const totalDoctors = doctors?.length || 0;
  // Users array length minus doctors count
  const totalUsers = Math.max(0, (users?.length || 0) - totalDoctors);
  const totalAppointments = appointments?.length || 0;
  const totalReviews = reviews?.length || 0;

  // Stats Data Array for Clean Mapping
  const stats = [
    {
      id: 1,
      title: 'Expert Doctors',
      count: totalDoctors,
      icon: FaUserMd,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      id: 2,
      title: 'Registered Patients',
      count: totalUsers,
      icon: FaUsers,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      id: 3,
      title: 'Appointments Done',
      count: totalAppointments,
      icon: FaCalendarCheck,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-500/10',
      textColor: 'text-violet-600',
      borderColor: 'border-violet-100',
    },
    {
      id: 4,
      title: 'Positive Reviews',
      count: totalReviews,
      icon: FaStar,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-500',
      borderColor: 'border-amber-100',
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* 🔹 Big Bold Header Section Added */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block">
          Platform Overview
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Our Impact in <span className="text-blue-600">Numbers</span>
        </h2>
        <p className="text-gray-500 text-sm sm:text-base font-normal">
          Real-time statistics highlighting our growing healthcare community and patient trust.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`relative bg-white rounded-3xl p-6 border ${stat.borderColor} shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group`}
            >
              {/* Background Decorative Gradient Light */}
              <div
                className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:scale-150 transition-transform duration-500`}
              />

              <div className="flex items-center justify-between mb-4">
                {/* Icon Wrapper */}
                <div
                  className={`w-14 h-14 rounded-2xl ${stat.bgColor} ${stat.textColor} flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon />
                </div>

                {/* Live Activity Pulse Indicator */}
                <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>

              {/* Number Count Display */}
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {stat.count.toLocaleString()}
                  <span className="text-blue-600">+</span>
                </h3>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsCard;