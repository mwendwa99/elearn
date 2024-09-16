import { Clear, Search } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../redux/courses/courseActions";
import { Link } from "react-router-dom";

export default function SearchComponent() {
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [search, setSearch] = useState("");
  const { courses } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleChange = (e) => {
    setShowClearIcon(e.target.value !== "");
    setSearch(e.target.value);
  };

  const handleClick = () => {
    setSearch("");
    setShowClearIcon(false);
  };

  const filteredCourses =
    courses &&
    courses.filter((course) =>
      course?.title?.toLowerCase().includes(search?.toLowerCase())
    );

  const showBox = search && filteredCourses.length > 0;

  return (
    <Box>
      <FormControl fullWidth>
        <TextField
          size="small"
          value={search}
          variant="outlined"
          placeholder="search for a course"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
            endAdornment: showClearIcon && (
              <InputAdornment position="end" onClick={handleClick}>
                <Clear sx={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
            style: { color: "#101828" },
          }}
        />
      </FormControl>
      {showBox && (
        <Box
          component="div"
          mt={1}
          sx={{
            bgcolor: "#fafafa",
            border: "1px solid #c3c3c3",
            borderRadius: "0px 0px 10px 10px",
            padding: "10px",
            maxHeight: "200px",
            overflowY: "auto",
            position: "absolute",
            zIndex: 1,
          }}
        >
          {filteredCourses.map((course) => (
            <Link
              to={`/course/${course.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => {
                setSearch(""); // Clear search input
                setShowClearIcon(false); // Hide the clear icon
              }}
            >
              <Typography
                key={course.id}
                variant="body1"
                sx={{
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                {course.title}
              </Typography>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}
