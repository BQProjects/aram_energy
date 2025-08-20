/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

interface ConfirmationData {
  calculationTarif: any;
  personalDetails: any;
  selectedTariff: any;
  sepaForm: any;
  timestamp: string;
}

function ConfirmContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<"confirmed" | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid confirmation link");
      setLoading(false);
      return;
    }

    // Fetch confirmation data
    fetch(`/api/send-confirmation-link?id=${id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || "Failed to load confirmation data");
        }
      })
      .catch(() => {
        setError("Failed to load confirmation data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleConfirm = async () => {
    if (!id || !data) return;

    setProcessing(true);
    try {
      const res = await fetch("/api/confirm-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          action: "confirm",
          data,
        }),
      });

      const response = await res.json();

      if (response.success) {
        setResult("confirmed");
      } else {
        setError(response.message || "Failed to confirm application");
      }
    } catch {
      setError("Failed to confirm application");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-white text-xl">{t("confirm.loading")}</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {t("confirm.error.title")}
          </h1>
          <p className="text-white mb-6">{error}</p>
          <Link
            href="/"
            className="bg-[#FF9641] text-white px-6 py-3 rounded hover:bg-[#e88537] transition-colors"
          >
            {t("confirm.returnHome")}
          </Link>
        </div>
      </main>
    );
  }

  if (result === "confirmed") {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-500 mb-4">
            {t("confirm.confirmed.title")}
          </h1>
          <p className="text-white mb-6">{t("confirm.confirmed.message")}</p>
          <Link
            href="/"
            className="bg-[#FF9641] text-white px-6 py-3 rounded hover:bg-[#e88537] transition-colors"
          >
            {t("confirm.returnHome")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center py-12">
      <div className="w-10/12 mx-auto px-4">
        <div className=" rounded-lg shadow-lg p-8">
          <h1 className="text-[#FF9641] mb-6 text-center text-xl font-quando">
            {t("confirm.title")}
          </h1>

          {data && (
            <div className="mb-8">
              {/* 2x2 Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calculation Tariff Details */}
                <div className="border border-[#FF9641] rounded-lg p-6 bg-black">
                  <h3 className="text-[#FF9641] mb-4 border-b border-gray-600 pb-2 text-base font-quando">
                    🏢 {t("confirm.calculationTariff")}
                  </h3>
                  <div className="space-y-2 text-sm font-poppins-light">
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.selected")}:
                      </strong>{" "}
                      {data.calculationTarif?.selected || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.customerType")}:
                      </strong>{" "}
                      {data.calculationTarif?.customerType || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.postalCode")}:
                      </strong>{" "}
                      {data.calculationTarif?.postalCode || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.annualConsumption")}:
                      </strong>{" "}
                      {data.calculationTarif?.annualConsumption || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.postalOptions")}:
                      </strong>
                      {data.calculationTarif?.postalOptions &&
                      Array.isArray(data.calculationTarif.postalOptions) &&
                      data.calculationTarif.postalOptions.length > 0 ? (
                        <div className="ml-4 mt-1">
                          {data.calculationTarif.postalOptions.map(
                            (opt: any, index: number) => (
                              <div key={index} className="text-gray-300">
                                - PLZ: {opt.plz || "-"}, District:{" "}
                                {opt.district || "-"}
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <span className="ml-2">-</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selected Tariff Details */}
                <div className="border border-[#FF9641] rounded-lg p-6 bg-black">
                  <h3 className="text-[#FF9641] mb-4 border-b border-gray-600 pb-2 text-base font-quando">
                    💰 {t("confirm.selectedTariff")}
                  </h3>
                  <div className="space-y-2 text-sm font-poppins-light">
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.basePrice")}:
                      </strong>{" "}
                      {data.selectedTariff?.basePrice || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.laborPrice")}:
                      </strong>{" "}
                      {data.selectedTariff?.laborPrice || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.typeOfCurrent")}:
                      </strong>{" "}
                      {data.selectedTariff?.typeOfCurrent || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.contractTerm")}:
                      </strong>{" "}
                      {data.selectedTariff?.contractTerm || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.priceGuarantee")}:
                      </strong>{" "}
                      {data.selectedTariff?.priceGuarantee || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.downPayment")}:
                      </strong>{" "}
                      {data.selectedTariff?.downPayment || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.total")}:
                      </strong>{" "}
                      {data.selectedTariff?.total || "-"}
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="border border-[#FF9641] rounded-lg p-6 bg-black">
                  <h3 className="text-[#FF9641] mb-4 border-b border-gray-600 pb-2 text-base font-quando">
                    👤 {t("confirm.personalDetails")}
                  </h3>
                  <div className="space-y-2 text-sm font-poppins-light">
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.name")}:
                      </strong>{" "}
                      {data.personalDetails?.name || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.surname")}:
                      </strong>{" "}
                      {data.personalDetails?.surname || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.email")}:
                      </strong>{" "}
                      {data.personalDetails?.email || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.birthDate")}:
                      </strong>{" "}
                      {data.personalDetails?.birthDate || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.mobile")}:
                      </strong>{" "}
                      {data.personalDetails?.phone || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.address")}:
                      </strong>{" "}
                      {[
                        data.personalDetails?.street,
                        data.personalDetails?.houseNumber,
                        data.personalDetails?.houseNumberSuffix,
                      ]
                        .filter(Boolean)
                        .join(" ") || "-"}
                      , {data.personalDetails?.postalCode || "-"}{" "}
                      {data.personalDetails?.location || "-"}
                    </div>
                  </div>
                </div>

                {/* SEPA Payment Information */}
                <div className="border border-[#FF9641] rounded-lg p-6 bg-black">
                  <h3 className="text-[#FF9641] mb-4 border-b border-gray-600 pb-2 text-base font-quando">
                    💳 {t("confirm.paymentInfo")}
                  </h3>
                  <div className="space-y-2 text-sm font-poppins-light">
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.iban")}:
                      </strong>{" "}
                      {data.sepaForm?.iban || "-"}
                    </div>
                    <div className="text-white">
                      <strong className="text-[#FF9641]">
                        {t("confirm.accountHolder")}:
                      </strong>{" "}
                      {data.sepaForm?.accountHolder || "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleConfirm}
              disabled={processing}
              className="bg-[#FF9641] text-white px-8 py-3 rounded-lg hover:bg-[#e88537] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? t("confirm.processing") : t("confirm.button")}
            </button>
          </div>

          <p className="text-center text-white mt-6 text-sm font-poppins-light">
            {t("confirm.reviewText")}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmPage() {
    const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white text-xl">{t("confirm.loading")}</div>
          </div>
        }
      >
        <ConfirmContent />
      </Suspense>
      <Footer />
    </div>
  );
}
