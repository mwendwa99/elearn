import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const localizer = momentLocalizer(moment);

function CalendarComponent({ classes, onAddClass }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tutor, setTutor] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSelectEvent = (event) => {
    setSelectedClass(event);
    setOpen(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectedClass(null);
    setTitle("");
    setTutor("");
    setStart(moment(start).format("YYYY-MM-DDTHH:mm"));
    setEnd(moment(end).format("YYYY-MM-DDTHH:mm"));
    setPrice(0);
    setDescription("");
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedClass(null);
    setOpen(false);
  };

  const handleAddToSchedule = () => {
    const newClass = {
      title,
      tutor,
      start: new Date(start),
      end: new Date(end),
      price,
      description,
    };
    onAddClass(newClass);
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
        selectable={true}
        onSelectSlot={handleSelectSlot}
        style={{ height: 600, cursor: "pointer", color: "black" }}
      />
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
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
            <TextField
              margin="dense"
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputProps={{ min: 0 }}
            />
            <TextField
              margin="dense"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
