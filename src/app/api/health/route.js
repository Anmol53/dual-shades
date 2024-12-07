import { NextResponse } from "next/server";

/**
 * A GET request handler for health check endpoint.
 * This function returns a JSON response with health check details.
 *
 * @param {Request} req - The incoming request object.
 * @returns {NextResponse} - A Next.js response object with a JSON payload.
 */
export async function GET(req) {
  // Create a JSON response with health check details
  return NextResponse.json({
    message: "Dual Shades Health Check",
    status: 200,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
}
