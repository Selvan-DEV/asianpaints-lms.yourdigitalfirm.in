"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { ICourseModel } from "@/models/courses/CoursesModel";
import { Button, CardActions, Chip } from "@mui/material";
import { startCourse } from "@/lib/services/CoursesService";
import { getUserData } from "@/shared/StorageService";

export default function CoursesGridItems({ items }: { items: ICourseModel[] }) {
  const router = useRouter();

  const onCourseStart = async (id: number) => {
    if (!id) {
      return;
    }

    try {
      const userId = getUserData()?.userId;
      const payload = {
        courseId: id,
        userId,
      } as { courseId: number; userId: number };
      const response = await startCourse(payload);
      if (response.message) {
        router.push("/courses/" + id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onOpenCourse = (courseId: number) => {
    if (!courseId) {
      return;
    }

    router.push("/courses/" + courseId);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {items.map((item) => (
        <Card
          key={item.courseId}
          sx={{
            height: "100%",
          }}
        >
          <CardContent sx={{ minHeight: "100px", maxHeight: "100px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h5" component="div">
                  {item.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
              {item.courseStatus && (
                <Box>
                  <Chip
                    variant="outlined"
                    sx={{
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                    color={
                      item.courseStatus === "In Progress"
                        ? "warning"
                        : item.courseStatus === "Completed"
                        ? "success"
                        : "default"
                    }
                    label={item.courseStatus}
                  />
                </Box>
              )}
            </Box>
          </CardContent>
          {!item.userCourseId ? (
            <CardActions>
              <Button
                size="small"
                variant="contained"
                onClick={() => onCourseStart(item.courseId)}
              >
                Start
              </Button>
            </CardActions>
          ) : (
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => onOpenCourse(item.courseId)}
              >
                Open
              </Button>
            </CardActions>
          )}
        </Card>
      ))}
    </Box>
  );
}
