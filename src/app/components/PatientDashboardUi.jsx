import React from 'react';
import { auth } from '../../lib/auth';
import { headers } from 'next/headers';
import { getAppointmentsByUserId, getDoctorsByDoctorsId } from '../../lib/get-apis';
import PatientAppointmentCard from './PatientAppointmentCard';
import DoctorCard from './DoctorCard';
import PatientSidebar from './PatentSideBar';
import { FaCalendarCheck, FaMoneyBillWave, FaUserMd } from 'react-icons/fa';

const PatientDashboardUi = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = session?.user?.id;
  const appointments = (await getAppointmentsByUserId(userId)) || [];

  // ১. Total Fee ক্যালকুলেশন
  let totalFee = 0;
  appointments.forEach((appointment) => {
    totalFee += parseInt(appointment.fee) || 0;
  });

  
  const doctorIds = [...new Set(appointments.map((app) => app.doctorId).filter(Boolean))];

  const favoriteDoctors = await Promise.all(
    doctorIds.map(async (docId) => {
      try {
        return await getDoctorsByDoctorsId(docId);
      } catch (err) {
        console.error(`Failed to fetch doctor ${docId}:`, err);
        return null;
      }
    })
  );

  // Null রেসপন্স বাদ দেওয়া
  const validDoctors = favoriteDoctors.filter(Boolean);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col lg:flex-row">
      {/* Dynamic Responsive Sidebar / Drawer */}
      <PatientSidebar user={session?.user} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
        
        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Appointments</p>
              <h3 className="text-2xl font-black text-white mt-1">{appointments.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-xl">
              <FaCalendarCheck />
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Spent</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">${totalFee}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-xl">
              <FaMoneyBillWave />
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Consulted Doctors</p>
              <h3 className="text-2xl font-black text-indigo-400 mt-1">{validDoctors.length}</h3>
            </div>
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center text-xl">
              <FaUserMd />
            </div>
          </div>
        </div>

        {/* Section 1: My Appointments */}
        <div className="space-y-4">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-wide">My Appointments</h2>
            <span className="text-xs text-gray-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              Total: {appointments.length}
            </span>
          </div>

          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((appointment, index) => (
                <PatientAppointmentCard
                  key={appointment._id || appointment.id || index}
                  appointment={appointment}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center text-gray-400 space-y-2">
              <p className="text-sm font-medium">No appointments found.</p>
            </div>
          )}
        </div>

        {/* Section 2: Visited / Favourite Doctors */}
        <div className="space-y-4 pt-4">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-xl font-bold text-white tracking-wide">My Visited Doctors</h2>
          </div>

          {validDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {validDoctors.map((doctor, index) => (
                <DoctorCard key={doctor._id || doctor.id || index} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center text-gray-400">
              <p className="text-sm font-medium">No doctor records available.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default PatientDashboardUi;