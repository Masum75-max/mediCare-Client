import { getAllUsers } from '@/lib/get-apis';
import React from 'react';
import UserTable from '../../../components/UserTable'; // আপনার ফোল্ডার পাথ অনুযায়ী রাখুন

const page = async () => {
  const users = (await getAllUsers()) || [];

  return (
    <div className="p-4 sm:p-8 bg-zinc-950 min-h-screen">
      <UserTable initialUsers={users} />
    </div>
  );
};

export default page;