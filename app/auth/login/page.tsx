import React from "react";
import { LoginForm } from "../../../components/features/auth/LoginForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen p-8 bg-gradient-to-br from-[#09141A] to-[#0D1D23]">
      <div className="flex items-center mb-10">
        <Link href="/" className="flex items-center text-white/90">
          <ChevronLeft size={24} />
          <span className="ml-1 font-medium">Back</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8 ml-2 text-white">Login</h1>
      
      <LoginForm />

      <div className="mt-auto pb-8 flex justify-center gap-1 text-sm">
        <span className="text-white">No account?</span>
        <Link href="/register" className="text-[#D4B16A] border-b border-[#D4B16A] hover:opacity-80 transition-all">
          Register here
        </Link>
      </div>
    </div>
  );
}