/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to format detailed application information
function formatApplicationDetails({
  calculationTarif,
  selectedTariff,
  selectedTariffData,
  personalDetails,
  addressDetails,
  postalOptions,
}: {
  calculationTarif?: any;
  selectedTariff?: any;
  selectedTariffData?: any;
  personalDetails?: any;
  addressDetails?: any;
  postalOptions?: any;
}) {
  // Helper to format calculationTarif
  const calc = calculationTarif || {};
  const calcTarifStr = `Selected: ${calc.selected || "-"}<br/>
Customer Type: ${calc.customerType || "-"}<br/>
Postal Code: ${calc.postalCode || "-"}<br/>
Annual Consumption: ${calc.annualConsumption || "-"}<br/>
Postal Options: ${
    postalOptions && Array.isArray(postalOptions) && postalOptions.length > 0
      ? postalOptions
          .map(
            (opt: any) =>
              `&nbsp;&nbsp;- PLZ: ${opt.plz || "-"}, District: ${
                opt.district || "-"
              }, Division: ${opt.division || "-"}`
          )
          .join("<br/>")
      : "-"
  }`;

  // Helper to format selectedTariff - Look for data in both possible locations
  const tariffData =
    selectedTariffData ||
    selectedTariff?.selectedTariffData ||
    selectedTariff ||
    {};
  const selectedTariffStr = `Base Price: ${tariffData.basePrice || "-"}<br/>
Labor Price: ${tariffData.laborPrice || "-"}<br/>
Type of Current: ${tariffData.typeOfCurrent || "-"}<br/>
Contract Term: ${tariffData.contractTerm || "-"}<br/>
Price Guarantee: ${tariffData.priceGuarantee || "-"}<br/>
Down Payment: ${tariffData.downPayment || "-"}<br/>
Total: ${tariffData.total || "-"}`;

  const personalDetailsStr = `Name: ${personalDetails?.name || "-"}<br/>
Surname: ${personalDetails?.surname || "-"}<br/>
Email: ${personalDetails?.email || "-"}<br/>
Date of Birth: ${personalDetails?.birthDate || "-"}<br/>
Mobile No: ${personalDetails?.phone || "-"}<br/>
Address: ${
    [
      addressDetails?.street,
      addressDetails?.houseNumber,
      addressDetails?.houseNumberSuffix,
    ]
      .filter(Boolean)
      .join(" ") || "-"
  }, ${addressDetails?.postalCode || "-"} ${addressDetails?.location || "-"}`;

  return { calcTarifStr, selectedTariffStr, personalDetailsStr };
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Store the payload in MongoDB
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("pending_confirmations").insertOne({
      ...payload,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    const insertedId = result.insertedId?.toString();

    // Get user email from personal details
    const userEmail = payload.personalDetails?.email;

    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: "User email not found" },
        { status: 400 }
      );
    }

    // Create confirmation URL with ObjectId and sessionId for WebSocket notification
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const sessionId =
      payload.calculationTarif?.sessionId || payload.sessionId || "unknown";
    const confirmUrl = `${baseUrl}/confirm?id=${insertedId}&sessionId=${sessionId}`;

    // Get formatted application details
    const { calcTarifStr, selectedTariffStr, personalDetailsStr } =
      formatApplicationDetails({
        calculationTarif: payload.calculationTarif,
        selectedTariff: payload.selectedTariff,
        selectedTariffData: payload.selectedTariffData,
        personalDetails: payload.personalDetails,
        addressDetails: payload.addressDetails,
        postalOptions: payload.postalOptions,
      });

    // Professional email template with detailed information
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Your Energy Contract Application</title>
        <style>
          /* Prevent Gmail from collapsing sections */
          .gmail-fix { 
            white-space: nowrap; 
            font-size: 0; 
          }
          .gmail-fix > div {
            white-space: normal;
            font-size: 14px;
            display: inline-block;
            width: 100%;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5; width: 100%;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0; padding: 0;">
          <tr>
            <td style="padding: 20px 0;">
              <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%;">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #FF9641 0%, #FF8533 100%); padding: 40px 30px; text-align: center; width: 100%; box-sizing: border-box;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    Aram Energy Solution
                  </h1>
                  <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                    Energy Service Pool GmbH
                  </p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px; width: 100%; box-sizing: border-box;">
                  <h2 style="color: #333333; font-size: 24px; margin: 0 0 20px 0; text-align: center;">
                    Confirm Your Energy Contract Application
                  </h2>
                  
                  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                    Dear <strong>${
                      payload.personalDetails?.name || "Customer"
                    }</strong>,
                  </p>
                  
                  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                    Thank you for your energy contract application with Aram Energy Solution. Please review your application details below and confirm to proceed with processing.
                  </p>
                  
                  <!-- Detailed Application Information -->
                  <div class="gmail-fix">
                    <div style="background-color: #f8f9fa; border-left: 4px solid #FF9641; padding: 25px; margin: 30px 0; border-radius: 0 8px 8px 0; width: 100%; box-sizing: border-box;">
                      <h3 style="color: #333333; font-size: 18px; margin: 0 0 20px 0;">📋 Complete Application Details</h3>
                      
                      <!-- Calculation Tarif Section -->
                      <div style="margin-bottom: 25px; width: 100%;">
                        <h4 style="color: #FF9641; font-size: 16px; margin: 0 0 10px 0; border-bottom: 1px solid #e9ecef; padding-bottom: 5px;">
                          🏢 Calculation Tariff
                        </h4>
                        <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef; width: 100%; box-sizing: border-box;">
                          <div style="font-family: 'Courier New', monospace; font-size: 13px; color: #333333; line-height: 1.6; padding: 0;">${calcTarifStr}</div>
                        </div>
                      </div>
                      
                      <!-- Selected Tariff Section -->
                      <div style="margin-bottom: 25px; width: 100%;">
                        <h4 style="color: #FF9641; font-size: 16px; margin: 0 0 10px 0; border-bottom: 1px solid #e9ecef; padding-bottom: 5px;">
                          💰 Selected Tariff
                        </h4>
                        <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef; width: 100%; box-sizing: border-box;">
                          <div style="font-family: 'Courier New', monospace; font-size: 13px; color: #333333; line-height: 1.6; padding: 0;">${selectedTariffStr}</div>
                        </div>
                      </div>
                      
                      <!-- Personal Details Section -->
                      <div style="margin-bottom: 0; width: 100%;">
                        <h4 style="color: #FF9641; font-size: 16px; margin: 0 0 10px 0; border-bottom: 1px solid #e9ecef; padding-bottom: 5px;">
                          👤 Personal Details
                        </h4>
                        <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef; width: 100%; box-sizing: border-box;">
                          <div style="font-family: 'Courier New', monospace; font-size: 13px; color: #333333; line-height: 1.6; padding: 0;">${personalDetailsStr}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Action Buttons -->
                  <div style="text-align: center; margin: 40px 0; width: 100%;">
                    <p style="color: #555555; font-size: 16px; margin: 0 0 25px 0; font-weight: bold;">
                      Please click the button below to confirm your application:
                    </p>
                    
                    <div style="margin: 0 auto;">
                      <a href="${confirmUrl}" 
                         style="display: inline-block; background: linear-gradient(135deg, #FF9641 0%, #FF8533 100%); color: #ffffff; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; text-align: center; min-width: 200px; box-shadow: 0 4px 12px rgba(255, 150, 65, 0.4);">
                        ✅ Confirm Application
                      </a>
                    </div>
                  </div>
                  
                  <!-- Important Note -->
                  <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 30px 0; width: 100%; box-sizing: border-box;">
                    <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.5;">
                      <strong>⚠️ Important:</strong> This confirmation will expire in 24 hours. Please review all details carefully before making your decision. If you have any questions or notice any errors, please contact our customer service team immediately.
                    </p>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #2c3e50; padding: 30px; text-align: center; width: 100%; box-sizing: border-box;">
                  <p style="color: #bdc3c7; font-size: 14px; margin: 0 0 10px 0; line-height: 1.5;">
                    <strong>Aram Energy Solution</strong><br>
                    Energy Service Pool GmbH<br>
                    Your trusted energy partner
                  </p>
                  <p style="color: #95a5a6; font-size: 12px; margin: 0;">
                    This is an automated message. Please do not reply to this email.
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send confirmation email
    await resend.emails.send({
      from: "noreply@aram-energy-solution.com",
      to: userEmail,
      subject: "Confirm Your Energy Contract Application - Complete Details",
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Confirmation email sent successfully",
      id: insertedId,
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}

// API to retrieve pending confirmation data (for the confirmation page)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Find the confirmation data using ObjectId
    const confirmationData = await db
      .collection("pending_confirmations")
      .findOne({ _id: new ObjectId(id) });

    if (!confirmationData) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired confirmation" },
        { status: 404 }
      );
    }

    // Check if confirmation has expired
    if (new Date() > confirmationData.expiresAt) {
      // Remove expired confirmation
      await db
        .collection("pending_confirmations")
        .deleteOne({ _id: new ObjectId(id) });

      return NextResponse.json(
        { success: false, message: "Confirmation has expired" },
        { status: 410 }
      );
    }

    return NextResponse.json({
      success: true,
      data: confirmationData,
    });
  } catch (error) {
    console.error("Error retrieving confirmation data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve confirmation data" },
      { status: 500 }
    );
  }
}
