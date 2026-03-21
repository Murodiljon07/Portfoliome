"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/* icons */
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

/* data */
import { paths } from "@/data/pathData";
import avatar from "@/data/me/avatar.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  const pathname = usePathname();

  /* scroll shadow */
  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        shadow
          ? "bg-white/90 backdrop-blur border-b shadow-sm"
          : "bg-white/70 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Avatar + Name */}
          <div className="flex items-center gap-3">
            <img
              src={avatar.src}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-semibold text-lg tracking-tight">
              Murodiljon
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {paths.map((item, i) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={i}
                  href={`#${item.href}`}
                  className={`relative flex items-center gap-1 text-sm transition whitespace-nowrap
                  ${
                    isActive
                      ? "text-black font-medium"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  <Icon className="w-4 h-4 hidden lg:block" />
                  {item.name}

                  {/* active underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-black rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* LOGIN */}
            <Link
              href="/auth/login"
              className="ml-3 px-4 py-2 text-sm bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] border-t" : "max-h-0"
        } bg-white`}
      >
        <div className="px-4 py-3 space-y-1">
          {paths.map((item, i) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={i}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
