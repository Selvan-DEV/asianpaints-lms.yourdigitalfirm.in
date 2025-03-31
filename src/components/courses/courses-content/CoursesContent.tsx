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
        Lorem impusm
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis vero
        necessitatibus accusantium nulla consectetur est odit consequuntur,
        voluptatibus molestiae nobis modi, eum iste assumenda quod a quo
        dolorem. Ratione, ut.
      </Typography>
    </Box>
  );
}
