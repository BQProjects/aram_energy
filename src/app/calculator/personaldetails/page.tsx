"use client";
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Stepper from "@/app/components/Stepper";
import { useLanguage } from "@/app/contexts/LanguageContext";
import {
  usePersonalDetailsSection,
  useSessionInfo,
} from "@/app/contexts/FormHelpers";

function PersonalDetailsPageInner() {
  const router = useRouter();
  const { t } = useLanguage();
  const { data, update } = usePersonalDetailsSection();
  const { sessionId, loading, isInitialized } = useSessionInfo();
  const [error, setError] = useState("");

  // Show loading state while initializing
  if (!isInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-white">Loading session data...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !data.salutation ||
      !data.name ||
      !data.surname ||
      !data.birthDate ||
      !data.email ||
      !data.repeatEmail ||
      !data.phone ||
      !data.billing
    ) {
      setError(t("personaldetails.error.fillAllFields"));
      return;
    }

    if (data.email !== data.repeatEmail) {
      setError(t("personaldetails.error.emailMismatch"));
      return;
    }

    setError("");

    // Navigate to next step with session ID
    if (sessionId) {
      router.push(`/calculator/Addressdetails?id=${sessionId}`);
    } else {
      router.push("/calculator/Addressdetails");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-end justify-center py-8">
        <div className="w-full flex justify-center pb-10">
          <Stepper currentStep={3} t={t} />
        </div>
        <form
          className="rounded-xl shadow-lg p-8 w-full max-w-3xl flex flex-row mx-auto"
          onSubmit={handleSubmit}
        >
          {/* Two-card grid: align labels and inputs by row */}
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6 items-center">
            {/* Salutation */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.salutation")} *
            </label>
            <select
              className="w-full max-w-[340px] h-[52px] border border-[#cfd3d4] text-lg font-poppins-regular px-4 py-3 bg-black text-[#abafb1] focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
              value={data.salutation}
              onChange={(e) => update({ salutation: e.target.value })}
            >
              <option value="">
                {t("personaldetails.salutationPlaceholder")}
              </option>
              <option value="Mr">{t("personaldetails.mr")}</option>
              <option value="Ms">{t("personaldetails.ms")}</option>
              <option value="Mrs">{t("personaldetails.mrs")}</option>
              <option value="Dr">{t("personaldetails.dr")}</option>
            </select>

            {/* Name */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.name")} *
            </label>
            <input
              type="text"
              className="w-full max-w-[340px] h-[52px] text-lg font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              placeholder={t("personaldetails.namePlaceholder")}
              value={data.name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z ]*$/.test(value) && value.length <= 30) {
                  update({ name: value });
                }
              }}
            />

            {/* Surname */}
            <div></div>
            <input
              type="text"
              className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              placeholder={t("personaldetails.surnamePlaceholder")}
              value={data.surname}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z ]*$/.test(value) && value.length <= 30) {
                  update({ surname: value });
                }
              }}
            />

            {/* Billing address */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-start pt-2">
              {t("personaldetails.billingAddress")}
            </label>
            <div className="flex flex-col gap-2 max-w-[340px] col-span-1">
              <label className="flex items-start gap-3 font-poppins-regular text-[#abafb1] text-base cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  className="accent-[#FF9641] w-5 h-5"
                  checked={data.billing === "same"}
                  onChange={() => update({ billing: "same" })}
                />
                <span>{t("personaldetails.billingSame")}</span>
              </label>
              <label className="flex items-start gap-3 font-poppins-regular text-[#abafb1] text-base cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  className="accent-[#FF9641] w-5 h-5"
                  checked={data.billing === "different"}
                  onChange={() => update({ billing: "different" })}
                />
                <span>{t("personaldetails.billingDifferent")}</span>
              </label>
            </div>

            {/* Birth date with calendar icon */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.birthDate")} *
            </label>
            <div className="relative max-w-[340px] col-span-1">
              <input
                id="birthDateInput"
                type="date"
                className="w-full h-[52px] text-lg font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-[#ABAFB1] focus:outline-none focus:border-[#FF9641] transition-colors pr-12"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  colorScheme: "dark",
                }}
                value={data.birthDate}
                onChange={(e) => update({ birthDate: e.target.value })}
              />
            </div>

            {/* Email */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.email")} *
            </label>
            <input
              type="email"
              className="w-full max-w-[340px] h-[52px] text-lg font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              placeholder={t("personaldetails.emailPlaceholder")}
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
            />

            {/* Repeat Email */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.repeatEmail")} *
            </label>
            <input
              type="email"
              className="w-full max-w-[340px] h-[52px] text-lg font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              placeholder={t("personaldetails.repeatEmailPlaceholder")}
              value={data.repeatEmail}
              onChange={(e) => update({ repeatEmail: e.target.value })}
            />

            {/* Phone */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.phone")} *
            </label>
            <div className="max-w-[340px] col-span-1">
              <PhoneInput
                country={"de"}
                value={data.phone}
                onChange={(phone) => update({ phone })}
                inputClass="!w-full !bg-transparent text-lg font-poppins-regular !text-[#FF9641] !px-4 !py-3 !pl-14 focus:!border-[#FF9641] !transition-all !h-[52px]"
                buttonClass="!bg-black !flex !items-center !justify-center transition-colors !h-[52px]"
                dropdownClass="!bg-black !text-white !rounded-lg !mt-2 !shadow-lg !z-50"
                containerClass="!w-full flex"
                searchClass="!bg-black !text-white !rounded !px-2 !py-1"
                enableSearch
                disableCountryCode={false}
                disableDropdown={true}
                autocompleteSearch
              />
            </div>

            {/* Submit (empty label for alignment) */}
            <div></div>
            <div className="flex flex-col items-end justify-end w-full col-span-1">
              {error && (
                <span className="text-red-400 text-xs mb-2">{error}</span>
              )}
              <button
                type="submit"
                className="mt-8 w-[205px] bg-[#FF9641] hover:bg-[#e88537] text-lg font-poppins-regular text-white py-3 px-8 rounded shadow transition-colors"
              >
                {t("personaldetails.next")}
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default function PersonalDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PersonalDetailsPageInner />
    </Suspense>
  );
}
