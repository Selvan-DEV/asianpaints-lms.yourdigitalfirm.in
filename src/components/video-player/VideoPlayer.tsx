import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function VideoPlayer(props: { url: string }) {
  const { url } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{ display: "flex", justifyContent: isMobile ? "stretch" : "center" }}
    >
      <video
        width={isMobile ? "100%" : "60%"}
        height={isMobile ? "100%" : "70%"}
        controls
      >
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}
