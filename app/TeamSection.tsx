"use client";
import { useState, useRef } from "react";
import { Pirata_One } from "next/font/google";

const teams = [
  { name: "Overall Lead", image: "/images/overall.png", id: "lead" },
  { name: "Design", image: "/images/design.png", id: "design" },
  { name: "Website", image: "/images/website.png", id: "website" },
  { name: "Outreach", image: "/images/outreach.png", id: "outreach" },
  { name: "CR", image: "/images/cr.png", id: "cr" },
  { name: "Logistics", image: "/images/logistics.png", id: "logistics" },
  { name: "Media", image: "/images/media.png", id: "media" },
  { name: "Technical", image: "/images/technical.png", id: "tech" },
];

const pirata = Pirata_One({ subsets: ["latin"], weight: "400" });

export default function TeamsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`${pirata.className} bg-black text-white min-h-screen flex flex-col items-center justify-center overflow-visible`}
    >
      <h1 className="text-6xl md:text-7xl font-bold mb-12 text-center tracking-wide">
        Teams
      </h1>

      <div
        ref={containerRef}
        className="flex flex-wrap md:flex-nowrap justify-center items-end gap-5 sm:gap-6 md:gap-8 
                   px-4 sm:px-6 md:px-8 overflow-visible 
                   scroll-smooth no-scrollbar w-full max-w-[95vw] pb-10"
      >
        {teams.map((team, index) => {
          const isHovered = hoveredIndex !== null;
          const isCurrent = hoveredIndex === index;

          // If some other item is hovered, non-current items get dim+shrink
          const otherDimmed = isHovered && !isCurrent;

          return (
            <div
              key={team.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(team.id)}
              className={`team-item relative cursor-pointer shrink-0
                w-[110px] sm:w-[130px] md:w-[150px]
                h-[300px] sm:h-[380px] md:h-[460px]
                bg-black 
                transition-all duration-100 ease-in-out
                ${isCurrent ? "scale-[1.08] brightness-110" : ""}
                ${otherDimmed ? "scale-[0.94] brightness-50 opacity-60" : "brightness-[1] opacity-100"}
              `}
              // ensure transform is GPU-accelerated
              style={{ willChange: "transform, opacity, filter" }}
            >
              <img
                src={team.image}
                alt={team.name}
                className="absolute inset-0 w-full h-full object-cover
                  opacity-90 transition-all duration-300 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl 
                    rotate-[-90deg] font-['Pirata_One'] text-white
                    drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]
                    leading-none whitespace-nowrap text-center"
                >
                  {team.name}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
