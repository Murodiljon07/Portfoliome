"use client";

import AdminAside from "@/components/layout/AdminAside";
import GlobalModal from "@/components/ui/GlobalModal";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black font-serif">
      <AdminAside />

      <main className="ml-64 p-10">{children}</main>
      <GlobalModal />
    </div>
  );
}
