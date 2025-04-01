"use client";

import CoursesGridItems from "@/components/courses/courses-grid-Items/CoursesGridItems";
import CourseContent from "@/components/courses/courses-content/CoursesContent";
import { getCourses } from "@/lib/services/CoursesService";
import { ICourseModel } from "@/models/courses/CoursesModel";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getUserData } from "@/shared/StorageService";
import { motion } from "framer-motion";

export default function Home() {
  const [courses, setCourses] = useState<ICourseModel[]>([]);
  const userId = getUserData()?.userId as number;

  const getUserCourses = useCallback(async () => {
    try {
      const fetchedCourses = await getCourses(userId);
      if (fetchedCourses) {
        setCourses(fetchedCourses);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUserCourses();
    }
  }, [getUserCourses, userId]);

  return (
    <Box sx={{ minHeight: "50vh" }}>
      <CourseContent />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.2,
          type: "tween",
        }}
      >
        <CoursesGridItems items={courses} />
      </motion.div>
    </Box>
  );
}
