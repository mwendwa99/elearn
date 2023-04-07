import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            borderBottom: "0.5px solid #2196f3",
          },
          textDecoration: "none",
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;
