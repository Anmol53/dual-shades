"use client";

import { useState } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";

/**
 * A functional component that renders a button for initiating a payment process.
 * It uses the Next.js navigation library to handle page navigation and fetches data from the server to create a Stripe checkout session.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.priceId - The ID of the Stripe price for the product.
 *
 * @returns {JSX.Element} - The rendered CheckoutButton component.
 */
export default function CheckoutButton({ priceId, label }) {
  // Use the Next.js navigation library to handle page navigation
  const router = useRouter();

  // State variable to track the loading state of the payment process
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the payment process by making a request to the server to create a Stripe checkout session.
   * It updates the loading state and redirects the user to the Stripe checkout page.
   */
  const handlePayment = () => {
    setIsLoading(true);

    fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: priceId ? priceId : "price_1PKlEASAmVbTfP3b49wokEvF",
        successUrl: "http://localhost:3000/?success=true",
        cancelUrl: "http://localhost:3000/?canceled=true",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setIsLoading(false);
        router.push(res.url);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Button onClick={() => handlePayment()}>
      {label ? label : "See It In Action"}&nbsp;&nbsp;
      {isLoading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <i className="fa-solid fa-arrow-right"></i>
      )}
    </Button>
  );
}
