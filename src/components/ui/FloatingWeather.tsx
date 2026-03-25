"use client";

import { useEffect, useState } from "react";

export default function FloatingWeather() {
  const [time, setTime] = useState("");
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("uz-UZ", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=44e6e1484a1e77f6267a01aee10811a7&units=metric`,
        );

        const data = await res.json();

        if (data?.main?.temp) {
          setTemp(Math.round(data.main.temp));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="fixed top-24 right-6 z-40 animate-float">
      <div className="px-5 py-3 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl flex items-center gap-4 hover:scale-105 transition text-black">
        {/* 🌤 TEMP */}
        <div className="text-lg font-semibold">
          {temp !== null
            ? `${temp >= 10 ? `🌤 ${temp}` : `🥶 ${temp}`} °C`
            : "⏳"}
        </div>

        {/* ⏰ TIME */}
        <div className="text-sm font-mono tracking-wider">{time}</div>
      </div>

      {/* ✨ floating animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
