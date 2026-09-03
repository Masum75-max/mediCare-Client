import React from "react";
import Link from "next/link";
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaUserMd,
  FaEye,
  FaLungs,
  FaTooth,
  FaArrowRight,
} from "react-icons/fa";

export default function MedicalSpecializations() {
  // Static Specializations Data List
  const specializations = [
    {
      id: 1,
      title: "Cardiology",
      description: "Heart care, blood pressure & cardiovascular treatments.",
      icon: FaHeartbeat,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50 text-red-600 border-red-100",
      slug: "cardiology",
    },
    {
      id: 2,
      title: "Neurology",
      description: "Brain, spinal cord & nervous system specialists.",
      icon: FaBrain,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 text-purple-600 border-purple-100",
      slug: "neurology",
    },
    {
      id: 3,
      title: "Orthopedics",
      description: "Bones, joints, ligament injuries & spine care.",
      icon: FaBone,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
      slug: "orthopedics",
    },
    {
      id: 4,
      title: "Pediatrics",
      description: "Healthcare & treatment for infants, kids & teens.",
      icon: FaBaby,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      slug: "pediatrics",
    },
    {
      id: 5,
      title: "Dermatology",
      description: "Skin, hair, nails & cosmetic dermatological care.",
      icon: FaUserMd,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 text-pink-600 border-pink-100",
      slug: "dermatology",
    },
    {
      id: 6,
      title: "Ophthalmology",
      description: "Eye vision tests, surgeries & eye disease management.",
      icon: FaEye,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
      slug: "ophthalmology",
    },
    {
      id: 7,
      title: "Pulmonology",
      description: "Lungs, breathing issues & respiratory healthcare.",
      icon: FaLungs,
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-50 text-sky-600 border-sky-100",
      slug: "pulmonology",
    },
    {
      id: 8,
      title: "Dentistry",
      description: "Complete dental hygiene, teeth care & oral surgery.",
      icon: FaTooth,
      color: "from-teal-500 to-emerald-600",
      bgColor: "bg-teal-50 text-teal-600 border-teal-100",
      slug: "dentistry",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block">
          Departments
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Medical Specializations
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Find expert doctors and specialists across various medical categories.
        </p>
      </div>

      {/* Grid Layout: Responsive for all screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {specializations.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={`/doctors?category=${item.slug}`}
              className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div>
                {/* Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bgColor} border flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner`}
                >
                  <Icon />
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Find Specialists</span>
                <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}