import { Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

export default function CourseContent() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        marginBottom: "30px",
      }}
    >
      <Typography variant="h5" component="div">
        Learning Module System
      </Typography>

      <Typography variant="body2" color="text.secondary">
        ENRICHMENT OF OPERATORS SELF MANAGED TEAM
      </Typography>
    </Box>
  );
}
