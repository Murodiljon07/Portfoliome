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
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">About</h1>

        <Button
          handelStye="w-[80px]"
          variant="primary"
          onClick={() => dispatch(openModal({ type: "about", payload: null }))}
        >
          + Add
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={item.image}
                    className="w-12 h-12 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.role}</td>
                <td className="p-2 border space-x-2">
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={() =>
                        dispatch(openModal({ type: "about", payload: item }))
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
                              message: `Do you really want to delete it?`,
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
