"use client";
import { useContext } from "react";
import styled from "styled-components";
import FileUpload from "@/components/fileUpload";
import GeneratorContext from "@/components/wrappers/GeneratorContext";
import { removeBackground } from "@imgly/background-removal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { greyscaleImage, mergeImage } from "@/utils/image-processor";

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
  const { updateGenerator } = useContext(GeneratorContext);
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

      const [subject, bw_image] = await Promise.all([
        removeBackground(image),
        greyscaleImage(inputImage),
      ]);

      updateGenerator({
        inputImageURL,
        outputImageURL: null,
        status: "finishing",
        height: inputImage.height,
        width: inputImage.width,
      });

      const finalImage = await mergeImage(
        bw_image,
        URL.createObjectURL(subject),
        image.type
      );

      updateGenerator({
        inputImageURL,
        outputImageURL: finalImage,
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
          // return error message if file is not  "image/jpeg", "image/jpg", "image/png" or "image/webp"
          if (
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].indexOf(
              file[0].type
            ) === -1
          ) {
            updateGenerator({
              inputImageURL: null,
              outputImageURL: null,
              status: "invalid-format",
              height: null,
              width: null,
            });
            return;
          }

          // return error if user does not have enough credits to generate an image
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
    </UploadContainer>
  );
}
