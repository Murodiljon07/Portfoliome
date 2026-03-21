"use client";

import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { paths } from "../../data/pathData";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";

export default function AdminAside() {
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push("/auth/login");
  };

  const dispatch = useDispatch();
  const pathname = usePathname();

  // normalize current path (e.g. /admin/projects -> projects)
  const currentPath = pathname.split("/").filter(Boolean).pop();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white/70 backdrop-blur-xl border-r border-gray-200 flex flex-col justify-between p-6">
      {/* HEADER */}
      <div className="text-center border-b border-gray-200 pb-5">
        <h1 className="text-xl font-bold tracking-widest uppercase">Admin</h1>
        <p className="text-xs text-gray-400 mt-1 tracking-wide">
          Newspaper Panel
        </p>
      </div>

      {/* NAV */}
      <nav className="mt-10 space-y-1.5 flex-1">
        {paths.map((item) => {
          const Icon = item.icon;
          const targetHref = item.admin || item.href;

          const targetPath = targetHref.split("/").filter(Boolean).pop();

          const isActive = currentPath === targetPath;

          return (
            <Link
              key={item.name}
              href={targetHref}
              className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ease-out

              ${
                isActive
                  ? "text-black font-semibold bg-black/5"
                  : "text-gray-500 hover:text-black hover:bg-black/5"
              }
              `}
            >
              {/* ICON */}
              <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                  isActive
                    ? "text-black scale-110"
                    : "text-gray-400 group-hover:text-black group-hover:scale-110 group-hover:translate-x-[1px]"
                }`}
              />

              {/* TEXT */}
              <span>{item.name}</span>

              {/* ACTIVE INDICATOR */}
              <span
                className={`absolute left-4 bottom-1 h-[2px] bg-black rounded-full transition-all duration-300
                ${
                  isActive
                    ? "w-[50%] opacity-100"
                    : "w-0 opacity-0 group-hover:w-[40%] group-hover:opacity-100"
                }
              `}
              />
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-gray-200 pt-5">
        <button
          onClick={() =>
            dispatch(
              openModal({
                type: "confirm",
                payload: {
                  onConfirm: handleLogout,
                  message: "Are you sure you want to logout?",
                },
              }),
            )
          }
          className="group w-full flex items-center justify-center cursor-pointer gap-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          Logout
        </button>

        <p className="text-[12px] text-gray-400 mt-4 tracking-wide text-center">
          © {new Date().getFullYear()} Classic Admin
        </p>
      </div>
    </aside>
  );
}
