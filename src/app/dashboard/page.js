"use client";
import { useContext, useRef } from "react";
import styled from "styled-components";
import FileUpload from "@/components/fileUpload";
import GeneratorContext from "@/components/wrappers/GeneratorContext";
import { removeBackground } from "@imgly/background-removal";
import { Jimp } from "jimp";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UploadContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 2rem;
  justify-content: center;
`;

/**
 * Dashboard component that handles user interactions and data management.
 * @returns {JSX.Element} - The JSX element to render the Dashboard component.
 */
export default function Dashboard() {
  const canvasRef = useRef(null);
  const { generation, updateGenerator } = useContext(GeneratorContext);
  const router = useRouter();
  const { data: session } = useSession();

  const haveCredits = async () => {
    let response = false;
    await fetch("./api/user/can-generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email }),
    })
      .then((res) => res.json())
      .then((res) => (response = res.canGenerate));
    return response;
  };

  const handleImageOverlay = async (image1Src, image2Src) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load the images
    const img1 = new Image();
    const img2 = new Image();

    img1.src = image1Src;
    img2.src = image2Src;

    await new Promise((resolve) => {
      img1.onload = resolve;
    });
    await new Promise((resolve) => {
      img2.onload = resolve;
    });

    // Set canvas size to match the images
    canvas.width = img1.width;
    canvas.height = img1.height;

    // Draw the first image
    ctx.drawImage(img1, 0, 0);

    // Draw the second image with some transparency
    ctx.globalAlpha = 1; // Adjust for desired transparency
    ctx.drawImage(img2, 0, 0);

    // Get the resulting image as a data URL
    const output = canvas.toDataURL("image/png");
    return output;
  };

  const generateImage = async (image) => {
    try {
      const inputImageURL = URL.createObjectURL(image);
      const inputImage = new Image();
      inputImage.src = inputImageURL;
      await new Promise((resolve) => {
        inputImage.onload = resolve;
      });
      updateGenerator({
        inputImageURL,
        outputImageURL: null,
        status: "processing",
        height: inputImage.height,
        width: inputImage.width,
      });

      const foregroundImage = await removeBackground(image);
      const foregroundImageURL = URL.createObjectURL(foregroundImage);

      updateGenerator({
        inputImageURL,
        outputImageURL: null,
        status: "finishing",
        height: inputImage.height,
        width: inputImage.width,
      });

      const response = await fetch(inputImageURL, {});

      const imageBuffer = await response.arrayBuffer();

      const response2 = await fetch(foregroundImageURL, {});

      const imageBuffer2 = await response2.arrayBuffer();

      const img = await Jimp.fromBuffer(imageBuffer);

      img.greyscale();

      const bw_image = await img.getBase64("image/png");

      const og_img = await handleImageOverlay(bw_image, foregroundImageURL);

      updateGenerator({
        inputImageURL,
        outputImageURL: og_img,
        status: "success",
        height: inputImage.height,
        width: inputImage.width,
      });

      await fetch("./api/user/consume-credit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });
    } catch (error) {
      updateGenerator({
        inputImageURL: null,
        outputImageURL: null,
        status: "error",
        height: null,
        width: null,
      });
      console.log(error);
    }
  };

  return (
    <UploadContainer>
      <FileUpload
        onSuccess={async (file) => {
          if (!(await haveCredits())) {
            router.push("/dashboard/account");
            updateGenerator({
              inputImageURL: null,
              outputImageURL: null,
              status: "credit-exhausted",
              height: null,
              width: null,
            });

            return;
          }
          updateGenerator({
            inputImageURL: null,
            outputImageURL: null,
            status: "uploading",
            height: null,
            width: null,
          });
          generateImage(file[0]);
        }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>{" "}
    </UploadContainer>
  );
}
