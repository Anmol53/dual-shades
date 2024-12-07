import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ImageContext from "@/components/wrappers/ImageContext";

/**
 * This is a functional component that renders a preview container with an iframe and a floating button.
 *
 * @function PreviewContainer
 * @returns {JSX.Element} - The rendered preview container.
 */
export default function PreviewContainer() {
  const { image } = useContext(ImageContext);

  useEffect(() => {
    console.log("In PreviewContainer, images are updated", image);
  }, [image]);

  return (
    <>
      <img src={image.inputImageURL} style={{maxWidth: "40%"}} />
      <img src={image.outputImageURL} style={{maxWidth: "40%"}} />
    </>
  );
}
