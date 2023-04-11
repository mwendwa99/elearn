import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const classes = [
  {
    title: "Introduction to React",
    tutor: "John Doe",
    start: new Date("2023-05-01T09:00:00"),
    end: new Date("2023-05-01T11:00:00"),
  },
  {
    title: "Intermediate React",
    tutor: "Jane Smith",
    start: new Date("2023-05-08T10:00:00"),
    end: new Date("2023-05-08T12:00:00"),
  },
  {
    title: "Advanced React",
    tutor: "Bob Johnson",
    start: new Date("2023-05-15T11:00:00"),
    end: new Date("2023-05-15T13:00:00"),
  },
];

function CalendarComponent() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tutor, setTutor] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSelectEvent = (event) => {
    setSelectedClass(event);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedClass(null);
    setOpen(false);
  };

  const handleAddToSchedule = () => {
    classes.push({
      title,
      tutor,
      start: new Date(start),
      end: new Date(end),
    });
    handleClose();
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={classes}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Class to Schedule</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Tutor"
              value={tutor}
              onChange={(e) => setTutor(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Start Time"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <TextField
              margin="dense"
              label="End Time"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddToSchedule}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CalendarComponent;
