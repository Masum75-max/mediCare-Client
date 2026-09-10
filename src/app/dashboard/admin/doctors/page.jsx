import { getAllDoctors } from "@/lib/get-apis";
import DoctorTable from "../../../components/DoctorTable";

const page = async () => {
  // Promise resolve হওয়ার জন্য await দিন
  const doctors = await getAllDoctors();

  return (
    <div>
      <DoctorTable initialDoctors={doctors} />
    </div>
  );
};

export default page;