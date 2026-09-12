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
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

function SignInContent() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
    });

    if (data) {
      toast.success("Signed in successfully!");
      router.push(redirectPath);
    } else if (error) {
      toast.error("Sign in failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Card className="w-full max-w-md">
        <Card.Header>
          <Card.Title className="text-2xl font-bold text-center">
            Sign In
          </Card.Title>

          <Card.Description className="text-center">
            Welcome back! Please sign in to your account
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

            <Button
              type="submit"
              variant="primary"
              isDisabled={loading}
              className="mt-2 w-full"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-2">
              Dont have an account?{" "}
              <Link
                href={`/signup?redirect=${redirectPath}`}
                className="text-accent font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}