import React from 'react';
import Link from 'next/link';
import { 
  FaUserMd, 
  FaCalendarCheck, 
  FaFilePrescription, 
  FaVideo, 
  FaStethoscope, 
  FaShieldAlt,
  FaArrowRight 
} from 'react-icons/fa';

export const metadata = {
  title: 'Our Services | MediCare',
  description: 'Explore the healthcare services provided by MediCare.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: <FaUserMd className="text-3xl text-blue-400" />,
      title: "Expert Specialist Doctors",
      description: "Connect with top-rated specialists across various fields including cardiology, neurology, dermatology, and more.",
    },
    {
      icon: <FaCalendarCheck className="text-3xl text-emerald-400" />,
      title: "Easy Appointment Booking",
      description: "Book physical or online video consultation appointments with your preferred doctor in just a few clicks.",
    },
    {
      icon: <FaFilePrescription className="text-3xl text-purple-400" />,
      title: "Digital Prescriptions",
      description: "Access your prescriptions digitally anytime, anywhere securely stored right after your consultation.",
    },
    {
      icon: <FaVideo className="text-3xl text-sky-400" />,
      title: "Telehealth Consultations",
      description: "Consult with doctors remotely from the comfort of your home through secure video and chat sessions.",
    },
    {
      icon: <FaStethoscope className="text-3xl text-amber-400" />,
      title: "Comprehensive Health Checkups",
      description: "Schedule routine health screenings and diagnostic packages tailored to your personal health needs.",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-rose-400" />,
      title: "Secure & Confidential",
      description: "Your medical history, personal data, and prescriptions are protected with industry-standard security.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold rounded-full">
            Our Healthcare Services
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Providing Quality Healthcare for Everyone
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            We bridge the gap between patients and medical professionals, offering seamless healthcare solutions tailored to your modern lifestyle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl hover:border-zinc-700 transition-all group"
            >
              <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h2 className="text-xl font-bold text-zinc-100">{service.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Box */}
        <div className="bg-gradient-to-r from-blue-900/40 via-zinc-900 to-zinc-900 border border-blue-500/20 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to take care of your health?</h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Book an appointment with one of our certified specialists today and experience world-class medical support.
          </p>
          <Link 
            href="/doctors" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            Find a Doctor <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}