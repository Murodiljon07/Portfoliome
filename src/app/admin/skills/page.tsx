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
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>

        <Button
          handelStye="px-5 py-2.5 text-sm"
          variant="primary"
          onClick={() => dispatch(openModal({ type: "skill", payload: null }))}
        >
          + Add
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-auto">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl p-5 bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* HEADER */}
              <div className="flex items-center gap-4">
                {/* ICON */}
                {item.icon && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/60 flex items-center justify-center shadow-sm">
                    <img src={item.icon} className="w-10 h-10 object-contain" />
                  </div>
                )}

                {/* INFO */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-500">Order: {item.order}</p>
                </div>

                {/* PERCENT */}
                <div className="text-right">
                  <span className="text-xl font-bold text-blue-600">
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mt-6 h-3 bg-gray-200/70 rounded-full overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/30">
                <button
                  onClick={() =>
                    dispatch(
                      openModal({
                        type: "skill",
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
                          item: null,
                          onConfirm: () => handleDelete(item.id),
                          message: "Do you really want to delete this skill?",
                        },
                      }),
                    )
                  }
                  className="px-5 py-2.5 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
                >
                  Delete
                </button>
              </div>

              {/* DECORATION */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
