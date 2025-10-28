/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "support@aram-energy-solution.com";
// const COMPANY_EMAILS_1 = [
//   process.env.COMPANY_EMAIL_1 || "company1@example.com",
// ];
// const COMPANY_EMAILS_2 = [
//   process.env.COMPANY_EMAIL_2 || "company2@example.com",
// ];

function generateEmailBody(
  calc: any,
  sel: any,
  pd: any,
  ad: any,
  sepa: any,
  submissionId: string,
  language: string = "en"
) {
  const isGerman = language === "de";

  const title = isGerman
    ? "Energievertragsantrag"
    : "Energy Contract Application";
  const submittedBadge = isGerman ? "✅ EINGEREICHT" : "✅ SUBMITTED";
  const greeting = isGerman
    ? `Sehr geehrte/r ${
        pd.name || "Kunde"
      },<br><br>Ihr Energievertragsantrag wurde erfolgreich eingereicht. Nachfolgend finden Sie die Details Ihres Antrags:`
    : `Dear ${
        pd.name || "Customer"
      },<br><br>Your energy contract application has been successfully submitted. Below are the details of your application:`;

  const sections = {
    calculationTariff: isGerman
      ? "🏢 Berechnungstarif"
      : "🏢 Calculation Tariff",
    selectedTariff: isGerman ? "💰 Ausgewählter Tarif" : "💰 Selected Tariff",
    personalDetails: isGerman ? "👤 Persönliche Daten" : "👤 Personal Details",
    addressDetails: isGerman ? "🏠 Adressdaten" : "🏠 Address Details",
    paymentInfo: isGerman
      ? "💳 Zahlungsinformationen"
      : "💳 Payment Information",
  };

  const fields = {
    selected: isGerman ? "Ausgewählt" : "Selected",
    customerType: isGerman ? "Kundentyp" : "Customer Type",
    postalCode: isGerman ? "Postleitzahl" : "Postal Code",
    annualConsumption: isGerman ? "Jahresverbrauch" : "Annual Consumption",
    tariffKey: isGerman ? "Tarifschlüssel" : "Tariff Key",
    transactionKey: isGerman ? "Transaktionsschlüssel" : "Transaction Key",
    basePrice: isGerman ? "Grundpreis" : "Base Price",
    laborPrice: isGerman ? "Arbeitspreis" : "Labor Price",
    typeOfCurrent: isGerman ? "Stromart" : "Type of Current",
    contractTerm: isGerman ? "Vertragslaufzeit" : "Contract Term",
    total: isGerman ? "Gesamt" : "Total",
    name: isGerman ? "Name" : "Name",
    email: isGerman ? "E-Mail" : "Email",
    phone: isGerman ? "Telefon" : "Phone",
    birthDate: isGerman ? "Geburtsdatum" : "Birth Date",
    street: isGerman ? "Straße" : "Street",
    location: isGerman ? "Ort" : "Location",
    iban: isGerman ? "IBAN" : "IBAN",
    accountHolder: isGerman ? "Kontoinhaber" : "Account Holder",
    submissionId: isGerman ? "Antrags-ID" : "Submission ID",
    submitted: isGerman ? "Eingereicht" : "Submitted",
  };

  const footer = isGerman
    ? `<strong>Aram Energy Solution</strong><br>Energie Dienstleistungen`
    : `<strong>Aram Energy Solution</strong><br>Energy Services`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
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
          <h1 style="margin: 0; font-size: 28px;">${title}</h1>
          <div class="success-badge">${submittedBadge}</div>
        </div>
        
        <div class="content">
          <p style="font-size: 16px; color: #333; margin-bottom: 25px;">
            ${greeting}
          </p>

          <div class="section">
            <div class="section-header">${sections.calculationTariff}</div>
            <div class="section-content">
              <div class="field"><strong>${fields.selected}:</strong> ${
    calc.selected || "-"
  }</div>
              <div class="field"><strong>${fields.customerType}:</strong> ${
    calc.customerType || "-"
  }</div>
              <div class="field"><strong>${fields.postalCode}:</strong> ${
    calc.postalCode || "-"
  }</div>
              <div class="field"><strong>${
                fields.annualConsumption
              }:</strong> ${calc.annualConsumption || "-"}</div>
              <div class="field"><strong>${fields.tariffKey}:</strong> ${
    calc.tariffKey || "-"
  }</div>
              <div class="field"><strong>${fields.transactionKey}:</strong> ${
    calc.transactionKey || 77509
  }</div>
            </div>
          </div>

          <div class="section">
            <div class="section-header">${sections.selectedTariff}</div>
            <div class="section-content">
              <div class="field"><strong>${fields.basePrice}:</strong> ${
    sel.basePrice || "-"
  }</div>
              <div class="field"><strong>${fields.laborPrice}:</strong> ${
    sel.laborPrice || "-"
  }</div>
              <div class="field"><strong>${fields.typeOfCurrent}:</strong> ${
    sel.typeOfCurrent || "-"
  }</div>
              <div class="field"><strong>${fields.contractTerm}:</strong> ${
    sel.contractTerm || "-"
  }</div>
              <div class="field"><strong>${fields.total}:</strong> ${
    sel.total || "-"
  }</div>
            </div>
          </div>

          <div class="section">
            <div class="section-header">${sections.personalDetails}</div>
            <div class="section-content">
              <div class="field"><strong>${fields.name}:</strong> ${
    pd.name || "-"
  } ${pd.surname || ""}</div>
              <div class="field"><strong>${fields.email}:</strong> ${
    pd.email || "-"
  }</div>
              <div class="field"><strong>${fields.phone}:</strong> ${
    pd.phone || "-"
  }</div>
              <div class="field"><strong>${fields.birthDate}:</strong> ${
    pd.birthDate || "-"
  }</div>
            </div>
          </div>

          <div class="section">
            <div class="section-header">${sections.addressDetails}</div>
            <div class="section-content">
              <div class="field"><strong>${fields.street}:</strong> ${
    ad.street || "-"
  } ${ad.houseNumber || ""}</div>
              <div class="field"><strong>${fields.postalCode}:</strong> ${
    ad.postalCode || "-"
  }</div>
              <div class="field"><strong>${fields.location}:</strong> ${
    ad.location || "-"
  }</div>
            </div>
          </div>

          <div class="section">
            <div class="section-header">${sections.paymentInfo}</div>
            <div class="section-content">
              <div class="field"><strong>${fields.iban}:</strong> ${
    sepa.iban || "-"
  }</div>
              <div class="field"><strong>${fields.accountHolder}:</strong> ${
    sepa.accountHolder || "-"
  }</div>
            </div>
          </div>

          <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
            <strong>${fields.submissionId}:</strong> ${submissionId}<br>
            <strong>${fields.submitted}:</strong> ${new Date().toLocaleString(
    isGerman ? "de-DE" : "en-US"
  )}
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0; font-size: 14px;">
            ${footer}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, language } = await request.json();

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

    // Send notification emails to admin
    const emailList = [
      session.personalDetails?.email,
      ADMIN_EMAIL,
      // COMPANY_EMAILS_1,
      // COMPANY_EMAILS_2,
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

    const htmlEmailBody = generateEmailBody(
      calc,
      sel,
      pd,
      ad,
      sepa,
      result.insertedId.toString(),
      language
    );

    // Send emails to all recipients using EmailJS
    for (const to of emailList) {
      try {
        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service_id: process.env.EMAILJS_SERVICE_ID,
              template_id: process.env.EMAILJS_TEMPLATE_ID_Final, // Use a separate template for submissions
              user_id: process.env.EMAILJS_PUBLIC_KEY,
              template_params: {
                to_email: to,
                customer_name: pd.name || "Customer",
                html_body: htmlEmailBody, // Pass the full HTML body as a parameter
                submission_id: result.insertedId,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("EmailJS response status:", response.status);
          console.error("EmailJS response text:", errorText);
          throw new Error(
            `EmailJS error: ${response.status} - ${response.statusText} - ${errorText}`
          );
        }
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
