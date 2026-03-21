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
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Experiences</h1>

        <Button
          handelStye="w-[80px]"
          variant="primary"
          onClick={() => dispatch(openModal({ type: "experience" }))}
        >
          + Add
        </Button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Start</th>
              <th className="p-2 border">End</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.role}</td>
                <td className="p-2 border">{item.company}</td>
                <td className="p-2 border">{item.start_date}</td>
                <td className="p-2 border">{item.end_date || "-"}</td>

                <td className="p-2 border space-x-2">
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={() =>
                        dispatch(
                          openModal({
                            type: "experience",
                            payload: item,
                          }),
                        )
                      }
                      handelStye="w-[50px] px-3 py-1 bg-blue-500 text-white rounded"
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
                      handelStye="w-[50px] px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
