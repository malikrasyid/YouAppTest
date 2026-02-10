import React from "react";
import { Header } from "../../../components/shared/header";
import { IdentityCard } from "../../../components/features/profile/IdentityCard";
import { AboutCard } from "../../../components/features/profile/AboutCard";
import { InterestCard } from "../../../components/features/profile/InterestCard";

export default function HomePage() {
  const username = "@johndoe"; 

  return (
    <div className="min-h-screen bg-[#09141A] pb-10">
      <Header title={username} />
      
      <main className="px-4 space-y-4 mt-2">
        <IdentityCard />
        <AboutCard />
        <InterestCard />
      </main>
    </div>
  );
}