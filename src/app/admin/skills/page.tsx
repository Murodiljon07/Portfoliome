"use client";

import { useEffect, useState } from "react";
import { skillService } from "@/services/skill.service";
import { Skill } from "@/interface/types/skill.types";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";
import Button from "@/components/ui/Button";

export default function SkillAdminPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await skillService.getAll();
    setData(res.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await skillService.remove(id);
    fetchData();
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Skills</h1>

        <Button
          handelStye="w-[80px]"
          variant="primary"
          onClick={() => dispatch(openModal({ type: "skill", payload: null }))}
        >
          + Add
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition relative overflow-hidden"
            >
              {/* TOP SECTION */}
              <div className="flex items-center gap-4">
                {item.icon && (
                  <img
                    src={item.icon}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                )}

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-500">Order: {item.order}</p>
                </div>

                <div className="text-right">
                  <span className="text-xl font-bold text-blue-600">
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* STACKED PROGRESS */}
              <div className="mt-5 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 mt-5">
                <Button
                  onClick={() =>
                    dispatch(openModal({ type: "skill", payload: item }))
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

              {/* DECORATIVE BACKGROUND */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-50" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
