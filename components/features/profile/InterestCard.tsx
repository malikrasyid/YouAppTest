"use client";

import React from "react";
import { GlassCard } from "../../ui/card";
import { Edit2 } from "lucide-react";
import Link from "next/link";

export const InterestCard = ({ interests = [] }: { interests?: string[] }) => {
  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white text-sm">Interest</h3>
        <Link href="/main/interests">
          <Edit2 size={18} className="text-white" />
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {interests.length > 0 ? (
          interests.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white"
            >
              {item}
            </div>
          ))
        ) : (
          <p className="text-white/50 text-sm">
            Add in your interest to find a better match
          </p>
        )}
      </div>
    </GlassCard>
  );
};