"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  TextField,
  Label,
  FieldError,
  InputGroup,
  Button,
} from "@heroui/react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("Patient");

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.image,
      role: role,
    });

    setLoading(false);

    if (data) {
      toast.success("Sign up successful! Please check your email to verify your account.");
      if (role === "Doctor") {
        router.push("/doctorForm");
      } else {
        router.push(redirectPath);
      }
    } else if (error) {
      toast.error("Sign up failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative py-8">
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <Card className="w-full max-w-md">
        <Card.Header>
          <Card.Title className="text-2xl font-bold text-center">Sign Up</Card.Title>
          <Card.Description className="text-center">
            Create a new account to get started
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <TextField name="name" isRequired>
              <Label>Name</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <FaUser className="text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange("name")}
                />
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Email */}
            <TextField name="email" type="email" isRequired>
              <Label>Email</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <FaEnvelope className="text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                />
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Image URL */}
            <TextField name="image" type="text" isRequired>
              <Label>Image URL</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <FaCamera className="text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter image URL"
                  value={formData.image}
                  onChange={handleChange("image")}
                />
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Role Selection UI Fix */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-gray-700">Role Selection</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("Patient")}
                  className={`py-2 px-4 rounded-lg font-medium text-sm border transition-all ${
                    role === "Patient"
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole("Doctor")}
                  className={`py-2 px-4 rounded-lg font-medium text-sm border transition-all ${
                    role === "Doctor"
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Doctor
                </button>
              </div>
            </div>

            {/* Password */}
            <TextField name="password" isRequired>
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <FaLock className="text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange("password")}
                />
                <InputGroup.Suffix>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError />
            </TextField>

            <Button type="submit" variant="primary" isDisabled={loading} className="mt-2 w-full">
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <Link href={`/signin?redirect=${redirectPath}`} className="text-accent font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}