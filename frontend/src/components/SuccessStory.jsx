import { Paper, Grid, Typography, Avatar, Box, Divider } from "@mui/material";
import { FormatQuote } from "@mui/icons-material";

export default function SuccessStory() {
  return (
    <Paper elevation={1} sx={{ padding: "1rem", borderRadius: 1 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            component="div"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar
              src="https://randomuser.me/api/port/"
              alt="user"
              sx={{ width: "50px", height: "50px", mr: 2 }}
            />
            <Box component="div">
              <Typography variant="h5" color="text.primary">
                John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Web Developer
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <Divider sx={{ mt: 1, mb: 1, width: "100%" }} />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            <FormatQuote sx={{ fontSize: "2rem", color: "text.primary" }} />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
            <FormatQuote sx={{ fontSize: "2rem", color: "text.primary" }} />
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
