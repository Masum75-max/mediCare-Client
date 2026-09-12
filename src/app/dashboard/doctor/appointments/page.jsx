import React from 'react';
import { headers } from "next/headers";
import { auth } from "../../../../lib/auth"; 
import { getAppointmentsByDoctorId, getDoctorByUserId } from "@/lib/get-apis";
import DoctorAppointmentsUI from "../../../components/DoctorsAppointmentUi";

export const dynamic = "force-dynamic";

const page = async() => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user?.id;

    if (!userId) {
      return (
        <div className="p-8 text-center text-gray-400">
          Please log in to view appointments.
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

    const appointments = await getAppointmentsByDoctorId(doctor._id);

    return (
        <div>
            <DoctorAppointmentsUI initialAppointments={appointments || []} />
        </div>
    );
};

export default page;