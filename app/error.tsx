"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Log the error to an analytics or reporting service
    console.error("Dashboard caught boundary error:", error);
  }, [error]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        onMouseMove={handleMouseMove}
        style={{
          "--mouse-x": `${coords.x}%`,
          "--mouse-y": `${coords.y}%`,
        } as React.CSSProperties}
        className="bento-card card-glow-fuchsia w-full max-w-lg p-8 flex flex-col items-center relative group cursor-default border-brand-fuchsia/20"
      >
        {/* Visual Background Textures */}
        <div className="noise-bg" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-fuchsia-600/10 via-rose-500/5 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />

        {/* Floating Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-pink-600/15 border border-fuchsia-500/20 flex items-center justify-center relative shadow-lg shadow-fuchsia-500/5 mb-6 group-hover:rotate-6 transition-transform duration-300">
          <ShieldAlert className="w-8 h-8 text-fuchsia-400" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
          </span>
        </div>

        {/* Error Details */}
        <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 font-mono text-[10px] font-semibold border border-fuchsia-500/15 tracking-wider mb-4 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" /> ERROR BOUNDARY REACHED
        </span>

        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2">
          Sync Connection Disrupted
        </h2>

        <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
          The application encountered a runtime or database sync issue. This usually happens when server APIs are offline or request tokens expire.
        </p>

        {/* Error Message display block */}
        <div className="w-full bg-zinc-950/80 rounded-xl border border-zinc-900 px-4 py-3 mb-8 text-left max-h-[120px] overflow-y-auto">
          <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1 font-mono">
            System Message
          </div>
          <div className="text-xs text-zinc-300 font-mono break-all leading-normal">
            {error.message || "Unknown unexpected system failure."}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-fuchsia-500/10 hover:shadow-fuchsia-500/20 active:scale-[0.98] transition-all"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            Retry Connection
          </button>
          
          <Link
            href="/"
            className="flex-1 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Home className="w-4 h-4" />
            Return Workspace
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
