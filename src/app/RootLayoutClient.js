"use client";

import "./globals.css";
import StyledComponentsRegistry from "@/components/wrappers/StyledComponentsRegistry";
import SessionProviderWrapper from "@/components/wrappers/SessionProviderWrapper";
import { GeneratorProvider } from "@/components/wrappers/GeneratorContext";
import dynamic from "next/dynamic";

const ThemeWrapper = dynamic(
  () => import("@/components/wrappers/ThemeWrapper"),
  { ssr: false }
);

/**
 * RootLayoutClient is a client-side component that wraps the application's main layout.
 * It provides necessary context providers and global style registration for the application.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {React.ReactElement} - The root layout component with the necessary context providers and global styles.
 */
export default function RootLayoutClient({ children }) {
  return (
    <>
      {/**
       * Custom component for StyledComponentsRegistry.
       * This component is responsible for registering global styles and themes.
       */}
      <StyledComponentsRegistry>
        {/**
         * Custom component for SessionProviderWrapper.
         * This component is responsible for managing user sessions.
         */}
        <SessionProviderWrapper>
          <GeneratorProvider>
            <ThemeWrapper>{children}</ThemeWrapper>
          </GeneratorProvider>
        </SessionProviderWrapper>
      </StyledComponentsRegistry>
    </>
  );
}
