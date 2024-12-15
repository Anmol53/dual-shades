import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

/**
 * Handles the POST request to determine if a user can generate an image based on their plan and usage.
 *
 * This function checks the user's subscription plan and usage statistics to determine whether they are
 * allowed to generate an image. It supports two types of plans: "free" and others. For free plans, it
 * limits the number of image generations.
 *
 * - If the user is on a non-free plan, they are always allowed to generate images.
 * - If the user is on a free plan, they are allowed to generate images up to a maximum number of
 *   allowed usages (defined by `FREE_GENERATIONS_ALLOWED`).
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
    const FREE_GENERATIONS_ALLOWED = process.env.FREE_GENERATIONS_ALLOWED;

    // If the user is not on a free plan, they can always generate images
    // Or trial user can generate "MAX_FREE_GENERATIONS" images
    if (
      user.plan.type !== "free" ||
      FREE_GENERATIONS_ALLOWED - user.usage.total_usage > 0
    ) {
      return NextResponse.json(
        {
          canGenerate: true,
        },
        { status: 200 }
      );
    }

    // Return a success response allowing the user to generate images
    return NextResponse.json(
      {
        canGenerate: false,
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
