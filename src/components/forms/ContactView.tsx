"use client";

import { useDispatch } from "react-redux";
import { closeModal } from "@/store/features/ModalSlice";
import Button from "@/components/ui/Button";

export default function ContactView({ data }: any) {
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Message Detail</h2>

      <div className="space-y-2 text-sm">
        <p>
          <b>Name:</b> {data.name}
        </p>
        <p>
          <b>Email:</b>{" "}
          <a href={`mailto:${data.email}`} className="text-blue-500 underline">
            {data.email}
          </a>
        </p>
        <p>
          <b>Subject:</b> {data.subject}
        </p>

        <div>
          <b>Message:</b>
          <p className="mt-1 p-2 bg-gray-100 rounded">{data.message}</p>
        </div>

        <p className="text-gray-500 text-xs">
          {new Date(data.created_at).toLocaleString()}
        </p>
      </div>

      <div className="mt-4 text-right">
        <Button
          onClick={() => dispatch(closeModal())}
          handelStye="px-4 py-2 bg-black text-white rounded"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
