"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
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

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    const [pRes, sRes, cRes] = await Promise.all([
      projectService.getAll(),
      skillService.getAll(),
      contactService.getAll(),
    ]);

    setProjects(pRes.results);
    setSkills(sRes.results);
    setContacts(cRes.results);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // chart data
  const chartData = skills.map((s) => ({
    name: s.name,
    value: s.percentage,
  }));

  return (
    <div className="space-y-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-gray-500">Projects</p>
          <h2 className="text-2xl font-bold">{projects.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-gray-500">Skills</p>
          <h2 className="text-2xl font-bold">{skills.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-gray-500">Messages</p>
          <h2 className="text-2xl font-bold">{contacts.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-gray-500">Avg Skill %</p>
          <h2 className="text-2xl font-bold">
            {skills.length
              ? Math.round(
                  skills.reduce((acc, s) => acc + s.percentage, 0) /
                    skills.length,
                )
              : 0}
            %
          </h2>
        </div>
      </div>

      {/* RECENT + CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT PROJECTS */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">Recent Projects</h2>

          <div className="space-y-3">
            {projects.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT CONTACTS */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">Recent Messages</h2>

          <div className="space-y-3">
            {contacts.slice(0, 5).map((c) => (
              <div key={c.id} className="border-b pb-2">
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
                <p className="text-sm">{c.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Skills Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
