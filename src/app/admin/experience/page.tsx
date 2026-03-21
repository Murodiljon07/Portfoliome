"use client";

import { useEffect, useState } from "react";
import { experienceService } from "@/services/experience.service";
import { Experience } from "@/interface/types/experience.types";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";
import Button from "@/components/ui/Button";

export default function ExperienceAdminPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await experienceService.getAll();
    setData(res.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await experienceService.remove(id);
    fetchData();
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Experiences</h1>

        <Button
          handelStye="px-5 py-2.5 text-sm"
          variant="primary"
          onClick={() =>
            dispatch(openModal({ type: "experience", payload: null }))
          }
        >
          + Add
        </Button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm">
        <table className="w-full text-base">
          {/* HEADER */}
          <thead className="bg-white/60 border-b border-white/40">
            <tr className="text-left text-gray-600">
              <th className="p-6">Role</th>
              <th className="p-6">Company</th>
              <th className="p-6">Start</th>
              <th className="p-6">End</th>
              <th className="p-6 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-10 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-white/30 hover:bg-white/50 transition"
                >
                  {/* ROLE */}
                  <td className="p-6 font-medium">{item.role}</td>

                  {/* COMPANY */}
                  <td className="p-6 text-gray-700">{item.company}</td>

                  {/* START */}
                  <td className="p-6 text-gray-600">{item.start_date}</td>

                  {/* END */}
                  <td className="p-6 text-gray-600">{item.end_date || "-"}</td>

                  {/* ACTIONS */}
                  <td className="p-6">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() =>
                          dispatch(
                            openModal({
                              type: "experience",
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
                                  "Do you really want to delete this experience?",
                              },
                            }),
                          )
                        }
                        className="px-5 py-2.5 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
