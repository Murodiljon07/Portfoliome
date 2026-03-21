"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: "",
      general: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    let newError = { email: "", password: "", general: "" };

    if (!form.email) {
      newError.email = "Email kiriting";
      hasError = true;
    }

    if (!form.password) {
      newError.password = "Parol kiriting";
      hasError = true;
    }

    setError(newError);
    if (hasError) return;

    try {
      setLoading(true);

      await authService.login(form);

      // success -> dashboard
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError({
        ...newError,
        general: "Login yoki parol noto‘g‘ri",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md border rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <Button
            handelStye="w-[70px] relative left-1  hover:bg-red-500 hover:text-white"
            variant="secondary"
            children="Cancel"
            onClick={() => router.push("/")}
          ></Button>
          <h1 className="text-2xl font-semibold">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={error.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={error.password}
          />

          {/* GENERAL ERROR */}
          {error.general && (
            <p className="text-sm text-red-500 text-center">{error.general}</p>
          )}

          <Button type="submit" loading={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
