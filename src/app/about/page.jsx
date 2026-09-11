import React from 'react';
import { FaHeartbeat, FaUsers, FaAward, FaGlobeAsia } from 'react-icons/fa';

export const metadata = {
  title: 'About Us | MediCare',
  description: 'Learn more about MediCare and our mission to simplify healthcare.',
};

export default function AboutPage() {
  const stats = [
    { icon: <FaUsers className="text-blue-400 text-2xl" />, value: "10,000+", label: "Active Patients" },
    { icon: <FaAward className="text-emerald-400 text-2xl" />, value: "150+", label: "Expert Doctors" },
    { icon: <FaHeartbeat className="text-rose-400 text-2xl" />, value: "25,000+", label: "Appointments Done" },
    { icon: <FaGlobeAsia className="text-purple-400 text-2xl" />, value: "24/7", label: "Medical Support" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header Intro */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            About MediCare
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Empowering Health Through Technology
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            MediCare is an advanced digital healthcare platform built to connect patients with top-tier medical specialists seamlessly. Our mission is to make healthcare accessible, transparent, and efficient for everyone.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-2 shadow-xl">
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-4 shadow-xl">
            <h2 className="text-2xl font-bold text-blue-400">Our Mission</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              To eliminate the traditional bottlenecks of healthcare access. We provide a centralized ecosystem where patients can book appointments, consult via telemedicine, and manage prescriptions digitally with zero friction.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-4 shadow-xl">
            <h2 className="text-2xl font-bold text-emerald-400">Our Vision</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              To become the most trusted digital healthcare partner, leveraging modern web technologies and secure data frameworks to deliver uninterrupted medical assistance to communities worldwide.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}