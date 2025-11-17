import React from "react";
import { useRef,useEffect } from "react";


interface Sponsor {
  name: string;
  logo: string;
}


const sponsors: Sponsor[] = Array.from({ length: 17 }, (_, i) => {
  const num = i + 50;
  return {
    name: `Sponsor ${num}`,
    logo: `/assets/logos/image ${num}.png`,
  };
});

const SponsorsGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const cards = grid.querySelectorAll(".sponsor-card");

    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(cards, { opacity: 0, y: 30, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      }, "-=0.4");

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const columns = 3;
  const fullRowsCount = Math.floor(sponsors.length / columns);
  const itemsInLastRow = sponsors.length % columns;
  const fullRows = sponsors.slice(0, fullRowsCount * columns);
  const lastRow = sponsors.slice(fullRowsCount * columns);

  return (
    <div
      ref={sectionRef}
      className="sponsors-section min-h-screen py-16 px-4 relative"
      style={{
        background: "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 " />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Sponsors
        </h1>

        <div ref={gridRef}>
          {/* FULL ROWS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullRows.map((sponsor, index) => (
              <div
                key={index}
                className="sponsor-card bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 flex items-center justify-center hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* LAST ROW — CENTERED */}
          {itemsInLastRow > 0 && (
            <div className="flex justify-center gap-6 mt-6">
              {lastRow.map((sponsor, index) => (
                <div
                  key={`last-${index}`}
                  className="sponsor-card bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 flex items-center justify-center hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default SponsorsGrid;