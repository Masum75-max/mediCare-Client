"use server"
import { headers } from "next/headers";
import { auth } from "./auth";

// doctors page er jonno 
export const getDoctors = async (filters = {}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.specialization && filters.specialization !== "All") {
      params.append("specialization", filters.specialization);
    }
    if (filters.sortBy && filters.sortBy !== "default") {
      params.append("sortBy", filters.sortBy);
    }
          
    console.log("API CALL HOCCHE TO");
    console.log(`${baseUrl}/api/doctorsSort?${params.toString()}`);

    const response = await fetch(`${baseUrl}/api/doctorsSort?${params.toString()}`, {
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
export const getReviewsByUserId = async (userId) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${baseUrl}/api/reviews/user/${userId}`, {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user reviews");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getReviewsByUserId:", error);
    return [];
  }
};

export const getReviewsByDoctorId = async (doctorId) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${baseUrl}/api/reviews/doctor/${doctorId}`, {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user reviews");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getReviewsByUserId:", error);
    return [];
  }
};


export const getDoctorById = async (id) => {
  

   const {token }= await auth.api.getToken({
     headers:await headers()
   })

  
   
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/api/doctors/${id}`, {
      headers:{
       authorization : `Bearer ${token}`
      },
      cache: "no-store", 
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

// getDoctors by userID:
export async function getDoctorByUserId(userId) {

  console.log("doce--",userId)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/doctors/user/${userId}`, {
      cache: "no-store", 
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    console.log(data)
    return data.doctor;
  } catch (error) {
    console.error("Failed to fetch doctor by userId:", error);
    return null;
  }
}

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
      cache: "no-store", 
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

// get appointments by doctors Id
export const getAppointmentsByDoctorId = async (doctorId) => {

  console.log("Appointments pawar jonno doctor er id", doctorId)
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/api/appointments/doctor/${doctorId}`, {
      cache: "no-store", 
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

  
   const {token }= await auth.api.getToken({
     headers:await headers()
   })

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${baseUrl}/api/doctors/${doctorId}`, {
      headers:{
       authorization : `Bearer ${token}`
      },
      cache: "no-store", 
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