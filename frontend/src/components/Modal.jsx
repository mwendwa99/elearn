import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Grid,
} from "@mui/material";

import RadioButton from "./RadioButton";

const ModalComponent = ({
  children,
  firstName,
  lastName,
  email,
  country,
  type,
  modalData,
  setModalData,
  handleSaveChanges,
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
