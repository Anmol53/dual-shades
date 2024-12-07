import Stripe from "stripe";

/**
 * Function to create a Stripe checkout session.
 *
 * @param {Object} params - The parameters for creating the checkout session.
 * @param {string} params.priceId - The ID of the price for the checkout session.
 * @param {string} params.successUrl - The URL to redirect to upon successful payment.
 * @param {string} params.cancelUrl - The URL to redirect to upon cancellation of the payment.
 * @param {string} [params.couponId] - The ID of the coupon to apply to the checkout session.
 * @param {string} [params.clientReferenceId] - The client reference ID for the checkout session.
 * @param {Object} [params.user] - The user object containing customerId and email.
 * @param {string} [params.user.customerId] - The ID of the customer associated with the checkout session.
 * @param {string} [params.user.email] - The email of the user associated with the checkout session.
 *
 * @returns {Promise<string>} - A promise that resolves to the URL of the created checkout session.
 */
export async function createCheckout({
  priceId,
  successUrl,
  cancelUrl,
  couponId,
  clientReferenceId,
  user,
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const userParam = {};

  if (user?.customerId) {
    userParam.customer = user.customerId;
  } else {
    userParam.customer_creation = "always";

    if (user?.email) {
      userParam.customer_email = user.email;
    }
  }
  try {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      ...userParam,
      allow_promotion_codes: true,
      invoice_creation: { enabled: true },
      tax_id_collection: { enabled: true },
      client_reference_id: clientReferenceId,
      payment_intent_data: { setup_future_usage: "on_session" },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      discounts: couponId
        ? [
            {
              coupon: couponId,
            },
          ]
        : [],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    return stripeSession.url;
  } catch (e) {
    console.error(e);
  }
}
