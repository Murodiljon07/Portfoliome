"use client";

import { useEffect, useState } from "react";
import { aboutService } from "@/services/about.service";
import { About } from "@/interface/types/about.types";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";
import Button from "@/components/ui/Button";

export default function AboutAdminPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState<About[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await aboutService.getAll();
    setData(res.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await aboutService.remove(id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>

        <Button
          handelStye="px-5 py-2.5 text-sm"
          variant="primary"
          onClick={() => dispatch(openModal({ type: "about", payload: null }))}
        >
          + Add
        </Button>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-white/60 border-b border-white/40">
            <tr className="text-left text-gray-600">
              <th className="p-5">Image</th>
              <th className="p-5">Name</th>
              <th className="p-5">Role</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-8 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-white/30 hover:bg-white/50 transition"
                >
                  {/* IMAGE */}
                  <td className="p-5">
                    <img
                      src={item.image}
                      className="w-14 h-14 object-cover rounded-xl mx-auto shadow-sm"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-5 text-base font-medium">{item.name}</td>

                  {/* ROLE */}
                  <td className="p-5 text-gray-600 text-base">{item.role}</td>

                  {/* ACTIONS */}
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          dispatch(openModal({ type: "about", payload: item }))
                        }
                        className="px-4 py-2 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm flex items-center gap-1"
                      >
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() =>
                          dispatch(
                            openModal({
                              type: "confirm",
                              payload: {
                                onConfirm: () => handleDelete(item.id),
                                message: "Do you really want to delete it?",
                              },
                            }),
                          )
                        }
                        className="px-4 py-2 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm flex items-center gap-1"
                      >
                        <span>Delete</span>
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
