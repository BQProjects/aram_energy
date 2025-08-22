"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Stepper from "../../components/Stepper";
import AddressCard from "@/app/components/AddressCard";
import { useLanguage } from "@/app/contexts/LanguageContext";
import {
  useAddressDetailsSection,
  usePersonalDetailsSection,
  useSessionInfo,
} from "@/app/contexts/FormHelpers";

export default function Addressdetails() {
  const router = useRouter();
  const { t } = useLanguage();
  const { sessionId, isInitialized } = useSessionInfo();
  const { data: addressDetails, update: updateAddressDetails } =
    useAddressDetailsSection();
  const { data: personalDetails } = usePersonalDetailsSection();
  const [error, setError] = React.useState("");


  useEffect(() => {
    // Ensure the `billing` field is synchronized on page load
    if (personalDetails.billing !== addressDetails.billing) {
      updateAddressDetails({ billing: personalDetails.billing });
    }
  }, [personalDetails.billing, addressDetails.billing, updateAddressDetails]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields validation
    if (!addressDetails.billing) {
      setError(t("addressdetails.error.billingType"));
      return;
    }
    if (addressDetails.billing === "different") {
      if (
        !addressDetails.billingStreet ||
        !addressDetails.billingCity ||
        !addressDetails.billingPostal ||
        !addressDetails.billingCountry
      ) {
        setError(t("addressdetails.error.billingFields"));
        return;
      }
    }
    if (!addressDetails.desiredStart) {
      setError(t("addressdetails.error.desiredStart"));
      return;
    }
    if (!addressDetails.previousSupplier) {
      setError(t("addressdetails.error.previousSupplier"));
      return;
    }
    if (!addressDetails.previousCustomerNo) {
      setError(t("addressdetails.error.previousCustomerNo"));
      return;
    }
    if (!addressDetails.meterNo) {
      setError(t("addressdetails.error.meterNo"));
      return;
    }
    if (!addressDetails.moveInStatus) {
      setError(t("addressdetails.error.moveInStatus"));
      return;
    }

    setError("");

    // Ensure billing consistency with personalDetails
    const finalBilling = personalDetails.billing || addressDetails.billing;
    await updateAddressDetails({ billing: finalBilling });

    // Navigate to next page with session ID
    router.push(`/calculator/sepaMandate?id=${sessionId}`);
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
          {/* Right: Address details form */}
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
                value={addressDetails.postalCode}
                onChange={(e) =>
                  updateAddressDetails({ postalCode: e.target.value })
                }
              />

              {/* Location */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.location")} *
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.locationPlaceholder")}
                value={addressDetails.location}
                onChange={(e) =>
                  updateAddressDetails({ location: e.target.value })
                }
              />

              {/* Street */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.street")} *
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.streetPlaceholder")}
                value={addressDetails.street}
                onChange={(e) =>
                  updateAddressDetails({ street: e.target.value })
                }
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
                  value={addressDetails.houseNumber}
                  onChange={(e) =>
                    updateAddressDetails({ houseNumber: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                  placeholder={t("addressdetails.houseNumberSuffixPlaceholder")}
                  value={addressDetails.houseNumberSuffix}
                  onChange={(e) =>
                    updateAddressDetails({ houseNumberSuffix: e.target.value })
                  }
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
                    checked={addressDetails.moveInStatus === "already_live"}
                    onChange={() =>
                      updateAddressDetails({ moveInStatus: "already_live" })
                    }
                  />
                  {t("addressdetails.alreadyLive")}
                </label>
                <label className="flex items-center gap-2 text-[#abafb1] font-poppins-regular text-sm cursor-pointer w-full">
                  <input
                    type="radio"
                    name="moveInStatus"
                    className="accent-[#FF9641]"
                    checked={addressDetails.moveInStatus === "moving_in"}
                    onChange={() =>
                      updateAddressDetails({ moveInStatus: "moving_in" })
                    }
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
                value={addressDetails.desiredStart}
                onChange={(e) =>
                  updateAddressDetails({ desiredStart: e.target.value })
                }
              />

              {/* Previous Supplier */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.previousSupplier")}
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.previousSupplierPlaceholder")}
                value={addressDetails.previousSupplier}
                onChange={(e) =>
                  updateAddressDetails({ previousSupplier: e.target.value })
                }
              />

              {/* Previous Customer No. */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.previousCustomerNo")}
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.previousCustomerNoPlaceholder")}
                value={addressDetails.previousCustomerNo}
                onChange={(e) =>
                  updateAddressDetails({ previousCustomerNo: e.target.value })
                }
              />

              {/* Meter No. */}
              <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                {t("addressdetails.meterNo")}
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder={t("addressdetails.meterNoPlaceholder")}
                value={addressDetails.meterNo}
                onChange={(e) =>
                  updateAddressDetails({ meterNo: e.target.value })
                }
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
                value={addressDetails.meterLocationNo}
                onChange={(e) =>
                  updateAddressDetails({ meterLocationNo: e.target.value })
                }
              />

              {/* Extra billing address fields if billing is different */}
              {addressDetails.billing === "different" && (
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
                      value={addressDetails.billingHouseNumber}
                      onChange={(e) =>
                        updateAddressDetails({
                          billingHouseNumber: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                      placeholder={t(
                        "addressdetails.billingHouseNumberSuffixPlaceholder"
                      )}
                      value={addressDetails.billingHouseNumberSuffix}
                      onChange={(e) =>
                        updateAddressDetails({
                          billingHouseNumberSuffix: e.target.value,
                        })
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
                    value={addressDetails.billingStreet}
                    onChange={(e) =>
                      updateAddressDetails({ billingStreet: e.target.value })
                    }
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                    {t("addressdetails.billingCity")}
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder={t("addressdetails.billingCityPlaceholder")}
                    value={addressDetails.billingCity}
                    onChange={(e) =>
                      updateAddressDetails({ billingCity: e.target.value })
                    }
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                    {t("addressdetails.billingPostal")}
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder={t("addressdetails.billingPostalPlaceholder")}
                    value={addressDetails.billingPostal}
                    onChange={(e) =>
                      updateAddressDetails({ billingPostal: e.target.value })
                    }
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-xl text-left pr-4 col-span-1 self-center">
                    {t("addressdetails.billingCountry")}
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder={t("addressdetails.billingCountryPlaceholder")}
                    value={addressDetails.billingCountry}
                    onChange={(e) =>
                      updateAddressDetails({ billingCountry: e.target.value })
                    }
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
