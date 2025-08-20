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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action } = body;

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
      // Move data from pending_confirmations to submissions with confirmed status
      const submissionData: any = {
        ...pendingConfirmation,
        confirmation: "confirmed",
        confirmationAt: new Date(),
        originalPendingId: pendingConfirmation._id,
      };

      // Remove the original _id, expiresAt, and status fields to let MongoDB generate a new one for submissions
      delete submissionData._id;
      delete submissionData.expiresAt;
      delete submissionData.status;

      // Insert into submissions collection
      const result = await db
        .collection("submissions")
        .insertOne(submissionData);

      // Remove from pending confirmations
      await db
        .collection("pending_confirmations")
        .deleteOne({ _id: new ObjectId(id) });

      // Send notification emails
      const emailList = [
        pendingConfirmation.personalDetails?.email,
        ADMIN_EMAIL,
        ...COMPANY_EMAILS,
      ].filter(Boolean);

      // Compose professional email body
      const calc = pendingConfirmation.calculationTarif || {};
      const sel = pendingConfirmation.selectedTariff || {};
      const pd = pendingConfirmation.personalDetails || {};
      const sepa = pendingConfirmation.sepaForm || {};

      const htmlEmailBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Energy Contract Application Confirmed</title>
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
              <div class="success-badge">✅ CONFIRMED</div>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; color: #333; margin-bottom: 25px;">
                Dear ${pd.name || "Customer"},<br><br>
                Your energy contract application has been successfully confirmed. Below are the details of your application:
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
                  <div class="field"><strong>Postal Options:</strong><br>
                    ${
                      calc.postalOptions &&
                      Array.isArray(calc.postalOptions) &&
                      calc.postalOptions.length > 0
                        ? calc.postalOptions
                            .map(
                              (opt: { plz?: string; district?: string }) =>
                                `&nbsp;&nbsp;• PLZ: ${
                                  opt.plz || "-"
                                }, District: ${opt.district || "-"}`
                            )
                            .join("<br>")
                        : "&nbsp;&nbsp;-"
                    }
                  </div>
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
                  <div class="field"><strong>Price Guarantee:</strong> ${
                    sel.priceGuarantee || "-"
                  }</div>
                  <div class="field"><strong>Down Payment:</strong> ${
                    sel.downPayment || "-"
                  }</div>
                  <div class="field"><strong>Total:</strong> ${
                    sel.total || "-"
                  }</div>
                </div>
              </div>

              <div class="section">
                <div class="section-header">👤 Personal Details</div>
                <div class="section-content">
                  <div class="field"><strong>Name:</strong> ${
                    pd.name || "-"
                  }</div>
                  <div class="field"><strong>Surname:</strong> ${
                    pd.surname || "-"
                  }</div>
                  <div class="field"><strong>Email:</strong> ${
                    pd.email || "-"
                  }</div>
                  <div class="field"><strong>Date of Birth:</strong> ${
                    pd.birthDate || "-"
                  }</div>
                  <div class="field"><strong>Mobile No:</strong> ${
                    pd.phone || "-"
                  }</div>
                  <div class="field"><strong>Address:</strong> ${
                    [pd.street, pd.houseNumber, pd.houseNumberSuffix]
                      .filter(Boolean)
                      .join(" ") || "-"
                  }, ${pd.postalCode || "-"} ${pd.location || "-"}</div>
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

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 30px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">Application Details</h3>
                <div class="field"><strong>Submission ID:</strong> ${
                  result.insertedId
                }</div>
                <div class="field"><strong>Confirmed At:</strong> ${new Date().toLocaleString()}</div>
                <div class="field"><strong>Original Application:</strong> ${
                  pendingConfirmation.createdAt
                    ? new Date(pendingConfirmation.createdAt).toLocaleString()
                    : "-"
                }</div>
              </div>

              <p style="margin-top: 30px; font-size: 14px; color: #666;">
                We will process your request and contact you soon with further information about your energy contract.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">© 2025 Aram Energy Solutions. All rights reserved.</p>
              <p style="margin: 5px 0 0 0;">This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send emails
      for (const to of emailList) {
        try {
          await resend.emails.send({
            from: "noreply@updates.jashkumar.dev",
            to,
            subject: "✅ Energy Contract Application Confirmed",
            html: htmlEmailBody,
          });
        } catch {
          console.error("Email send error");
        }
      }

      return NextResponse.json({
        success: true,
        message: "Application confirmed successfully",
        submissionId: result.insertedId,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch {
    console.error("Confirmation error occurred");
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing confirmation",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const action = url.searchParams.get("action");
  if (!id || !action || !["accept", "decline"].includes(action)) {
    return NextResponse.json(
      { message: "Invalid confirmation link." },
      { status: 400 }
    );
  }
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("submissions");
    const submission = await collection.findOne({ _id: new ObjectId(id) });
    if (!submission) {
      return NextResponse.json(
        { message: "Submission not found." },
        { status: 404 }
      );
    }
    if (submission.confirmation !== "pending") {
      return NextResponse.json(
        {
          error:
            "This submission has already been processed. Please submit the form again if needed.",
        },
        { status: 400 }
      );
    }
    const newStatus = action === "accept" ? "confirmed" : "declined";
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { confirmation: newStatus, confirmationAt: new Date() } }
    );

    // Prepare email details
    const emailList = [
      submission.personalDetails?.email,
      ADMIN_EMAIL,
      ...COMPANY_EMAILS,
    ].filter(Boolean);

    // Compose email body in a user-friendly format
    const calc = submission.calculationTarif || {};
    const sel = submission.selectedTariff || {};
    const pd = submission.personalDetails || {};
    const emailBody = `Submission Details (Status: ${newStatus})\n\n---\nCalculation Tarif:\nSelected: ${
      calc.selected || "-"
    }\nCustomer Type: ${calc.customerType || "-"}\nPostal Code: ${
      calc.postalCode || "-"
    }\nAnnual Consumption: ${calc.annualConsumption || "-"}\nPostal Options: ${
      calc.postalOptions &&
      Array.isArray(calc.postalOptions) &&
      calc.postalOptions.length > 0
        ? calc.postalOptions
            .map(
              (opt: { plz?: string; district?: string }) =>
                `  - PLZ: ${opt.plz || "-"}, District: ${opt.district || "-"}`
            )
            .join("\n")
        : "-"
    }\n\nSelected Tariff:\nID: ${sel.id || "-"}\nName: ${
      sel.name || "-"
    }\nBase Price: ${sel.basePrice || "-"}\nLabor Price: ${
      sel.laborPrice || "-"
    }\nType of Current: ${sel.typeOfCurrent || "-"}\nContract Term: ${
      sel.contractTerm || "-"
    }\nPrice Guarantee: ${sel.priceGuarantee || "-"}\nDown Payment: ${
      sel.downPayment || "-"
    }\nTotal: ${sel.total || "-"}\n\nPersonal Details:\nName: ${
      pd.name || "-"
    }\nSurname: ${pd.surname || "-"}\nEmail: ${
      pd.email || "-"
    }\nDate of Birth: ${pd.birthDate || "-"}\nMobile No: ${
      pd.phone || "-"
    }\nAddress: ${
      [pd.street, pd.houseNumber, pd.houseNumberSuffix]
        .filter(Boolean)
        .join(" ") || "-"
    }, ${pd.postalCode || "-"} ${pd.location || "-"}\n---\n\nSubmission ID: ${
      submission._id
    }\nConfirmation: ${submission.confirmation}\nConfirmation At: ${
      submission.confirmationAt
        ? new Date(submission.confirmationAt).toLocaleString()
        : "-"
    }\nCreated At: ${
      submission.createdAt
        ? new Date(submission.createdAt).toLocaleString()
        : "-"
    }`;

    // Send emails
    for (const to of emailList) {
      try {
        await resend.emails.send({
          from: "noreply@updates.jashkumar.dev",
          to,
          subject: `Submission ${newStatus}`,
          text: emailBody,
        });
      } catch {
        // Log or handle email error, but don't block the response
      }
    }

    return NextResponse.json({ message: `Submission has been ${newStatus}.` });
  } catch {
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}
