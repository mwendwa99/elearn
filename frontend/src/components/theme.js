import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          "&:hover": {
            borderBottom: "2px solid #2196f3",
          },
        },
      },
    },
  },
});

export default theme;
