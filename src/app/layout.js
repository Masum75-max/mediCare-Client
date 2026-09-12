import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppNavbar from "./components/Navbar";
import AppFooter from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediCare - Modern Healthcare & Doctor Appointment",
  description: "Book appointments with verified specialist doctors easily.",
};

export default function RootLayout({ children }) {
  return (
   <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>

      <body className="min-h-full flex flex-col bg-slate-100 text-slate-900 selection:bg-blue-600 selection:text-white">
        <AppNavbar />
        <main className="flex-1">{children}</main>
        <AppFooter />
      </body>
    </html>
  );
}