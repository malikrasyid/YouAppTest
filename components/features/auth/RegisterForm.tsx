"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { authApi } from "../../../lib/api";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        placeholder="Enter Email" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <Input 
        placeholder="Create Username" 
        value={formData.username}
        onChange={(e) => setFormData({...formData, username: e.target.value})}
        required
      />
      <Input 
        isPassword 
        placeholder="Create Password" 
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />
      <Input 
        isPassword 
        placeholder="Confirm Password" 
        value={formData.confirmPassword}
        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        required
      />
      <div className="pt-4">
        <Button isLoading={loading} type="submit">Register</Button>
      </div>
    </form>
  );
};