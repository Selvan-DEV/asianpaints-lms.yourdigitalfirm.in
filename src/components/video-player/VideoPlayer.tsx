import React from "react";
import { Box } from "@mui/material";

export default function VideoPlayer() {
  return (
    <Box>
      <video width="50%" height="50%" controls>
        <source src="/video/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}
