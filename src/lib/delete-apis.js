const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const deleteUserById = async (id) => {
  try {
    console.log("ID pacchi from delete function bal:", id);
    console.log("1. Function called");
    console.log("2. ID:", id);
    console.log("3. URL:", `${BASE_URL}/api/users/${id}`);
    
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Backend response error:", res.status, errorData);
      throw new Error(errorData.error || "Failed to delete user");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in deleteUserById:", error);
    throw error;
  }
};


export const deleteDoctorById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/doctors/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to delete doctor");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in deleteDoctorById:", error);
    throw error;
  }
};
export const deleteReview = async (reviewId) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(`${baseUrl}/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete review");
  return data;
};