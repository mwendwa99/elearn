import VerticalTabs from "./components/VerticalTabs";

import { Box, Container, CssBaseline, Typography } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "primary.secondary",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            StaryDream Admin Panel
          </Typography>
          <VerticalTabs />
        </Container>
      </Box>
    </>
  );
}

export default App;
