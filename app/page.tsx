import { getCourses } from "@/lib/supabase";
import DashboardClient from "@/components/dashboard/DashboardClient";

// Force dynamic rendering to ensure Server Components execute on every page fetch
export const dynamic = "force-dynamic";

export default async function Home() {
  // Retrieve courses from Supabase with automatic local seed fallback on connection error
  const { courses, error, isMock } = await getCourses();

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <header className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Student Workspace
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm">
          Track your progress, active educational paths, and hardware-accelerated learning sessions.
        </p>
      </header>

      {/* Interactive dashboard clients and animations */}
      <DashboardClient courses={courses} error={error} isMock={isMock} />
    </div>
  );
}