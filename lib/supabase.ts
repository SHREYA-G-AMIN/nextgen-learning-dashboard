import { createClient } from "@supabase/supabase-js";
import { Course } from "@/types/course";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase only if environment variables are provided
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// High-fidelity fallback mock courses for immediate visual testing
export const MOCK_COURSES: Course[] = [
  {
    id: "c1a938c5-926f-4d92-8db6-bd69d1eeadcd",
    title: "Advanced React Patterns",
    progress: 78,
    icon_name: "Layers",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2d17c768-e4b9-478a-a53d-3cf5c879d71c",
    title: "Next.js 16 Production Architectures",
    progress: 42,
    icon_name: "Cpu",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "f3b392a8-12c8-47ad-b1a7-1bfdf41d5a82",
    title: "Framer Motion & Hardware Acceleration",
    progress: 92,
    icon_name: "Zap",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4e93bb39-0129-4a3d-b2a8-bd2e0eaed481",
    title: "Supabase & Realtime Distributed Systems",
    progress: 60,
    icon_name: "Database",
    created_at: new Date().toISOString(),
  },
];

interface FetchResult {
  courses: Course[];
  error: string | null;
  isMock: boolean;
}

export async function getCourses(): Promise<FetchResult> {
  // Check if credentials are present
  if (!supabase) {
    console.warn("Supabase credentials missing. Utilizing client-side mock fallback data.");
    return {
      courses: MOCK_COURSES,
      error: null,
      isMock: true,
    };
  }

  try {
    // Add artificial delay to demonstrate the beautiful loading skeletons (1.2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase select error:", error.message);
      return {
        courses: MOCK_COURSES,
        error: `Supabase query error: ${error.message}. Loaded offline data.`,
        isMock: true,
      };
    }

    if (!data || data.length === 0) {
      console.info("Supabase courses table is empty. Serving default seed data.");
      return {
        courses: MOCK_COURSES,
        error: null,
        isMock: true,
      };
    }

    return {
      courses: data as Course[],
      error: null,
      isMock: false,
    };
  } catch (err: any) {
    console.error("Unexpected error during Supabase fetch:", err);
    return {
      courses: MOCK_COURSES,
      error: `Network error: ${err.message || err}. Loaded offline data.`,
      isMock: true,
    };
  }
}
