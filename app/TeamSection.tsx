"use client";

import { useState } from "react";
import { Pirata_One } from "next/font/google";

interface TeamsSectionProps {
  selectedTeam: string | null;
  onTeamSelect: (teamName: string) => void;
}

const pirata = Pirata_One({ subsets: ["latin"], weight: "400" });

const teams = [
  { name: "Overall Lead", image: "/images/overall.png" },
  { name: "Design", image: "/images/design.png" },
  { name: "Website", image: "/images/website.png" },
  { name: "Outreach", image: "/images/outreach.png" },
  { name: "CR", image: "/images/cr.png" },
  { name: "Logistics", image: "/images/logistics.png" },
  { name: "Media", image: "/images/media.png" },
  { name: "Technical", image: "/images/technical.png" },
];

export default function TeamsSection({
  selectedTeam,
  onTeamSelect,
}: TeamsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedIndex = teams.findIndex((t) => t.name === selectedTeam);

  return (
    <div
      className={`${pirata.className} bg-black text-white min-h-screen flex flex-col items-center`}
    >
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-10 mb-10">
        Teams
      </h1>

      <div
        className="
          flex 
          flex-col sm:flex-row
          w-full 
          max-w-[95vw] 
          items-center 
          justify-center 
          gap-6 
          px-4 sm:px-10 
          pb-10
        "
      >

        {selectedTeam && (
          <div className="flex-1 flex justify-center order-2 sm:order-1">
            <div
              className="
                relative
                w-[120px] sm:w-[140px] md:w-[200px]
                h-[300px] sm:h-[360px] md:h-[500px]
                transition-all duration-500
              "
            >
              <img
                src={teams[selectedIndex].image}
                alt={teams[selectedIndex].name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <h2 className="absolute inset-0 flex items-center justify-center rotate-[-90deg] text-4xl sm:text-5xl md:text-6xl">
                {teams[selectedIndex].name}
              </h2>
            </div>
          </div>
        )}

        {selectedTeam && (
        <div
        className="
        flex 
        flex-row 
        sm:flex-row 
        gap-2 sm:gap-3 md:gap-4 
        order-1 sm:order-2
        "
        >
        {teams.map((team, index) => {
        if (index === selectedIndex) return null;

        return (
        <div
          key={team.name}
          onClick={() => onTeamSelect(team.name)}
          title={team.name}
          className="
            cursor-pointer 
            h-[60px] sm:h-[360px] md:h-[500px]
            w-[20px] sm:w-[14px] md:w-[20px]
            bg-gray-300 
            rounded-xl 
            hover:bg-white 
            active:scale-105
            transition-all duration-300
          "
        />
        );
        })}
        </div>
        )}
 

        {!selectedTeam && (
          <div className="flex flex-wrap justify-center items-end gap-4 sm:gap-6 mt-4">
            {teams.map((team, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={team.name}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onTeamSelect(team.name)}
                  className={`
                    relative cursor-pointer 
                    w-[100px] sm:w-[130px] md:w-[150px]
                    h-[260px] sm:h-[340px] md:h-[460px]
                    transition-all duration-300
                    ${isHovered ? "scale-105 brightness-110" : "opacity-90"}
                  `}
                >
                  <img
                    src={team.image}
                    alt={team.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg brightness-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent   "></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl rotate-[-90deg] font-bold">
                      {team.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
