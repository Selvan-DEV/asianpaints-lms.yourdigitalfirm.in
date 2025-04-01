"use client";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useUIStore } from "@/store/useUIStore";

export default function Breadcrumb() {
  const pathname = usePathname(); // Get current path
  const isBreadScrumbShow = useUIStore((state) => state.isBreadScrumbShow);

  // Hide breadcrumb for sign-in and sign-up pages
  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/" ||
    !isBreadScrumbShow
  ) {
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
            {decodeURIComponent(segment).split("-").join(" ")}
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
            {decodeURIComponent(segment).split("-").join(" ")}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
