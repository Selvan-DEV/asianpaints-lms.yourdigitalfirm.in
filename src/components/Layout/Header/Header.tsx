"use client";

import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import {
  AppBar,
  Avatar,
  LinearProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const menus = ["Logout"];
  const loading = useUIStore((state) => state.loading);
  const isNotAuthPage = pathname !== "/sign-in" && pathname !== "/sign-up";
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setAnchorElUser(null);
  };

  const onMenuClick = (menu: string): void => {
    if (!menu) {
      return;
    }

    useAuthStore.getState().logout();
    router.push("/sign-in");
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={isNotAuthPage ? 1 : 0}
        sx={{ backgroundColor: isNotAuthPage ? "white" : "transparent" }}
      >
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

          {/* {isNotAuthPage && (
            <Box
              sx={{
                boxShadow:
                  "1px 1px 5px rgba(173, 88, 201, 0.5),-2px -1px 11px rgba(249, 114, 114, 0.5)",
                transition: "box-shadow 0.3s ease-in-out",
              }}
            >
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
          )} */}

          {isNotAuthPage && (
            <Box
              sx={{
                boxShadow:
                  "1px 1px 5px rgba(173, 88, 201, 0.5),-2px -1px 11px rgba(249, 114, 114, 0.5)",
                transition: "box-shadow 0.3s ease-in-out",
                borderRadius: "50%",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                onClick={handleOpenUserMenu}
                sx={{ cursor: "pointer" }}
              />
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {menus.map((menu) => (
                  <MenuItem key={menu} onClick={() => onMenuClick(menu)}>
                    <Typography sx={{ textAlign: "center" }}>{menu}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "65px", minHeight: "10px" }}>
        {loading && isNotAuthPage && (
          <LinearProgress
            sx={{
              backgroundColor: "rgb(240, 217, 250)", // Background color of the track
              "& .MuiLinearProgress-bar": {
                backgroundColor: " #8e44ad", // Color of the filled bar
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
}
