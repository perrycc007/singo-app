"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email: email,
        password: password,
      }
    );
    // Save token to local storage or cookie
    localStorage.setItem("token", response.data.access_token);
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Login</h1>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default Login;
