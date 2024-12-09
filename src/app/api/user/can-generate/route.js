import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

/**
 * Handles the POST request to determine if a user can generate an image based on their plan and usage.
 *
 * This function checks the user's subscription plan and usage statistics to determine whether they are
 * allowed to generate an image. It supports two types of plans: "free" and others. For free plans, it
 * limits the number of monthly image generations.
 *
 * - If the user is on a non-free plan, they are always allowed to generate images.
 * - If the user is on a free plan, they are allowed to generate images up to a maximum number of
 *   allowed usages (defined by `MAX_CREDITS`) within the same month.
 * - The monthly usage is reset at the beginning of each month.
 *
 * @param {Request} req - The HTTP request object containing user information.
 * @returns {NextResponse} - A JSON response indicating whether the user can generate an image, with a
 *                           status code of 200 for success or 400 for errors.
 */
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract the user's email from the request body
    const { email } = await req.json();

    // Find the user by email and populate the 'plan' field
    const user = await User.findOne({ email: email }).populate("plan");

    if (!user) {
      // Return a 404 if the user is not found
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Define the maximum number of image generations allowed for free users
    const MAX_CREDITS = 2;

    // If the user is not on a free plan, they can always generate images
    if (user.plan.type !== "free") {
      return NextResponse.json(
        {
          canGenerate: true,
        },
        { status: 200 }
      );
    }

    // Extract the last usage date and current date for comparison
    const last_usage_date = user.usage.last_used_date;
    const currentDate = new Date();
    const lastUsed = new Date(last_usage_date);

    // If the user has already used image generation within the same month, check how many times they have used it
    if (
      lastUsed.getFullYear() === currentDate.getFullYear() &&
      lastUsed.getMonth() === currentDate.getMonth()
    ) {
      return NextResponse.json(
        {
          canGenerate: MAX_CREDITS - user.usage.current_month_usage > 0,
        },
        { status: 200 }
      );
    }

    // If the usage is not from the current month, reset the monthly usage counter
    if (user.usage.current_month_usage !== 0) {
      user.usage.current_month_usage = 0;
      await user.save();
    }

    // Return a success response allowing the user to generate images
    return NextResponse.json(
      {
        canGenerate: true,
      },
      { status: 200 }
    );
  } catch (error) {
    // Return an error message as JSON with a 400 status code
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
