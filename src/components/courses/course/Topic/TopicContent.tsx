"use client";

import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Button } from "@mui/material";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import DocViewerComponent from "@/components/doc-viewer/DocViewer";
import { ITopicContent } from "@/models/courses/CoursesModel";

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function TopicContent(props: {
  selectedTopicContent: ITopicContent;
  isLastTopic: boolean;
  onNext: (topicId: number) => void;
  documentName: string;
  contentLoading: boolean;
}) {
  const {
    selectedTopicContent,
    isLastTopic,
    documentName,
    onNext,
    contentLoading,
  } = props;
  const [value, setValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
        {selectedTopicContent.contentTitle}
      </Typography>

      <Tabs
        value={value}
        onChange={handleTabChange}
        aria-label="Topic Tabs"
        textColor="secondary"
        indicatorColor="secondary"
        centered
      >
        <Tab label="Video" />
        <Tab label="Document" />
      </Tabs>

      <TabPanel value={value} index={0}>
        {contentLoading ? (
          <Box></Box>
        ) : (
          <VideoPlayer url={selectedTopicContent.videoUrl} />
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            type="button"
            variant="contained"
            onClick={() => onNext(selectedTopicContent.topicId)}
          >
            {isLastTopic ? "Start Assessment" : "Next Topic"}
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DocViewerComponent
          url={selectedTopicContent.docURL}
          name={documentName}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            type="button"
            variant="contained"
            onClick={() => onNext(selectedTopicContent.topicId)}
          >
            {isLastTopic ? "Start Assessment" : "Next Topic"}
          </Button>
        </Box>
      </TabPanel>
    </Box>
  );
}
