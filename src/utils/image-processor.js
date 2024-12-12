/**
 * Merges two images into one by overlaying the second image on top of the first.
 *
 * @param {string} image1Src - The source URL of the first image.
 * @param {string} image2Src - The source URL of the second image.
 * @param {string} [type='image/png'] - The desired output image type.
 * @returns {Promise<string>} - A promise that resolves to the merged image as a data URL.
 */
export const mergeImage = async (image1Src, image2Src, type = "image/png") => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Load the images
  const img1 = new Image();
  const img2 = new Image();

  img1.src = image1Src;
  img2.src = image2Src;

  await Promise.all([
    new Promise((resolve) => {
      img1.onload = resolve;
    }),
    new Promise((resolve) => {
      img2.onload = resolve;
    }),
  ]);

  // Set canvas size to match the images
  canvas.width = img1.width;
  canvas.height = img1.height;

  // Draw the first image
  ctx.drawImage(img1, 0, 0);

  // Draw the second image with some transparency
  ctx.globalAlpha = 1; // Adjust for desired transparency
  ctx.drawImage(img2, 0, 0);

  // Get the resulting image as a data URL
  const output = canvas.toDataURL(type);
  return output;
};

/**
 * Converts an image to greyscale.
 *
 * @param {HTMLImageElement} image - The image to convert to greyscale.
 * @returns {Promise<string>} - A promise that resolves to the greyscaled image as a data URL.
 */
export const greyscaleImage = async (image) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg =
      (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = avg;
    imageData.data[i + 1] = avg;
    imageData.data[i + 2] = avg;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
};
