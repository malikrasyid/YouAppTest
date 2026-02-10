"use client";

import React from "react";
import { GlassCard } from "../../ui/card";
import { ZODIAC_DATA, SHIO_DATA } from "../../../lib/zodiac";
import { cn } from "../../../lib/utils";

interface IdentityCardProps {
  profile?: {
    username: string;
    age?: number;
    gender?: string;
    zodiac?: string;
    shio?: string;
    image?: string;
  };
}

export const IdentityCard = ({ profile }: IdentityCardProps) => {
  const hasData = !!profile?.age;

  return (
    <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-[#162329]">
      {/* Background Image / Placeholder */}
      {profile?.image ? (
        <img 
          src={profile.image} 
          className="w-full h-full object-cover brightness-75" 
          alt="Profile" 
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent" />
      )}

      {/* Profile Info Overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h2 className="text-xl font-bold">
          {profile?.username || "@username"}
          {hasData && `, ${profile.age}`}
        </h2>
        
        {hasData ? (
          <div className="mt-2 space-y-2">
            <p className="text-sm text-white/80">{profile.gender}</p>
            <div className="flex gap-2">
              <Badge icon={ZODIAC_DATA[profile.zodiac || ""]} label={profile.zodiac} />
              <Badge icon={SHIO_DATA[profile.shio || ""]} label={profile.shio} />
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/50 mt-1 italic">No profile data yet</p>
        )}
      </div>
    </div>
  );
};

// Small Atomic Badge Component for Zodiac/Shio
const Badge = ({ icon, label }: { icon?: string; label?: string }) => (
  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
    <span className="text-sm">{icon}</span>
    <span className="text-xs font-medium">{label}</span>
  </div>
);