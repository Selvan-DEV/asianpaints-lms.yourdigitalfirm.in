import ThemeRegistryComponent from "@/components/Layout/ThemeRegistry";
import "./globals.css";
import Header from "@/components/Layout/Header/Header";
import { Box } from "@mui/material";
import Breadcrumb from "@/components/Layout/bread-crumb/BreadCrumb";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
// import Footer from "@/components/Layout/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Asian Paints - LMS</title>
      </head>
      <body>
        <ThemeRegistryComponent>
          <Header />
        </ThemeRegistryComponent>
        <main>
          <Box sx={{ padding: "0 25px" }}>
            <Breadcrumb />
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <ThemeRegistryComponent>{children}</ThemeRegistryComponent>
              </Suspense>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
              />
            </ProtectedRoute>
          </Box>
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
