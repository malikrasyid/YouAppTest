"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InterestsPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const addInterest = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (!interests.includes(inputValue.trim())) {
        setInterests([...interests, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeInterest = (indexToRemove: number) => {
    setInterests(interests.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    // Call userApi.updateProfile({ interests }) here
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09141A] to-[#0D1D23]">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => router.back()} className="text-white flex items-center">
          <span className="ml-1 text-sm font-semibold">Back</span>
        </button>
        <button onClick={handleSave} className="text-[#4599DB] font-semibold">
          Save
        </button>
      </div>

      <div className="p-8 mt-10">
        <h2 className="text-[#D4B16A] font-bold text-sm uppercase tracking-wider mb-2">
          Tell everyone about yourself
        </h2>
        <h1 className="text-white text-xl font-bold mb-8">What interest you?</h1>

        <div className="w-full bg-white/5 rounded-xl p-3 flex flex-wrap gap-2 min-h-[50px] focus-within:ring-1 focus-within:ring-white/20">
          {interests.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-white text-sm"
            >
              {item}
              <button onClick={() => removeInterest(index)}>
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            className="bg-transparent outline-none text-white text-sm flex-1 min-w-[100px]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addInterest}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}