"use client";
import React, { createContext, useEffect, useState } from "react";

const ImageContext = createContext();

/**
 * Provides an image context to its child components.
 * This component manages the state of an image and provides a method to update it.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {React.ReactElement} A context provider component that supplies image data and update function to its children.
 */
export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState({});

  // useEffect(() => {
  //   const imageData =
  //     localStorage.getItem("imageData") !== "undefined" &&
  //     localStorage.getItem("imageData") !== null
  //       ? JSON.parse(localStorage.getItem("imageData"))
  //       : null;
  //   if (
  //     imageData === null ||
  //     typeof imageData !== "object" ||
  //     Object.keys(imageData).length === 0
  //   ) {
  //     localStorage.setItem("imageData", {
  //       message: "Please upload an Image",
  //     });
  //     setImage({
  //       message: "Please upload an Image",
  //     });
  //   } else {
  //     setImage(imageData);
  //   }
  // }, []);

  const updateImage = (data) => {
    // localStorage.setItem("imageData", JSON.stringify(data));
    setImage(data);
  };

  return (
    <ImageContext.Provider value={{ image, updateImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
