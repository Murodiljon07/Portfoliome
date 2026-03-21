"use client";

import { useEffect, useState } from "react";
import { skillService } from "@/services/skill.service";
import { Skill } from "@/interface/types/skill.types";

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await skillService.getAll();
      setSkills(res.results);
    };

    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 bg-white text-black overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="text-red-500">Skills</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Technologies I use to build modern, scalable and performant web
            applications.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              className="group border border-black/10 rounded-2xl p-5 bg-white shadow-sm hover:shadow-xl transition duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* TOP */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {skill.icon && (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <h3 className="font-semibold">{skill.name}</h3>
                </div>

                <span className="text-sm text-gray-500">
                  {skill.percentage}%
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-1000 ease-out group-hover:bg-black"
                  style={{
                    width: `${skill.percentage}%`,
                  }}
                />
              </div>

              {/* HOVER EFFECT TEXT */}
              <div className="mt-3 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                Proficiency level
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
