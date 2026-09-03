import Image from "next/image";
import HealthcareBanner from "./components/HealthCareBanner";
import FeaturedDoctors from "./components/FeaturedDoctors";
import StatsCard from "./components/StatsCard";
import MedicalSpecializations from "./components/MedicalSpecializations";
import Why from "./components/Why";

export default function Home() {
  return (
   <>
     <HealthcareBanner/>
     <FeaturedDoctors/>
     <MedicalSpecializations/>
     <StatsCard/>
     <Why/>
   </>
  );
}
