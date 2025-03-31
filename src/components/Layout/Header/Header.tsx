"use client";

import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import { AppBar, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const menus = ["Logout"];
  const isNotAuthPage = pathname !== "/sign-in" && pathname !== "/sign-up";
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const onMenuClick = (menu: string): void => {
    if (!menu) {
      return;
    }

    useAuthStore.getState().logout();
    router.push("/sign-in");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={isNotAuthPage ? 1 : 0}
        sx={{ backgroundColor: "transparent" }}
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

          {isNotAuthPage && (
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
          )}

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
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
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
    </Box>
  );
}
