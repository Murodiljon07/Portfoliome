"use client";

import { useEffect, useState } from "react";
import { projectService } from "@/services/project.service";
import { Project } from "@/interface/types/projects.types";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";
import Button from "@/components/ui/Button";

export default function ProjectAdminPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await projectService.getAll();
    setData(res.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await projectService.remove(id);
    fetchData();
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>

        <Button
          variant="primary"
          handelStye="px-5 py-2.5 text-sm"
          onClick={() =>
            dispatch(openModal({ type: "project", payload: null }))
          }
        >
          + Add
        </Button>
      </div>

      {/* GRID */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* IMAGE */}
              {item.image && (
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                {/* TITLE */}
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                  {item.description}
                </p>

                {/* LINKS */}
                <div className="mt-4 space-y-1 text-sm">
                  {item.repo_link && (
                    <a
                      href={item.repo_link}
                      target="_blank"
                      className="text-blue-500 hover:text-blue-600 transition block"
                    >
                      GitHub
                    </a>
                  )}

                  {item.demo_link && (
                    <a
                      href={item.demo_link}
                      target="_blank"
                      className="text-green-500 hover:text-green-600 transition block"
                    >
                      Live Demo
                    </a>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-white/30">
                  <button
                    onClick={() =>
                      dispatch(
                        openModal({
                          type: "project",
                          payload: item,
                        }),
                      )
                    }
                    className="px-5 py-2.5 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        openModal({
                          type: "confirm",
                          payload: {
                            onConfirm: () => handleDelete(item.id),
                            message:
                              "Do you really want to delete this project?",
                          },
                        }),
                      )
                    }
                    className="px-5 py-2.5 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
