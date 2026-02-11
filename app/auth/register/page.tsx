import React from "react";
import { RegisterForm } from "../../../components/features/auth/RegisterForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen p-8 bg-gradient-to-br from-[#09141A] to-[#0D1D23]">

      <div className="flex items-center mb-10">
        <Link href="/" className="flex items-center text-white/90 hover:text-white transition-colors">
          <ChevronLeft size={24} />
          <span className="ml-1 font-medium">Back</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8 ml-2 text-white">Register</h1>
      
      <RegisterForm />

      <div className="mt-auto pb-8 flex justify-center gap-1 text-sm">
        <span className="text-white">Have an account?</span>
        <Link href="/auth/login" className="text-[#D4B16A] border-b border-[#D4B16A] hover:opacity-80 transition-all">
          Login here
        </Link>
      </div>
    </div>
  );
}