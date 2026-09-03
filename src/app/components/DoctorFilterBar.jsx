"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// 🏥 বিস্তৃত সব Specializations List
export const SPECIALIZATIONS = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Gynecologist",
  "General Physician",
  "ENT Specialist",
  "Psychiatrist",
  "Ophthalmologist",
  "Urologist",
  "Nephrologist",
  "Gastroenterologist",
  "Dentist",
];

export default function DoctorFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [specialization, setSpecialization] = useState(
    searchParams.get("specialization") || "All"
  );

  // Search/Filter পরিবর্তন হলে URL আপডেট করা
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (specialization && specialization !== "All") {
        params.set("specialization", specialization);
      }

      router.push(`?${params.toString()}`);
    }, 400); // Debounce Delay

    return () => clearTimeout(timer);
  }, [search, specialization, router]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center max-w-4xl mx-auto">
      {/* 🔍 Search Input */}
      <div className="w-full sm:w-2/3">
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm"
        />
      </div>

      {/* 🩺 Specialization Dropdown */}
      <div className="w-full sm:w-1/3">
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm bg-white cursor-pointer"
        >
          {SPECIALIZATIONS.map((cat, index) => (
            <option key={index} value={cat}>
              {cat === "All" ? "All Specializations" : cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}