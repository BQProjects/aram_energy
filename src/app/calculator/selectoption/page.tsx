"use client";
import React, { Suspense } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Stepper from "../../components/Stepper";
import CalculatorCard from "../../components/calculatorCard";
import SelectPower from "../../components/SelectPower";
import { useLanguage } from "../../contexts/LanguageContext";

function SelectOptionContent() {
  const { t } = useLanguage();
  // Load from localStorage
  let postalCode = "";
  let location = "";
  let division = "";
  let customerCategory = "";
  if (typeof window !== "undefined") {
    const calculationTarif =
      JSON.parse(localStorage.getItem("calculationTarif") || "{}") || {};
    const postalOptions = calculationTarif.postalOptions || [];
    postalCode = postalOptions[0]?.plz || calculationTarif.postalCode || "";
    location = postalOptions[0]?.district || "";
    division = calculationTarif.division || postalOptions[0]?.division || "";
    customerCategory = calculationTarif.customerType || "";
  }
  return (
    <div className="flex items-start gap-8 w-full max-w-[1146px] mx-auto mt-8">
      <CalculatorCard
        postalCode={postalCode}
        location={location}
        division={division}
        customerCategory={customerCategory}
        t={t}
      />
      <SelectPower t={t} />
    </div>
  );
}

export default function SelectOptionPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full mb-16">
        <div className="w-full flex justify-center">
          <Stepper currentStep={2} t={t} />
        </div>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SelectOptionContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
