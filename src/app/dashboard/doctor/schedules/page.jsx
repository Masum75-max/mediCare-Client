import React from "react";
import { headers } from "next/headers";
import { auth } from "../../../../lib/auth"; // আপনার Auth ইন্সট্যান্স
import { getDoctorByUserId } from "@/lib/get-apis";
import DoctorProfileUI from "../../../components/DoctorProfileUi";

export const dynamic = "force-dynamic";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="p-8 text-center text-gray-400">
        Please login to view profile.
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

  return <DoctorProfileUI doctor={doctor} />;
};

export default page;