"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { skillService } from "@/services/skill.service";
import { Skill } from "@/interface/types/skill.types";

type Props = {
  initialData?: Skill | null;
  onSuccess: () => void;
};

export default function SkillForm({ initialData, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    percentage: 50,
    order: 0,
    icon: "",
  });

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        percentage: initialData.percentage || 50,
        order: initialData.order || 0,
        icon: initialData.icon || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, percentage: Number(e.target.value) });
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setIconFile(file);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("percentage", String(form.percentage));
      formData.append("order", String(form.order));

      if (iconFile) {
        formData.append("icon", iconFile);
      } else {
        formData.append("icon", form.icon);
      }

      if (initialData) {
        await skillService.update(initialData.id, formData);
      } else {
        await skillService.create(formData);
      }

      onSuccess();
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {initialData ? "Edit Skill" : "Create Skill"}
      </h2>

      {/* ICON */}
      <div>
        <label className="text-sm font-medium">Icon</label>

        <label className="block cursor-pointer w-fit mt-2">
          {iconFile || form.icon ? (
            <img
              src={iconFile ? URL.createObjectURL(iconFile) : form.icon}
              className="w-20 h-20 object-cover rounded"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed rounded text-gray-400 text-xs">
              Upload
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleIconChange}
            className="hidden"
          />
        </label>
      </div>

      <Input
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      {/* RANGE SLIDER */}
      <div>
        <label className="text-sm font-medium">
          Percentage: {form.percentage}%
        </label>

        <input
          type="range"
          min={0}
          max={100}
          value={form.percentage}
          onChange={handleRangeChange}
          className="w-full mt-2"
        />

        {/* PREVIEW BAR */}
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div
            className="h-2 bg-blue-500 rounded transition-all"
            style={{ width: `${form.percentage}%` }}
          />
        </div>
      </div>

      <Input
        label="Order"
        name="order"
        type="number"
        value={form.order.toString()}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit} loading={loading}>
        {initialData ? "Update" : "Create"}
      </Button>
    </div>
  );
}
