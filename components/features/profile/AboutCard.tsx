"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "../../ui/card";
import { Edit2 } from "lucide-react";
import { Input } from "../../ui/input";
import { getZodiac, getShio } from "../../../lib/zodiac";
import { userApi } from "../../../lib/api";

export const AboutCard = ({ initialData }: { initialData?: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    gender: initialData?.gender || "Male",
    birthday: initialData?.birthday || "", // YYYY-MM-DD
    height: initialData?.height || 0,
    weight: initialData?.weight || 0,
    zodiac: "",
    horoscope: "",
  });

  // Auto-calculate Zodiac & Horoscope whenever birthday changes
  useEffect(() => {
    if (formData.birthday) {
      const date = new Date(formData.birthday);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      setFormData(prev => ({
        ...prev,
        zodiac: getZodiac(day, month),
        horoscope: getShio(year)
      }));
    }
  }, [formData.birthday]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await userApi.updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white">About</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>
            <Edit2 size={18} className="text-white" />
          </button>
        ) : (
          <button 
            onClick={handleSave}
            disabled={loading}
            className="text-[#D4B16A] text-sm font-medium"
          >
            {loading ? "Saving..." : "Save & Update"}
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="text-white/50 text-sm leading-relaxed">
          {initialData ? (
            <div className="space-y-3">
              <p><span className="text-white/30">Birthday:</span> {formData.birthday}</p>
              <p><span className="text-white/30">Horoscope:</span> {formData.horoscope}</p>
              <p><span className="text-white/30">Zodiac:</span> {formData.zodiac}</p>
              <p><span className="text-white/30">Height:</span> {formData.height} cm</p>
              <p><span className="text-white/30">Weight:</span> {formData.weight} kg</p>
            </div>
          ) : (
            "Add in your your to help others know you better"
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Add Image Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 cursor-pointer">
              <span className="text-2xl text-[#D4B16A]">+</span>
            </div>
            <span className="text-xs text-white font-medium">Add image</span>
          </div>

          {/* Form Rows */}
          <EditRow label="Display Name:">
            <Input 
              placeholder="Enter name" 
              className="text-right py-2 bg-transparent border border-white/10" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </EditRow>

          <EditRow label="Gender:">
            <select 
              className="w-full bg-transparent text-right outline-none text-white/50"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </EditRow>

          <EditRow label="Birthday:">
            <input 
              type="date" 
              className="bg-transparent text-right outline-none w-full text-white/50"
              value={formData.birthday}
              onChange={(e) => setFormData({...formData, birthday: e.target.value})}
            />
          </EditRow>

          <EditRow label="Horoscope:">
            <Input disabled placeholder="--" className="text-right py-2 opacity-50" value={formData.horoscope} />
          </EditRow>

          <EditRow label="Zodiac:">
            <Input disabled placeholder="--" className="text-right py-2 opacity-50" value={formData.zodiac} />
          </EditRow>

          <EditRow label="Height:">
            <Input 
              type="number" 
              placeholder="Add height" 
              className="text-right py-2" 
              value={formData.height || ""}
              onChange={(e) => setFormData({...formData, height: Number(e.target.value)})}
            />
          </EditRow>

          <EditRow label="Weight:">
            <Input 
              type="number" 
              placeholder="Add weight" 
              className="text-right py-2" 
              value={formData.weight || ""}
              onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
            />
          </EditRow>
        </div>
      )}
    </GlassCard>
  );
};

// Sub-component for form rows
const EditRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4">
    <label className="text-xs text-white/40 whitespace-nowrap">{label}</label>
    <div className="flex-1 max-w-[200px]">{children}</div>
  </div>
);