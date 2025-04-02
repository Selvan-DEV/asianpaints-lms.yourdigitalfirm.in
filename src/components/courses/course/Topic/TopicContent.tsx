"use client";

// import VideoPlayer from "@/components/video-player/VideoPlayer";
import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { ITopicContent } from "@/models/courses/CoursesModel";
import DocViewerComponent from "@/components/doc-viewer/DocViewer";
// import dynamic from "next/dynamic";

// const DocViewerComponent = dynamic(
//   () => import("../../../doc-viewer/DocViewer"),
//   {
//     ssr: false,
//   }
// );

export default function TopicContent(props: {
  selectedTopicContent: ITopicContent;
  isLastTopic: boolean;
  onNext: (topicId: number) => void;
  documentName: string;
}) {
  const { selectedTopicContent, isLastTopic, documentName, onNext } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" component="div">
        {selectedTopicContent.contentTitle}
      </Typography>

      <Box sx={{ my: "10px", minHeight: "100vh" }}>
        <DocViewerComponent
          url={selectedTopicContent.docURL}
          name={documentName}
        />
        {/* <VideoPlayer url={selectedTopicContent.videoUrl} /> */}
      </Box>

      {/* <Box
        sx={{ display: "flex", flexDirection: "column", width: "80%" }}
        className="innerHtmlCustomization"
        dangerouslySetInnerHTML={{ __html: selectedTopicContent.contentBody }}
      /> */}

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
