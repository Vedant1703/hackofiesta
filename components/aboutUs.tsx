"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bgImage = "backgrounds/aboutUs.png";

const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    if (!section || !bg || !title || !content) return;

    gsap.set(bg, {
      scale: 0.25,
      scaleY: 0.35,
      transformOrigin: "center center",
    });

    gsap.set(title, { opacity: 0, x: -300 });
    gsap.set(content, { opacity: 0, x: 300 });

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    })
      .to(
        bg,
        {
          scale: 1.4,
          scaleY: 1,
          duration: 2,
          ease: "power3.out",
        },
        0
      )
      .to(
        title,
        {
          x: 0,
          opacity: 1,
          duration: 1.3,
          ease: "expo.out",
        },
        0.1
      )
      .to(
        content,
        {
          x: 0,
          opacity: 1,
          duration: 1.3,
          ease: "expo.out",
        },
        0.2
      );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInSmooth {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .title-animate {
          animation: slideLeft 0.8s ease-out;
        }

        .content-animate {
          animation: slideRight 0.8s ease-out;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center 
          ${isVisible ? "animate-[fadeInSmooth_1s_ease-out]" : "opacity-0"}`}
      >
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-3xl px-6 text-center flex flex-col gap-8">
          <h1
            ref={titleRef}
            className={`text-6xl md:text-7xl font-bold text-white tracking-tight ${
              isVisible ? "title-animate" : "opacity-0"
            }`}
          >
            About Us
          </h1>

          <div
            ref={contentRef}
            className={`text-white text-lg md:text-xl leading-relaxed ${
              isVisible ? "content-animate" : "opacity-0"
            }`}
          >
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>Suspendisse potenti. Mauris venenatis lorem in dui viverra.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
