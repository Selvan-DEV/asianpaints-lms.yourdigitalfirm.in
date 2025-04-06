"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { ICourseModel } from "@/models/courses/CoursesModel";
import { Button, CardActions, Chip } from "@mui/material";
import { startCourse } from "@/lib/services/CoursesService";
import { getUserData } from "@/shared/StorageService";

export default function CoursesGridItems({ items }: { items: ICourseModel[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onCourseStart = async (data: { id: number; courseName: string }) => {
    if (!data) {
      return;
    }

    try {
      const userId = getUserData()?.userId;
      const payload = {
        courseId: data.id,
        userId,
      } as { courseId: number; userId: number };
      const response = await startCourse(payload);
      if (response.message) {
        const params = new URLSearchParams(searchParams);
        params.set("id", data.id.toString());
        router.push(
          `${data.courseName
            .split(" ")
            .join("-")
            .toLowerCase()}/?${params.toString()}`,
          { scroll: false }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onOpenCourse = (data: { id: number; courseName: string }) => {
    if (!data) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("id", data.id.toString());
    router.push(
      `${data.courseName
        .split(" ")
        .join("-")
        .toLowerCase()}/?${params.toString()}`,
      { scroll: false }
    );
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
                onClick={() =>
                  onCourseStart({
                    id: item.courseId,
                    courseName: item.courseName,
                  })
                }
              >
                Start
              </Button>
            </CardActions>
          ) : (
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() =>
                  onOpenCourse({
                    id: item.courseId,
                    courseName: item.courseName,
                  })
                }
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
