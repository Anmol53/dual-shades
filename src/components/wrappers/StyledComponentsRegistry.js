"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

/**
 * A React component that manages the server-side rendering of styled-components.
 * It ensures that the server-generated styles are inserted into the HTML document
 * on the client-side, allowing for a seamless transition between server and client rendering.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be rendered.
 *
 * @returns {React.ReactElement} - The rendered component.
 */
export default function StyledComponentsRegistry({ children }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  // Use the server-inserted HTML hook to insert the server-generated styles into the HTML document
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // If the code is running in the browser, return the children directly
  if (typeof window !== "undefined") return <>{children}</>;

  // If the code is running on the server, wrap the children with the StyleSheetManager
  // to ensure that the server-generated styles are applied to the client-side rendering
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
