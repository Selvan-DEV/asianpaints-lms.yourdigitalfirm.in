"use client";

import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const DocViewerComponent = (props: { url: string; name: string }) => {
  const [docData, setDocData] = useState<
    { uri: string; fileName: string; fileType: "pdf" }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { url, name } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (url) {
      setLoading(true);
      const docObject = {
        uri: `/api/pdf?url=${encodeURIComponent(url)}`,
        fileType: "pdf",
        fileName: name,
      } as { uri: string; fileName: string; fileType: "pdf" };

      // Check if docData already contains the correct data
      if (docData.length === 0 || docData[0].uri !== docObject.uri) {
        setDocData([docObject]);
      }

      setLoading(false);
    }
  }, []); // Include docData in the dependencies array

  return (
    <>
      {!loading && (
        <Box>
          {isMobile && (
            <Typography
              sx={{ marginBottom: "10px", color: "blue", fontStyle: "italic" }}
            >
              Please rotate your device to landscape for a better experience.
            </Typography>
          )}
          <DocViewer
            documents={docData}
            pluginRenderers={DocViewerRenderers}
            className="react-doc-viewer"
          />
        </Box>
      )}
    </>
  );
};

export default DocViewerComponent;
