
// doctors page er jonno 
export const getDoctors = async (filters = {}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    
    
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.specialization && filters.specialization !== "All") {
      params.append("specialization", filters.specialization);
    }

    const response = await fetch(`${baseUrl}/api/doctors?${params.toString()}`, {
      cache: "no-store", 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
// featured er doctors gula limit koira 4 ta dekhabo

export const getFeaturedDoctors = async (limit = 4) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/api/doctors/featured?limit=${limit}`, {
      cache: "no-store", 
    }); 
    
    if (!response.ok) {
      throw new Error("Failed to fetch featured doctors");
    }

    return await response.json();
  }
  catch (error) {
    console.error("Error fetching featured doctors:", error);
    return [];
  }
};


export const getDoctorById = async (id) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/api/doctors/${id}`, {
      cache: "no-store", // ইন্সট্যান্ট নতুন ডাটা পাওয়ার জন্য
    }); 

    if (!response.ok) {
      throw new Error("Failed to fetch doctor details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return null;
  }
};

// get all doctors 

export const getAllDoctors = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const response = await fetch(`${baseUrl}/api/doctors`)

  return await response.json();
}

// get all users

export const getAllUsers = async () => {
   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const response = await fetch(`${baseUrl}/api/users`)

  return await response.json();
}

// get all appointments

export const getAllAppointments = async () => {
   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const response = await fetch(`${baseUrl}/api/appointments`)
  return await response.json();
}

// get all reviews

export const getAllReviews = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const response = await fetch(`${baseUrl}/api/reviews`)
  return await response.json();
}

// get appointments by userId

export const getAppointmentsByUserId = async (userId) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/api/appointments/user/${userId}`, {
      cache: "no-store", // ইন্সট্যান্ট নতুন ডাটা পাওয়ার জন্য
    });

    if (!response.ok) {
      throw new Error("Failed to fetch appointments for user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching appointments for user:", error);
    return [];
  }
};


export const getDoctorsByDoctorsId = async (doctorId) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/api/doctors/${doctorId}`, {
      cache: "no-store", // ইন্সট্যান্ট নতুন ডাটা পাওয়ার জন্য
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctor details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return null;
  }

}