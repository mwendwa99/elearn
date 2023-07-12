import { useState } from "react";

import VerticalTabs from "./components/VerticalTab";

import { Box, Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <VerticalTabs />
        </Container>
      </Box>
    </>
  );
}

export default App;
