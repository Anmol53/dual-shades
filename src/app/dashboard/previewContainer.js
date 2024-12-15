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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [outputWidth, setOutputWidth] = useState("80vw");
  const [outputHight, setOutputHight] = useState("80vh");

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth <= 768) {
      setOutputWidth("80vw");
      setOutputHight(`${(80 * generation.height) / generation.width}vw`);
    } else {
      setOutputHight("80vh");
      setOutputWidth(`${(80 * generation.width) / generation.height}vh`);
    }
  }, [generation, screenWidth]);

  switch (generation.status) {
    case "uploading":
      return (
        <Container>
          <Message>
            <h2>Analyzing your image... 🔍</h2>
            <p>
              We're diving into your image to understand its structure and
              prepare it for processing. This might take a moment—thanks for
              your patience! ⏳
            </p>
          </Message>
        </Container>
      );
    case "processing":
      return (
        <Container>
          <Message>
            <h2>Processing your image... 🛠️</h2>
            <p>
              We're applying some magic to transform your image! This may take a
              little time, but we promise it'll be worth the wait. ✨
            </p>
          </Message>
        </Container>
      );
    case "finishing":
      return (
        <Container>
          <Message>
            <h2>Finishing up... 🎉</h2>
            <p>
              Almost there! Just a few final touches and your masterpiece will
              be ready in no time. 🚀
            </p>
          </Message>
        </Container>
      );
    case "credit-exhausted":
      return (
        <Container>
          <Message>
            <h2>You’re out of credits. 😔</h2>
            <p>
              You've used your 2 free credits. Unlock the full power of{" "}
              <strong>Dual Shades</strong> by upgrading to a premium plan and
              enjoy unlimited access! 🌟
            </p>
          </Message>
        </Container>
      );
    case "invalid-format":
      return (
        <Container>
          <Message>
            <h2>Invalid File Format 🚫</h2>
            <p>
              Oops! That file type isn’t supported. Please upload a JPEG, JPG,
              PNG, or WEBP image—we can’t wait to work on it! 🎨
            </p>
          </Message>
        </Container>
      );
    case "error":
      return (
        <Container>
          <Message>
            <h2>Oops! Something went wrong. 😕</h2>
            <p>
              Looks like there was an issue processing your image. We're on it!
              Please try again later or contact support if the issue persists.
              📩
            </p>
          </Message>
        </Container>
      );
    case "success":
      return (
        <Container>
          <OutputCard>
            <BeforeAfterImage $height={outputHight} $width={outputWidth}>
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
            <h2>Upload an image to begin! 📤</h2>
            <p>
              Choose an image from your device, and <strong>Dual Shades</strong>{" "}
              will take care of the rest. Ready to see the magic? 🌈
            </p>
          </Message>
        </Container>
      );
  }
}
