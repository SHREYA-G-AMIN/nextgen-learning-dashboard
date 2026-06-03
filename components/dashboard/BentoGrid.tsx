"use client";

import { motion } from "framer-motion";
import { Course } from "@/types/course";
import HeroCard from "./HeroCard";
import CourseCard from "./CourseCard";
import ActivityCard from "./ActivityCard";

interface BentoGridProps {
  courses: Course[];
}

// Framer Motion item variant for staggered entrance
export const bentoItemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 18,
    },
  },
};

export default function BentoGrid({ courses }: BentoGridProps) {
  // Let's greet a mock student name
  const studentName = "Julian";
  const streakCount = 18; // Daily learning streak indicator

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[auto]">
      {/* Hero greeting: spans 3 columns on desktop, 2 on tablet, full width on mobile */}
      <motion.div
        variants={bentoItemVariants}
        className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[220px]"
      >
        <HeroCard name={studentName} streak={streakCount} />
      </motion.div>

      {/* Course Cards: small tiles. Loop through Supabase fetched courses.
          Spans 1 column on desktop, 1 on tablet, full width on mobile. */}
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          variants={bentoItemVariants}
          className="col-span-1"
        >
          <CourseCard course={course} index={index} />
        </motion.div>
      ))}

      {/* Activity Card: mock contribution activity log.
          Spans 2 columns on desktop, 2 on tablet, full width on mobile. */}
      <motion.div
        variants={bentoItemVariants}
        className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[300px]"
      >
        <ActivityCard />
      </motion.div>
    </section>
  );
}
