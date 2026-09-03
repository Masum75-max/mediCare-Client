"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStethoscope, FaHospital, FaStar, FaArrowRight } from "react-icons/fa";

export default function DoctorCard({ doctor }) {
 

  return (
    <div className="relative group w-full max-w-sm rounded-3xl p-[2px] overflow-hidden transition-all duration-300 hover:scale-[1.02]">
      {/* 🌟 Rotating Gradient Border Animation */}
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)] animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity rounded-3xl" />

      {/* Main Card Body */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-[22px] p-5 h-full flex flex-col justify-between shadow-lg">
        <div>
          {/* Header Badge & Image Container */}
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100">
            <Image
              src={doctor.profileImage}
              alt={doctor.doctorName}
              width={400}
              height={400}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Experience Floating Badge */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
              <FaStar className="text-amber-400 text-xs" /> {doctor.experience} Exp.
            </div>
            {/* Fee Badge */}
            <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md">
              {doctor.consultationFee} Taka
            </div>
          </div>

          {/* Doctor Core Info */}
          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
              {doctor.doctorName}
            </h3>

            <p className="text-sm font-semibold text-blue-600 flex items-center gap-1.5">
              <FaStethoscope className="text-xs" /> {doctor.specialization}
            </p>

            <p className="text-xs text-gray-500 flex items-center gap-1.5 pt-1 line-clamp-1">
              <FaHospital className="text-blue-500 text-xs flex-shrink-0" />
              {doctor.hospitalName}
            </p>
          </div>
        </div>

        {/* Action Link Button */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <Link
            href={`/doctors/${doctor._id}`}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all duration-200"
          >
            <span>View Details</span>
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}