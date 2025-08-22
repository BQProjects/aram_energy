/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId, Filter, Document } from "mongodb";

async function updateSessionEmailStatus(sessionId: string, confirmed: boolean) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Always use ObjectId for _id field
    let updateQuery: { _id: ObjectId };
    if (ObjectId.isValid(sessionId)) {
      updateQuery = { _id: new ObjectId(sessionId) };
    } else {
      // If not a valid ObjectId, return error early
      console.error("Invalid session ID format:", sessionId);
      return { success: false, message: "Invalid session ID format." };
    }

    // Check if the link has already been used
    const session = await db.collection("sessions").findOne(updateQuery);
    if (!session) {
      console.error("No session found with ID:", sessionId);
      return { success: false, message: "Session not found." };
    }

    if (session.linkUsed) {
      console.error("Link has already been used for session ID:", sessionId);
      return { success: false, message: "This link has already been used." };
    }

    // Update the session to mark the link as used and set the confirmation status
    const result = await db
      .collection("sessions")
      .updateOne(updateQuery as Filter<Document>, {
        $set: {
          emailConfirmed: confirmed,
          emailConfirmedAt: new Date(),
          linkUsed: true, // Mark the link as used
        },
      });

    console.log(
      "Email confirmation update result:",
      result.matchedCount,
      "matched,",
      result.modifiedCount,
      "modified"
    );

    if (result.matchedCount === 0) {
      console.error("No session found with ID:", sessionId);
      return { success: false, message: "Failed to update session." };
    }
    return { success: true, message: "Session updated successfully." };
  } catch (error) {
    console.error("Error updating session email status:", error);
    return { success: false, message: "An error occurred." };
  }
}

// Handle POST requests from the confirm page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, action } = body;

    console.log(
      "POST Email confirmation - sessionId:",
      sessionId,
      "action:",
      action
    );

    if (!sessionId || !action) {
      return NextResponse.json(
        { success: false, message: "Missing session ID or action parameter." },
        { status: 400 }
      );
    }

    // Update session with email confirmation status
    const updateResult = await updateSessionEmailStatus(
      sessionId,
      action === "confirm"
    );

    if (!updateResult.success) {
      return NextResponse.json(
        { success: false, message: updateResult.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        action === "confirm"
          ? "Email confirmed successfully!"
          : "Email confirmation rejected",
      confirmed: action === "confirm",
    });
  } catch (error) {
    console.error("Error in POST confirm-action:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}

// Handle GET requests for email confirmation links
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const action = searchParams.get("action");

    console.log(
      "GET Email confirmation - sessionId:",
      sessionId,
      "action:",
      action
    );

    if (!sessionId || !action) {
      const htmlResponse = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invalid Request</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              .error { color: #f44336; }
            </style>
          </head>
          <body>
            <div class="error">
              <h1>Invalid Request</h1>
              <p>Missing session ID or action parameter.</p>
            </div>
          </body>
        </html>
      `;

      return new NextResponse(htmlResponse, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Update session with email confirmation status
    const updateResult = await updateSessionEmailStatus(
      sessionId,
      action === "confirm"
    );

    if (!updateResult.success) {
      const htmlResponse = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Link Already Used</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              .error { color: #f44336; }
            </style>
          </head>
          <body>
            <div class="error">
              <h1>Link Already Used</h1>
              <p>${updateResult.message}</p>
            </div>
          </body>
        </html>
      `;

      return new NextResponse(htmlResponse, {
        headers: { "Content-Type": "text/html" },
      });
    }

    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Email Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .success { color: #4CAF50; }
            .error { color: #f44336; }
          </style>
        </head>
        <body>
          <div class="success">
            <h1>${
              action === "confirm" ? "✓ Email Confirmed!" : "✗ Email Rejected"
            }</h1>
            <p>Your email has been ${
              action === "confirm" ? "confirmed" : "rejected"
            } successfully.</p>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(htmlResponse, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Error in GET confirm-action:", error);

    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: #f44336; }
          </style>
        </head>
        <body>
          <div class="error">
            <h1>Error</h1>
            <p>An error occurred while processing your request.</p>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(htmlResponse, {
      headers: { "Content-Type": "text/html" },
    });
  }
}
