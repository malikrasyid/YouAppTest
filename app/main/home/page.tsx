"use client";

import React, { useEffect, useState } from "react";
import { userApi } from "../../../lib/api";
import { Header } from "../../../components/shared/header";
import { IdentityCard } from "../../../components/features/profile/IdentityCard";
import { AboutCard } from "../../../components/features/profile/AboutCard";
import { InterestCard } from "../../../components/features/profile/InterestCard";

export default function HomePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await userApi.getProfile();
      setProfile(res.data.data); 
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen pb-10">
      <Header title={`@${profile?.username}`} />
      
      <main className="px-4 space-y-4 mt-2">
        <IdentityCard profile={profile} />
        <AboutCard initialData={profile} onUpdate={fetchProfile} />
        <InterestCard interests={profile?.interests} />
      </main>
    </div>
  );
}