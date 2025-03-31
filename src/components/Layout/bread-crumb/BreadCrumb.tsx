"use client";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname(); // Get current path

  // Hide breadcrumb for sign-in and sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  const pathSegments = pathname.split("/").filter((segment) => segment); // Split path

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ my: 1 }}>
      <Link component={NextLink} href="/" color="inherit" underline="hover">
        Home
      </Link>
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return isLast ? (
          <Typography
            key={path}
            sx={{
              color: "var(--app-custom-primary-text-color)",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {decodeURIComponent(segment)}
          </Typography>
        ) : (
          <Link
            key={path}
            component={NextLink}
            href={path}
            color="inherit"
            underline="hover"
            sx={{
              textTransform: "capitalize",
            }}
          >
            {decodeURIComponent(segment)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
