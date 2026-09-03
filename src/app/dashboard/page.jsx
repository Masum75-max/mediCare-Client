import React from 'react';
import { auth } from '../../lib/auth';
import { headers } from 'next/headers';
import PatientDashboardUi from '../components/PatientDashboardUi';
import DoctorsDashboardUi from '../components/DoctorsDashboardUi';
import AdminDashboardUi from '../components/AdminDashboardUi';


const page = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session.user){
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1 className='text-2xl font-bold text-red-500'>You are not logged in. Please log in to view your appointments.</h1>
            </div>
            )
    }

    if(session.user.role === "Patient"){
    return (
        <PatientDashboardUi/>
    );

    
}

if(session.user.role==="Doctor"){
        return(

            <DoctorsDashboardUi/>
        )
    }

    if(session.user.role==="Admin"){
        return(

            <AdminDashboardUi/>
        )
    }
};

export default page;