import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BE5985", // Custom Primary Color
    },
    secondary: {
      main: "#ff4081", // Custom Secondary Color
    },
    mode: "light", // You can change this to "dark"
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
