"use client";

import * as React from "react";
import AppTheme from "../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";

export default function ThemeRegistryComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppTheme
      disableCustomTheme={false}
      themeComponents={{
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: "linear-gradient(45deg, #ad58c9 30%, #f97272 90%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #8e44ad 30%, #e74c3c 90%)",
              },
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: "#FFFF",
              color: "white",
            },
          },
        },
      }}
    >
      <CssBaseline enableColorScheme />
      {children}
    </AppTheme>
  );
}
