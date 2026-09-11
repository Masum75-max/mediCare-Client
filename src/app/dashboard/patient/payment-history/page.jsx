import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getAppointmentsByUserId, getDoctorsByDoctorsId } from '@/lib/get-apis';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaReceipt, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-sm w-full">
          <p className="text-gray-800 font-semibold mb-4">Please log in to view your payment history.</p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const appointments = (await getAppointmentsByUserId(userId)) || [];

  // Parallel fetch for doctor details using Promise.all
  const appointmentsWithDoctors = await Promise.all(
    appointments.map(async (appointment) => {
      let doctorData = null;
      if (appointment?.doctorId) {
        try {
          doctorData = await getDoctorsByDoctorsId(appointment.doctorId);
        } catch (error) {
          console.error(`Error fetching doctor ${appointment.doctorId}:`, error);
        }
      }
      return {
        ...appointment,
        doctor: doctorData,
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header with Back to Dashboard Button */}
        <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl transition-all border border-gray-300"
          >
            <FaArrowLeft className="text-gray-600" /> Back to Dashboard
          </Link>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaReceipt className="text-blue-600" /> My Payments
          </h1>
        </div>

        {/* Payment History List */}
        {appointmentsWithDoctors.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-600 text-base font-medium">No payment history found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appointmentsWithDoctors.map((item) => {
              const isCompleted = item.status?.toLowerCase() === 'completed';

              return (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    {/* Doctor Info Header */}
                    <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                        {item.doctor?.image ? (
                          <Image
                            src={item.doctor.image}
                            alt={item.doctor?.name || item.doctorName || 'Doctor'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 font-bold text-lg">
                            {(item.doctor?.name || item.doctorName || 'D').charAt(0)}
                          </div>
                        )}
                      </div>

                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                          {item.doctor?.name || item.doctorName || 'Doctor Name Not Found'}
                        </h2>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                          {item.doctor?.specialization || item.doctor?.category || 'Specialist'}
                        </p>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-600">
                          <FaCalendarAlt className="text-gray-400" /> Date
                        </span>
                        <span className="font-semibold text-gray-900">{item.date || 'N/A'}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-600">
                          <FaClock className="text-gray-400" /> Time Slot
                        </span>
                        <span className="font-semibold text-gray-900">{item.time || 'N/A'}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="font-medium text-gray-600">Payment Status</span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {isCompleted ? <FaCheckCircle /> : <FaHourglassHalf />}
                          {isCompleted ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fee Footer */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount Paid
                    </span>
                    <span className="text-lg font-extrabold text-emerald-600">
                      ৳{item.fee}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;