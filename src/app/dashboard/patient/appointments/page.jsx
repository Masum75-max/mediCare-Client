import { auth } from "@/lib/auth";
import { getAppointmentsByUserId } from "@/lib/get-apis";
import { headers } from "next/headers";
import React from "react";
import UserAppointmentsUI from "../../../components/UserAppointmentsUi";

export const dynamic = "force-dynamic";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="p-8 text-center text-gray-400">
        Please log in to view your appointments.
      </div>
    );
  }

  const appointments = await getAppointmentsByUserId(userId);

  return (
    <div>
      <UserAppointmentsUI appointments={appointments} userId={userId} />
    </div>
  );
};

export default page;