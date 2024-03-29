import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClassesCarousel from "../components/Carousel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// import Calendar from "../components/Calendar";

function ClassList() {
  const { classes } = useSelector((state) => state.class);
  // const dispatch = useDispatch();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography color="primary" variant="h4" align="center" gutterBottom>
          StaryDream Classroom
        </Typography>
        <Typography
          color="text.secondary"
          variant="subtitle1"
          align="center"
          gutterBottom
        >
          Start learning today!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {/* <Calendar onAddClass={handleAddClass} classes={classes} /> */}
      </Grid>
      <Grid item xs={12}>
        <ClassesCarousel classes={classes} />
      </Grid>
    </Grid>
  );
}

export default ClassList;
