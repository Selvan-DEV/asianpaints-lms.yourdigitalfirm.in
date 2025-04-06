import React from "react";
import { Box } from "@mui/material";

export default function VideoPlayer(props: { url: string }) {
  const { url } = props;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <video width="60%" height="70%" controls>
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}
