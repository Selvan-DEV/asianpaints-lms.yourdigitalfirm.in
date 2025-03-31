"use client";

import CoursesGridItems from "@/components/courses/courses-grid-Items/CoursesGridItems";
import CourseContent from "@/components/courses/courses-content/CoursesContent";
import { getCourses } from "@/lib/services/CoursesService";
import { ICourseModel } from "@/models/courses/CoursesModel";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { getUserData } from "@/shared/StorageService";

export default function CoursesPage() {
  const [courses, setCourse] = useState<ICourseModel[]>([]);
  const userId = getUserData()?.userId as number;
  const [loading, setLoading] = useState(false);

  const getUserCourses = useCallback(async () => {
    try {
      setLoading(true);
      const courses = await getCourses(userId);

      if (courses) {
        setCourse(courses);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
      {loading && !courses.length ? (
        <Skeleton variant="rectangular" width={300} height={100} />
      ) : (
        <CoursesGridItems items={courses} />
      )}
    </Box>
  );
}
