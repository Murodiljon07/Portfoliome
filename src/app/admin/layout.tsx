"use client";

import AdminAside from "@/components/layout/AdminAside";
import GlobalModal from "@/components/ui/GlobalModal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black font-serif">
      <AdminAside />

      <main className="ml-64 p-10">{children}</main>
      <GlobalModal />
    </div>
  );
}
