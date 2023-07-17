import { useState, useEffect } from "react";

import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { signOutUser } from "./redux/auth/authActions";

import VerticalTabs from "./components/VerticalTabs";
import SigninForm from "./components/SignInForm";
import { useDispatch } from "react-redux";

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error handling authentication state change:", error);
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe the listener when the component unmounts
    };
  }, []);

  return (
    <Box component="div" sx={{ p: 2 }}>
      {user ? (
        <>
          <CssBaseline />
          <Button variant="contained" onClick={() => dispatch(signOutUser())}>
            Sign Out
          </Button>
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
            <Container maxWidth="xl">
              <VerticalTabs />
            </Container>
          </Box>
        </>
      ) : (
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
            <SigninForm />
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
