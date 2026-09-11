export const postDoctor = async (doctorData) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/api/doctors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(doctorData),
        }); 
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to submit doctor data");
        }   
        return data;
    } catch (error) {
        console.error("Error submitting doctor data:", error);
        throw error;
    }   
}


export const postAppointment = async (appointmentData) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/api/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to submit appointment data");
        }
        return data;
    } catch (error) {
        console.error("Error submitting appointment data:", error);
        throw error;
    }
}

export async function createPrescription(payload) {
   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

   console.log(`${baseUrl}/api/prescriptions`)
    console.log("create prescriptions was called")
  const res = await fetch(`${baseUrl}/api/prescriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to save prescription");
  }

  return await res.json();
}

export async function createReview(payload) {
     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const res = await fetch(`${baseUrl}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit review");
  }

  return await res.json();
}