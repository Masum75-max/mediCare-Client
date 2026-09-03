"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaCalendarCheck,
  FaClock,
  FaShieldAlt,
  FaArrowRight,
  FaPhoneAlt,
  FaHeartbeat,
  FaPrescriptionBottleAlt,
  FaStethoscope,
} from "react-icons/fa";

export default function HealthcareBanner() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-hidden my-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Outer Banner Container */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white shadow-2xl overflow-hidden p-6 sm:p-10 lg:p-14">
        
        {/* Glowing Background Blur Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 bg-blue-400 rounded-full filter blur-3xl opacity-30 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-20 pointer-events-none"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Content & CTA Button */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Top Badge */}
            <motion.div variants={itemVariants} className="inline-block">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full shadow-inner">
                <FaShieldAlt className="text-emerald-400" /> Trusted Healthcare Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white"
            >
              Your Health Is Our <span className="text-emerald-400">Top Priority</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-blue-100/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Connect with top-rated specialist doctors near you. Get instant appointments, expert medical guidance, and personalized care—all in one place.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-3 text-xs sm:text-sm font-medium text-blue-100 pt-1"
            >
              <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg">
                <FaUserMd className="text-emerald-400" /> Verified Doctors
              </span>
              <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg">
                <FaClock className="text-emerald-400" /> Quick Booking
              </span>
            </motion.div>

            {/* 🔥 CTA Button Section */}
            <motion.div variants={itemVariants} className="pt-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/doctors">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 group"
                >
                  <FaCalendarCheck className="text-lg" />
                  <span>Book Appointment Now</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Medical Care Hub Visual (No Stats) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              
              {/* Header inside the Glass Card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <FaHeartbeat className="text-emerald-400 text-xl animate-pulse" />
                  <span className="font-bold text-sm tracking-wide">Live Health Desk</span>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                  Active
                </span>
              </div>

              {/* Service Item 1: Specialist Consultation */}
              <div className="flex items-center gap-3.5 bg-white/5 p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-lg flex-shrink-0 border border-blue-400/30">
                  <FaStethoscope />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Specialist Consultation</h4>
                  <p className="text-xs text-blue-100/80">Get expert advice for all healthcare needs</p>
                </div>
              </div>

              {/* Service Item 2: E-Prescriptions */}
              <div className="flex items-center gap-3.5 bg-white/5 p-3.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-lg flex-shrink-0 border border-purple-400/30">
                  <FaPrescriptionBottleAlt />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Digital Prescriptions</h4>
                  <p className="text-xs text-blue-100/80">Instant digital records & prescriptions</p>
                </div>
              </div>

              {/* Emergency Hotline Alert Badge */}
              <div className="mt-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 p-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-red-100 font-medium">
                  <FaPhoneAlt className="text-red-400 text-sm animate-bounce" />
                  <span>24/7 Medical Support</span>
                </div>
                <span className="text-xs font-bold bg-red-500/40 text-red-100 px-2.5 py-1 rounded-lg border border-red-400/30">
                  Call 16247
                </span>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}