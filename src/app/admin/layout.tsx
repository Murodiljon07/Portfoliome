"use client";

import AdminAside from "@/components/layout/AdminAside";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black font-serif">
      <AdminAside onLogout={handleLogout} />

      <main className="ml-64 p-10">{children}</main>
    </div>
  );
}
