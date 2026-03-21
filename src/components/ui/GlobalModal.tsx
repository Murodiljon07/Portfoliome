"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal } from "@/store/features/ModalSlice";
import AboutForm from "@/components/forms/AboutForm";

export default function GlobalModal() {
  const dispatch = useDispatch();
  const { isOpen, type, payload } = useSelector(
    (state: RootState) => state.modal,
  );

  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case "about":
        return (
          <AboutForm
            initialData={payload}
            onSuccess={() => dispatch(closeModal())}
          />
        );

      // future:
      // case "project": return <ProjectForm />
      // case "skill": return <SkillForm />

      default:
        return <p>Unknown modal type</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">
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
