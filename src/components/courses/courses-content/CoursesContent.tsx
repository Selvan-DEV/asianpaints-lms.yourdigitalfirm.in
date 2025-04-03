import { Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

export default function CourseContent() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
        marginTop: "30px"
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography variant="h4" component="div">
          Learning Module System
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ENRICHMENT OF OPERATORS SELF MANAGED TEAM
        </Typography>
      </Box>
    </Box>
  );
}
