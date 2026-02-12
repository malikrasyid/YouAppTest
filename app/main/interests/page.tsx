"use client";

import React, { useState, useEffect } from "react";
import { userApi } from "../../../lib/api";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InterestsPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCurrentInterests = async () => {
      try {
        const res = await userApi.getProfile();
        if (res.data.data.interests) {
          setInterests(res.data.data.interests);
        }
      } catch (err) {
        console.error("Failed to load interests:", err);
      }
    };
    loadCurrentInterests();
  }, []);

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
    setLoading(true);
    try {
      await userApi.updateProfile({ interests }); 
      router.push("/main/home"); 
    } catch (err) {
      alert("Failed to save interests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => router.back()} className="text-white flex items-center">
          <span className="ml-1 text-sm font-semibold">Back</span>
        </button>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="text-[#4599DB] font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
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
              <button onClick={() => removeInterest(index)} className="hover:text-red-400">
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            className="bg-transparent outline-none text-white text-sm flex-1 min-w-[100px]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addInterest}
            placeholder={interests.length === 0 ? "Type and press enter..." : ""}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}