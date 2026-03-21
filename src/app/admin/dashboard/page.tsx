"use client";

import { useEffect, useState } from "react";
import { projectService } from "@/services/project.service";
import { skillService } from "@/services/skill.service";
import { contactService } from "@/services/contact.service";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FolderIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  const fetchData = async () => {
    const [pRes, sRes, cRes] = await Promise.all([
      projectService.getAll(),
      skillService.getAll(),
      contactService.getAll(),
    ]);

    setProjects(pRes.results);
    setSkills(sRes.results);
    setContacts(cRes.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = skills.map((s) => ({
    name: s.name,
    value: s.percentage,
  }));

  const avgSkill = skills.length
    ? Math.round(
        skills.reduce((acc, s) => acc + s.percentage, 0) / skills.length,
      )
    : 0;

  const kpis = [
    { title: "Projects", value: projects.length, icon: FolderIcon },
    { title: "Skills", value: skills.length, icon: CodeBracketIcon },
    {
      title: "Messages",
      value: contacts.length,
      icon: ChatBubbleLeftRightIcon,
    },
    { title: "Avg Skill %", value: avgSkill, icon: ChartBarIcon },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-100 text-gray-900 transition-all duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;

          return (
            <div
              key={i}
              className="group relative rounded-2xl p-5 bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{kpi.title}</p>
                  <h2 className="text-2xl font-bold mt-1">{kpi.value}</h2>
                </div>

                <div className="p-3 rounded-xl bg-white/60 backdrop-blur shadow-sm transition group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PROJECTS */}
        <div className="rounded-2xl p-5 bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm transition hover:shadow-lg">
          <h2 className="font-semibold mb-4">Recent Projects</h2>

          <div className="space-y-3 overflow-scroll">
            {projects.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-white/50 hover:bg-white/70 transition"
              >
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACTS */}
        <div className="rounded-2xl p-5 bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm transition hover:shadow-lg">
          <h2 className="font-semibold mb-4">Recent Messages</h2>

          <div className="space-y-3">
            {contacts.slice(0, 5).map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-white/50 hover:bg-white/70 transition"
              >
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
                <p className="text-sm">{c.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="rounded-2xl p-6 bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm transition hover:shadow-lg">
        <h2 className="font-semibold mb-4">Skills Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
              }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
