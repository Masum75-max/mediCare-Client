import { redirect } from 'next/navigation';

const page = () => {
  // এই পেজে আসামাত্র সরাসরি ড্যাশবোর্ডে পাঠাবে
  redirect('/dashboard');

  return null;
};

export default page;