/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Stepper from "../../components/Stepper";
import SepaCard from "../../components/sepaCard";
import { useLanguage } from "@/app/contexts/LanguageContext";
import {
  useSepaFormSection,
  useSessionInfo,
  usePersonalDetailsSection,
  useCalculationTarifSection,
  useAddressDetailsSection,
  useSelectedTariffSection,
  usePostalOptionsSection,
} from "@/app/contexts/FormHelpers";

function SepaMandatePageInner() {
  const { t } = useLanguage();
  const router = useRouter();
  const { sessionId, isInitialized } = useSessionInfo();
  const { data: sepaForm, update: updateSepaForm } = useSepaFormSection();
  const { data: personalDetails } = usePersonalDetailsSection();
  const { data: calculationTarif } = useCalculationTarifSection();
  const { data: addressDetails } = useAddressDetailsSection();
  const { selectedTariff, selectedTariffData } = useSelectedTariffSection();
  const { data: postalOptions } = usePostalOptionsSection();
  const [emailSent, setEmailSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailConfirmedFromDB, setEmailConfirmedFromDB] = useState(false);

  const allValid =
    sepaForm.iban.trim() &&
    sepaForm.accountHolder.trim() &&
    sepaForm.sepaAgreement &&
    emailConfirmedFromDB; // Use the state we manage from DB polling

  // Poll MongoDB to check for email confirmation
  useEffect(() => {
    if (!sessionId || emailConfirmedFromDB) {
      return; // Don't poll if no session, no email sent, or already confirmed
    }

    const pollInterval = setInterval(async () => {
      try {
        console.log("Checking for email confirmation...");
        const response = await fetch(`/api/session?id=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Session data from polling:", data.session);

          // Check for email confirmation in the root level
          if (data.session?.emailConfirmed === true) {
            console.log("Email confirmed detected from polling!");
            setEmailConfirmedFromDB(true);
          }
        }
      } catch (error) {
        console.error("Error polling for email confirmation:", error);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [sessionId, emailConfirmedFromDB, updateSepaForm]);

  // Check email confirmation status on component mount
  useEffect(() => {
    const checkInitialEmailStatus = async () => {
      if (!sessionId) return;

      try {
        const response = await fetch(`/api/session?id=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Initial session data:", data.session);

          // Check for email confirmation in the root level
          if (data.session?.emailConfirmed === true) {
            console.log("Email already confirmed on mount!");
            setEmailConfirmedFromDB(true);
          }
        }
      } catch (error) {
        console.error("Error checking initial email status:", error);
      }
    };

    if (isInitialized) {
      checkInitialEmailStatus();
    }
  }, [sessionId, isInitialized, updateSepaForm]);

  // Wait for initialization
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle sending confirmation email
  const handleSendConfirmationEmail = async () => {
    if (
      !sepaForm.iban.trim() ||
      !sepaForm.accountHolder.trim() ||
      !sepaForm.sepaAgreement
    ) {
      setError(t("sepaMandate.error.fillRequiredFields"));
      return;
    }

    // Check if we have email address
    if (!personalDetails.email) {
      setError("Email address is required to send confirmation");
      return;
    }

    setError("");

    // Create the payload structure that matches what the API expects
    const payload = {
      sessionId,
      calculationTarif: {
        selected: calculationTarif.selected || "electricity",
        customerType: calculationTarif.customerType || "private",
        postalCode: calculationTarif.postalCode || "",
        annualConsumption: calculationTarif.annualConsumption || "",
        sessionId,
      },
      postalOptions: postalOptions || [],
      selectedTariff: {
        selectedTariffId: selectedTariff.selectedTariffId || null,
        selectedTariffData: {
          id: selectedTariffData?.id || null,
          name: selectedTariffData?.name || "",
          basePrice: selectedTariffData?.basePrice || "",
          laborPrice: selectedTariffData?.laborPrice || "",
          typeOfCurrent: selectedTariffData?.typeOfCurrent || "",
          contractTerm: selectedTariffData?.contractTerm || "",
          priceGuarantee: selectedTariffData?.priceGuarantee || "",
          downPayment: selectedTariffData?.downPayment || "",
          total: selectedTariffData?.total || "",
        },
      },
      selectedTariffData: {
        id: selectedTariffData?.id || null,
        name: selectedTariffData?.name || "",
        basePrice: selectedTariffData?.basePrice || "",
        laborPrice: selectedTariffData?.laborPrice || "",
        typeOfCurrent: selectedTariffData?.typeOfCurrent || "",
        contractTerm: selectedTariffData?.contractTerm || "",
        priceGuarantee: selectedTariffData?.priceGuarantee || "",
        downPayment: selectedTariffData?.downPayment || "",
        total: selectedTariffData?.total || "",
      },
      personalDetails: {
        salutation: personalDetails.salutation || "",
        name: personalDetails.name || "",
        surname: personalDetails.surname || "",
        email: personalDetails.email || "",
        repeatEmail: personalDetails.repeatEmail || personalDetails.email || "",
        phone: personalDetails.phone || "",
        birthDate: personalDetails.birthDate || "",
        billing: personalDetails.billing || "same",
      },
      addressDetails: {
        postalCode:
          addressDetails.postalCode || calculationTarif.postalCode || "",
        location: addressDetails.location || "",
        street: addressDetails.street || "",
        houseNumber: addressDetails.houseNumber || "",
        houseNumberSuffix: addressDetails.houseNumberSuffix || "",
        desiredStart: addressDetails.desiredStart || "",
        previousSupplier: addressDetails.previousSupplier || "",
        previousCustomerNo: addressDetails.previousCustomerNo || "",
        meterNo: addressDetails.meterNo || "",
        meterLocationNo: addressDetails.meterLocationNo || "",
        moveInStatus: addressDetails.moveInStatus || "",
        billing: addressDetails.billing || personalDetails.billing || "same",
        billingStreet: addressDetails.billingStreet || "",
        billingHouseNumber: addressDetails.billingHouseNumber || "",
        billingHouseNumberSuffix: addressDetails.billingHouseNumberSuffix || "",
        billingCity: addressDetails.billingCity || "",
        billingPostal: addressDetails.billingPostal || "",
        billingCountry: addressDetails.billingCountry || "",
      },
      sepaForm: {
        iban: sepaForm.iban || "",
        accountHolder: sepaForm.accountHolder || "",
        sepaAgreement: sepaForm.sepaAgreement || false,
        emailConfirmed: false,
        confirmEmail: true,
      },
      status: "pending_confirmation",
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/send-confirmation-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Email sent successfully:", data);

        setEmailSent(true);
        alert(t("sepaMandate.confirmationEmailSent"));

        // Update the context to indicate email was sent (but not confirmed yet)
      } else {
        const errorText = await res.text();
        console.error("API Error:", res.status, errorText);
        throw new Error(
          `${t("sepaMandate.error.emailSendFailed")} (${res.status})`
        );
      }
    } catch (err: any) {
      console.error("Send confirmation error:", err);
      setError(err.message || t("sepaMandate.error.emailSendFailed"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;

    setSubmitting(true);
    setError("");

    if (!sessionId) {
      setError("Session not found. Please restart the process.");
      setSubmitting(false);
      return;
    }

    try {
      // Call final submission endpoint
      const res = await fetch("/api/final-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (!res.ok) throw new Error(t("sepaMandate.error.submissionFailed"));

      const data = await res.json();

      if (data.success) {
        alert(t("sepaMandate.success"));
        router.push("/");
      } else {
        throw new Error(
          data.message || t("sepaMandate.error.submissionFailed")
        );
      }
    } catch (err: any) {
      setError(err.message || t("sepaMandate.error.submissionFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full mb-32">
        <div className="w-full flex justify-center pb-10">
          <Stepper currentStep={5} t={t} />
        </div>
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-32 w-full max-w-[1146px] mx-auto mt-8 px-4 md:px-0">
          {/* Left: SepaCard */}
          <SepaCard />
          {/* Right: SEPA Mandate UI */}
          <form
            className="flex flex-col gap-6 md:gap-8 flex-1 w-full md:w-auto"
            onSubmit={handleSubmit}
          >
            {/* SEPA title */}
            <div className="flex flex-col flex-shrink-0 items-start gap-3 pt-4 pb-2 px-4 md:px-6 w-full md:w-[650px] h-auto md:h-[3.625rem] border-2 border-[#cfd3d4] bg-white/[.74]">
              <div className="flex items-center gap-4 self-stretch h-auto md:h-[2.5625rem]">
                <div className="input_content-1 flex flex-col justify-between items-start self-stretch text-black font-inter text-base leading-[normal]">
                  {t("sepaMandate.title")}
                </div>
              </div>
            </div>

            {/* IBAN field */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full md:w-[650px]">
              <label className="w-full md:w-48 text-left text-[#ABAFB1] font-poppins-regular mb-2 md:mb-0">
                {t("sepaMandate.iban")}
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-[#cfd3d4] rounded px-4 py-3 text-white font-poppins focus:outline-none focus:border-[#FF9641]"
                placeholder={t("sepaMandate.ibanPlaceholder")}
                value={sepaForm.iban}
                onChange={(e) => updateSepaForm({ iban: e.target.value })}
                required
              />
            </div>

            {/* Account holder field */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full md:w-[650px]">
              <label className="w-full md:w-48 text-left text-[#ABAFB1] font-poppins-regular mb-2 md:mb-0">
                {t("sepaMandate.accountHolder")}
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-[#cfd3d4] rounded px-4 py-3 text-white font-poppins focus:outline-none focus:border-[#FF9641]"
                placeholder={t("sepaMandate.accountHolderPlaceholder")}
                value={sepaForm.accountHolder}
                onChange={(e) =>
                  updateSepaForm({ accountHolder: e.target.value })
                }
                required
              />
            </div>

            {/* SEPA Agreement checkbox */}
            <div className="flex gap-3 w-full md:w-[650px]">
              <input
                type="checkbox"
                id="sepaAgreement"
                className="w-5 h-5 accent-[#FF9641] mt-1 md:mt-0"
                checked={sepaForm.sepaAgreement}
                onChange={(e) =>
                  updateSepaForm({ sepaAgreement: e.target.checked })
                }
                disabled={
                  !sepaForm.iban.trim() || !sepaForm.accountHolder.trim()
                }
                required
              />
              <div
                className={`flex-1 text-justify font-poppins-regular text-sm leading-relaxed ${
                  sepaForm.iban.trim() && sepaForm.accountHolder.trim()
                    ? "text-[#abafb1]"
                    : "text-[#666]"
                }`}
              >
                {t("sepaMandate.ibanInfo")}
                <br />
                <br />
                {t("sepaMandate.sepaInfo")}
              </div>
            </div>

            {/* Confirmation email checkbox */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 w-full md:w-[650px]">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="confirmationEmail"
                  className="w-5 h-5 accent-[#FF9641]"
                  checked={!!emailConfirmedFromDB}
                  onChange={async (e) => {
                    if (e.target.checked) {
                      handleSendConfirmationEmail();
                    } else {
                      setEmailSent(false);
                      setEmailConfirmedFromDB(false);
                    }
                  }}
                  disabled={
                    !sepaForm.sepaAgreement ||
                    !sepaForm.iban.trim() ||
                    !sepaForm.accountHolder.trim()
                  }
                  required
                />
                <label
                  htmlFor="confirmationEmail"
                  className={`font-poppins-regular capitalize select-none ${
                    sepaForm.sepaAgreement &&
                    sepaForm.iban.trim() &&
                    sepaForm.accountHolder.trim()
                      ? "text-[#abafb1]"
                      : "text-[#666]"
                  }`}
                >
                  {t("sepaMandate.confirmEmail")}
                </label>
              </div>

              {/* Status indicators - Use our state that polls from DB */}
              <div className="flex flex-col md:flex-row md:ml-auto gap-2">
                {emailSent && !emailConfirmedFromDB && (
                  <span className="text-yellow-400 text-sm">
                    📧 {t("sepaMandate.waitingConfirmation")} (Check your email)
                  </span>
                )}
                {emailConfirmedFromDB && (
                  <span className="text-green-400 text-sm">
                    ✅ {t("sepaMandate.emailConfirmed")}
                  </span>
                )}
              </div>
            </div>

            {/* Payment terms + submit */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 mt-4 w-full md:w-[650px]">
              <div className="underline text-[#abafb1] font-['Poppins'] text-sm">
                {t("sepaMandate.paymentTerms")}
                <br />
                <div className="underline text-[#abafb1] font-poppins-regular text-xs">
                  {t("sepaMandate.paymentTermsSub")}
                </div>
              </div>
              <button
                type="submit"
                disabled={!allValid || submitting}
                className={`flex justify-center items-center gap-2.5 w-full md:w-[12.25rem] h-14 rounded shadow transition-colors font-['Inter'] text-lg font-medium
                  ${
                    allValid
                      ? "bg-[#ff9641] text-white hover:bg-[#e88537] cursor-pointer"
                      : "bg-[#F9FAFB] text-[#ff9641] cursor-not-allowed"
                  }`}
              >
                {submitting
                  ? t("sepaMandate.submitting")
                  : t("sepaMandate.submit")}
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

export default function SepaMandatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SepaMandatePageInner />
    </Suspense>
  );
}
