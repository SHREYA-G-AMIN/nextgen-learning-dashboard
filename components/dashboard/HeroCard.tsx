"use client";

import { motion } from "framer-motion";
import { Award, Flame, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

interface HeroCardProps {
  name: string;
  streak: number;
}

export default function HeroCard({ name, streak }: HeroCardProps) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  // Dynamically update the mouse position variables to create a realistic moving radial hover glow!
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  // Mock checklist of the current week (7 days) to show streak progress
  const WEEK_DAYS = [
    { day: "M", active: true },
    { day: "T", active: true },
    { day: "W", active: true },
    { day: "T", active: true },
    { day: "F", active: true },
    { day: "S", active: true },
    { day: "S", active: false },
  ];

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      whileHover={{ 
        scale: 1.015,
        borderColor: "rgba(139, 92, 246, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        // Define CSS Custom Properties for mouse coordinates to run the glowing gradients smoothly
        "--mouse-x": `${coords.x}%`,
        "--mouse-y": `${coords.y}%`,
      } as React.CSSProperties}
      className="bento-card card-glow-violet h-full p-6 flex flex-col justify-between relative group cursor-default"
    >
      {/* Background visual texture overlays */}
      <div className="noise-bg" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-violet-600/10 via-fuchsia-500/5 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />

      {/* Greeting Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-mono text-[10px] font-semibold border border-violet-500/15 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-violet-400" /> LEVEL 4 ARCHITECT
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">{name}</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
            You are in the top 3% of learners this week. Complete today's hardware animation module to sustain your status!
          </p>
        </div>

        {/* Dynamic Streak Badge */}
        <div className="flex items-center gap-3 bg-zinc-950/60 border border-zinc-900 px-4 py-2.5 rounded-2xl shadow-inner shadow-black/20 self-start sm:self-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/15 border border-amber-500/20 flex items-center justify-center relative">
            <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Daily Streak
            </div>
            <div className="text-lg font-black text-white leading-none mt-0.5">
              {streak} Days
            </div>
          </div>
        </div>
      </div>

      {/* Check-in Calendar Track & Metric Section */}
      <div className="mt-8 pt-5 border-t border-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Weekly activity log dots */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Sustaining Status Progress
          </span>
          <div className="flex items-center gap-2">
            {WEEK_DAYS.map((day, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors duration-300 ${
                    day.active
                      ? "bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 border-violet-500/35 text-violet-300 shadow-md shadow-violet-500/5"
                      : "bg-zinc-950/80 border-zinc-900 text-zinc-600"
                  }`}
                >
                  {day.day}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini stat panels */}
        <div className="flex gap-4">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 mt-0.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                XP Earned
              </div>
              <div className="text-sm font-bold text-zinc-200">
                +1,420 XP
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 border-l border-zinc-900/80 pl-4">
            <div className="p-1.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/10 text-fuchsia-400 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Certificates
              </div>
              <div className="text-sm font-bold text-zinc-200">
                2 Earned
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
