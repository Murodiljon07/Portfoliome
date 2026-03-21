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
    image: "",
    cv_link: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        role: initialData.role || "",
        bio: initialData.bio || "",
        image: initialData.image || "",
        cv_link: initialData.cv_link || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("bio", form.bio);
      formData.append("cv_link", form.cv_link);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (initialData) {
        await aboutService.update(initialData.id, formData);
      } else {
        await aboutService.create(formData);
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
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Image</label>

        <label className="block mt-2 cursor-pointer w-fit">
          {imageFile || form.image ? (
            <div className="relative w-24 h-24">
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : form.image}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-xs rounded transition">
                Change
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded text-gray-500 text-sm hover:bg-gray-50">
              Browse Image
            </div>
          )}

          {/* yashirin input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <Input
        label="CV Link"
        name="cv_link"
        value={form.cv_link}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit} loading={loading}>
        {initialData ? "Update" : "Create"}
      </Button>
    </div>
  );
}
