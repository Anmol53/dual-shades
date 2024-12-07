import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/stripe";

/**
 * POST handler for creating a Stripe checkout session.
 * @param {Request} req - The incoming request object.
 * @returns {NextResponse} - The response object with appropriate status code and JSON payload.
 */
export async function POST(req) {
  // Parse the request body as JSON
  const body = await req.json();

  // Validate the required parameters
  if (!body.priceId) {
    return NextResponse.json(
      { error: "Price ID is required" },
      { status: 400 }
    );
  }

  if (!body.successUrl || !body.cancelUrl) {
    return NextResponse.json(
      { error: "Success and cancel URLs are required" },
      { status: 400 }
    );
  }

  try {
    // Destructure the required parameters from the request body
    const { priceId, successUrl, cancelUrl } = body;

    // Create a Stripe checkout session
    const stripeSessionURL = await createCheckout({
      priceId,
      successUrl,
      cancelUrl,
      // If you send coupons from the frontend, you can pass it here
      // couponId: body.couponId,
      // If you proceed checkout with logged in users, you can use this to identify the user later in the stripe webhook
      // clientReferenceId: user._id.toString(),
      // If you require users to be logged in, you can pass the user object here—it will automatically prefill data like email
      // user: await User.findById({_id: "123"})
    });

    // Return the checkout session URL as a JSON response
    return NextResponse.json({ url: stripeSessionURL });
  } catch (e) {
    // Log the error and return a JSON response with the error message
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
