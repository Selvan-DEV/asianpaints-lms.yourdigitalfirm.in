"use client";

import CourseContent from "@/components/courses/course/course-content/CourseContent";
import { getTopicsByCourseId } from "@/lib/services/CoursesService";
import { ITopic } from "@/models/courses/CoursesModel";
import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CoursePage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<ITopic[]>([]);

  const getUserCourses = useCallback(async () => {
    if (!courseId) return;

    try {
      setLoading(true);
      const courses = await getTopicsByCourseId(courseId);
      if (courses) {
        setTopics(courses);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    getUserCourses();
  }, [getUserCourses]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {loading && !topics.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: { md: "flex-start", xs: "stretch" },
            alignItems: "flex-start",
            gap: "20px",
            flexDirection: { md: "row", xs: "column" },
          }}
        ></Box>
      ) : (
        <CourseContent topics={topics} />
      )}
    </Box>
  );
}
