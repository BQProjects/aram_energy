"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Stepper from "../../components/Stepper";
import AddressCard from "@/app/components/AddressCard";

export default function Addressdetails() {
    // Personal details state
  const [phone, setPhone] = useState("");
  const [salutation, setSalutation] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
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

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("personalDetails");
      if (saved) {
          const data = JSON.parse(saved);
        if (data.phone) setPhone(data.phone);
        if (data.salutation) setSalutation(data.salutation);
        if (data.name) setName(data.name);
        if (data.birthDate) setBirthDate(data.birthDate);
        if (data.surname) setSurname(data.surname);
        if (data.email) setEmail(data.email);
        if (data.billing) setBilling(data.billing);
        if (data.billingStreet) setBillingStreet(data.billingStreet);
        if (data.billingHouseNumber)
          setBillingHouseNumber(data.billingHouseNumber);
        if (data.billingHouseNumberSuffix)
          setBillingHouseNumberSuffix(data.billingHouseNumberSuffix);
        if (data.billingCity) setBillingCity(data.billingCity);
        if (data.billingPostal) setBillingPostal(data.billingPostal);
        if (data.billingCountry) setBillingCountry(data.billingCountry);
        setHouseNumberSuffix(data.houseNumberSuffix);
        if (data.desiredStart) setDesiredStart(data.desiredStart);
        if (data.previousSupplier) setPreviousSupplier(data.previousSupplier);
        if (data.previousCustomerNo)
          setPreviousCustomerNo(data.previousCustomerNo);
        if (data.meterNo) setMeterNo(data.meterNo);
        if (data.meterLocationNo) setMeterLocationNo(data.meterLocationNo);
        if (data.moveInStatus) setMoveInStatus(data.moveInStatus);
      }
    } catch {}
  }, []);

  // Store to localStorage on change
  useEffect(() => {
    const data = {
      phone,
      salutation,
      name,
      surname,
      birthDate,
      email,
      billing,
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
    };
    try {
      localStorage.setItem("personalDetails", JSON.stringify(data));
    } catch {}
  }, [billing, billingStreet, billingHouseNumber, billingHouseNumberSuffix, billingCity, billingPostal, billingCountry, postalCode, location, street, houseNumber, houseNumberSuffix, desiredStart, previousSupplier, previousCustomerNo, meterNo, meterLocationNo, moveInStatus, phone, salutation, name, surname, birthDate, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Required fields
    if (!billing) {
      setError("Please select billing type.");
      return;
    }
    if (billing === "different") {
      if (!billingStreet || !billingCity || !billingPostal || !billingCountry) {
        setError("Please fill in all required billing address fields.");
        return;
      }
    }
    if (!desiredStart) {
      setError("Please select desired start of delivery.");
      return;
    }
    if (!previousSupplier) {
      setError("Please enter previous supplier.");
      return;
    }
    if (!previousCustomerNo) {
      setError("Please enter previous customer number.");
      return;
    }
    if (!meterNo) {
      setError("Please enter meter number.");
      return;
    }
    if (!moveInStatus) {
      setError("Please select move-in status.");
      return;
    }
    setError("");
    // ...submit logic here...
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          <Stepper currentStep={4} />
        </div>
        <div className="flex items-start gap-8 w-full max-w-[1146px] mx-auto mt-8">
          {/* Left: AddressCard */}
          <AddressCard />
          {/* Right: Personal details form */}
          <form
            className="rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6 items-center">
              {/* Postal Code */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Postal Code *
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder="Enter your postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />

              {/* Location */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Location *
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              {/* Street */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Street *
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder="Enter your street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />

              {/* House Number and Suffix side by side */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                House Number * / House Number Suffix
              </label>
              <div className="flex gap-4 col-span-1">
                <input
                  type="text"
                  className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                  placeholder="Number"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
                <input
                  type="text"
                  className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                  placeholder="Suffix"
                  value={houseNumberSuffix}
                  onChange={(e) => setHouseNumberSuffix(e.target.value)}
                />
              </div>

              {/* Move-in Status */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Move-in Status
              </label>
              <div className="flex gap-4 flex-col">
                <label className="flex items-center gap-2 text-[#abafb1] font-poppins text-base cursor-pointer w-full">
                  <input
                    type="radio"
                    name="moveInStatus"
                    className="accent-[#FF9641] w-5 h-5"
                    checked={moveInStatus === "already_live"}
                    onChange={() => setMoveInStatus("already_live")}
                  />
                  I have just moved in or I am about to move in (move in)
                </label>
                <label className="flex items-center gap-2 text-[#abafb1] font-poppins text-base cursor-pointer w-full">
                  <input
                    type="radio"
                    name="moveInStatus"
                    className="accent-[#FF9641] w-5 h-5"
                    checked={moveInStatus === "moving_in"}
                    onChange={() => setMoveInStatus("moving_in")}
                  />
                  I have just moved in or I am about to move in (move in)
                </label>
              </div>

              {/* Desired Start of Delivery */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Desired Start of Delivery
              </label>
              <input
                type="date"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-[#ABAFB1] focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                value={desiredStart}
                onChange={(e) => setDesiredStart(e.target.value)}
              />

              {/* Previous Supplier */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Previous Supplier
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder="Enter previous supplier"
                value={previousSupplier}
                onChange={(e) => setPreviousSupplier(e.target.value)}
              />

              {/* Previous Customer No. */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Previous Customer No.
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder="Enter previous customer number"
                value={previousCustomerNo}
                onChange={(e) => setPreviousCustomerNo(e.target.value)}
              />

              {/* Meter No. */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Meter No.
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder="Enter meter number"
                value={meterNo}
                onChange={(e) => setMeterNo(e.target.value)}
              />

              <div className="w-full col-span-2 text-[#abafb1] font-poppins-regular text-base">
                Would you like to switch suppliers more quickly? Then please
                provide us with your store location number. This will allow us
                to start supplying you more quickly.
              </div>
              <div></div>
              <div></div>

              {/* Meter Location No. */}
              <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                Meter Location No.
              </label>
              <input
                type="text"
                className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                placeholder="Enter meter location number"
                value={meterLocationNo}
                onChange={(e) => setMeterLocationNo(e.target.value)}
              />

              {/* Extra billing address fields if billing is different */}
              {billing === "different" && (
                <>
                  <div className="w-full col-span-2 text-[#abafb1] font-poppins-medium text-4xl mt-10">
                    Billing address
                  </div>
                  <div></div>
                  <div></div>

                  <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                    Billing House Number * / Suffix
                  </label>
                  <div className="flex gap-4 col-span-1">
                    <input
                      type="text"
                      className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                      placeholder="Number"
                      value={billingHouseNumber}
                      onChange={(e) => setBillingHouseNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-1/2 max-w-[160px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors"
                      placeholder="Suffix"
                      value={billingHouseNumberSuffix}
                      onChange={(e) =>
                        setBillingHouseNumberSuffix(e.target.value)
                      }
                    />
                  </div>

                  <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                    Billing Street *
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder="Enter billing street"
                    value={billingStreet}
                    onChange={(e) => setBillingStreet(e.target.value)}
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                    Billing City *
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder="Enter billing city"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                    Billing Postal Code *
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder="Enter billing postal code"
                    value={billingPostal}
                    onChange={(e) => setBillingPostal(e.target.value)}
                  />

                  <label className="text-[#abafb1] font-poppins-regular text-lg text-left pr-4 col-span-1 self-center">
                    Billing Country *
                  </label>
                  <input
                    type="text"
                    className="w-full max-w-[340px] h-[52px] font-poppins-regular border border-[#cfd3d4] px-4 py-3 bg-transparent text-white focus:outline-none focus:border-[#FF9641] transition-colors col-span-1"
                    placeholder="Enter billing country"
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
                  className="mt-4 bg-[#FF9641] hover:bg-[#e88537] font-poppins-regular text-white py-3 px-8 rounded shadow transition-colors"
                >
                  Continue
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
