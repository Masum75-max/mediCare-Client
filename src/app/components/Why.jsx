import React from "react";
import {
  FaUserNurse,
  FaClock,
  FaShieldAlt,
  FaCalendarCheck,
  FaFilePrescription,
  FaHandHoldingHeart,
} from "react-icons/fa";

export default function Why() {
  const features = [
    {
      id: 1,
      title: "Verified Specialist Doctors",
      description:
        "Every doctor on MediCare is thoroughly verified for credentials, certifications, and experience.",
      icon: FaUserNurse,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      id: 2,
      title: "Instant Appointment Booking",
      description:
        "Book appointments in seconds without waiting in long queues or complex procedures.",
      icon: FaCalendarCheck,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      id: 3,
      title: "24/7 Healthcare Availability",
      description:
        "Get access to medical consultation and support whenever you need, day or night.",
      icon: FaClock,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      id: 4,
      title: "100% Secure & Confidential",
      description:
        "Your medical history and personal information are encrypted and protected with industry standards.",
      icon: FaShieldAlt,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      id: 5,
      title: "Digital Health Records",
      description:
        "Access your e-prescriptions, consultation history, and doctor notes anytime, anywhere.",
      icon: FaFilePrescription,
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      id: 6,
      title: "Patient-Centric Care",
      description:
        "We prioritize your comfort, clear communication, and personalized medical solutions.",
      icon: FaHandHoldingHeart,
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block">
          Why Choose Us
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Why Choose <span className="text-blue-600">MediCare</span>?
        </h2>
        <p className="text-gray-500 text-sm sm:text-base font-normal">
          We combine medical expertise with modern technology to deliver a seamless healthcare experience for you and your family.
        </p>
      </div>

      {/* Grid Layout: 3 Columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Bar on Hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div>
                {/* Icon Wrapper */}
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.bgColor} border flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}
                >
                  <Icon />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}