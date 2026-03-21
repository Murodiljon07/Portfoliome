"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { experienceService } from "@/services/experience.service";
import { Experience } from "@/interface/types/experience.types";

type Props = {
  initialData?: Experience | null;
  onSuccess: () => void;
};

export default function ExperienceForm({ initialData, onSuccess }: Props) {
  const [form, setForm] = useState({
    role: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        role: initialData.role || "",
        company: initialData.company || "",
        start_date: initialData.start_date || "",
        end_date: initialData.end_date || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (initialData) {
        await experienceService.update(initialData.id, form);
      } else {
        await experienceService.create(form);
      }

      onSuccess();
    } catch (err: any) {
      console.log("ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {initialData ? "Edit Experience" : "Create Experience"}
      </h2>

      <Input
        label="Role"
        name="role"
        value={form.role}
        onChange={handleChange}
      />

      <Input
        label="Company"
        name="company"
        value={form.company}
        onChange={handleChange}
      />

      <Input
        type="date"
        label="Start Date"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
      />

      <Input
        type="date"
        label="End Date"
        name="end_date"
        value={form.end_date}
        onChange={handleChange}
      />

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <Button onClick={handleSubmit} loading={loading}>
        {initialData ? "Update" : "Create"}
      </Button>
    </div>
  );
}
