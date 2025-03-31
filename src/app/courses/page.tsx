"use client";

import CoursesGridItems from "@/components/courses/courses-grid-Items/CoursesGridItems";
import CourseContent from "@/components/courses/courses-content/CoursesContent";
import { getCourses } from "@/lib/services/CoursesService";
import { ICourseModel } from "@/models/courses/CoursesModel";
import { Box } from "@mui/material";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { getUserData } from "@/shared/StorageService";

export default function CoursesPage() {
  const [courses, setCourse] = useState<ICourseModel[]>([]);
  const userId = getUserData()?.userId as number;

  const getUserCourses = useCallback(async () => {
    try {
      const courses = await getCourses(userId);

      if (courses) {
        setCourse(courses);
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
    <Box>
      <CourseContent />
      <Suspense fallback={<CoursesSkeleton />}>
        {courses.length && <CoursesGridItems items={courses} />}
      </Suspense>
    </Box>
  );
}

// Skeleton Component
function CoursesSkeleton() {
  return (
    <Box>
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
    </Box>
  );
}
