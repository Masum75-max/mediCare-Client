import React from "react";
import Link from "next/link";
import { getFeaturedDoctors } from "@/lib/get-apis";
import DoctorCard from "@/app/components/DoctorCard"; 
import { FaArrowRight } from "react-icons/fa";

export default async function FeaturedDoctors() {
 
  const doctors = await getFeaturedDoctors(4);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Top Rated
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            Featured Doctors
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Book appointment with our highly experienced medical specialists.
          </p>
        </div>

        {/* View All Link */}
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          See All Doctors
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Layout: Displays First 4 Doctors */}
      {doctors?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm font-medium">No doctors available right now.</p>
        </div>
      )}
    </section>
  );
}