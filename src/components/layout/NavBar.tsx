"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { paths } from "@/data/pathData";
import avatar from "@/data/me/avatar.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash.replace("#", ""));
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center pt-4">
      {/* 🔮 Dynamic Island Container */}
      <div
        className={`transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-lg scale-95"
            : "bg-white/40 backdrop-blur-xl"
        }
        rounded-full px-6 py-3 border border-black/10 flex items-center justify-between
        w-[95%] max-w-5xl`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src={avatar.src}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-black/10"
            alt="avatar"
          />
          <span className="font-semibold hidden sm:block">Murodiljon</span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {paths.map((item, i) => {
            const Icon = item.icon;
            if (item.admin) return null;

            // Keyin:
            const isActive = hash === item.href;
            return (
              <Link
                key={i}
                href={`#${item.href}`}
                className="relative group flex items-center gap-1 text-sm"
              >
                <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />

                <span
                  className={`transition ${
                    isActive ? "text-black" : "text-gray-500"
                  }`}
                >
                  {item.name}
                </span>

                {/* underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* LOGIN + MOBILE BTN */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden md:block px-5 py-2 rounded-full bg-black text-white hover:scale-105 transition"
          >
            Login
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            {open ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE DROPDOWN (glass card) */}
      <div
        className={`md:hidden absolute top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-xl border rounded-2xl shadow-xl p-4 space-y-2">
          {paths.map((item, i) => {
            const Icon = item.icon;
            if (item.admin) return null;

            return (
              <Link
                key={i}
                href={`#${item.href}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
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
