"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal } from "@/store/features/ModalSlice";
import AboutForm from "@/components/forms/AboutForm";
import Button from "./Button";
import ContactView from "../forms/ContactView";

export default function GlobalModal() {
  const dispatch = useDispatch();
  const { isOpen, type, payload } = useSelector(
    (state: RootState) => state.modal,
  );

  const renderContent = () => {
    switch (type) {
      case "confirm":
        return (
          <div className="text-center">
            <p className="mb-4">{payload?.message || "Are you sure?"}</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => dispatch(closeModal())}
                handelStye="px-4 py-2 bg-gray-500 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  payload?.onConfirm();
                  dispatch(closeModal());
                }}
                handelStye="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </Button>
            </div>
          </div>
        );

      case "onlyView":
        return <ContactView data={payload} />;

      case "about":
        return (
          <AboutForm
            initialData={payload}
            onSuccess={() => dispatch(closeModal())}
          />
        );

      default:
        return <p>Unknown modal type</p>;
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={() => dispatch(closeModal())}
        className="absolute inset-0 bg-black/40"
      />

      {/* Modal box */}
      <div
        className={`bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {renderContent()}
      </div>
    </div>
  );
}
