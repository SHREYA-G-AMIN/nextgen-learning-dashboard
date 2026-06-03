"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  index: number;
}

// Map Lucide icons safely so that tree shaking remains functional and clean
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Layers: Icons.Layers,
  Cpu: Icons.Cpu,
  Zap: Icons.Zap,
  Database: Icons.Database,
  BookOpen: Icons.BookOpen,
};

export default function CourseCard({ course, index }: CourseCardProps) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  // Map indexes to a custom theme palette for maximum visual aesthetics
  const palettes = [
    { name: "cyan", glow: "card-glow-cyan", iconColor: "text-cyan-400", bar: "from-cyan-500 to-teal-400", bgGlow: "from-cyan-500/10" },
    { name: "violet", glow: "card-glow-violet", iconColor: "text-violet-400", bar: "from-violet-500 to-indigo-400", bgGlow: "from-violet-500/10" },
    { name: "fuchsia", glow: "card-glow-fuchsia", iconColor: "text-fuchsia-400", bar: "from-fuchsia-500 to-pink-400", bgGlow: "from-fuchsia-500/10" },
    { name: "emerald", glow: "card-glow-emerald", iconColor: "text-emerald-400", bar: "from-emerald-500 to-teal-400", bgGlow: "from-emerald-500/10" },
  ];

  const theme = palettes[index % palettes.length];
  const IconComponent = ICON_MAP[course.icon_name] || Icons.BookOpen;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      whileHover={{
        scale: 1.02,
        borderColor: `rgba(${index % 2 === 0 ? "6, 182, 212" : "139, 92, 246"}, 0.4)`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        "--mouse-x": `${coords.x}%`,
        "--mouse-y": `${coords.y}%`,
      } as React.CSSProperties}
      className={`bento-card ${theme.glow} h-full p-5 flex flex-col justify-between cursor-pointer select-none group min-h-[175px]`}
    >
      {/* Background grain texture and abstract mesh gradient */}
      <div className="noise-bg" />
      <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${theme.bgGlow} to-transparent rounded-full filter blur-2xl pointer-events-none -z-10 group-hover:scale-125 transition-transform duration-500`} />

      {/* Header with Icon and index number */}
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-900 flex items-center justify-center ${theme.iconColor} shadow-md`}>
          <IconComponent className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <span className="text-[10px] font-mono font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors">
          CODE-0{index + 1}
        </span>
      </div>

      {/* Title */}
      <div className="mt-4 mb-2">
        <h3 className="font-bold text-sm text-zinc-100 leading-snug group-hover:text-white transition-colors line-clamp-2">
          {course.title}
        </h3>
      </div>

      {/* Custom animated Progress Bar */}
      <div className="space-y-1.5 mt-auto">
        <div className="flex items-center justify-between text-[10px] font-bold">
          <span className="text-zinc-500 font-medium">PROGRESS</span>
          <span className="text-zinc-300 font-mono">{course.progress}%</span>
        </div>
        
        {/* Progress bar housing */}
        <div className="w-full h-1.5 bg-zinc-950/80 rounded-full overflow-hidden border border-zinc-900/60 p-[0.5px]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.35 }}
            className={`h-full bg-gradient-to-r ${theme.bar} rounded-full`}
          />
        </div>
      </div>
    </motion.article>
  );
}
