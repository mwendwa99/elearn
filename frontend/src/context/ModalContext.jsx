import React, { createContext, useContext, useState } from "react";

// Create the context
const ModalContext = createContext();

// Create a custom hook to use the modal context
export const useModal = () => useContext(ModalContext);

// Create the ModalProvider component
export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    formType: null,
    data: null,
  });

  const openModal = (formType, data) => {
    setModalState({ isOpen: true, formType, data });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, formType: null, data: null });
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
