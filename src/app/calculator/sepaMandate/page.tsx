/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Stepper from "../../components/Stepper";
import SepaCard from "../../components/sepaCard";

export default function SepaMandatePage() {
  const [iban, setIban] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const allValid = iban.trim() && accountHolder.trim() && confirmEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    setSubmitting(true);
    setError("");
    // Gather all relevant data from localStorage
    const calculationTarif = localStorage.getItem("calculationTarif");
    const personalDetails = localStorage.getItem("personalDetails");
    const selectedTariff = localStorage.getItem("selectedTariff");
    const sepaForm = JSON.stringify({ iban, accountHolder, confirmEmail });
    // Prepare payload
    const payload = {
      calculationTarif: calculationTarif ? JSON.parse(calculationTarif) : null,
      personalDetails: personalDetails ? JSON.parse(personalDetails) : null,
      selectedTariff: selectedTariff ? JSON.parse(selectedTariff) : null,
      sepaForm: sepaForm ? JSON.parse(sepaForm) : null,
      confirmation: "pending",
    };
    try {
      const res = await fetch("/api/submitAllDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      // On success, clear localStorage
      localStorage.removeItem("calculationTarif");
      localStorage.removeItem("personalDetails");
      localStorage.removeItem("selectedTariff");
      localStorage.removeItem("sepaForm");
      setIban("");
      setAccountHolder("");
      setConfirmEmail(false);
      alert("Submission successful! Please check your email to confirm.");
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full mb-32">
        <div className="w-full flex justify-center pb-10">
          <Stepper currentStep={5} />
        </div>
        <div className="flex items-start gap-32 w-full max-w-[1146px] mx-auto mt-8">
          {/* Left: SepaCard */}
          <SepaCard />
          {/* Right: SEPA Mandate UI */}
          <form className="flex flex-col gap-8 flex-1" onSubmit={handleSubmit}>
            {/* SEPA title */}
            <div className="flex flex-col flex-shrink-0 items-start gap-3 pt-4 pb-2 px-6 w-[650px] h-[3.625rem] border-2 border-[#cfd3d4] bg-white/[.74]">
              <div className="flex items-center gap-4 self-stretch h-[2.5625rem]">
                <div className="input_content-1 flex flex-col justify-between items-start self-stretch text-black font-inter text-base leading-[normal]">
                  SEPA mandate
                </div>
              </div>
            </div>
            {/* IBAN field */}
            <div className="flex items-center gap-6 w-[650px]">
              <label className="w-48 text-left text-[#ABAFB1] font-poppins-regular text-xl">
                IBAN
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-[#cfd3d4] rounded px-4 py-3  text-white font-poppins text-lg focus:outline-none focus:border-[#FF9641]"
                placeholder="Enter your IBAN"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                required
              />
            </div>
            {/* Account holder field */}
            <div className="flex items-center gap-6 w-[650px]">
              <label className="w-48 text-left text-[#ABAFB1] font-poppins-regular text-xl">
                Account holder
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-[#cfd3d4] rounded px-4 py-3 text-white font-poppins text-lg focus:outline-none focus:border-[#FF9641]"
                placeholder="Enter account holder name"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                required
              />
            </div>
            {/* Info text */}
            <div className="w-[650px] text-[#abafb1] text-justify font-poppins-regular text-xl leading-relaxed">
              You can find the IBAN on your bank card, among other places. It
              consists of the country code DE, a two-digit individual security
              number from your bank, and a further 18 digits.
              <br />
              <br />
              By entering my bank details, I authorize Stadtwerke Duisburg AG to
              collect payments from my account via SEPA direct debit. At the
              same time, I instruct my bank to honor the direct debits drawn on
              my account by Stadtwerke Duisburg AG.
            </div>
            {/* Confirmation email checkbox */}
            <div className="flex items-center gap-3 w-[650px]">
              <input
                type="checkbox"
                id="confirmationEmail"
                className="w-5 h-5 accent-[#FF9641]"
                checked={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.checked)}
                required
              />
              <label
                htmlFor="confirmationEmail"
                className="text-[#abafb1] font-poppins-regular text-xl capitalize select-none"
              >
                Receive confirmation email
              </label>
            </div>
            {/* Payment terms + submit */}
            <div className="flex items-center justify-between gap-8 mt-4 w-[650px]">
              <div className="underline text-[#abafb1] font-['Poppins'] text-sm">
                Our payment terms
                <br />
                <div className="underline text-[#abafb1] font-poppins-regular text-xs">
                  montalich von konto abgebucht
                </div>
              </div>
              <button
                type="submit"
                disabled={!allValid || submitting}
                className={`flex justify-center items-center gap-2.5 w-[12.25rem] h-14 rounded shadow transition-colors font-['Inter'] text-lg font-medium
                  ${
                    allValid
                      ? "bg-[#ff9641] text-white hover:bg-[#e88537] cursor-pointer"
                      : "bg-[#F9FAFB] text-[#ff9641] cursor-not-allowed"
                  }`}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
