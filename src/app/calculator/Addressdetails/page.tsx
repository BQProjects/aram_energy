"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Stepper from "../../components/Stepper";
import AddressCard from "@/app/components/AddressCard";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function Addressdetails() {
  const router = useRouter();
  const { t } = useLanguage();
  const [postalCode, setPostalCode] = useState("");
  const [location, setLocation] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [houseNumberSuffix, setHouseNumberSuffix] = useState("");
  const [desiredStart, setDesiredStart] = useState("");
  const [previousSupplier, setPreviousSupplier] = useState("");
  const [previousCustomerNo, setPreviousCustomerNo] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [meterLocationNo, setMeterLocationNo] = useState("");
  const [moveInStatus, setMoveInStatus] = useState("");
  const [billing, setBilling] = useState<"same" | "different">();
  const [error, setError] = useState("");
  // Billing address fields
  const [billingStreet, setBillingStreet] = useState("");
  const [billingHouseNumber, setBillingHouseNumber] = useState("");
  const [billingHouseNumberSuffix, setBillingHouseNumberSuffix] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostal, setBillingPostal] = useState("");
  const [billingCountry, setBillingCountry] = useState("");

  // Restore from MongoDB session or localStorage on mount, only if data is valid
  const isRestoring = React.useRef(false);
  useEffect(() => {
    type AddressDetails = {
      postalCode?: string;
      location?: string;
      street?: string;
      houseNumber?: string;
      houseNumberSuffix?: string;
      desiredStart?: string;
      previousSupplier?: string;
      previousCustomerNo?: string;
      meterNo?: string;
      meterLocationNo?: string;
      moveInStatus?: string;
      billing?: "same" | "different";
      billingStreet?: string;
      billingHouseNumber?: string;
      billingHouseNumberSuffix?: string;
      billingCity?: string;
      billingPostal?: string;
      billingCountry?: string;
    };

    function isValid(data: AddressDetails) {
      if (!data) return false;
      // At least one field must be non-empty
      return (
        data.postalCode ||
        data.location ||
        data.street ||
        data.houseNumber ||
        data.houseNumberSuffix ||
        data.desiredStart ||
        data.previousSupplier ||
        data.previousCustomerNo ||
        data.meterNo ||
        data.meterLocationNo ||
        data.moveInStatus ||
        data.billing
      );
    }

    const sessionId =
      typeof window !== "undefined"
        ? localStorage.getItem("calculationTarifSessionId")
        : null;
    let didSet = false;
    isRestoring.current = true;
    let billingFromPersonal: "same" | "different" | undefined;

    // Always fetch billing from personalDetails in localStorage
    try {
      const personal = localStorage.getItem("personalDetails");
      if (personal) {
        const pdata = JSON.parse(personal);
        if (pdata.billing === "same" || pdata.billing === "different") {
          billingFromPersonal = pdata.billing;
          setBilling(pdata.billing);
          console.log(
            "[AddressDetails] Set billing from personalDetails:",
            pdata.billing
          );
        }
      }
    } catch {}

    if (sessionId) {
      fetch(`/api/session?sessionId=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (
            data &&
            data.session &&
            data.session.addressDetails &&
            isValid(data.session.addressDetails)
          ) {
            const ad = data.session.addressDetails;
            setPostalCode(ad.postalCode || "");
            setLocation(ad.location || "");
            setStreet(ad.street || "");
            setHouseNumber(ad.houseNumber || "");
            setHouseNumberSuffix(ad.houseNumberSuffix || "");
            setDesiredStart(ad.desiredStart || "");
            setPreviousSupplier(ad.previousSupplier || "");
            setPreviousCustomerNo(ad.previousCustomerNo || "");
            setMeterNo(ad.meterNo || "");
            setMeterLocationNo(ad.meterLocationNo || "");
            setMoveInStatus(ad.moveInStatus || "");
            // Only set billing from addressDetails if personalDetails doesn't have it
            if (!billingFromPersonal) {
              setBilling(ad.billing);
            }
            setBillingStreet(ad.billingStreet || "");
            setBillingHouseNumber(ad.billingHouseNumber || "");
            setBillingHouseNumberSuffix(ad.billingHouseNumberSuffix || "");
            setBillingCity(ad.billingCity || "");
            setBillingPostal(ad.billingPostal || "");
            setBillingCountry(ad.billingCountry || "");
            didSet = true;
            console.log(
              "[AddressDetails Restore] Loaded from MongoDB session",
              ad
            );
          }
        })
        .finally(() => {
          if (!didSet) {
            try {
              const saved = localStorage.getItem("addressDetails");
              if (saved) {
                const data = JSON.parse(saved);
                if (isValid(data)) {
                  setPostalCode(data.postalCode || "");
                  setLocation(data.location || "");
                  setStreet(data.street || "");
                  setHouseNumber(data.houseNumber || "");
                  setHouseNumberSuffix(data.houseNumberSuffix || "");
                  setDesiredStart(data.desiredStart || "");
                  setPreviousSupplier(data.previousSupplier || "");
                  setPreviousCustomerNo(data.previousCustomerNo || "");
                  setMeterNo(data.meterNo || "");
                  setMeterLocationNo(data.meterLocationNo || "");
                  setMoveInStatus(data.moveInStatus || "");
                  // Only set billing from addressDetails if personalDetails doesn't have it
                  if (!billingFromPersonal) {
                    setBilling(data.billing);
                  }
                  setBillingStreet(data.billingStreet || "");
                  setBillingHouseNumber(data.billingHouseNumber || "");
                  setBillingHouseNumberSuffix(
                    data.billingHouseNumberSuffix || ""
                  );
                  setBillingCity(data.billingCity || "");
                  setBillingPostal(data.billingPostal || "");
                  setBillingCountry(data.billingCountry || "");
                  console.log(
                    "[AddressDetails Restore] Loaded from localStorage",
                    data
                  );
                }
              }
            } catch {}
          }
          isRestoring.current = false;
        });
    } else {
      try {
        const saved = localStorage.getItem("addressDetails");
        if (saved) {
          const data = JSON.parse(saved);
          if (isValid(data)) {
            setPostalCode(data.postalCode || "");
            setLocation(data.location || "");
            setStreet(data.street || "");
            setHouseNumber(data.houseNumber || "");
            setHouseNumberSuffix(data.houseNumberSuffix || "");
            setDesiredStart(data.desiredStart || "");
            setPreviousSupplier(data.previousSupplier || "");
            setPreviousCustomerNo(data.previousCustomerNo || "");
            setMeterNo(data.meterNo || "");
            setMeterLocationNo(data.meterLocationNo || "");
            setMeterNo(data.meterNo || "");
            setMeterLocationNo(data.meterLocationNo || "");
            setMoveInStatus(data.moveInStatus || "");
            // Only set billing from addressDetails if personalDetails doesn't have it
            if (!billingFromPersonal) {
              setBilling(data.billing);
            }
            setBillingStreet(data.billingStreet || "");
            setBillingHouseNumber(data.billingHouseNumber || "");
            setBillingHouseNumberSuffix(data.billingHouseNumberSuffix || "");
            setBillingCity(data.billingCity || "");
            setBillingPostal(data.billingPostal || "");
            setBillingCountry(data.billingCountry || "");
            console.log(
              "[AddressDetails Restore] Loaded from localStorage (no session)",
              data
            );
          }
        }
      } catch {}
      isRestoring.current = false;
    }
  }, []);
  // Save to localStorage on change, only if data is valid
  useEffect(() => {
    if (isRestoring.current) return; // Don't save while restoring

    const data = {
      billingStreet,
      billingHouseNumber,
      billingHouseNumberSuffix,
      billingCity,
      billingPostal,
      billingCountry,
      postalCode,
      location,
      street,
      houseNumber,
      houseNumberSuffix,
      desiredStart,
      previousSupplier,
      previousCustomerNo,
      meterNo,
      meterLocationNo,
      moveInStatus,
      billing,
    };

    // Only save if at least one field is non-empty
    const isValid = Object.values(data).some((v) => v && v !== "");
    if (isValid) {
      try {
        localStorage.setItem("addressDetails", JSON.stringify(data));
        console.log("[AddressDetails Save] Saved to localStorage", data);
      } catch {}
    }
  }, [
    billingStreet,
    billingHouseNumber,
    billingHouseNumberSuffix,
    billingCity,
    billingPostal,
    billingCountry,
    postalCode,
    location,
    street,
    houseNumber,
    houseNumberSuffix,
    desiredStart,
    previousSupplier,
    previousCustomerNo,
    meterNo,
    meterLocationNo,
    moveInStatus,
    billing,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Required fields
    if (!billing) {
      setError(t("addressdetails.error.billingType"));
      return;
    }
    if (billing === "different") {
      if (!billingStreet || !billingCity || !billingPostal || !billingCountry) {
        setError(t("addressdetails.error.billingFields"));
        return;
      }
    }
    if (!desiredStart) {
      setError(t("addressdetails.error.desiredStart"));
      return;
    }
    if (!previousSupplier) {
      setError(t("addressdetails.error.previousSupplier"));
      return;
    }
    if (!previousCustomerNo) {
      setError(t("addressdetails.error.previousCustomerNo"));
      return;
    }
    if (!meterNo) {
      setError(t("addressdetails.error.meterNo"));
      return;
    }
    if (!moveInStatus) {
      setError(t("addressdetails.error.moveInStatus"));
      return;
    }
    setError("");

    // Ensure billing consistency with personalDetails
    let finalBilling = billing;
    try {
      const personal = localStorage.getItem("personalDetails");
      if (personal) {
        const pdata = JSON.parse(personal);
        if (pdata.billing === "same" || pdata.billing === "different") {
          finalBilling = pdata.billing;
        }
      }
    } catch {}

    // Save to MongoDB session if sessionId exists
    const sessionId =
      typeof window !== "undefined"
        ? localStorage.getItem("calculationTarifSessionId")
        : null;
    if (sessionId) {
      try {
        await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            addressDetails: {
              billingStreet,
              billingHouseNumber,
              billingHouseNumberSuffix,
              billingCity,
              billingPostal,
              billingCountry,
              postalCode,
              location,
              street,
              houseNumber,
              houseNumberSuffix,
              desiredStart,
              previousSupplier,
              previousCustomerNo,
              meterNo,
              meterLocationNo,
              moveInStatus,
              billing: finalBilling,
            },
          }),
        });
      } catch {}
    }
    router.push("/calculator/sepaMandate");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          <Stepper currentStep={4} t={t} />
        </div>
        <div className="flex items-start gap-8 w-full max-w-[1146px] mx-auto mt-8">
          {/* Left: AddressCard */}
          <AddressCard />
          {/* Right: Personal details form */}
          <form
            className="rounded-xl shadow-lg pl-8 pb-8 w-full max-w-2xl flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6 items-center">
              {/* Postal Code */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.postalCode")} *
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.postalCodePlaceholder")}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />

              {/* Location */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.location")} *
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.locationPlaceholder")}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              {/* Street */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.street")} *
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.streetPlaceholder")}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />

              {/* House Number and Suffix side by side */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.houseNumberAndSuffix")}
              </label>
              <div className="flex gap-4 col-span-1">
                <input
                  type="text"
                  className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                  placeholder={t("addressdetails.houseNumberPlaceholder")}
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
                <input
                  type="text"
                  className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                  placeholder={t("addressdetails.houseNumberSuffixPlaceholder")}
                  value={houseNumberSuffix}
                  onChange={(e) => setHouseNumberSuffix(e.target.value)}
                />
              </div>

              {/* Move-in Status */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.moveInStatus")}
              </label>
              <div className="flex gap-4 flex-col">
                <label className="flex items-center gap-2 text-[#abafb1] font-poppins-regular text-sm cursor-pointer w-full">
                  <input
                    type="radio"
                    name="moveInStatus"
                    className="accent-[#FF9641]"
                    checked={moveInStatus === "already_live"}
                    onChange={() => setMoveInStatus("already_live")}
                  />
                  {t("addressdetails.alreadyLive")}
                </label>
                <label className="flex items-center gap-2 text-[#abafb1] font-poppins-regular text-sm cursor-pointer w-full">
                  <input
                    type="radio"
                    name="moveInStatus"
                    className="accent-[#FF9641]"
                    checked={moveInStatus === "moving_in"}
                    onChange={() => setMoveInStatus("moving_in")}
                  />
                  {t("addressdetails.movingIn")}
                </label>
              </div>

              {/* Desired Start of Delivery */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.desiredStart")}
              </label>
              <input
                type="date"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-[#ABAFB1] focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                value={desiredStart}
                onChange={(e) => setDesiredStart(e.target.value)}
              />

              {/* Previous Supplier */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.previousSupplier")}
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.previousSupplierPlaceholder")}
                value={previousSupplier}
                onChange={(e) => setPreviousSupplier(e.target.value)}
              />

              {/* Previous Customer No. */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.previousCustomerNo")}
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.previousCustomerNoPlaceholder")}
                value={previousCustomerNo}
                onChange={(e) => setPreviousCustomerNo(e.target.value)}
              />

              {/* Meter No. */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.meterNo")}
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.meterNoPlaceholder")}
                value={meterNo}
                onChange={(e) => setMeterNo(e.target.value)}
              />

              <div className="w-full col-span-2 text-[#abafb1] font-poppins-regular text-sm">
                {t("addressdetails.supplierSwitchInfo")}
              </div>
              <div></div>
              <div></div>

              {/* Meter Location No. */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.meterLocationNo")}
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.meterLocationNoPlaceholder")}
                value={meterLocationNo}
                onChange={(e) => setMeterLocationNo(e.target.value)}
              />

              {/* Extra billing address fields if billing is different */}
              {billing === "different" && (
                <>
                  <div className="w-full col-span-2 text-[#abafb1] font-poppins-medium text-4xl mt-10">
                    {t("addressdetails.billingAddress")}
                  </div>
                  <div></div>
                  <div></div>

                  <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                    {t("addressdetails.billingHouseNumberAndSuffix")}
                  </label>
                  <div className="flex gap-4 col-span-1">
                    <input
                      type="text"
                      className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                      placeholder={t(
                        "addressdetails.billingHouseNumberPlaceholder"
                      )}
                      value={billingHouseNumber}
                      onChange={(e) => setBillingHouseNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                      placeholder={t(
                        "addressdetails.billingHouseNumberSuffixPlaceholder"
                      )}
                      value={billingHouseNumberSuffix}
                      onChange={(e) =>
                        setBillingHouseNumberSuffix(e.target.value)
                      }
                    />
                  </div>

                  <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                    {t("addressdetails.billingStreet")}
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder={t("addressdetails.billingStreetPlaceholder")}
                    value={billingStreet}
                    onChange={(e) => setBillingStreet(e.target.value)}
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                    {t("addressdetails.billingCity")}
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder={t("addressdetails.billingCityPlaceholder")}
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                    {t("addressdetails.billingPostal")}
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder={t("addressdetails.billingPostalPlaceholder")}
                    value={billingPostal}
                    onChange={(e) => setBillingPostal(e.target.value)}
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                    {t("addressdetails.billingCountry")}
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder={t("addressdetails.billingCountryPlaceholder")}
                    value={billingCountry}
                    onChange={(e) => setBillingCountry(e.target.value)}
                  />
                </>
              )}

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
                  {t("addressdetails.next")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
