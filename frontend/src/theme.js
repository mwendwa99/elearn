import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: "64px",
      fontWeight: 700,
      color: "#101828",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#101828",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#101828",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#101828",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#101828",
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#101828",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#101828",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#101828",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      color: "#101828",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: "#101828",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#101828",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: "#101828",
    },
  },
  palette: {
    primary: {
      main: "#4883ff",
      dark: "#101828",
      light: "#646464",
    },
    secondary: {
      main: "#646464",
      dark: "#101828",
      light: "#646464",
    },
    text: {
      primary: "#4883ff",
      main: "#101828",
      secondary: "#646464",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "16px 28px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          textTransform: "capitalize",
          borderRadius: "8px",
        },
        contained: {
          border: `1px solid var(--primary-1, #4883FF)`,
          background: `var(--primary-1, #4883FF)`,
          /* Shadow/xs focused 4px primary-100 */
          boxShadow: `0px 0px 0px 4px #F4EBFF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
        },
        outlined: {
          border: "1px solid #D9E5FF",
          background: "#D9E5FF",

          /* Shadow/xs */
          boxShadow: `0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
        },
        text: {
          color: "#101828",
          fontFamily: "Inter",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          "&:hover": {
            background: "transparent",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "#101828",
          fontSize: "16px",
          fontWeight: 300,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          border: "1px solid rgba(216, 216, 216, 0.40)",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 0,
          color: "#101828",
        },
        title: {
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          color: "#101828",
        },
        subheader: {
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "24px",
          color: "#4883FF",
        },
      },
    },
  },
});

export default theme;
