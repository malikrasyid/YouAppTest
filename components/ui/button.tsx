import { cn } from "../../lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ children, className, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "w-full py-4 rounded-lg font-bold text-white transition-all active:scale-[0.98]",
        "bg-gradient-to-r from-[#62CDCB] via-[#4599DB] to-[#925FFF]",
        "disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
};