"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import RegisterForm from "@/components/Auth/RegisterForm";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        email,
        password,
      }
    );
    // Save token to local storage or cookie
    localStorage.setItem("token", response.data.token);
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Register</h1>
      <RegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleRegister={handleRegister}
      />
    </div>
  );
};

export default Register;
