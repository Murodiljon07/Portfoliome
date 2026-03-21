"use client";

import { useEffect, useState } from "react";
import { projectService } from "@/services/project.service";
import { Project } from "@/interface/types/projects.types";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await projectService.getAll();
      setProjects(res.results);
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-white text-black overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="text-red-500">Projects</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            A collection of my work focusing on performance, clean architecture
            and modern UI.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* IMAGE */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {project.description}
                </p>

                {/* TECH */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.split(",").map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-black/5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-2">
                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-red-500 transition"
                    >
                      Live
                    </a>
                  )}

                  {project.repo_link && (
                    <a
                      href={project.repo_link}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-full border border-black hover:bg-black hover:text-white transition"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
