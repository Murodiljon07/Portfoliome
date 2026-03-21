"use client";

import { useEffect, useState } from "react";
import { contactService } from "@/services/contact.service";
import { Contact } from "@/interface/types/contact.types";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";
import Button from "@/components/ui/Button";

export default function ContactAdminPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await contactService.getAll();
    setData(res.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await contactService.remove(id);
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Contact Messages</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.email}</td>
                <td className="p-2 border">{item.subject}</td>
                <td className="p-2 border max-w-[200px] truncate">
                  {item.message}
                </td>
                <td className="p-2 border">
                  {new Date(item.created_at).toLocaleString()}
                </td>
                <td className="p-2 border">
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={() =>
                        dispatch(
                          openModal({
                            type: "onlyView",
                            payload: item,
                          }),
                        )
                      }
                      handelStye="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      View
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
