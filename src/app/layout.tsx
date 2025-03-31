import ThemeRegistryComponent from "@/components/Layout/ThemeRegistry";
import "./globals.css";
import Header from "@/components/Layout/Header/Header";
import { Box } from "@mui/material";
import Breadcrumb from "@/components/Layout/bread-crumb/BreadCrumb";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { ToastContainer } from "react-toastify";
// import Footer from "@/components/Layout/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Shopping Arena</title>
      </head>
      <body>
        <ThemeRegistryComponent>
          <Header />
        </ThemeRegistryComponent>
        <main>
          <Box sx={{ padding: "0 25px", marginTop: "75px" }}>
            <Breadcrumb />
            <ProtectedRoute>
              <ThemeRegistryComponent>{children}</ThemeRegistryComponent>
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
