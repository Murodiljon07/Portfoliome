"use client";

import { useEffect, useState } from "react";
import { contactService } from "@/services/contact.service";
import { Contact } from "@/interface/index";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";

export default function ContactAdminPage() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
    if (!confirm("Delete this message?")) return;
    await contactService.remove(id);
    fetchData();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Contact Messages</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.email}</td>
                <td className="p-2 border">{item.subject}</td>

                <td className="p-2 border space-x-2">
                  <button
                    onClick={() =>
                      dispatch(openModal({ type: "contact", payload: item }))
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
