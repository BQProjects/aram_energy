"use client";
import React, { Suspense } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Stepper from "../../components/Stepper";
import CalculatorCard from "../../components/calculatorCard";
import SelectPower from "../../components/SelectPower";
import { useSearchParams } from "next/navigation";

function SelectOptionContent() {
  const searchParams = useSearchParams();
  const postalCode = searchParams.get("postalCode") || "";
  const location = searchParams.get("location") || "";
  const division = searchParams.get("division") || "";
  const customerCategory = searchParams.get("customerCategory") || "";
  return (
    <div className="flex items-start gap-8 w-full max-w-[1146px] mx-auto mt-8">
      <CalculatorCard
        postalCode={postalCode}
        location={location}
        division={division}
        customerCategory={customerCategory}
      />
      <SelectPower />
    </div>
  );
}

export default function SelectOptionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          <Stepper currentStep={2} />
        </div>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SelectOptionContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
