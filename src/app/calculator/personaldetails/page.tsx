"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Stepper from "@/app/components/Stepper";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function PersonalDetailsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [phone, setPhone] = useState("");
  const [salutation, setSalutation] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [billing, setBilling] = useState<"same" | "different">();
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [error, setError] = useState("");

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("personalDetails");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.salutation) setSalutation(data.salutation);
        if (data.name) setName(data.name);
        if (data.surname) setSurname(data.surname);
        if (data.billing) setBilling(data.billing);
        if (data.birthDate) setBirthDate(data.birthDate);
        if (data.email) setEmail(data.email);
        if (data.repeatEmail) setRepeatEmail(data.repeatEmail);
        if (data.phone) setPhone(data.phone);
      }
    } catch {}
  }, []);

  // Store to localStorage on change
  useEffect(() => {
    const data = {
      salutation,
      name,
      surname,
      billing,
      birthDate,
      email,
      repeatEmail,
      phone,
    };
    try {
      localStorage.setItem("personalDetails", JSON.stringify(data));
    } catch {}
  }, [
    salutation,
    name,
    surname,
    billing,
    birthDate,
    email,
    repeatEmail,
    phone,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !salutation ||
      !name ||
      !surname ||
      !birthDate ||
      !email ||
      !repeatEmail ||
      !phone
    ) {
      setError(t("personaldetails.error.required"));
      return;
    }
    if (email !== repeatEmail) {
      setError(t("personaldetails.error.emailMatch"));
      return;
    }
    setError("");
    router.push("/calculator/Addressdetails");
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
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
            >
              <option value="">
                {t("personaldetails.salutationPlaceholder")}
              </option>
              <option value="mr">{t("personaldetails.mr")}</option>
              <option value="ms">{t("personaldetails.ms")}</option>
              <option value="mrs">{t("personaldetails.mrs")}</option>
              <option value="dr">{t("personaldetails.dr")}</option>
            </select>

            {/* Name */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.name")} *
            </label>
            <input
              type="text"
              className="w-full max-w-[340px] h-[52px] text-lg font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              placeholder={t("personaldetails.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Surname */}
            <div></div>
            <input
              type="text"
              className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              placeholder={t("personaldetails.surnamePlaceholder")}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
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
                  checked={billing === "same"}
                  onChange={() => setBilling("same")}
                />
                <span>{t("personaldetails.billingSame")}</span>
              </label>
              <label className="flex items-start gap-3 font-poppins-regular text-[#abafb1] text-base cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  className="accent-[#FF9641] w-5 h-5"
                  checked={billing === "different"}
                  onChange={() => setBilling("different")}
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
                type="date"
                className="w-full h-[52px] text-lg font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-[#ABAFB1] focus:outline-none focus:border-[#FF9641] transition-colors pr-12"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="text-[#abafb1]"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="4"
                    strokeWidth="2"
                  />
                  <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
                </svg>
              </span>
            </div>

            {/* Email */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.email")} *
            </label>
            <input
              type="email"
              className="w-full max-w-[340px] h-[52px] text-lg font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              placeholder={t("personaldetails.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Repeat Email */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.repeatEmail")} *
            </label>
            <input
              type="email"
              className="w-full max-w-[340px] h-[52px] text-lg font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
              placeholder={t("personaldetails.repeatEmailPlaceholder")}
              value={repeatEmail}
              onChange={(e) => setRepeatEmail(e.target.value)}
            />

            {/* Phone */}
            <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
              {t("personaldetails.phone")} *
            </label>
            <div className="max-w-[340px] col-span-1">
              <PhoneInput
                country={"de"}
                value={phone}
                onChange={setPhone}
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
                className="mt-4 w-[205px] bg-[#FF9641] hover:bg-[#e88537] text-lg font-poppins-regular text-white py-3 px-8 rounded shadow transition-colors"
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
