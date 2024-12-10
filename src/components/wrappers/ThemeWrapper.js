"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  light: {
    text: "#3a4e56",
    headingHighlightText: "#77B0AA",
    background1: "#e0f7fa",
    background2: "#ffffff",
    accentColor: "#008b8b",
    textOnAccent: "#ffffff",
  },
  dark: {
    text: "#cfcfcf",
    headingHighlightText: "#94e0eb",
    background1: "#1b1b1b",
    background2: "#121212",
    accentColor: "#46b5bc",
    textOnAccent: "#000000",
  },
};

/**
 * A custom React hook that determines the user's preferred color scheme (dark or light) and
 * updates the application's theme accordingly.
 *
 * @returns {boolean} - A boolean value indicating whether the user's preferred color scheme is
 * dark (true) or light (false).
 */
const usePreferredColorScheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    const handleColorSchemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    darkThemeMq.addEventListener("change", handleColorSchemeChange);
    return () =>
      darkThemeMq.removeEventListener("change", handleColorSchemeChange);
  }, []);

  return isDarkMode;
};

/**
 * A React component that wraps its children in a ThemeProvider from styled-components,
 * applying the appropriate theme based on the user's preferred color scheme.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The children components to be wrapped in the ThemeProvider.
 * @param {String} forceMode - Whether to apply the theme based on the child's preferred color scheme
 *
 * @returns {React.ReactElement} - The wrapped children components with the appropriate theme applied.
 */
export default function ThemeWrapper({ children }) {
  let isDarkMode = usePreferredColorScheme();

  return (
    <ThemeProvider theme={isDarkMode ? theme.dark : theme.light}>
      {children}
    </ThemeProvider>
  );
}
