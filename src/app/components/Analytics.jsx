"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { FaUserMd, FaUsers, FaCalendarCheck, FaStar } from "react-icons/fa";

export default function Analytics({ stats }) {
  const { totalDoctors, totalReviews, totalUsers, totalAppointments } = stats;

  // Chart Data Preparation
  const overviewData = [
    { name: "Users", count: totalUsers, fill: "#3B82F6" },
    { name: "Doctors", count: totalDoctors, fill: "#8B5CF6" },
    { name: "Appointments", count: totalAppointments, fill: "#10B981" },
    { name: "Reviews", count: totalReviews, fill: "#F59E0B" },
  ];

  const pieData = [
    { name: "Users", value: totalUsers },
    { name: "Doctors", value: totalDoctors },
    { name: "Appointments", value: totalAppointments },
    { name: "Reviews", value: totalReviews },
  ];

  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
          Admin Dashboard Overview
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Real-time statistics and analytics for your platform.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Users Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Users</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{totalUsers}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
            <FaUsers />
          </div>
        </div>

        {/* Doctors Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Doctors</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{totalDoctors}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-xl">
            <FaUserMd />
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Appointments</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{totalAppointments}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
            <FaCalendarCheck />
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Reviews</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{totalReviews}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl">
            <FaStar />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-5 sm:p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white">System Data Distribution</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 sm:p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-white">Platform Ratio</h2>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart Custom Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 text-xs text-gray-300">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="truncate">{item.name}:</span>
                <span className="font-bold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}