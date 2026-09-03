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