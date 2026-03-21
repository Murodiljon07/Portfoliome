"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { aboutService } from "@/services/about.service";
import { About } from "@/interface/types/about.types";

type Props = {
  initialData?: About | null;
  onSuccess: () => void;
};

export default function AboutForm({ initialData, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    image: null as File | null,
    cv: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  // edit mode
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        role: initialData.role || "",
        bio: initialData.bio || "",
        image: null,
        cv: null,
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

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("bio", form.bio);

    if (form.image) formData.append("image", form.image);
    if (form.cv) formData.append("cv_link", form.cv);

    try {
      if (initialData) {
        await aboutService.update(initialData.id, formData);
      } else {
        await aboutService.create(formData);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          {initialData ? "Edit About" : "Create About"}
        </h2>

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        />

        <div>
          <label className="text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Image</label>
          <input
            type="file"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] || null })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">CV</label>
          <input
            type="file"
            onChange={(e) =>
              setForm({ ...form, cv: e.target.files?.[0] || null })
            }
          />
        </div>

        <Button onClick={handleSubmit} loading={loading}>
          {initialData ? "Update" : "Create"}
        </Button>
      </div>
    </>
  );
}
