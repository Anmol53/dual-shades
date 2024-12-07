import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Plan from "@/models/Plan";

export async function GET(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Create a new user in the database
    const plans = await Plan.find();

    // Return the created user as JSON with a 200 status code
    return NextResponse.json({ data: plans }, { status: 200 });
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
