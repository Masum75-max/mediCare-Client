import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getDoctorByUserId } from '@/lib/get-apis';
import DoctorProfileUI from '../../../components/DoctorProfileEdit';

export const dynamic = "force-dynamic";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="p-8 text-center text-gray-400">
        Please log in to view doctor profile.
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

  return (
    <div>
      <DoctorProfileUI doctor={doctor} />
    </div>
  );
};

export default page;