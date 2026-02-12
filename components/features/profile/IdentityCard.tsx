"use client";

import React from "react";
import { ZODIAC_DATA, SHIO_DATA } from "../../../lib/zodiac";
import { calculateAge } from "../../../lib/dateParams";

interface IdentityCardProps {
  profile: {
    username: string;
    name: string;
    birthday?: string;
    gender?: string;
    zodiac?: string;
    horoscope?: string;
    image?: string;
  };
}

export const IdentityCard = ({ profile }: IdentityCardProps) => {
  if (!profile) {
    return <div className="text-white/50 text-sm">Loading profile...</div>; 
  }
  const age = calculateAge(profile.birthday);
  const zodiacIcon = profile?.zodiac ? ZODIAC_DATA[profile.zodiac] : "";
  const horoscopeIcon = profile?.horoscope ? SHIO_DATA[profile.horoscope] : "";

  return (
    <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-[#162329] shadow-lg mb-4">
      {/* Background Image / Placeholder */}
      {profile.image ? (
        <img 
          src={profile.image} 
          className="w-full h-full object-cover" 
          alt="Profile" 
        />
      ) : (
        <div className="w-full h-full bg-[#162329]" />
      )}

      <div className="absolute bottom-4 left-4 right-4 text-white z-10">
        <h2 className="text-xl font-medium flex items-center gap-2">
          {profile.name ? profile.name : `@${profile.username}`}
        </h2>   

        {profile.gender && (
          <p className="text-xs mb-2 font-medium">
            {profile.gender}, {age}
          </p>
        )}     
        
        <div className="flex items-center gap-2 mt-2">
           {profile.zodiac && (
             <Badge icon={zodiacIcon} label={profile.zodiac} />
           )}
           
           {profile.horoscope && (
             <Badge icon={horoscopeIcon} label={profile.horoscope} />
           )}
        </div>   
      </div>
    </div>
  );
};

// Small Atomic Badge Component for Zodiac/Shio
const Badge = ({ icon, label }: { icon?: string; label?: string }) => (
  <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full transition-transform">
    <span className="text-sm">{icon}</span>
    <span className="text-xs font-medium text-white/90">{label}</span>
  </div>
);