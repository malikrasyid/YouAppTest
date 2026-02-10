"use client";
import React from "react";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-[#09141A]/80 backdrop-blur-md z-10">
      <button onClick={() => router.back()} className="flex items-center text-white">
        <ChevronLeft size={24} />
        <span className="text-sm font-semibold ml-1">Back</span>
      </button>
      <h1 className="text-sm font-semibold text-white">{title}</h1>
      <button className="text-white">
        <MoreHorizontal size={24} />
      </button>
    </div>
  );
};