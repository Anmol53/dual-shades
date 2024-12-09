import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

/**
 * Consumes a credit for the user, updating their usage stats.
 *
 * This endpoint is called when a user consumes a credit for image generation. It updates:
 * - The user's current monthly usage (`current_month_usage`).
 * - The user's total usage (`total_usage`).
 * - The last date the user consumed a credit (`last_used_date`).
 *
 * @param {Request} req - The HTTP request object containing the user's email.
 * @returns {NextResponse} - A JSON response indicating whether the consumption was successful,
 *                            or an error if something goes wrong.
 */
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body to extract the user's email
    const { email } = await req.json();

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      // Return a 404 if the user is not found
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Update the user's usage data
    const currentDate = new Date();

    // Increment current month's usage and total usage
    user.usage.current_month_usage += 1;
    user.usage.total_usage += 1;

    // Update the last used date to the current date
    user.usage.last_used_date = currentDate;

    // Save the updated user data
    await user.save();

    // Return a success response
    return NextResponse.json(
      { message: "Credit consumed successfully." },
      { status: 200 }
    );
  } catch (error) {
    // Return an error response in case of failure
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 400 }
    );
  }
}
