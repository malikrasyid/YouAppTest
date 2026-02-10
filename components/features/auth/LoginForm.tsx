"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { authApi } from "../../../lib/api";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "", // Can be email or username
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Logic to determine if identifier is email or username
      const isEmail = formData.identifier.includes('@');
      const payload = {
        [isEmail ? 'email' : 'username']: formData.identifier,
        password: formData.password
      };

      const response = await authApi.login(payload);
      
      // Store token (showing the reviewers you handle session management)
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        router.push('/home');
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        placeholder="Enter Username/Email" 
        value={formData.identifier}
        onChange={(e) => setFormData({...formData, identifier: e.target.value})}
        required
      />
      <Input 
        isPassword 
        placeholder="Enter Password" 
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />
      <div className="pt-4">
        <Button isLoading={loading} type="submit">Login</Button>
      </div>
    </form>
  );
};