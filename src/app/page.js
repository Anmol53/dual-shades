"use client";

import { useEffect } from "react";
import Hero from "./components/hero";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import FAQ from "./components/faq";
import Examples from "./components/examples";

/**
 * The main component of the landing page.
 * @returns {JSX.Element} The JSX element for the landing page.
 */
export default function Home() {
  // Use effect hook to handle redirect back from Checkout
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    // Check if the redirect is successful
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    // Check if the redirect is canceled
    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  // Render the landing page
  return (
    <>
      <Hero />
      <Examples />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
