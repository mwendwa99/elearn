import { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import { useModal } from "../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginWithEmail } from "../redux/auth/authActions";
import { sendEmail } from "../services/mail.service";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©"}
      StaryDream School&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const subject = formData.subject;
    const message = formData.message;
    const email = formData.email;

    if (!subject || !message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await sendEmail(email, subject, message);
      if (response.success) {
        toast.success("Message sent successfully");
      }
    } catch (error) {
      toast.error("Error sending message");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box className="d-flex flex-column justify-content-center align-items-center">
      <Typography component="h1" variant="h5">
        Send us a message
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="subject"
          label="Subject"
          type={"text"}
          id="subject"
          autoComplete="subject"
          value={formData.subject}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="message"
          label="Message"
          type={"text"}
          id="message"
          value={formData.message}
          onChange={handleInputChange}
          multiline
          rows={4}
        />
        <Button type="submit" fullWidth variant="contained" className="my-2">
          Send
        </Button>
      </Box>
      <Copyright />
    </Box>
  );
}
