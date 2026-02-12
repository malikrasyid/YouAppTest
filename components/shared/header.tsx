"use client";

import React, { useState } from "react";
import { ChevronLeft, MessageCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatDrawer } from "../features/chat/ChatDrawer";

export const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/auth/login";
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 sticky top-0 bg-[#09141A]/80 backdrop-blur-md z-10 relative">
  
        {/* Left Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-amber-200 transition-colors z-20"
        >
          <LogOut size={16} />
          LogOut
        </button>

        {/* Title: Absolutely Centered */}
        <h1 className="text-sm font-semibold text-white absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {title}
        </h1>

        {/* Right Button */}
        <button 
          onClick={() => setIsChatOpen(true)}
          className="text-white hover:text-amber-200 transition-colors relative group z-20"
        >
          <MessageCircle size={24} />
        </button>

      </div>
      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};