"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Calendar, Trophy, Zap } from "lucide-react";

export default function ActivityCard() {
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [activeSquare, setActiveSquare] = useState<number | null>(null);

  // Generate 20 weeks * 7 days = 140 activity squares
  const totalSquares = 140;
  
  // Custom seed sequence to create realistic learning contribution peaks and troughs
  const generateActivityLevel = (index: number): number => {
    const cycle = Math.sin(index * 0.15) * 2 + Math.cos(index * 0.05) * 1.5;
    if (cycle < -0.5) return 0; // No activity
    if (cycle < 0.5) return 1;  // Low activity (1 hour)
    if (cycle < 1.8) return 2;  // Mid activity (2-3 hours)
    if (cycle < 3.0) return 3;  // High activity (4-5 hours)
    return 4;                   // Peak activity (6+ hours)
  };

  const activitySquares = Array.from({ length: totalSquares }).map((_, idx) => {
    const level = generateActivityLevel(idx);
    const date = new Date(Date.now() - (totalSquares - 1 - idx) * 24 * 60 * 60 * 1000);
    return {
      id: idx,
      level,
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      hours: level === 0 ? "No study" : `${level * 1.5} hrs study`,
    };
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  // Color intensities mapping for study levels
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-zinc-900 border border-zinc-950 hover:bg-zinc-800";
      case 1: return "bg-emerald-950/40 border border-emerald-900/30 text-emerald-400/80 hover:bg-emerald-900/30";
      case 2: return "bg-emerald-800/40 border border-emerald-700/40 text-emerald-300 hover:bg-emerald-800/50";
      case 3: return "bg-emerald-600/50 border border-emerald-500/45 text-emerald-200 hover:bg-emerald-600/60";
      case 4: return "bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-md shadow-emerald-500/10 border border-emerald-300/40 hover:scale-110";
      default: return "bg-zinc-900";
    }
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      whileHover={{
        scale: 1.015,
        borderColor: "rgba(16, 185, 129, 0.35)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        "--mouse-x": `${coords.x}%`,
        "--mouse-y": `${coords.y}%`,
      } as React.CSSProperties}
      className="bento-card card-glow-emerald h-full p-6 flex flex-col justify-between relative group cursor-default"
    >
      <div className="noise-bg" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/15 text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-zinc-100">Learning Activity</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Your study logs normalized across the last 20 weeks</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950/60 border border-zinc-900 text-[10px] font-bold text-zinc-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>Active Logs</span>
        </div>
      </div>

      {/* Custom Tooltip Area */}
      <div className="relative min-h-[24px] mt-4 flex items-center justify-center">
        <AnimatePresence>
          {activeSquare !== null ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.12 }}
              className="absolute -top-1 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300 flex items-center gap-2 shadow-xl shadow-black/45"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{activitySquares[activeSquare].date}:</span>
              <span className="font-bold text-emerald-300">{activitySquares[activeSquare].hours}</span>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest"
            >
              Hover cells to explore active session durations
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Grid Container */}
      <div className="mt-2 p-3 bg-zinc-950/40 rounded-xl border border-zinc-900/60 relative select-none">
        <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5 h-full max-w-full justify-items-center">
          {activitySquares.map((sq) => (
            <div
              key={sq.id}
              onMouseEnter={() => setActiveSquare(sq.id)}
              onMouseLeave={() => setActiveSquare(null)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] transition-all duration-150 cursor-pointer ${getLevelColor(sq.level)}`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-end items-center gap-1.5 mt-3 text-[9px] font-mono text-zinc-500">
          <span>Less</span>
          <div className="w-2 h-2 rounded-[2px] bg-zinc-900 border border-zinc-950" />
          <div className="w-2 h-2 rounded-[2px] bg-emerald-950/40" />
          <div className="w-2 h-2 rounded-[2px] bg-emerald-800/40" />
          <div className="w-2 h-2 rounded-[2px] bg-emerald-600/50" />
          <div className="w-2 h-2 rounded-[2px] bg-emerald-400" />
          <span>More</span>
        </div>
      </div>

      {/* Statistics Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-900/60 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-xl bg-zinc-950/50 border border-zinc-900/60">
          <span className="block text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Month Total</span>
          <span className="block text-xs font-bold text-zinc-200 mt-0.5">32.5 hrs</span>
        </div>
        <div className="p-2 rounded-xl bg-zinc-950/50 border border-zinc-900/60">
          <span className="block text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Weekly Avg</span>
          <span className="block text-xs font-bold text-zinc-200 mt-0.5">7.8 hrs</span>
        </div>
        <div className="p-2 rounded-xl bg-zinc-950/50 border border-zinc-900/60">
          <span className="block text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Global Rank</span>
          <span className="block text-xs font-bold text-emerald-400 mt-0.5">Top 5%</span>
        </div>
      </div>
    </motion.article>
  );
}
