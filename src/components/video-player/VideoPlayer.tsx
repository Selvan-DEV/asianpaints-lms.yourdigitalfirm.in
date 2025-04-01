import React from "react";
import { Box } from "@mui/material";

export default function VideoPlayer(props: { url: string }) {
  const { url } = props;

  return (
    <Box>
      <video width="80%" height="50%" controls>
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}
