import { cn } from "../../lib/utils";
import React from "react";

export const GlassCard = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div className={cn(
      "bg-[#0E191F] backdrop-blur-lg rounded-2xl p-6 pt-3 shadow-xl",
      className
    )}>
      {children}
    </div>
  );
};