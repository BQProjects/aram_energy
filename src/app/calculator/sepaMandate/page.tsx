/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Stepper from "../../components/Stepper";
import SepaCard from "../../components/sepaCard";
import { useLanguage } from "@/app/contexts/LanguageContext";

function SepaMandatePageInner() {
  const searchParams = useSearchParams();
  const sessionId =
    searchParams.get("sessionId") ||
    (typeof window !== "undefined"
      ? localStorage.getItem("calculationTarifSessionId")
      : null);
  const [iban, setIban] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [sepaAgreement, setSepaAgreement] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const router = useRouter();
  const wsRef = useRef<WebSocket | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const allValid =
    iban.trim() &&
    accountHolder.trim() &&
    sepaAgreement &&
    confirmEmail &&
    emailConfirmed;

  // Initialize WebSocket connection for real-time email confirmation
  // Store sessionId from URL in localStorage if present
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem("calculationTarifSessionId", sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    // sessionId is already defined above and kept in sync
    if (sessionId) {
      sessionIdRef.current = sessionId;

      // Check session status immediately (fallback for WebSocket)
      const checkSessionStatus = async () => {
        try {
          const response = await fetch(`/api/session?sessionId=${sessionId}`);
          if (response.ok) {
            const data = await response.json();
            if (data.session?.emailConfirmed) {
              setEmailConfirmed(true);
              console.log("Email already confirmed (from session check)");
            }
          }
        } catch (error) {
          console.error("Error checking session status:", error);
        }
      };

      checkSessionStatus();

      // Connect to WebSocket server using env variable
      const wsBase = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3012";
      const ws = new WebSocket(`${wsBase}?sessionId=${sessionId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected for session:", sessionId);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("WebSocket message received:", data);

          if (data.type === "email_confirmed" && data.sessionId === sessionId) {
            setEmailConfirmed(true);
            setError("");
            console.log("Email confirmed via WebSocket");
          } else if (
            data.type === "email_rejected" &&
            data.sessionId === sessionId
          ) {
            setEmailConfirmed(false);
            setEmailSent(false);
            setError(t("sepaMandate.error.emailRejected"));
            console.log("Email rejected via WebSocket");
          }
        } catch (err) {
          console.error("WebSocket message parse error:", err);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        // Fallback: check session status if WebSocket fails
        checkSessionStatus();
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        // Fallback: check session status when WebSocket closes
        checkSessionStatus();
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [sessionId, t]);

  // Save SEPA details to localStorage
  useEffect(() => {
    const sepaDetails = { iban, accountHolder, sepaAgreement };
    localStorage.setItem("sepaDetails", JSON.stringify(sepaDetails));
  }, [iban, accountHolder, sepaAgreement]);

  // Handle sending confirmation email
  const handleSendConfirmationEmail = async () => {
    if (!iban.trim() || !accountHolder.trim() || !sepaAgreement) {
      setError(t("sepaMandate.error.fillRequiredFields"));
      return;
    }

    setError("");

    // Gather all data for email preview
    const calculationTarif = localStorage.getItem("calculationTarif");
    const personalDetails = localStorage.getItem("personalDetails");
    const selectedTariff = localStorage.getItem("selectedTariff");
    const addressDetails = localStorage.getItem("addressDetails");
    const sessionId = localStorage.getItem("calculationTarifSessionId");

    const payload = {
      sessionId,
      calculationTarif: calculationTarif ? JSON.parse(calculationTarif) : null,
      personalDetails: personalDetails ? JSON.parse(personalDetails) : null,
      selectedTariff: selectedTariff ? JSON.parse(selectedTariff) : null,
      addressDetails: addressDetails ? JSON.parse(addressDetails) : null,
      sepaForm: { iban, accountHolder, confirmEmail },
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
        setEmailSent(true);
        alert(t("sepaMandate.confirmationEmailSent"));

        // Store the confirmation ID for checking status
        if (data.id) {
          localStorage.setItem("confirmationId", data.id);
        }
      } else {
        throw new Error(t("sepaMandate.error.emailSendFailed"));
      }
    } catch (err: any) {
      setError(err.message || t("sepaMandate.error.emailSendFailed"));
    }
  };

  const handleSaveSepaDetails = async () => {
    const sessionId = localStorage.getItem("calculationTarifSessionId");

    if (!sessionId) {
      console.error("Session ID not found in localStorage.");
      return;
    }

    const sepaDetails = { iban, accountHolder, sepaAgreement };

    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, sepaDetails }),
      });

      if (!res.ok) {
        throw new Error("Failed to save SEPA details to the session.");
      }

      console.log("SEPA details saved successfully.");
    } catch (error) {
      console.error("Error saving SEPA details:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    setSubmitting(true);
    setError("");

    // Get sessionId
    const sessionId = localStorage.getItem("calculationTarifSessionId");

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
        // Clear localStorage only on successful submission
        localStorage.removeItem("calculationTarif");
        localStorage.removeItem("personalDetails");
        localStorage.removeItem("selectedTariff");
        localStorage.removeItem("addressDetails");
        localStorage.removeItem("calculationTarifSessionId");
        localStorage.removeItem("confirmationId");

        // Clear form
        setIban("");
        setAccountHolder("");
        setSepaAgreement(false);
        setConfirmEmail(false);
        setEmailSent(false);
        setEmailConfirmed(false);

        // Show success message
        alert(t("sepaMandate.success"));

        // Redirect to home page
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
        <div className="flex items-start gap-32 w-full max-w-[1146px] mx-auto mt-8">
          {/* Left: SepaCard */}
          <SepaCard />
          {/* Right: SEPA Mandate UI */}
          <form className="flex flex-col gap-8 flex-1" onSubmit={handleSubmit}>
            {/* SEPA title */}
            <div className="flex flex-col flex-shrink-0 items-start gap-3 pt-4 pb-2 px-6 w-[650px] h-[3.625rem] border-2 border-[#cfd3d4] bg-white/[.74]">
              <div className="flex items-center gap-4 self-stretch h-[2.5625rem]">
                <div className="input_content-1 flex flex-col justify-between items-start self-stretch text-black font-inter text-base leading-[normal]">
                  {t("sepaMandate.title")}
                </div>
              </div>
            </div>
            {/* IBAN field */}
            <div className="flex items-center gap-6 w-[650px]">
              <label className="w-48 text-left text-[#ABAFB1] font-poppins-regular text-xl">
                {t("sepaMandate.iban")}
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-[#cfd3d4] rounded px-4 py-3  text-white font-poppins text-lg focus:outline-none focus:border-[#FF9641]"
                placeholder={t("sepaMandate.ibanPlaceholder")}
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                required
              />
            </div>
            {/* Account holder field */}
            <div className="flex items-center gap-6 w-[650px]">
              <label className="w-48 text-left text-[#ABAFB1] font-poppins-regular text-xl">
                {t("sepaMandate.accountHolder")}
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-[#cfd3d4] rounded px-4 py-3 text-white font-poppins text-lg focus:outline-none focus:border-[#FF9641]"
                placeholder={t("sepaMandate.accountHolderPlaceholder")}
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                required
              />
            </div>
            {/* Info text */}
            <div className="flex gap-3 ">
              <input
                type="checkbox"
                id="sepaAgreement"
                className="w-5 h-5 accent-[#FF9641]"
                checked={sepaAgreement}
                onChange={(e) => setSepaAgreement(e.target.checked)}
                disabled={!iban.trim() || !accountHolder.trim()}
                required
              />
              <div
                className={`w-[650px] text-justify font-poppins-regular text-xl leading-relaxed ${
                  iban.trim() && accountHolder.trim()
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
            <div className="flex items-center gap-3 w-[650px]">
              <input
                type="checkbox"
                id="confirmationEmail"
                className="w-5 h-5 accent-[#FF9641]"
                checked={confirmEmail}
                onChange={async (e) => {
                  setConfirmEmail(e.target.checked);
                  if (e.target.checked) {
                    await handleSaveSepaDetails();
                    handleSendConfirmationEmail();
                  } else {
                    setEmailSent(false);
                    setEmailConfirmed(false);
                  }
                }}
                disabled={
                  !sepaAgreement || !iban.trim() || !accountHolder.trim()
                }
                required
              />
              <label
                htmlFor="confirmationEmail"
                className={`font-poppins-regular text-xl capitalize select-none ${
                  sepaAgreement && iban.trim() && accountHolder.trim()
                    ? "text-[#abafb1]"
                    : "text-[#666]"
                }`}
              >
                {t("sepaMandate.confirmEmail")}
              </label>
              {emailSent && !emailConfirmed && (
                <span className="text-yellow-400 text-sm ml-2">
                  {t("sepaMandate.waitingConfirmation")}
                </span>
              )}
              {emailConfirmed && (
                <span className="text-green-400 text-sm ml-2">
                  {t("sepaMandate.emailConfirmed")}
                </span>
              )}
            </div>
            {/* Payment terms + submit */}
            <div className="flex items-center justify-between gap-8 mt-4 w-[650px]">
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
                className={`flex justify-center items-center gap-2.5 w-[12.25rem] h-14 rounded shadow transition-colors font-['Inter'] text-lg font-medium
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
