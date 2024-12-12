"use client";
import React, { createContext, useState } from "react";

const GeneratorContext = createContext();

/**
 * Provides an image context to its child components.
 * This component manages the state of an image and provides a method to update it.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {React.ReactElement} A context provider component that supplies image data and update function to its children.
 */
export const GeneratorProvider = ({ children }) => {
  const [generation, setGeneration] = useState({
    inputImageURL: null,
    outputImageURL: null,
    status: null,
    height: null,
    width: null,
  });

  const updateGenerator = (data) => {
    setGeneration(data);
  };

  return (
    <GeneratorContext.Provider value={{ generation, updateGenerator }}>
      {children}
    </GeneratorContext.Provider>
  );
};

export default GeneratorContext;
