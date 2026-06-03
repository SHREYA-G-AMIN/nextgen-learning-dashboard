"use client";

import { motion } from "framer-motion";
import { Database, AlertCircle, Info, Sparkles } from "lucide-react";
import { Course } from "@/types/course";
import BentoGrid from "./BentoGrid";

interface DashboardClientProps {
  courses: Course[];
  error: string | null;
  isMock: boolean;
}

export default function DashboardClient({ courses, error, isMock }: DashboardClientProps) {
  return (
    <div className="space-y-6">
      {/* Dynamic Alert Banner for Supabase connection info */}
      <AnimatePresenceAndBanner error={error} isMock={isMock} />

      {/* Main Grid Orchestrator with Staggered Entrance */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        <BentoGrid courses={courses} />
      </motion.div>
    </div>
  );
}

function AnimatePresenceAndBanner({ error, isMock }: { error: string | null; isMock: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-zinc-950/45 border border-zinc-900/60 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg flex items-center justify-center ${isMock ? "bg-violet-500/10 text-violet-400" : "bg-emerald-500/10 text-emerald-400"}`}>
          {isMock ? <Info className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="font-semibold text-sm text-zinc-200">
            {isMock ? "Demo Environment Active" : "Supabase Synchronized"}
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            {isMock 
              ? "Running in offline mode. Configure environment variables to sync with your database." 
              : "Course statistics and progress synced in real-time."}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-400 text-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate max-w-[250px] font-mono">{error}</span>
        </div>
      )}
    </motion.div>
  );
}
