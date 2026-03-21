"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { projectService } from "@/services/project.service";
import { Project } from "@/interface/types/projects.types";

type Props = {
  initialData?: Project | null;
  onSuccess: () => void;
};

export default function ProjectForm({ initialData, onSuccess }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    demo_link: "",
    repo_link: "",
    order: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        technologies: initialData.technologies || "",
        demo_link: initialData.demo_link || "",
        repo_link: initialData.repo_link || "",
        order: String(initialData.order || ""),
        image: initialData.image || "",
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
    if (file) setImageFile(file);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("technologies", form.technologies);
      formData.append("demo_link", form.demo_link);
      formData.append("repo_link", form.repo_link);
      formData.append("order", form.order);

      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("image", form.image);
      }

      if (initialData) {
        await projectService.update(initialData.id, formData);
      } else {
        await projectService.create(formData);
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
        {initialData ? "Edit Project" : "Create Project"}
      </h2>

      {/* IMAGE */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Image</label>

        <label className="block cursor-pointer w-fit">
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

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg"
        />
      </div>

      <Input
        label="Technologies"
        name="technologies"
        value={form.technologies}
        onChange={handleChange}
      />

      <Input
        label="Demo Link"
        name="demo_link"
        value={form.demo_link}
        onChange={handleChange}
      />

      <Input
        label="Repo Link"
        name="repo_link"
        value={form.repo_link}
        onChange={handleChange}
      />

      <Input
        label="Order"
        name="order"
        type="number"
        value={form.order}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit} loading={loading}>
        {initialData ? "Update" : "Create"}
      </Button>
    </div>
  );
}
