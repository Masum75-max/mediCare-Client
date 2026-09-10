const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const updateDoctorVerification = async (id, status) => {
  try {
    const res = await fetch(`${BASE_URL}/api/doctors/${id}/verify`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verificationStatus: status }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to update verification status");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in updateDoctorVerification:", error);
    throw error;
  }
};