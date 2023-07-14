import VerticalTabs from "./components/VerticalTabs";

import { Box, Container, CssBaseline, Typography } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "secondary",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          StaryDream Admin Panel
        </Typography>
        <Container maxWidth="md">
          <VerticalTabs />
        </Container>
      </Box>
    </>
  );
}

export default App;
