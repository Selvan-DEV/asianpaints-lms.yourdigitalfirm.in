import VideoPlayer from "@/components/video-player/VideoPlayer";
import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { ITopicContent } from "@/models/courses/CoursesModel";

export default function TopicContent(props: {
  selectedTopicContent: ITopicContent;
  isLastTopic: boolean;
  onNext: (topicId: number) => void;
}) {
  const { selectedTopicContent, isLastTopic, onNext } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" component="div">
        {selectedTopicContent.contentTitle}
      </Typography>

      <Box sx={{ my: "10px" }}>
        <VideoPlayer />
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", width: "80%" }}
        className="innerHtmlCustomization"
        dangerouslySetInnerHTML={{ __html: selectedTopicContent.contentBody }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          onClick={() => onNext(selectedTopicContent.topicId)}
        >
          {isLastTopic ? "Start Assessment" : "Next Topic"}
        </Button>
      </Box>
    </Box>
  );
}
