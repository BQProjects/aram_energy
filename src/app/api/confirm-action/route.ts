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
              (
                opt: { plz?: string; district?: string },
                i: number
              ) =>
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
      } catch (e) {
        // Log or handle email error, but don't block the response
      }
    }

    return NextResponse.json({ message: `Submission has been ${newStatus}.` });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}
