import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretDown,
  faCloudArrowUp,
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  text-align: center;
  border-radius: 20px;
  font-size: 1rem;
  gap: 1rem;
  padding: 1rem;
  line-height: 4rem;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.22), 3px 3px 10px rgba(0, 0, 0, 0.25);
  color: white;
  cursor: pointer;
  background: linear-gradient(90deg, #ff6969, #667bc6, #219c90);
  background-size: 600%;
  background-position: ${(props) =>
    props.$status === "success"
      ? "100% 0%"
      : props.$status === "failure"
      ? "0% 0%"
      : "50% 0%"};
  transition: all 0.5s ease-in-out;
  &:hover {
    filter: grayscale(80%);
  }
`;

/**
 * A functional component for handling file uploads.
 * It uses react-dropzone to handle file drops and displays a styled container with an icon and message.
 * The container changes its appearance based on the upload status (success, failure, or idle).
 *
 * @returns {JSX.Element} - The JSX for the FileUpload component.
 */
export default function FileUpload({ onSuccess }) {
  // State variables for status, message, and icon
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(
    "Drag & Drop your file or Browse here!"
  );
  const [icon, setIcon] = useState(faCloudArrowUp);

  const resetComponent = () => {
    setTimeout(() => {
      setStatus(null);
      setMessage("Drag & Drop your file or Browse here!");
      setIcon(faCloudArrowUp);
    }, 2000);
  };
  /**
   * Handles file drop event and uploads the file to the server.
   *
   * @param {File[]} file1 - The dropped file.
   * @returns {void}
   */
  const onDrop = useCallback(
    async (file) => {
      try {
        onSuccess(file);
        setStatus("success");
        setMessage("File uploaded successfully");
        setIcon(faCircleCheck);
        resetComponent();
      } catch (error) {
        console.error(error);

        setStatus("failure");
        setMessage("Error uploading file!");
        setIcon(faTriangleExclamation);
        resetComponent();
      }
    },
    [onSuccess]
  );

  // Use react-dropzone to handle file drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    // JSX for the FileUpload component
    <Container {...getRootProps()} $status={status}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <>
          <FontAwesomeIcon icon={faSquareCaretDown} size="3x" />
          <p>Drop the files here ...</p>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={icon} size="3x" />
          <p>{message}</p>
        </>
      )}
    </Container>
  );
}
