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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
      } else {
        formData.append("image", form.image); // eski rasm
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

      {/* IMAGE FILE INPUT */}
      <div>
        <label className="text-sm font-medium">Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
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
