import React from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

import { getReviewsByUserId } from '@/lib/get-apis'; 
import UserReviewsUI from '../../../components/UserReviewUi'; 

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
          <p className="text-gray-800 font-semibold mb-4">Please log in to view your reviews.</p>
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

  // ডাটাবেস থেকে ইউজার আইডি দিয়ে রিভিউ নিয়ে আসা হচ্ছে 
  const userReviews = (await getReviewsByUserId(userId)) || [];

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
            <FaStar className="text-amber-500" /> My Reviews
          </h1>
        </div>

        {/* Client Component for Handling the Map, Edit & Delete */}
        <UserReviewsUI initialReviews={userReviews} />
        
      </div>
    </div>
  );
};

export default Page;