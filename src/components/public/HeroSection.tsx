"use client";

import { useEffect, useState } from "react";
import { aboutService } from "@/services/about.service";
import { About } from "@/interface/types/about.types";

const floatingWords = [
  "Next.js",
  "TypeScript",
  "UI/UX",
  "Frontend",
  "Backend",
  "API",
  "Clean Code",
  "Performance",
  "Scalable",
];

export default function Hero() {
  const [data, setData] = useState<About | null>(null);

  const [bubbles, setBubbles] = useState<any[]>([]);
  const [particles, setParticles] = useState<any[]>([]);
  const [words, setWords] = useState<any[]>([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await aboutService.getAll();

      let me: About[] = res.results.filter(
        (item) => item.name === "Murodiljon Abdumutalov",
      );

      setData(me[0]);
    };

    fetchData();
  }, []);

  // Generate animations (client only)
  useEffect(() => {
    const genBubbles = [...Array(20)].map(() => ({
      size: 10 + Math.random() * 40,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 10,
    }));

    const genParticles = [...Array(12)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 8,
    }));

    const genWords = floatingWords.map((word) => ({
      word,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 10 + Math.random() * 10,
    }));

    setBubbles(genBubbles);
    setParticles(genParticles);
    setWords(genWords);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 overflow-hidden bg-white text-black">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center z-10 text-center md:text-left">
        {/* LEFT */}
        <div className="space-y-6 animate-slideInLeft">
          <p className="text-red-500 uppercase tracking-[0.3em]">Portfolio</p>

          <h1 className="text-2xl sm:text-5xl md:text-5xl font-extrabold leading-tight">
            {data?.name || "Murodiljon"} <br />
            <span className="relative">
              {data?.role || "Developer"}
              <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-red-500 animate-lineGrow"></span>
            </span>
          </h1>

          <p className="text-gray-700 max-w-md mx-auto md:mx-0 line-clamp-6">
            {data?.bio ||
              "Building modern web apps with performance, clean architecture and scalable systems."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-red-500 transition hover:scale-105 shadow-xl"
            >
              View Projects
            </a>

            {data?.cv_link && (
              <a
                href={data.cv_link}
                target="_blank"
                className="px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition hover:scale-105"
              >
                Download CV
              </a>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center animate-slideInRight">
          {/* rotating ring */}
          <div className="absolute w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] border border-red-500/40 rounded-full animate-spinSlow" />

          {/* glow */}
          <div className="absolute w-[200px] sm:w-[250px] md:w-[320px] h-[200px] sm:h-[250px] md:h-[320px] bg-red-500/20 blur-3xl rounded-full animate-pulse" />

          {/* profile */}
          <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] rounded-2xl overflow-hidden border-4 border-black shadow-2xl z-10 hover:scale-105 transition">
            <img
              src={data?.image || "/img1.jpg"}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>

          {/* badge */}
          <div className="absolute bottom-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-xs animate-bounce shadow-lg">
            ONLINE
          </div>
        </div>
      </div>
    </section>
  );
}
