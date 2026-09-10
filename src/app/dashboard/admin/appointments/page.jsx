import { getAllAppointments } from "@/lib/get-apis";
import AppointmentTable from "../../../components/AppointmentTable";
import React from "react";

export const dynamic = "force-dynamic";

const page = async () => {
  const appointments = await getAllAppointments();

  return (
    <div>
      <AppointmentTable initialAppointments={appointments} />
    </div>
  );
};

export default page;