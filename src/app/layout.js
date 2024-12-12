import { Montserrat } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";
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
 * The RootLayout component is the main layout wrapper for the Next.js application.
 * It sets up the HTML structure, and renders the children components.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {React.ReactElement} - The RootLayout component with the HTML structure and children components.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={montserrat.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
