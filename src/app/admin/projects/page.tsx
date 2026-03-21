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
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Projects</h1>

        <Button
          variant="primary"
          handelStye="w-[80px]"
          onClick={() =>
            dispatch(openModal({ type: "project", payload: null }))
          }
        >
          + Add
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        /* GRID LAYOUT */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              {/* IMAGE */}
              {item.image && (
                <img
                  src={item.image}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}

              {/* TITLE */}
              <h2 className="text-lg font-semibold">{item.title}</h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {item.description}
              </p>

              {/* LINKS */}
              <div className="mt-2 text-sm space-y-1">
                {item.repo_link && (
                  <a
                    href={item.repo_link}
                    target="_blank"
                    className="text-blue-500 underline block"
                  >
                    GitHub
                  </a>
                )}

                {item.demo_link && (
                  <a
                    href={item.demo_link}
                    target="_blank"
                    className="text-green-500 underline block"
                  >
                    Live Demo
                  </a>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 mt-auto pt-4">
                <Button
                  onClick={() =>
                    dispatch(
                      openModal({
                        type: "project",
                        payload: item,
                      }),
                    )
                  }
                  handelStye="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </Button>

                <Button
                  onClick={() =>
                    dispatch(
                      openModal({
                        type: "confirm",
                        payload: {
                          onConfirm: () => handleDelete(item.id),
                        },
                      }),
                    )
                  }
                  handelStye="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
