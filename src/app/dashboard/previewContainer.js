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
  justify-content: space-around;
  align-items: center;
`;

const OutputCard = styled.div`
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2),
    0 0 100px -50px ${({ theme }) => theme.headingHighlightText};
`;

const Message = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 70vw;
  max-width: 40rem;
  gap: 0.5rem;
`;

/**
 * This is a functional component that renders a preview container with an iframe and a floating button.
 *
 * @function PreviewContainer
 * @returns {JSX.Element} - The rendered preview container.
 */
export default function PreviewContainer() {
  const { generation } = useContext(GeneratorContext);

  switch (generation.status) {
    case "uploading":
      return (
        <Container>
          <Message>
            <h2>Analyzing your image...</h2>
            <p>
              Analyzing your image to understand its structure and prepare it
              for processing. This may take a moment, depending on the size and
              complexity of the file. Please bear with us!
            </p>
          </Message>
        </Container>
      );
    case "processing":
      return (
        <Container>
          <Message>
            <h2>Processing your image...</h2>
            <p>
              Applying the necessary adjustments and enhancements to your image.
              This step may take a little time, so thanks for your patience as
              we work to transform your image!
            </p>
          </Message>
        </Container>
      );
    case "finishing":
      return (
        <Container>
          <Message>
            <h2>Finishing up...</h2>
            <p>
              Almost done! Just a few final touches are being made. Your image
              will be ready shortly.
            </p>
          </Message>
        </Container>
      );
    case "credit-exhausted":
      return (
        <Container>
          <Message>
            <h2>You’re out of credits.</h2>
            <p>
              As a free user, you’ve used up all your available credits. Don’t
              worry – your credits will be refreshed next month! In the
              meantime, you can upgrade to a premium plan for instant access to
              unlimited credits.
            </p>
          </Message>
        </Container>
      );
    case "error":
      return (
        <Container>
          <Message>
            <h2>Oops! Something went wrong.</h2>
            <p>
              There was an issue while processing your image. We’re looking into
              it and will have it fixed soon. Please try again later, or reach
              out to support if the problem persists.
            </p>
          </Message>
        </Container>
      );
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
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href = generation.outputImageURL;
              link.download = `dual-shades-${Date.now()}.png`; // Set the filename
              link.click(); // Simulate a click to download
            }}
          >
            Download
          </Button>
        </Container>
      );
    default:
      return (
        <Container>
          <Message>
            <h2>Upload an image to begin!</h2>
            <p>
              Simply choose an image from your device, and{" "}
              <strong>Dual Shades</strong> take it from there. Ready to get
              started?
            </p>
          </Message>
        </Container>
      );
  }
}
