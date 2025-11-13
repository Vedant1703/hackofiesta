"use client";
import { useEffect, useRef } from "react";
import { Pirata_One } from 'next/font/google';
import gsap from "gsap";

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
const pirata = Pirata_One({ subsets: ['latin'], weight: '400' });

export default function TeamsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(".team-item");
    if (!items) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
      }
    );

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.1,
          filter: "brightness(1.7)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(".team-item:not(:hover)", {
          scale: 0.93,
          filter: "brightness(1.2)",
          duration: 0.4,
          ease: "power3.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(items, {
          scale: 1,
          filter: "brightness(1.3)",
          duration: 0.4,
          ease: "power3.out",
        });
      });
    });
  }, []);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`${pirata.className} bg-black text-white min-h-screen flex flex-col items-center justify-center overflow-hidden`}>
      <h1 className="text-6xl md:text-7xl font-bold mb-12 font-['Pirata_One'] text-center tracking-wide">
        Teams
      </h1>

      <div
        ref={containerRef}
        className="flex flex-wrap md:flex-nowrap justify-center items-end gap-5 sm:gap-6 md:gap-8 
                   px-4 sm:px-6 md:px-8 overflow-x-auto md:overflow-x-hidden 
                   scroll-smooth no-scrollbar w-full max-w-[95vw] pb-10"
      >
        {teams.map((team, index) => (
          <div
            key={index}
            className="team-item relative 
              w-[110px] sm:w-[130px] md:w-[150px] 
              h-[300px] sm:h-[380px] md:h-[460px] 
              cursor-pointer overflow-hidden group 
              shadow-[0_0_25px_rgba(255,100,0,0.55)] 
              transition-all duration-300 shrink-0 bg-black"
            onClick={() => handleClick(team.id)}   
          >
            <img
              src={team.image}
              alt={team.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <h2
                className="text-5xl sm:text-6xl md:text-7xl 
                  font-['Pirata_One'] text-white 
                  rotate-[-90deg] origin-center 
                  drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] 
                  leading-none whitespace-nowrap text-center"
              >
                {team.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
