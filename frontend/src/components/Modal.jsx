import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useModal } from "../context/ModalContext";
import LoginForm from "./LoginForm";
import SignUp from "./SignupForm";
import { borderBottom, borderRadius } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "5px solid #c3c3c3",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function BasicModal() {
  const { modalState, closeModal } = useModal();

  const renderForm = () => {
    switch (modalState.formType) {
      case "login":
        return <LoginForm />;
      case "signup":
        return <SignUp />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Modal
        open={modalState.isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderForm()}</Box>
      </Modal>
    </div>
  );
}
