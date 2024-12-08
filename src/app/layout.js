import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import StyledComponentsRegistry from "@/components/wrappers/StyledComponentsRegistry";
import SessionProviderWrapper from "@/components/wrappers/SessionProviderWrapper";
import { GeneratorProvider } from "@/components/wrappers/GeneratorContext";
/**
 * Creating an instance of Montserrat font with latin subset.
 */
const montserrat = Montserrat({ subsets: ["latin"] });

/**
 * Exporting metadata for the page.
 * @type {{title: string, description: string}}
 */
export const metadata = {
  title: "Dual Shades",
  description:
    "Easily transform photos by keeping the subject colored and changing the background to black and white. Enhance your visuals with a simple touch!",
  applicationName: "Dual Shades",
  authors: [{ name: "Anmol Agrawal", url: "https://anmolagrawal.dev" }],
  generator: "Next.js",
  keywords: [
    "photo editing",
    "color focus",
    "black and white background",
    "selective coloring",
    "photo enhancement",
    "photography apps",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Anmol Agrawal",
  publisher: "Anmol Agrawal",
  robots: "index, follow",

  // Icon metadata
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      {
        url: "/icons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/android-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "192x192", type: "image/png" }],
  },
};

/**
 * RootLayout is the main layout component for the Next.js application.
 * It wraps the children components with necessary providers and scripts.
 *
 * @param {Object} props - The props passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {React.ReactElement} - The root layout component with the wrapped children.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Loading FontAwesome script */}
        <Script src="https://kit.fontawesome.com/9e516a39e2.js"></Script>
      </head>
      <body className={montserrat.className}>
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
            <GeneratorProvider>{children}</GeneratorProvider>
          </SessionProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
