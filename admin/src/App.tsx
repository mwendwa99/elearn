import VerticalTabs from "./components/VerticalTab";

import { Box, Container, CssBaseline, Typography } from "@mui/material";

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
          <Typography variant="h3">StaryDream Admin Panel</Typography>
          <VerticalTabs />
        </Container>
      </Box>
    </>
  );
}

export default App;
