"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BookOpen, Activity, Settings, GraduationCap, User } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <>
      {/* DESKTOP / TABLET SIDEBAR */}
      <nav className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-40 bg-zinc-950/70 border-r border-zinc-900/80 backdrop-blur-xl transition-all duration-300 w-20 lg:w-64 p-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="hidden lg:block font-bold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            AetherLearn
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                onMouseEnter={() => setIsHovered(item.id)}
                onMouseLeave={() => setIsHovered(null)}
                className="relative flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer w-full text-left group"
              >
                {/* Active Highlight (layoutId pill) */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavDesktop"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600/15 to-cyan-600/10 border-l-2 border-violet-500 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Glow Highlight */}
                {isHovered === item.id && !isActive && (
                  <motion.div
                    layoutId="hoverNavDesktop"
                    className="absolute inset-0 bg-zinc-900/50 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}

                <Icon className={`w-5 h-5 transition-transform duration-200 z-10 ${isActive ? "text-violet-400" : "group-hover:scale-105"}`} />
                <span className="hidden lg:block font-medium text-sm z-10 transition-colors">
                  {item.label}
                </span>

                {/* Desktop Tooltip for tablet state (when text is hidden) */}
                <div className="lg:hidden absolute left-20 bg-zinc-900 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 border border-zinc-800 shadow-md">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick User Badge */}
        <div className="border-t border-zinc-900/80 pt-4 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-[1.5px]">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-bold text-white">
              JD
            </div>
          </div>
          <div className="hidden lg:flex flex-col overflow-hidden">
            <span className="font-semibold text-xs text-zinc-200 truncate">Julian Drake</span>
            <span className="text-[10px] text-zinc-500 font-mono truncate">Beta Learner</span>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 z-40 bg-zinc-950/85 backdrop-blur-xl border-t border-zinc-900/90 px-4 py-2 flex justify-around items-center">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className="relative flex flex-col items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white cursor-pointer min-w-[64px]"
            >
              {/* Active Tab glow dot */}
              {isActive && (
                <motion.div
                  layoutId="activeNavMobile"
                  className="absolute inset-0 bg-violet-600/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <Icon className={`w-5 h-5 z-10 transition-transform duration-200 ${isActive ? "text-violet-400 scale-110" : ""}`} />
              <span className={`text-[10px] mt-1 font-medium z-10 transition-colors ${isActive ? "text-zinc-200" : "text-zinc-500"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
