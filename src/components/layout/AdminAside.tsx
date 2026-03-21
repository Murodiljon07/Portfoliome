"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { paths } from "../../data/pathData";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/ModalSlice";

export default function AdminAside() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-6">
      {/* HEADER */}
      <div className="text-center border-b border-gray-200 pb-5">
        <h1 className="text-xl font-bold tracking-widest uppercase">Admin</h1>
        <p className="text-[11px] text-gray-400 mt-1 tracking-wide">
          Newspaper Panel
        </p>
      </div>

      {/* NAV */}
      <nav className="mt-10 space-y-2 grow-1">
        {paths.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.admin || item.href}
              className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300
              
              ${
                isActive
                  ? "text-black font-medium"
                  : "text-gray-500 hover:text-black"
              }
              `}
            >
              {/* ICON */}
              <Icon
                className={`w-4 h-4 transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />

              {/* TEXT */}
              <span>{item.name}</span>

              {/* ACTIVE UNDERLINE */}
              <span
                className={`absolute left-3 -bottom-1 h-[2px] bg-black rounded-full transition-all duration-300
                ${
                  isActive
                    ? "w-[60%] opacity-100"
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
                  onConfirm: "onLogout",
                  message: "Are you sure you want to logout?",
                },
              }),
            )
          }
          className="group flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-all duration-300"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
          Logout
        </button>

        <p className="text-[10px] text-gray-400 mt-4 tracking-wide">
          © {new Date().getFullYear()} Classic Admin
        </p>
      </div>
    </aside>
  );
}
