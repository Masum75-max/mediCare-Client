import { getAllAppointments, getAllDoctors, getAllReviews, getAllUsers } from '@/lib/get-apis';
import Analytics from '@/app/components/Analytics';
import React from 'react';

export const dynamic = "force-dynamic";

const page = async () => {
    const [doctors, reviews, users, appointments] = await Promise.all([
        getAllDoctors(),
        getAllReviews(),
        getAllUsers(),
        getAllAppointments(),
    ]);

    const stats = {
        totalDoctors: doctors?.length || 0,
        totalReviews: reviews?.length || 0,
        totalUsers: users?.length || 0,
        totalAppointments: appointments?.length || 0,
    };

    return (
        <div>
            <Analytics stats={stats} />
        </div>
    );
};

export default page;