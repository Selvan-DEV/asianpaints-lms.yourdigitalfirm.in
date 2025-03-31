import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import { AppBar, Avatar } from "@mui/material";
import { Person } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between" },
            alignItems: "center",
          }}
        >
          <Image
            src="/logo.webp"
            width={165}
            height={35}
            alt="Picture of the logo"
            priority
          />

          <Box>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search.."
                inputProps={{ "aria-label": "search google maps" }}
              />
              <SearchIcon />
            </Paper>
          </Box>

          <Box>
            <Avatar>
              <Person />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
