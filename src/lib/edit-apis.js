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



// Fetch Doctor by userId

// Update Schedule API


// Update Schedule API
export async function updateDoctorSchedule(userId, scheduleData) {
  const res = await fetch(`${BASE_URL}/api/doctors/update-schedule/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleData),
  });

  if (!res.ok) {
    throw new Error("Failed to update schedule");
  }

  return await res.json();
}


export async function updateAppointmentStatus(appointmentId, status) {
  const res = await fetch(`${BASE_URL}/api/appointments/status/${appointmentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update appointment status");
  }

  return await res.json();
}

export async function updateDoctorProfile(userId, updateData) {
  const res = await fetch(`${BASE_URL}/api/doctors/update-profile/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    throw new Error("Failed to update doctor profile");
  }

  return await res.json();
}



export async function rescheduleAppointment(id, updateData) {
  const res = await fetch(`${BASE_URL}/api/appointments/reschedule/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    throw new Error("Failed to reschedule appointment");
  }

  return await res.json();
}

export const updateReview = async (reviewId, updateData) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const res = await fetch(`${baseUrl}/api/reviews/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update review");
  return data;
};