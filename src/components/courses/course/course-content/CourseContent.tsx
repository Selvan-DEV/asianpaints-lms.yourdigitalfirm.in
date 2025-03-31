"use client";

import AlignItemsList from "@/components/list/ListComponent";
import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import TopicContent from "../Topic/TopicContent";
import { ITopic, ITopicContent } from "@/models/courses/CoursesModel";
import {
  getContentByTopicId,
  startAssessment,
} from "@/lib/services/CoursesService";
import { getUserData } from "@/shared/StorageService";
import { useRouter } from "next/navigation";

export default function CourseContent(props: { topics: ITopic[] }) {
  const { topics } = props;
  const router = useRouter();
  const [isLastTopic, setLastTopic] = useState<boolean>(false);
  const [selectedTopicContent, setTopicContent] =
    useState<ITopicContent | null>(null);
  const [selectedTopic, setSelectedTopic] = useState(
    topics.length ? topics[0].topicId : 0
  );

  const onTopicSelect = (currentTopicId: number) => {
    if (!currentTopicId) {
      return;
    }

    const index = topics.findIndex((x) => x.topicId === currentTopicId) + 1;
    if (index >= topics.length) {
      setLastTopic(true);
    } else {
      setLastTopic(false);
    }

    setSelectedTopic(currentTopicId);
  };

  const onNext = async (currentTopicId: number): Promise<void> => {
    if (!currentTopicId) {
      return;
    }

    if (isLastTopic) {
      const { courseId, assessmentId } = topics.find(
        (x) => x.topicId === selectedTopic
      ) as ITopic;
      try {
        const payload = {
          topicId: selectedTopic,
          userId: getUserData()?.userId,
          courseId,
          assessmentId,
        } as {
          topicId: number;
          userId: number;
          courseId: number;
          assessmentId: number;
        };
        const response = await startAssessment(payload);
        if (response.message) {
          router.push(`/courses/${courseId}/assessment`);
        }
      } catch (error) {
        console.error(error);
      }

      return;
    }

    const index = topics.findIndex((x) => x.topicId === currentTopicId) + 2;

    if (index >= topics.length) {
      setLastTopic(true);
    }

    const newTopicId = topics[index - 1].topicId;
    setSelectedTopic(newTopicId);
  };

  const getTopicContent = useCallback(async () => {
    try {
      const content = await getContentByTopicId(selectedTopic);

      if (content) {
        setTopicContent(content);
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (selectedTopic) {
      getTopicContent();
    }
  }, [getTopicContent, selectedTopic]);

  return (
    <Box
      sx={{
        display: { md: "flex", sm: "none", xs: "none" },
        justifyContent: "flex-start",
        gap: "20px",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <AlignItemsList
          items={topics}
          selectedTopic={selectedTopic}
          setSelectedTopic={onTopicSelect}
        />
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          padding: "20px",
          width: "80%",
        }}
      >
        {selectedTopicContent && (
          <TopicContent
            selectedTopicContent={selectedTopicContent}
            isLastTopic={isLastTopic}
            onNext={(e) => onNext(e)}
          />
        )}
      </Box>
    </Box>
  );
}
