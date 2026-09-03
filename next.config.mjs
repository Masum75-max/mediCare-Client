/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // যেকোনো ডোমেইন থেকে ছবি এলাও করার জন্য
      },
      {
        protocol: 'http',
        hostname: '**', // যদি কোনো http সাইট থেকেও ছবি লোড করতে হয়
      },
    ],
  },
};

export default nextConfig;