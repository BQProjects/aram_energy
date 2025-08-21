/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId, Filter, Document } from "mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const COMPANY_EMAILS = [
  process.env.COMPANY_EMAIL_1 || "company1@example.com",
  process.env.COMPANY_EMAIL_2 || "company2@example.com",
];

// Handle WebSocket notifications for email confirmation
async function notifyWebSocketClients(
  sessionId: string,
  type: string,
  action: string
) {
  try {
    // Directly notify the WebSocket server
    const wsNotifyUrl =
      process.env.WS_NOTIFY_URL || "http://localhost:3012/notify";
    const wsResponse = await fetch(wsNotifyUrl, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        type,
        action,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!wsResponse.ok) {
      console.error("Failed to notify WebSocket clients");
    } else {
      console.log(
        `WebSocket notification sent: ${type} for session ${sessionId}`
      );
    }
  } catch (wsError) {
    console.error("WebSocket notification error:", wsError);
  }
}

async function updateSessionEmailStatus(sessionId: string, confirmed: boolean) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Handle both ObjectId and string session IDs (like your 23-character string)
    let updateQuery: { _id: ObjectId } | { _id: string };
    if (ObjectId.isValid(sessionId)) {
      updateQuery = { _id: new ObjectId(sessionId) };
    } else {
      updateQuery = { _id: sessionId };
    }

    const result = await db.collection("sessions").updateOne(
      updateQuery as Filter<Document>, // Type assertion here
      {
        $set: {
          emailConfirmed: confirmed,
          emailConfirmedAt: new Date(),
        },
      }
    );

    console.log(
      "Update result:",
      result.matchedCount,
      "matched,",
      result.modifiedCount,
      "modified"
    );

    if (result.matchedCount === 0) {
      console.error("No session found with ID:", sessionId);
    }
  } catch (error) {
    console.error("Error updating session email status:", error);
  }
}

// Handle GET requests for email confirmation links
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const action = searchParams.get("action");

    console.log(
      "GET confirm-action - sessionId:",
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
    await updateSessionEmailStatus(sessionId, action === "confirm");

    // Notify WebSocket clients about the confirmation
    await notifyWebSocketClients(
      sessionId,
      action === "confirm" ? "email_confirmed" : "email_rejected",
      action
    );

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
                    ? "Your email has been confirmed successfully! You can now proceed with the final submission on the form."
                    : "Your email confirmation was rejected. Please go back to the form to make changes."
                }
              </p>
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
              }/calculator/sepaMandate" class="btn">← Back to Form</a>
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action, sessionId } = body;

    console.log(
      "POST confirm-action - id:",
      id,
      "action:",
      action,
      "sessionId:",
      sessionId
    );

    if (!id || !action) {
      return NextResponse.json(
        { success: false, message: "ID and action are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Find the pending confirmation
    const pendingConfirmation = await db
      .collection("pending_confirmations")
      .findOne({ _id: new ObjectId(id) });

    if (!pendingConfirmation) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired confirmation" },
        { status: 404 }
      );
    }

    // Check if confirmation has expired
    if (new Date() > pendingConfirmation.expiresAt) {
      // Remove expired confirmation
      await db
        .collection("pending_confirmations")
        .deleteOne({ _id: new ObjectId(id) });

      return NextResponse.json(
        { success: false, message: "Confirmation has expired" },
        { status: 410 }
      );
    }

    if (action === "confirm") {
      // Update the session email status if sessionId is provided
      if (sessionId) {
        await updateSessionEmailStatus(sessionId, true);
      }

      // Notify WebSocket clients
      if (sessionId) {
        await notifyWebSocketClients(sessionId, "email_confirmed", "confirm");
      }

      return NextResponse.json({
        success: true,
        message: "Email confirmation updated successfully",
      });
    }

    if (action === "reject") {
      // Update the session email status if sessionId is provided
      if (sessionId) {
        await updateSessionEmailStatus(sessionId, false);
      }

      // Notify WebSocket clients
      if (sessionId) {
        await notifyWebSocketClients(sessionId, "email_rejected", "reject");
      }

      return NextResponse.json({
        success: true,
        message: "Email rejection updated successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Confirmation error occurred:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing confirmation",
      },
      { status: 500 }
    );
  }
}
