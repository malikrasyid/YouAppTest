"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    } else {
      setIsReady(true);
    }
  }, [router]);

  // Prevent flickering by showing nothing until we know the user is auth'd
  if (!isReady) return null; 

  return <>{children}</>;
};