/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatEmailBody({
  calculationTarif,
  selectedTariff,
  personalDetails,
  confirmUrl,
  declineUrl,
}: any) {
  return `Thank you for your submission.\n\nPlease confirm your details for submission:\n\n---\nCalculation Tarif:\n${JSON.stringify(
    calculationTarif,
    null,
    2
  )}\n\nSelected Tariff:\n${JSON.stringify(
    selectedTariff,
    null,
    2
  )}\n\nPersonal Details:\nName: ${personalDetails?.name || "-"}\nSurname: ${
    personalDetails?.surname || "-"
  }\nEmail: ${personalDetails?.email || "-"}\nDate of Birth: ${
    personalDetails?.birthDate || "-"
  }\nMobile No: ${personalDetails?.phone || "-"}\nAddress: ${
    personalDetails?.street || "-"
  } ${personalDetails?.houseNumber || ""} ${
    personalDetails?.houseNumberSuffix || ""
  }, ${personalDetails?.postalCode || "-"} ${
    personalDetails?.location || "-"
  }\n---\n\nTo confirm your submission, click here: ${confirmUrl}\nTo decline, click here: ${declineUrl}\n`;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db
      .collection("submissions")
      .insertOne({ ...data, createdAt: new Date() });
    // Send confirmation email if email is present
    const email = data.personalDetails?.email;
    const insertedId = result.insertedId?.toString();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const confirmUrl = `${baseUrl}/confirm?id=${insertedId}&action=accept`;
    const declineUrl = `${baseUrl}/confirm?id=${insertedId}&action=decline`;
    if (email) {
      await resend.emails.send({
        from: "noreply@updates.jashkumar.dev",
        to: email,
        subject: "Please confirm your detail for submission",
        text: formatEmailBody({
          calculationTarif: data.calculationTarif,
          selectedTariff: data.selectedTariff,
          personalDetails: data.personalDetails,
          confirmUrl,
          declineUrl,
        }),
      });
    }
    return NextResponse.json({
      success: true,
      insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save data or send email" },
      { status: 500 }
    );
  }
}
