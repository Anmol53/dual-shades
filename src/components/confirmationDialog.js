import React, { useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import Button from "./transparentButton";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(155, 155, 155, 0.6);
  text-align: center;
  color: white;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 1rem;
  button {
    background-color: #555;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

/**
 * A reusable confirmation dialog component for React applications.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.confirmationMessage - The message to display in the confirmation dialog.
 * @param {function} props.onConfirm - A function to be called when the user confirms the action.
 * @param {React.ReactElement} props.children - The child element to trigger the confirmation dialog.
 * @param {string} [props.$confirmationButtonColor="#80AF81"] - The color of the confirmation button.
 *
 * @returns {React.ReactElement} - The confirmation dialog component.
 */
export default function ConfirmationDialog({
  confirmationMessage,
  onConfirm,
  children,
  $confirmationButtonColor = "#80AF81",
}) {
  // State variables
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isResultVisible, setIsResultVisible] = useState(false);

  // Open the confirmation dialog
  const openDialog = (event) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  // Close the confirmation dialog
  const closeDialog = () => setIsDialogOpen(false);

  // Handle the user's confirmation action
  const handleConfirm = async () => {
    const message = await onConfirm();
    setResultMessage(message);
    setIsResultVisible(true);
    setTimeout(() => {
      setIsResultVisible(false);
      closeDialog();
    }, 1000); // Close after 1 seconds
  };

  // Render the confirmation dialog
  const renderDialog = () => (
    <Overlay onClick={closeDialog}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <DialogContent>
          {!isResultVisible ? (
            <>
              <p>{confirmationMessage}</p>
              <ButtonGroup>
                <Button
                  onClick={handleConfirm}
                  style={{ backgroundColor: $confirmationButtonColor }}
                >
                  Yes
                </Button>
                <Button onClick={closeDialog}>No</Button>
              </ButtonGroup>
            </>
          ) : (
            <p>{resultMessage}</p>
          )}
        </DialogContent>
      </Dialog>
    </Overlay>
  );

  // Render the component
  return (
    <>
      <div onClick={openDialog}>
        {React.cloneElement(children, { onClick: openDialog })}
      </div>
      {isDialogOpen && createPortal(renderDialog(), document.body)}
    </>
  );
}
