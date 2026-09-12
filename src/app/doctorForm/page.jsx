"use client";

import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { postDoctor } from "../../lib/post-apis"
import {
  Card,
  TextField,
  Label,
  FieldError,
  InputGroup,
  Button,
} from "@heroui/react";
import {
  FaUserMd,
  FaStethoscope,
  FaGraduationCap,
  FaBriefcase,
  FaMoneyBillWave,
  FaHospital,
  FaImage,
  FaCalendarAlt,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

export default function DoctorVerificationForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  

  const [formData, setFormData] = useState({
    doctorName: "",
    specialization: "",
    qualifications: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    profileImage: "",
    availableDays: "",
    availableSlots: "",
    verificationStatus: "false",
  });

  // ১. সেশন চেক এবং রোল ভ্যালিডেশন
  useEffect(() => {
    if (!isPending) {
      if (!session?.user || session?.user?.role !== "Doctor") {
        router.push("/signin");
      }
    }
  }, [session, isPending, router]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorVerificationData = {
      doctorName: formData.doctorName,
      userId: session?.user?.id,
      specialization: formData.specialization,
      qualifications: formData.qualifications,
      experience: formData.experience,
      consultationFee: formData.consultationFee,
      hospitalName: formData.hospitalName,
      profileImage: formData.profileImage,
      availableDays: formData.availableDays,
      availableSlots: formData.availableSlots,
      verificationStatus: formData.verificationStatus,
    };

    console.log("Submitted Data:", doctorVerificationData);
   
    const result = await postDoctor(doctorVerificationData);

    redirect('/doctors')


  };

 
  if (isPending || !session?.user || session?.user?.role !== "Doctor") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 px-4 py-12">
      <Card className="w-full max-w-3xl shadow-xl border border-gray-100 rounded-2xl bg-white/90 backdrop-blur-md">
        <Card.Header className="pb-4 border-b border-gray-100 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
            <FaUserMd className="text-2xl" />
          </div>
          <Card.Title className="text-2xl md:text-3xl font-extrabold text-gray-800">
            Doctor Verification
          </Card.Title>
          <Card.Description className="text-lg text-gray-500 mt-1">
            Please fillOut this form for verification.Note: FOLLOW THE GIVEN FORMAT.OR SOME FUNCTIONALITIES MAY NOT WORK LIKE SEARCHING,SORTING.
          </Card.Description>
        </Card.Header>

        <Card.Content className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Doctor Name */}
              <TextField name="doctorName" isRequired className="w-full">
                <Label className="text-sm font-semibold text-gray-700">Doctor Name</Label>
                <InputGroup className="mt-1">
                  <InputGroup.Prefix>
                    <FaUserMd className="text-gray-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="Dr. John Doe"
                    value={formData.doctorName}
                    onChange={handleChange("doctorName")}
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Specialization */}
              <TextField name="specialization" isRequired className="w-full">
                <Label className="text-sm font-semibold text-gray-700">Specialization</Label>
                <InputGroup className="mt-1">
                  <InputGroup.Prefix>
                    <FaStethoscope className="text-gray-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="e.g. Cardiologist, Dermatologist"
                    value={formData.specialization}
                    onChange={handleChange("specialization")}
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Qualifications */}
              <TextField name="qualifications" isRequired className="w-full">
                <Label className="text-sm font-semibold text-gray-700">Qualifications</Label>
                <InputGroup className="mt-1">
                  <InputGroup.Prefix>
                    <FaGraduationCap className="text-gray-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="e.g. MBBS, FCPS"
                    value={formData.qualifications}
                    onChange={handleChange("qualifications")}
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Experience */}
              <TextField name="experience" isRequired className="w-full">
                <Label className="text-sm font-semibold text-gray-700">Experience</Label>
                <InputGroup className="mt-1">
                  <InputGroup.Prefix>
                    <FaBriefcase className="text-gray-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="e.g. 5 years"
                    value={formData.experience}
                    onChange={handleChange("experience")}
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Consultation Fee */}
              <TextField name="consultationFee" isRequired className="w-full">
                <Label className="text-sm font-semibold text-gray-700">Consultation Fee</Label>
                <InputGroup className="mt-1">
                  <InputGroup.Prefix>
                    <FaMoneyBillWave className="text-gray-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="e.g. 1000 (Numbers only.)"
                    value={formData.consultationFee}
                    onChange={handleChange("consultationFee")}
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Hospital Name */}
              <TextField name="hospitalName" isRequired className="w-full">
                <Label className="text-sm font-semibold text-gray-700">Hospital Name</Label>
                <InputGroup className="mt-1">
                  <InputGroup.Prefix>
                    <FaHospital className="text-gray-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="Enter hospital / clinic name"
                    value={formData.hospitalName}
                    onChange={handleChange("hospitalName")}
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Available Days */}
              <TextField name="availableDays" isRequired className="w-full">
                <Label className="text-sm font-semibold text-gray-700">Available Days</Label>
                <InputGroup className="mt-1">
                  <InputGroup.Prefix>
                    <FaCalendarAlt className="text-gray-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="e.g. Sun, Tue, Thu"
                    value={formData.availableDays}
                    onChange={handleChange("availableDays")}
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </InputGroup>
                <FieldError />
              </TextField>

              {/* Available Slots */}
              <TextField name="availableSlots" isRequired className="w-full">
                <Label className="text-sm font-semibold text-gray-700">Available Slots</Label>
                <InputGroup className="mt-1">
                  <InputGroup.Prefix>
                    <FaClock className="text-gray-400" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    placeholder="e.g. 10:AM-2:00 PM"
                    value={formData.availableSlots}
                    onChange={handleChange("availableSlots")}
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </InputGroup>
                <FieldError />
              </TextField>
            </div>

            {/* Profile Image URL (Full Width) */}
            <TextField name="profileImage" isRequired className="w-full">
              <Label className="text-sm font-semibold text-gray-700">Profile Image URL</Label>
              <InputGroup className="mt-1">
                <InputGroup.Prefix>
                  <FaImage className="text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="https://example.com/photo.jpg"
                  value={formData.profileImage}
                  onChange={handleChange("profileImage")}
                  className="focus:ring-2 focus:ring-blue-500/20"
                />
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Verification Status (Disabled Field) */}
            <TextField name="verificationStatus" isDisabled className="w-full">
              <Label className="text-sm font-semibold text-gray-500">Verification Status</Label>
              <InputGroup className="mt-1 bg-gray-50 opacity-75">
                <InputGroup.Prefix>
                  <FaShieldAlt className="text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input value={formData.verificationStatus} readOnly />
              </InputGroup>
            </TextField>

            <Button
              type="submit"
              variant="primary"
              className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200"
            >
              Submit Form
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}