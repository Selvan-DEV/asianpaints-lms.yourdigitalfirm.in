"use client";

import AlignItemsList from "@/components/list/ListComponent";
import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import TopicContent from "../Topic/TopicContent";
import { ITopic, ITopicContent } from "@/models/courses/CoursesModel";
import {
  getContentByTopicId,
  startAssessment,
} from "@/lib/services/CoursesService";
import { getUserData } from "@/shared/StorageService";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function CourseContent(props: { topics: ITopic[] }) {
  const { topics } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [documentName, setDocumentName] = useState<string>(
    topics.length ? topics[0].topicName : ""
  );
  const [isLastTopic, setLastTopic] = useState<boolean>(false);
  const [selectedTopicContent, setTopicContent] =
    useState<ITopicContent | null>(null);
  const [selectedTopic, setSelectedTopic] = useState(
    topics.length ? topics[0].topicId : 0
  );

  useEffect(() => {
    if (topics && topics.length === 1) {
      setLastTopic(true);
    }

    return () => {
      setLastTopic(false);
    };
  }, [topics]);

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

    const { topicName } = topics.find(
      (x) => x.topicId === currentTopicId
    ) as ITopic;
    setDocumentName(topicName);
    setSelectedTopic(currentTopicId);
  };

  const onNext = async (
    currentTopicId: number,
    isSoonContent = false
  ): Promise<void> => {
    if (!currentTopicId) {
      return;
    }

    if (isLastTopic || isSoonContent) {
      const { courseId, assessmentId, topicName } = topics.find(
        (x) => x.topicId === selectedTopic
      ) as ITopic;
      setDocumentName(topicName);

      const params = new URLSearchParams(searchParams);
      params.set("id", assessmentId?.toString());
      router.push(
        `${topicName
          .split(" ")
          .join("-")
          .toLowerCase()}/assessment/?${params.toString()}`,
        { scroll: false }
      );

      return;

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
          router.push(`/${courseId}/assessment`);
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

    if (topics.length) {
      const newTopicId = topics[index - 1]?.topicId;
      setSelectedTopic(newTopicId);
    }
  };

  const getTopicContent = useCallback(async () => {
    try {
      const content = await getContentByTopicId(selectedTopic);

      if (content) {
        setTopicContent(content);
      } else {
        setTopicContent(null);
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
    <Box>
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          justifyContent: "flex-start",
          gap: "20px",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ width: "20%", position: "fixed" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <AlignItemsList
              items={topics}
              selectedTopic={selectedTopic}
              setSelectedTopic={onTopicSelect}
            />
          </motion.div>
        </Box>
        <Box
          sx={{
            padding: "20px",
            width: "80%",
            marginLeft: "20%",
          }}
        >
          {selectedTopicContent && selectedTopicContent.docURL ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <TopicContent
                selectedTopicContent={selectedTopicContent}
                documentName={documentName || ""}
                isLastTopic={isLastTopic}
                onNext={(e) => onNext(e)}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50vh",
                  textAlign: "center",
                }}
              >
                <Box>
                  <Typography variant="h2" color="error" gutterBottom>
                    Development Inprogress
                  </Typography>

                  <Typography variant="body1" color="textSecondary" paragraph>
                    We&apos;ll be adding the topic content soon. To take the
                    assessment, click the &apos;Start Assessment&apos; button.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onNext(topics[0].topicId, true)}
                  >
                    Start Assessment
                  </Button>
                </Box>
              </Box>
            </motion.div>
          )}
        </Box>
      </Box>
    </Box>
  );
}
