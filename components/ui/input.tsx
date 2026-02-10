import { cn } from "../../lib/utils";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isPassword, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          className={cn(
            "w-full bg-white/5 border-none rounded-lg px-4 py-4 text-white placeholder:text-white/40 focus:ring-1 focus:ring-white/20 outline-none transition-all",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";