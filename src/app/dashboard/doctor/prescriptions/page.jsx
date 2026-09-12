import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getDoctorByUserId, getAppointmentsByDoctorId } from '@/lib/get-apis';
import TodaysAppointmentsUI from '../../../components/TodaysAppointmensUi';

export const dynamic = "force-dynamic";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="p-8 text-center text-gray-400">
        Please log in to view todays appointments.
      </div>
    );
  }

  const doctor = await getDoctorByUserId(userId);

  if (!doctor) {
    return (
      <div className="p-8 text-center text-gray-400">
        Doctor profile not found.
      </div>
    );
  }

  const appointments = (await getAppointmentsByDoctorId(doctor._id)) || [];

  
  const todayStr = new Date().toISOString().split("T")[0];


  const todaysAppointments = appointments.filter((item) => {
    if (!item?.date) return false;
    const appDate = new Date(item.date).toISOString().split("T")[0];
    return appDate === todayStr;
  });

  return (
    <div>
      <TodaysAppointmentsUI doctor={doctor} appointments={todaysAppointments} />
    </div>
  );
};

export default page;