import Link from 'next/link';
import React from 'react';

export default function TestLandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-4">
      <h1 className="text-2xl font-bold text-[#D4B16A] mb-8">Dev Test Menu</h1>
      
      <Link href="/auth/login" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-center">
        Go to Login
      </Link>
      
      <Link href="/auth/register" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-center">
        Go to Register
      </Link>
      
      <Link href="/main/home" className="w-full p-4 bg-[#4599DB] rounded-xl text-center font-bold">
        Go to Profile (Home)
      </Link>
    </div>
  );
}