import CourseContent from "@/components/courses/course/course-content/CourseContent";
import { getTopicsByCourseId } from "@/lib/services/CoursesService";
import { ITopic } from "@/models/courses/CoursesModel";
import { Box, Skeleton } from "@mui/material";
import React, { Suspense } from "react";

export default async function CoursePage(props: {
  params: Promise<{ [key: string]: string }>;
}) {
  const { course } = await props.params;
  const topics = (await getTopicsByCourseId(course)) as ITopic[];

  return (
    <Box>
      <Suspense fallback={<CoursesSkeleton />}>
        {topics && topics.length && <CourseContent topics={topics} />}
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
