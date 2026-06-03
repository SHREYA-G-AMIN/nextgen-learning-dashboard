import { LucideIcon } from "lucide-react";

/**
 * Core interface representing a Learning Course.
 */
export interface Course {
  id: string;
  title: string;
  progress: number; // Percentage progress (0-100)
  icon_name: string; // Resolves to a LucideIcon via utils/iconMap
  created_at: string; // ISO 8601 Timestamp
  category?: string; // Optional metadata (e.g., "Frontend", "Systems")
  description?: string; // Optional course context description
}

/**
 * Standardized data fetching response envelope for Supabase connections.
 */
export interface SupabaseFetchResult {
  courses: Course[];
  error: string | null;
  isMock: boolean;
}

/**
 * Dashboard stats tracking active learning streaks, level, XP, and certificates.
 */
export interface StudentStats {
  levelName: string;
  name: string;
  streak: number;
  xpEarned: number;
  certificatesCount: number;
  weeklyProgress: {
    day: string;
    active: boolean;
  }[];
}

/**
 * Normalized activity square representing a single cell in the contribution heatmap.
 */
export interface ActivitySquare {
  id: number;
  level: number; // Study intensity level (0: none, 1: low, 2: mid, 3: high, 4: peak)
  date: string; // Formatted date string (e.g., "Jun 3, 2026")
  hours: string; // Display duration text (e.g., "3 hrs study")
}

/**
 * Navigation item structures for custom sidebar interfaces.
 */
export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}