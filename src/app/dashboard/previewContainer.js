import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import GeneratorContext from "@/components/wrappers/GeneratorContext";
import BeforeAfterImage from "@/components/beforeAfterImage";
import Button from "@/components/transparentButton";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const OutputCard = styled.div`
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2),
    0 0 100px -50px ${({ theme }) => theme.headingHighlightText};
`;

/**
 * This is a functional component that renders a preview container with an iframe and a floating button.
 *
 * @function PreviewContainer
 * @returns {JSX.Element} - The rendered preview container.
 */
export default function PreviewContainer() {
  const { generation } = useContext(GeneratorContext);

  useEffect(() => {
    console.log("In PreviewContainer, images are updated", generation);
  }, [generation]);

  switch (generation.status) {
    case "uploading":
      return <p> Uploading image</p>;
    case "processing":
      return <p>Processing image</p>;
    case "finishing":
      return <p>Finishing image processing</p>;
    case "error":
      return <p>Error processing image</p>;
    case "success":
      return (
        <Container>
          <OutputCard>
            <BeforeAfterImage
              $height={"80vh"}
              $width={`${(80 * generation.width) / generation.height}vh`}
            >
              <img src={generation.inputImageURL} />
              <img src={generation.outputImageURL} />
            </BeforeAfterImage>
          </OutputCard>
          <Button onClick={() => alert("Will add download option!")}>
            Download
          </Button>
        </Container>
      );
    default:
      return <p>Welcome, get started by uploading an image!</p>;
  }
}
