import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  i {
    font-size: 3rem;
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
    "Drag & Drop your files or Browse here!"
  );
  const [icon, setIcon] = useState("fa-solid fa-cloud-arrow-up");

  const resetComponent = () => {
    setTimeout(() => {
      setStatus(null);
      setMessage("Drag & Drop your files or Browse here!");
      setIcon("fa-solid fa-cloud-arrow-up");
    }, 2000);
  };
  /**
   * Handles file drop event and uploads the file to the server.
   *
   * @param {File[]} file1 - The dropped file.
   * @returns {void}
   */
  const onDrop = useCallback(async (file) => {
    try {
      onSuccess(file);
      setStatus("success");
      setMessage("File uploaded successfully");
      setIcon("fa-solid fa-check-circle");
      resetComponent();
    } catch (error) {
      console.error(error);

      setStatus("failure");
      setMessage("Error uploading file!");
      setIcon("fa-solid fa-triangle-exclamation");
      resetComponent();
    }
  }, []);

  // Use react-dropzone to handle file drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    // JSX for the FileUpload component
    <Container {...getRootProps()} $status={status}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <>
          <i className="fa-solid fa-square-caret-down"></i>
          <p>Drop the files here ...</p>
        </>
      ) : (
        <>
          <i className={icon}></i>
          <p>{message}</p>
        </>
      )}
    </Container>
  );
}
