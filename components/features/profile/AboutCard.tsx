"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { GlassCard } from "../../ui/card";
import { Edit2 } from "lucide-react";
import { Input } from "../../ui/input";
import { userApi } from "../../../lib/api";
import imageCompression from 'browser-image-compression';

export const AboutCard = ({ 
  initialData, 
  onUpdate 
}: { 
  initialData: any, 
  onUpdate: () => void 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    gender: initialData?.gender || "",
    birthday: initialData?.birthday || "", // YYYY-MM-DD
    height: initialData?.height || 0,
    weight: initialData?.weight || 0,
    zodiac: initialData?.zodiac || "",  
    horoscope: initialData?.horoscope || "",
    image: initialData?.image || ""
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await userApi.updateProfile(formData);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: initialData?.name || "",
      gender: initialData?.gender || "",
      birthday: initialData?.birthday || "",
      height: initialData?.height || 0,
      weight: initialData?.weight || 0,
      zodiac: initialData?.zodiac || "",
      horoscope: initialData?.horoscope || "",
      image: initialData?.image || ""
    });
    setImagePreview(initialData?.image || null);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const options = {
      maxSizeMB: 0.1,          // Compress to ~100KB
      maxWidthOrHeight: 800,   // Resize to max 800px width/height
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, image: base64String }));        
      };
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Add Birthday";
    const date = new Date(dateString);
    // Returns: "20 July 1995"
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <GlassCard className="transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white">About</h3>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            <Edit2 size={17} className="text-white hover:text-amber-200 transition-colors" />
          </button>
        )}
      </div>

      {!isEditing ? (
        // --- VIEW MODE ---
        <div className="text-white/50 text-sm leading-relaxed">
          {(initialData.birthday || initialData.height) ? (
            <div className="space-y-3">
              <p>
                <span className="text-white/30 inline block">Birthday:</span> 
                <span className="text-white"> {formatDate(formData.birthday)}</span>
              </p>
              <p>
                <span className="text-white/30 inline-block">Horoscope:</span> 
                <span className="text-white"> {formData.horoscope || "--"}</span>
                </p>
              <p>
                <span className="text-white/30 inline-block">Zodiac:</span> 
                <span className="text-white"> {formData.zodiac || "--"}</span>
              </p>
              <p>
                <span className="text-white/30 inline-block">Height:</span> 
                <span className="text-white"> {formData.height || 0} cm</span>
              </p>
              <p>
                <span className="text-white/30 inline-block">Weight:</span> 
                <span className="text-white"> {formData.weight || 0} kg</span>
                </p>
            </div>
          ) : (
            <div className="text-white/50">Add in your details to help others know you better.</div>
          )}
        </div>
      ) : (
        // --- EDIT MODE ---
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-4 mb-6">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*"
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 cursor-pointer overflow-hidden hover:bg-white/10 transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <span className="text-2xl text-[#D4B16A]">+</span>
              )}
            </div>
            <span className="text-xs text-white font-medium cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              {imagePreview ? "Change image" : "Add image"}
            </span>
          </div>

          {/* Form Rows */}
          <EditRow label="Display Name:">
            <Input 
              placeholder="Enter name" 
              className="text-right py-2 bg-[#D9D9D90F] text-white border border-white/10" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </EditRow>

          <EditRow label="Gender:">
            <select 
              className="w-full text-right py-2 bg-[#D9D9D90F] text-white rounded-lg outline-none px-3 appearance-none"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="" disabled className="bg-[#1E2325]">Select Gender</option>
              <option value="Male" className="bg-[#1E2325]">Male</option>
              <option value="Female" className="bg-[#1E2325]">Female</option>
            </select>
          </EditRow>

          <EditRow label="Birthday:">
            <Input 
              type="date" 
              placeholder="DD MM YYYY"
              className="text-right py-2 bg-[#D9D9D90F] text-white border border-white/10 block w-full" 
              value={formData.birthday}
              onChange={(e) => setFormData({...formData, birthday: e.target.value})}
            />
          </EditRow>

          <EditRow label="Horoscope:">
            <Input disabled placeholder="--" className="text-right py-2 cursor-not-allowed border-none bg-[#D9D9D90F]" value={formData.horoscope} />
          </EditRow>

          <EditRow label="Zodiac:">
            <Input disabled placeholder="--" className="text-right py-2 cursor-not-allowed border-none bg-[#D9D9D90F]" value={formData.zodiac} />
          </EditRow>

          <EditRow label="Height:">
            <div className="relative">
              <Input 
                type="number" 
                placeholder="Add height" 
                className="text-right py-2 pr-5 bg-[#D9D9D90F] border border-white/10 text-white" 
                value={formData.height || ""}
                onChange={(e) => setFormData({...formData, height: Number(e.target.value)})}
              />
              <span className="absolute right-3 top-2 text-xs text-white/40">cm</span>
            </div>
          </EditRow>

          <EditRow label="Weight:">
            <div className="relative">
              <Input 
                type="number" 
                placeholder="Add weight" 
                className="text-right py-2 pr-5 bg-[#D9D9D90F] border border-white/10 text-white" 
                value={formData.weight || ""}
                onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
              />
              <span className="absolute right-3 top-2 text-xs text-white/40">kg</span>
            </div>
          </EditRow>

          <div className="flex flex-wrap gap-4 justify-end pt-4">
             {/* Cancel Button - Ghost/Text Style */}
             <button 
              onClick={handleCancel}
              disabled={loading}
              className="text-white/80 rounded-lg bg-white/40 text-xs font-medium hover:bg-white/50 transition-colors px-4 py-2"
            >
              Cancel
            </button>

             {/* Save Button - Gradient/Login Style */}
             <button 
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-[#62CDCB] to-[#4599DB] text-white text-xs font-normal py-2 px-4 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 shadow-lg"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

// Sub-component for form rows
const EditRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4">
    <label className="text-xs text-white/40 whitespace-nowrap">{label}</label>
    <div className="flex-1 text-xs max-w-[200px]">{children}</div>
  </div>
);