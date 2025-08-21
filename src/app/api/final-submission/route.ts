/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const COMPANY_EMAILS = [
  process.env.COMPANY_EMAIL_1 || "company1@example.com",
  process.env.COMPANY_EMAIL_2 || "company2@example.com",
];

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    // Debug logging to see what we're receiving
    console.log("Received sessionId:", sessionId);
    console.log("Type:", typeof sessionId);
    console.log("Length:", sessionId?.length);
    console.log("Is valid ObjectId:", ObjectId.isValid(sessionId));

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Session ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Get session data - handle both ObjectId and string IDs
    let session;

    if (ObjectId.isValid(sessionId)) {
      // If it's a valid ObjectId, search by _id as ObjectId
      session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(sessionId) });
    } else {
      // If it's not a valid ObjectId, search by _id as string
      session = await db.collection("sessions").findOne({ _id: sessionId });
    }

    if (!session) {
      console.log("❌ Session not found for ID:", sessionId);
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 404 }
      );
    }

    console.log("✅ Session found:", !!session);
    console.log("Session emailConfirmed:", session.emailConfirmed);
    console.log("Session keys:", Object.keys(session));
    console.log("Session calculationTarif:", session.calculationTarif);
    console.log("Session selectedTariff:", session.selectedTariff);
    console.log("Session selectedTariffData:", session.selectedTariffData);
    console.log("Session sepaForm:", session.sepaForm);
    console.log("Session sepaDetails:", session.sepaDetails);

    // Check if email is confirmed
    if (!session.emailConfirmed) {
      console.log("❌ Email not confirmed");
      return NextResponse.json(
        { success: false, message: "Email confirmation required" },
        { status: 400 }
      );
    }

    console.log("✅ Email confirmed, proceeding with submission...");

    // Move data to submissions collection
    console.log("📝 Creating submission data...");

    // Map the calculation tariff data - handle both possible structures
    const calculationTarif = session.calculationTarif || {
      selected: session.selected,
      customerType: session.customerType,
      postalCode: session.postalCode,
      annualConsumption: session.annualConsumption,
      postalOptions: session.postalOptions,
    };

    // Map the selected tariff data - include both the selection and the actual tariff data
    const selectedTariff = {
      selectedTariffId: session.selectedTariff,
      selectedTariffData: session.selectedTariffData,
      ...(session.selectedTariff && typeof session.selectedTariff === "object"
        ? session.selectedTariff
        : {}),
    };

    // Map the SEPA form data - handle both sepaForm and sepaDetails
    const sepaForm = session.sepaForm || session.sepaDetails;

    const submissionData = {
      calculationTarif,
      personalDetails: session.personalDetails,
      selectedTariff,
      addressDetails: session.addressDetails,
      sepaForm,
      emailConfirmed: session.emailConfirmed,
      emailConfirmedAt: session.emailConfirmedAt,
      submittedAt: new Date(),
      status: "submitted",
      originalSessionId: session._id,
    };

    console.log("📝 Submission data prepared:");
    console.log("- calculationTarif:", submissionData.calculationTarif);
    console.log("- selectedTariff:", submissionData.selectedTariff);
    console.log("- sepaForm:", submissionData.sepaForm);
    console.log("📝 Inserting submission...");
    // Insert into submissions
    const result = await db.collection("submissions").insertOne(submissionData);
    console.log("✅ Submission inserted with ID:", result.insertedId);

    // Notify WebSocket clients about submission
    await notifyWebSocketClients(sessionId, "submission_completed", "submit");

    // Send notification emails to admin and company
    const emailList = [
      session.personalDetails?.email,
      ADMIN_EMAIL,
      ...COMPANY_EMAILS,
    ].filter(Boolean);

    // Compose professional email body
    const calc = submissionData.calculationTarif || {};
    const sel =
      submissionData.selectedTariff?.selectedTariffData ||
      submissionData.selectedTariff ||
      {};
    const pd = submissionData.personalDetails || {};
    const ad = submissionData.addressDetails || {};
    const sepa = submissionData.sepaForm || {};

    const htmlEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Energy Contract Application Submitted</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #FF9641 0%, #e88537 100%); color: white; padding: 30px 20px; text-align: center; }
          .content { padding: 30px 20px; }
          .section { margin-bottom: 25px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
          .section-header { background-color: #f8f9fa; padding: 15px 20px; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #333; }
          .section-content { padding: 20px; }
          .field { margin-bottom: 10px; font-family: monospace; font-size: 14px; }
          .field strong { color: #FF9641; }
          .footer { background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
          .success-badge { background-color: #28a745; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Energy Contract Application</h1>
            <div class="success-badge">✅ SUBMITTED</div>
          </div>
          
          <div class="content">
            <p style="font-size: 16px; color: #333; margin-bottom: 25px;">
              Dear ${pd.name || "Customer"},<br><br>
              Your energy contract application has been successfully submitted. Below are the details of your application:
            </p>

            <div class="section">
              <div class="section-header">🏢 Calculation Tariff</div>
              <div class="section-content">
                <div class="field"><strong>Selected:</strong> ${
                  calc.selected || "-"
                }</div>
                <div class="field"><strong>Customer Type:</strong> ${
                  calc.customerType || "-"
                }</div>
                <div class="field"><strong>Postal Code:</strong> ${
                  calc.postalCode || "-"
                }</div>
                <div class="field"><strong>Annual Consumption:</strong> ${
                  calc.annualConsumption || "-"
                }</div>
              </div>
            </div>

            <div class="section">
              <div class="section-header">💰 Selected Tariff</div>
              <div class="section-content">
                <div class="field"><strong>Base Price:</strong> ${
                  sel.basePrice || "-"
                }</div>
                <div class="field"><strong>Labor Price:</strong> ${
                  sel.laborPrice || "-"
                }</div>
                <div class="field"><strong>Type of Current:</strong> ${
                  sel.typeOfCurrent || "-"
                }</div>
                <div class="field"><strong>Contract Term:</strong> ${
                  sel.contractTerm || "-"
                }</div>
                <div class="field"><strong>Total:</strong> ${
                  sel.total || "-"
                }</div>
              </div>
            </div>

            <div class="section">
              <div class="section-header">👤 Personal Details</div>
              <div class="section-content">
                <div class="field"><strong>Name:</strong> ${pd.name || "-"} ${
      pd.surname || ""
    }</div>
                <div class="field"><strong>Email:</strong> ${
                  pd.email || "-"
                }</div>
                <div class="field"><strong>Phone:</strong> ${
                  pd.phone || "-"
                }</div>
                <div class="field"><strong>Birth Date:</strong> ${
                  pd.birthDate || "-"
                }</div>
              </div>
            </div>

            <div class="section">
              <div class="section-header">🏠 Address Details</div>
              <div class="section-content">
                <div class="field"><strong>Street:</strong> ${
                  ad.street || "-"
                } ${ad.houseNumber || ""}</div>
                <div class="field"><strong>Postal Code:</strong> ${
                  ad.postalCode || "-"
                }</div>
                <div class="field"><strong>Location:</strong> ${
                  ad.location || "-"
                }</div>
              </div>
            </div>

            <div class="section">
              <div class="section-header">💳 Payment Information</div>
              <div class="section-content">
                <div class="field"><strong>IBAN:</strong> ${
                  sepa.iban || "-"
                }</div>
                <div class="field"><strong>Account Holder:</strong> ${
                  sepa.accountHolder || "-"
                }</div>
              </div>
            </div>

            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
              <strong>Submission ID:</strong> ${result.insertedId}<br>
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0; font-size: 14px;">
              <strong>Aram Energy Solution</strong><br>
              Energy Service Pool GmbH
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send emails to all recipients
    for (const to of emailList) {
      try {
        await resend.emails.send({
          from: "noreply@updates.jashkumar.dev",
          to,
          subject: "Energy Contract Application Submitted - Confirmation",
          html: htmlEmailBody,
        });
      } catch (emailError) {
        console.error(`Failed to send email to ${to}:`, emailError);
      }
    }

    // Remove session after successful submission
    // Use the same query method as we used to find the session
    if (ObjectId.isValid(sessionId)) {
      await db
        .collection("sessions")
        .deleteOne({ _id: new ObjectId(sessionId) });
    } else {
      await db.collection("sessions").deleteOne({ _id: sessionId });
    }

    // Also remove any pending confirmation records for this session
    try {
      const pendingResult = await db
        .collection("pending_confirmations")
        .deleteMany({ sessionId: sessionId });
      console.log(
        `✅ Removed ${pendingResult.deletedCount} pending confirmation(s) for session ${sessionId}`
      );
    } catch (pendingError) {
      console.error("Error removing pending confirmations:", pendingError);
      // Don't fail the entire request if this cleanup fails
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      submissionId: result.insertedId,
    });
  } catch (error) {
    console.error("Error in final submission:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Notify WebSocket clients about submission
async function notifyWebSocketClients(
  sessionId: string,
  type: string,
  action: string
) {
  try {
    const wsNotifyUrl =
      process.env.WS_NOTIFY_URL || "http://localhost:3012/notify";
    const wsResponse = await fetch(wsNotifyUrl, {
      method: "POST",
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
