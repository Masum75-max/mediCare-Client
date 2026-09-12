import { getDoctors } from "@/lib/get-apis";
import DoctorCard from "@/app/components/DoctorCard";
import DoctorFilterBar from "../components/DoctorFilterBar";

export default async function DoctorList({ searchParams }) {
  const filters = await searchParams;

  const doctors = await getDoctors({
    search: filters?.search || "",
    specialization: filters?.specialization || "All",
    sortBy: filters?.sortBy || "default",
  });

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Meet Our Specialist Doctors
        </h2>
        <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
          Book an appointment with our top-rated medical experts easily.
        </p>
      </div>

      <DoctorFilterBar />

      {doctors?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 max-w-md mx-auto">
          <p className="text-gray-500 font-medium text-sm">
            No doctors found matching your criteria.
          </p>
        </div>
      )}
    </section>
  );
}