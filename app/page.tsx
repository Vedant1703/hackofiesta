"use client";

import { useState } from "react";
import Header from "@/components/header";
import SplashScreen from "@/components/splash-screen";
import AboutNSponsor from "@/components/AboutNSponsor";
import HeroParallax from "@/components/hero-parallax";
import TeamsSection from "./TeamSection";
import TeamGrid from "@/components/team";
import { Teams, Team } from "@/constants/teams/all";

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const activeTeam: Team | null =
    Teams.find((t) => t.name === selectedTeam) ?? null;

  return (
    <>
      <Header />
      <SplashScreen />
      <AboutNSponsor />

      <HeroParallax
        backImage="/assets/hero/layer-front.jpeg"
        topImage="/assets/hero/layer-back.png"
        topScale={1.2}
        topMaxHeight={520}
      />

      <main className="min-h-screen w-full bg-black font-sans">
        {/* Posters */}
        <TeamsSection
          selectedTeam={selectedTeam}
          onTeamSelect={(name) =>
            setSelectedTeam((prev) => (prev === name ? null : name))
          }
        />

        {/* TeamGrid expands in created space */}
        <div
          className={`w-full flex justify-center transition-all duration-500 ${
            selectedTeam ? "opacity-100 translate-y-[-40px]" : "opacity-0 translate-y-[20px] pointer-events-none"
          }`}
        >
          {activeTeam && (
            <div className="w-full max-w-6xl px-6 py-12">
              <TeamGrid
                title={activeTeam.name}
                images={activeTeam.images}
                backgroundImage={activeTeam.backgroundImage}
                isActive={selectedTeam !== null}
              />
            </div>
          )}
        </div>

        <div style={{ height: "40vh" }} />
      </main>
    </>
  );
}
