"use client";

import { useEffect, useState } from "react";
import { experienceService } from "@/services/experience.service";
import { Experience } from "@/interface/types/experience.types";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await experienceService.getAll();
      setExperiences(res.results);
    };

    fetchData();
  }, []);

  return (
    <section
      id="experience"
      className="relative py-24 px-6 bg-white text-black overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Work <span className="text-red-500">Experience</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            My professional journey and the roles I have worked in.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative border-l border-black/20 pl-6 space-y-10">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="relative group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* DOT */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 bg-red-500 rounded-full border-4 border-white group-hover:scale-125 transition" />

              {/* CARD */}
              <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm hover:shadow-xl transition duration-500 hover:-translate-y-1">
                {/* TOP */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {exp.role} @ {exp.company}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {exp.start_date} — {exp.end_date || "Present"}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
