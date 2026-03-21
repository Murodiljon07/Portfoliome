"use client";

import { useEffect, useState } from "react";
import { contactService } from "@/services/contact.service";
import { Contact } from "@/interface/types/contact.types";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";

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
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Contact Messages
        </h1>
      </div>

      {/* TABLE CONTAINER */}
      <div className="rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm">
        <table className="w-full text-base">
          {/* HEADER */}
          <thead className="bg-white/60 border-b border-white/40">
            <tr className="text-left text-gray-600">
              <th className="p-6">Name</th>
              <th className="p-6">Email</th>
              <th className="p-6">Subject</th>
              <th className="p-6">Message</th>
              <th className="p-6">Date</th>
              <th className="p-6 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-10 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-white/30 hover:bg-white/50 transition"
                >
                  <td className="p-6 font-medium">{item.name}</td>

                  <td className="p-6 text-gray-700">{item.email}</td>

                  <td className="p-6 text-gray-700">{item.subject}</td>

                  <td className="p-6 max-w-[260px] truncate text-gray-700">
                    {item.message}
                  </td>

                  <td className="p-6 text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-6">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() =>
                          dispatch(
                            openModal({
                              type: "onlyView",
                              payload: item,
                            }),
                          )
                        }
                        className="px-5 py-2.5 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          dispatch(
                            openModal({
                              type: "confirm",
                              payload: {
                                onConfirm: () => handleDelete(item.id),
                                message:
                                  "Do you really want to delete this message?",
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
