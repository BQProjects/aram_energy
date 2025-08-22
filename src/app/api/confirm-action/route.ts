/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId, Filter, Document } from "mongodb";

async function updateSessionEmailStatus(sessionId: string, confirmed: boolean) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Handle both ObjectId and string session IDs
    let updateQuery: { _id: ObjectId } | { _id: string };
    if (ObjectId.isValid(sessionId)) {
      updateQuery = { _id: new ObjectId(sessionId) };
    } else {
      updateQuery = { _id: sessionId };
    }

    const result = await db
      .collection("sessions")
      .updateOne(updateQuery as Filter<Document>, {
        $set: {
          emailConfirmed: confirmed,
          emailConfirmedAt: new Date(),
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
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error updating session email status:", error);
    return false;
  }
}

// Handle POST requests from the confirm page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, action, id } = body;

    console.log("POST Email confirmation - sessionId:", sessionId, "action:", action, "id:", id);

    if (!sessionId || !action) {
      return NextResponse.json(
        { success: false, message: "Missing session ID or action parameter." },
        { status: 400 }
      );
    }

    // Update session with email confirmation status
    const updateSuccess = await updateSessionEmailStatus(sessionId, action === "confirm");

    if (updateSuccess) {
      return NextResponse.json({
        success: true,
        message: action === "confirm" ? "Email confirmed successfully!" : "Email confirmation rejected",
        confirmed: action === "confirm"
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to update session status" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in POST confirm-action:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request." },
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

    console.log("Email confirmation - sessionId:", sessionId, "action:", action);

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
    const updateSuccess = await updateSessionEmailStatus(sessionId, action === "confirm");

    // Return success page
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Email Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .success { color: #4CAF50; }
            .error { color: #f44336; }
            .container { max-width: 600px; margin: 0 auto; }
            .btn { 
              display: inline-block; 
              background: #FF9641; 
              color: white; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="${action === "confirm" ? "success" : "error"}">
              <h1>${
                action === "confirm" ? "✓ Email Confirmed!" : "✗ Email Rejected"
              }</h1>
              <p>
                ${
                  action === "confirm"
                    ? updateSuccess 
                      ? "Your email has been confirmed successfully! You can now go back to the form to complete your submission."
                      : "Email confirmed, but there was an issue updating your session. Please try again."
                    : "Your email confirmation was rejected. Please go back to the form to make changes."
                }
              </p>
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
              }/calculator/sepaMandate?id=${sessionId}" class="btn">← Back to Form</a>
            </div>
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
